from django.urls import path
from .views import CombinedRandomSongView

urlpatterns = [
    path('combined-random-song/', CombinedRandomSongView.as_view()),
]
