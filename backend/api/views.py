# import re
# import math
# import random
# import requests
# from django.conf import settings
# from rest_framework.views import APIView
# from rest_framework.response import Response
# from .filter_options import GENRES, STYLES, COUNTRIES, YEARS


# class RandomDiscogsSongView(APIView):
#     """
#     This view returns a random Discogs release (song) based on a combination of
#     filter options: genre, style, country, and year.
#     It loops until it finds a result that meets the query criteria.
#     """

#     def get(self, request):
#         max_attempts = 25
#         attempt = 0
#         selected_release = None
#         used_filters = None

#         discogs_url = "https://api.discogs.com/database/search"
#         headers = {
#             "User-Agent": settings.DISCOGS_USER_AGENT
#         }
#         session = requests.Session()

#         # Loop until a release is found or we exceed the maximum attempts.
#         while attempt < max_attempts and not selected_release:
#             # Use query parameters if provided; otherwise, choose a random option.
#             genre = request.query_params.get('genre') or random.choice(GENRES)
#             style = request.query_params.get('style') or random.choice(STYLES)
#             country = request.query_params.get(
#                 'country') or random.choice(COUNTRIES)
#             year = request.query_params.get('year') or random.choice(YEARS)

#             used_filters = {
#                 "genre": genre,
#                 "style": style,
#                 "country": country,
#                 "year": year,
#             }

#             # First attempt: use separate filter parameters.
#             params = {
#                 "type": "release",       # Looking for a release.
#                 "genre": genre,
#                 "style": style,
#                 "country": country,
#                 "year": year,
#                 "token": settings.DISCOGS_API_KEY,
#                 "per_page": 50,          # Retrieve up to 50 results.
#                 "page": 1
#             }

#             try:
#                 response = session.get(
#                     discogs_url, params=params, headers=headers, timeout=5)
#                 data = response.json()
#             except Exception:
#                 attempt += 1
#                 continue

#             results = data.get("results", [])

#             # If no results, fallback to a combined query string.
#             if not results:
#                 query_combined = f"{genre} {style} {country} {year}"
#                 params = {
#                     "q": query_combined,
#                     "type": "release",
#                     "token": settings.DISCOGS_API_KEY,
#                     "per_page": 50,
#                     "page": 1
#                 }
#                 try:
#                     response = session.get(
#                         discogs_url, params=params, headers=headers, timeout=5)
#                     data = response.json()
#                 except Exception:
#                     attempt += 1
#                     continue
#                 results = data.get("results", [])

#             if results:
#                 selected_release = random.choice(results)
#                 break  # Exit loop if a release is found.

#             attempt += 1

#         # If no valid release found after all attempts, return an error.
#         if not selected_release:
#             return Response(
#                 {"error": "No Discogs results found for the specified filters after multiple attempts."},
#                 status=404
#             )

#         # Parse the release title into artist and song title if possible.
#         # We assume the title is formatted as "Artist - Title".
#         title_field = selected_release.get("title", "")
#         if " - " in title_field:
#             artist_name = title_field.split(" - ")[0].strip()
#             song_title = title_field.split(" - ")[1].strip()
#         else:
#             artist_name = None
#             song_title = title_field

#         cleaned_metadata = {
#             "artist": artist_name,
#             "title": song_title,
#             "year": selected_release.get("year"),
#             "genre": selected_release.get("genre", []),
#             "style": selected_release.get("style", []),
#             "label": selected_release.get("label", []),
#             "country": selected_release.get("country"),
#             "cover_image": selected_release.get("cover_image"),
#             "filters_used": used_filters
#         }

#         return Response(cleaned_metadata)


# def parse_iso8601_duration(duration_str):
#     pattern = re.compile(
#         r'PT'
#         r'(?:(?P<hours>\d+)H)?'
#         r'(?:(?P<minutes>\d+)M)?'
#         r'(?:(?P<seconds>\d+)S)?'
#     )
#     match = pattern.fullmatch(duration_str)
#     if not match:
#         return 0
#     parts = match.groupdict()
#     hours = int(parts.get("hours") or 0)
#     minutes = int(parts.get("minutes") or 0)
#     seconds = int(parts.get("seconds") or 0)
#     return hours * 3600 + minutes * 60 + seconds


# def sanitize_text(text):
#     """Remove special characters from text, leaving only alphanumerics and whitespace."""
#     if not text:
#         return ""
#     return re.sub(r"[^\w\s]", "", text).strip()


# class MatchYoutubeVideoView(APIView):
#     """
#     This view takes 'artist' and 'title' query parameters (from Discogs metadata),
#     sanitizes them by removing special characters, and builds a YouTube search query.
#     It prints all the raw YouTube results for debugging and then filters them so that
#     a candidate is accepted if it contains at least the majority of the words
#     from both the artist and song title.
#     It tries multiple queries until a match is found.
#     """

