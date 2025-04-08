import requests
from django.conf import settings
from rest_framework.views import APIView
from rest_framework.response import Response


class YouTubeSearchView(APIView):
    def get(self, request):
        # Get query parameters from the request
        query = request.GET.get('q', 'funk')
        year = request.GET.get('year')

        # Build request params for YouTube API
        params = {
            'part': 'snippet',
            'maxResults': 10,
            'type': 'video',
            'q': query,
            'key': settings.YOUTUBE_API_KEY
        }

        if year:
            params['publishedAfter'] = f"{year}-01-01T00:00:00Z"
            params['publishedBefore'] = f"{year}-12-31T23:59:59Z"

        # Make the request to YouTube
        response = requests.get(
            'https://www.googleapis.com/youtube/v3/search', params=params)
        data = response.json()

        return Response(data)


class DiscogsMetadataView(APIView):
    def get(self, request):
        title = request.GET.get('title')

        if not title:
            return Response({'error': 'Missing title'}, status=400)

        url = 'https://api.discogs.com/database/search'
        params = {
            'q': title,
            'type': 'release',
            'token': settings.DISCOGS_API_KEY,
        }

        headers = {
            'User-Agent': settings.DISCOGS_USER_AGENT
        }

        r = requests.get(url, params=params, headers=headers)
        data = r.json()

        results = data.get('results', [])
        if not results:
            return Response({'error': 'No results found'}, status=404)

        # Pick the first match (you can improve this logic later)
        match = results[0]

        # Return cleaned metadata
        cleaned = {
            'artist': match.get('title').split(' - ')[0] if ' - ' in match.get('title', '') else None,
            'title': match.get('title').split(' - ')[1] if ' - ' in match.get('title', '') else match.get('title'),
            'year': match.get('year'),
            'genre': match.get('genre', []),
            'style': match.get('style', []),
            'label': match.get('label', []),
            'country': match.get('country'),
            'cover_image': match.get('cover_image'),
        }

        return Response(cleaned)


class EnrichedMetadataView(APIView):
    def get(self, request):
        raw_title = request.GET.get('title')

        if not raw_title:
            return Response({'error': 'Missing title'}, status=400)

        # Simple title parsing (split on dash)
        if ' - ' in raw_title:
            artist, track = raw_title.split(' - ', 1)
        else:
            artist = ''
            track = raw_title

        search_query = f"{artist} {track}".strip()

        # Discogs search
        url = 'https://api.discogs.com/database/search'
        params = {
            'q': search_query,
            'type': 'release',
            'token': settings.DISCOGS_API_KEY,
        }

        headers = {
            'User-Agent': settings.DISCOGS_USER_AGENT
        }

        r = requests.get(url, params=params, headers=headers)
        data = r.json()

        results = data.get('results', [])
        if not results:
            return Response({'error': 'No metadata found'}, status=404)

        match = results[0]

        cleaned = {
            'artist': match.get('title').split(' - ')[0] if ' - ' in match.get('title', '') else None,
            'title': match.get('title').split(' - ')[1] if ' - ' in match.get('title', '') else match.get('title'),
            'year': match.get('year'),
            'genre': match.get('genre', []),
            'style': match.get('style', []),
            'label': match.get('label', []),
            'country': match.get('country'),
            'cover_image': match.get('cover_image'),
        }

        return Response(cleaned)


class SampleView(APIView):
    def get(self, request):
        # Get search query from URL parameters
        query = request.GET.get('q', 'funk')

        # 1. Search YouTube
        youtube_params = {
            'part': 'snippet',
            'maxResults': 5,  # you might want more options later
            'type': 'video',
            'q': query,
            'key': settings.YOUTUBE_API_KEY
        }
        youtube_response = requests.get(
            'https://www.googleapis.com/youtube/v3/search', params=youtube_params
        )
        youtube_data = youtube_response.json()
        items = youtube_data.get('items', [])
        if not items:
            return Response({'error': 'No YouTube results found'}, status=404)

        # For simplicity, choose the first video
        video = items[0]
        raw_title = video['snippet'].get('title', '')

        # 2. Parse the video title to extract artist and track title
        # Example: "Fela Kuti - Zombie (Official Video)"
        if ' - ' in raw_title:
            artist, track = raw_title.split(' - ', 1)
        else:
            artist, track = '', raw_title

        # Form a search query for Discogs by combining artist and track
        discogs_search_query = f"{artist} {track}".strip()

        # 3. Search Discogs via the enriched logic
        discogs_url = 'https://api.discogs.com/database/search'
        discogs_params = {
            'q': discogs_search_query,
            'type': 'release',
            'token': settings.DISCOGS_API_TOKEN,
        }
        discogs_headers = {
            'User-Agent': settings.DISCOGS_USER_AGENT
        }
        discogs_response = requests.get(
            discogs_url, params=discogs_params, headers=discogs_headers)
        discogs_data = discogs_response.json()
        results = discogs_data.get('results', [])

        # Try to pick the best match: must contain 'zombie' and 'fela' or 'kuti' if available
        match = None
        for result in results:
            full_title = result.get('title', '').lower()
            if 'zombie' in full_title and ('fela' in full_title or 'kuti' in full_title):
                match = result
                break
        if not match and results:
            match = results[0]
        if not match:
            return Response({'error': 'No Discogs metadata found'}, status=404)

        # Clean up Discogs metadata
        cleaned_metadata = {
            'artist': match.get('title').split(' - ')[0] if ' - ' in match.get('title', '') else None,
            'title': match.get('title').split(' - ')[1] if ' - ' in match.get('title', '') else match.get('title'),
            'year': match.get('year'),
            'genre': match.get('genre', []),
            'style': match.get('style', []),
            'label': match.get('label', []),
            'country': match.get('country'),
            'cover_image': match.get('cover_image'),
        }

        # 4. Combine YouTube video data and Discogs metadata in one response
        combined_response = {
            'youtube': {
                'video_id': video['id'].get('videoId'),
                'title': raw_title,
                'description': video['snippet'].get('description'),
                'channel_title': video['snippet'].get('channelTitle'),
                'published_at': video['snippet'].get('publishedAt'),
            },
            'discogs_metadata': cleaned_metadata
        }

        return Response(combined_response)
