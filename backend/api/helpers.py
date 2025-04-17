import random
import re
import requests
from django.conf import settings
from .filter_options import GENRES, STYLES, COUNTRIES, YEARS


def parse_iso8601_duration(duration_str):
    pattern = re.compile(
        r'PT'
        r'(?:(?P<hours>\d+)H)?'
        r'(?:(?P<minutes>\d+)M)?'
        r'(?:(?P<seconds>\d+)S)?'
    )
    match = pattern.fullmatch(duration_str)
    if not match:
        return 0
    parts = match.groupdict()
    hours = int(parts.get("hours") or 0)
    minutes = int(parts.get("minutes") or 0)
    seconds = int(parts.get("seconds") or 0)
    return hours * 3600 + minutes * 60 + seconds


def sanitize_text(text):
    """Remove special characters from text, leaving only alphanumerics and whitespace."""
    if not text:
        return ""
    return re.sub(r"[^\w\s]", "", text).strip()


def get_random_discogs_song(max_attempts=25):
    """
    Fetch a random song release from Discogs based on random selections from filter options.
    Loops until a release is found or max_attempts is reached.
    Returns a dictionary with sanitized metadata.
    """
    attempt = 0
    selected_release = None
    used_filters = None
    discogs_url = "https://api.discogs.com/database/search"
    headers = {"User-Agent": settings.DISCOGS_USER_AGENT}
    session = requests.Session()

    while attempt < max_attempts and not selected_release:
        genre = random.choice(GENRES)
        style = random.choice(STYLES)
        country = random.choice(COUNTRIES)
        year = random.choice(YEARS)

        used_filters = {"genre": genre, "style": style,
                        "country": country, "year": year}

        # Try using the separate filter parameters.
        params = {
            "type": "release",
            "genre": genre,
            "style": style,
            "country": country,
            "year": year,
            "token": settings.DISCOGS_API_KEY,
            "per_page": 50,
            "page": 1
        }
        try:
            response = session.get(
                discogs_url, params=params, headers=headers, timeout=5)
            data = response.json()
        except Exception:
            attempt += 1
            continue

        results = data.get("results", [])
        if not results:
            # Fallback to a free-text combined query.
            query_combined = f"{genre} {style} {country} {year}"
            params = {
                "q": query_combined,
                "type": "release",
                "token": settings.DISCOGS_API_KEY,
                "per_page": 50,
                "page": 1
            }
            try:
                response = session.get(
                    discogs_url, params=params, headers=headers, timeout=5)
                data = response.json()
            except Exception:
                attempt += 1
                continue
            results = data.get("results", [])

        if results:
            selected_release = random.choice(results)
            break
        attempt += 1

    if not selected_release:
        raise ValueError("No Discogs results found after multiple attempts.")

    title_field = selected_release.get("title", "")
    if " - " in title_field:
        discogs_artist = title_field.split(" - ")[0].strip()
        discogs_title = title_field.split(" - ")[1].strip()
    else:
        discogs_artist = ""
        discogs_title = title_field.strip()

    # Sanitize the text fields.
    discogs_artist = sanitize_text(discogs_artist)
    discogs_title = sanitize_text(discogs_title)

    discogs_metadata = {
        "artist": discogs_artist,
        "title": discogs_title,
        "year": selected_release.get("year"),
        "genre": selected_release.get("genre", []),
        "style": selected_release.get("style", []),
        "label": selected_release.get("label", []),
        "country": selected_release.get("country"),
        "cover_image": selected_release.get("cover_image"),
        "filters_used": used_filters,
    }
    return discogs_metadata


def get_matching_youtube_video(artist, song_title, max_attempts=15):
    """
    Search YouTube for a video matching the provided artist and song title.
    The match condition: the video's title or description must contain at least a majority of the words in the combined artist and title.
    Prints all video titles for debugging and returns the video link once found.
    """
    youtube_search_url = "https://www.googleapis.com/youtube/v3/search"

    # Combine the artist and title into a base query.
    base_query = f"{artist} {song_title}"
    queries_to_try = [
        f"{base_query} Official",
        f"{base_query} Music",
        base_query,
    ]

    # Prepare required words.
    required_words = (artist + " " + song_title).lower().split()
    import math
    threshold = math.ceil(len(required_words) / 2)  # Majority threshold

    print(
        f"Required words for matching (threshold {threshold}): {required_words}")

    def search_youtube(query):
        params = {
            "part": "snippet",
            "maxResults": 10,
            "type": "video",
            "videoCategoryId": "10",  # Music category
            "q": query,
            "key": settings.YOUTUBE_API_KEY,
        }
        response = requests.get(youtube_search_url, params=params, timeout=5)
        return response.json().get("items", [])

    attempt = 0
    candidate = None
    while attempt < max_attempts and not candidate:
        query = random.choice(queries_to_try)
        print(f"YouTube search attempt {attempt}: Query: '{query}'")
        items = search_youtube(query)
        print("YouTube raw results:")
        for item in items:
            print(item.get("snippet", {}).get("title"))

        def matches(item):
            snippet = item.get("snippet", {})
            combined_text = (snippet.get("title", "") + " " +
                             snippet.get("description", "")).lower()
            match_count = sum(
                1 for word in required_words if word in combined_text)
            return match_count >= threshold
        filtered_items = [item for item in items if matches(item)]
        print(f"Filtered items count: {len(filtered_items)}")
        if filtered_items:
            candidate = random.choice(filtered_items)
            break
        attempt += 1

    if not candidate:
        raise ValueError(
            "No matching YouTube video found after multiple attempts.")

    video_id = candidate.get("id", {}).get("videoId")
    snippet = candidate.get("snippet", {})

    # Retrieve video details (duration).
    youtube_details_url = "https://www.googleapis.com/youtube/v3/videos"
    details_params = {
        "part": "contentDetails",
        "id": video_id,
        "key": settings.YOUTUBE_API_KEY,
    }
    try:
        details_response = requests.get(
            youtube_details_url, params=details_params, timeout=5)
        details_response.raise_for_status()
        details_items = details_response.json().get("items", [])
        duration_seconds = None
        if details_items:
            duration_str = details_items[0].get(
                "contentDetails", {}).get("duration", "")
            duration_seconds = parse_iso8601_duration(duration_str)
    except Exception as e:
        print(f"Error retrieving video details: {e}")
        duration_seconds = None

    youtube_data = {
        "video_id": video_id,
        "video_url": f"https://www.youtube.com/watch?v={video_id}",
    }
    print("Selected YouTube video link:", youtube_data["video_url"])
    return youtube_data