#     def get(self, request):
#         # Retrieve and sanitize the input.
#         raw_artist = request.query_params.get('artist', '')
#         raw_title = request.query_params.get('title', '')
#         if not raw_artist or not raw_title:
#             return Response({"error": "Both 'artist' and 'title' parameters are required."}, status=400)

#         artist = sanitize_text(raw_artist)
#         song_title = sanitize_text(raw_title)
#         print(f"Sanitized Artist: {artist}")
#         print(f"Sanitized Title: {song_title}")

#         # Build several query variants.
#         base_query = f"{artist} {song_title} Official"
#         queries_to_try = [
#             base_query,
#             f"{artist} {song_title}",
#             f"{artist} {song_title} music"
#         ]

#         youtube_search_url = "https://www.googleapis.com/youtube/v3/search"
#         max_attempts = 15
#         attempt = 0
#         candidate = None

#         # Prepare word lists for matching.
#         artist_words = artist.lower().split()
#         title_words = song_title.lower().split()
#         required_words = artist_words + title_words
#         # Require at least half of the words.
#         threshold = math.ceil(len(required_words) / 2)
#         print(f"Required words (threshold {threshold}): {required_words}")

#         def search_youtube(query):
#             params = {
#                 "part": "snippet",
#                 "maxResults": 10,
#                 "type": "video",
#                 "videoCategoryId": "10",  # Music category.
#                 "q": query,
#                 "key": settings.YOUTUBE_API_KEY,
#             }
#             response = requests.get(
#                 youtube_search_url, params=params, timeout=5)
#             return response.json().get("items", [])

#         while attempt < max_attempts and not candidate:
#             query = random.choice(queries_to_try)
#             print(f"Attempt {attempt}: Using query: '{query}'")
#             items = search_youtube(query)
#             print(f"Attempt {attempt}: Raw YouTube results: {items}")

#             # Filter results: accept if at least threshold of required words are in title or description.
#             filtered_items = []
#             for item in items:
#                 snippet = item.get("snippet", {})
#                 combined_text = (snippet.get("title", "") +
#                                  " " + snippet.get("description", "")).lower()
#                 match_count = sum(
#                     1 for word in required_words if word in combined_text)
#                 if match_count >= threshold:
#                     filtered_items.append(item)

#             print(
#                 f"Attempt {attempt}: {len(filtered_items)} items after filtering (threshold {threshold})")
#             if filtered_items:
#                 candidate = random.choice(filtered_items)
#                 break
#             attempt += 1

#         if not candidate:
#             return Response({"error": "No matching YouTube video found after multiple attempts."}, status=404)

#         video_id = candidate.get("id", {}).get("videoId")
#         snippet = candidate.get("snippet", {})
#         video_url = f"https://www.youtube.com/watch?v={video_id}"

#         # Retrieve video duration details.
#         youtube_details_url = "https://www.googleapis.com/youtube/v3/videos"
#         details_params = {
#             "part": "contentDetails",
#             "id": video_id,
#             "key": settings.YOUTUBE_API_KEY,
#         }
#         try:
#             details_response = requests.get(
#                 youtube_details_url, params=details_params, timeout=5)
#             details_response.raise_for_status()
#             details_items = details_response.json().get("items", [])
#             duration_seconds = None
#             if details_items:
#                 duration_str = details_items[0].get(
#                     "contentDetails", {}).get("duration", "")
#                 duration_seconds = parse_iso8601_duration(duration_str)
#         except Exception as e:
#             print(f"Error retrieving video details: {e}")
#             duration_seconds = None

#         result = {
#             "video_id": video_id,
#             "video_url": video_url,
#             "title": snippet.get("title"),
#             "description": snippet.get("description"),
#             "channel_title": snippet.get("channelTitle"),
#             "published_at": snippet.get("publishedAt"),
#             "duration_seconds": duration_seconds,
#         }
#         print("Final YouTube result:", result)
#         return Response(result)

from rest_framework.views import APIView
from rest_framework.response import Response
from .helpers import get_random_discogs_song, get_matching_youtube_video


class CombinedRandomSongView(APIView):
    def get(self, request):
        max_combined_attempts = 10
        attempt = 0
        combined_result = None

        while attempt < max_combined_attempts and not combined_result:
            try:
                discogs_data = get_random_discogs_song()
                artist = discogs_data.get("artist", "")
                song_title = discogs_data.get("title", "")
                print("Discogs result - Artist:", artist)
                print("Discogs result - Title:", song_title)

                if not artist or not song_title:
                    raise ValueError("Incomplete Discogs metadata.")

                youtube_data = get_matching_youtube_video(artist, song_title)
                combined_result = {
                    "discogs_metadata": discogs_data,
                    "youtube_video_link": youtube_data.get("video_url")
                }
            except Exception as e:
                print(f"Combined search attempt {attempt} failed: {e}")
                attempt += 1

        if not combined_result:
            return Response({"error": "Failed to find a matching song after multiple attempts."}, status=404)

        return Response(combined_result)
