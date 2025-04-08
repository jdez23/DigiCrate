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
