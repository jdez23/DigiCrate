from django.urls import path
from .views import *

urlpatterns = [
    path('youtube/', YouTubeSearchView.as_view()),
    path('metadata/', DiscogsMetadataView.as_view()),
    path('enriched-metadata/', EnrichedMetadataView.as_view()),
]
