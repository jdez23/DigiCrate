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
