from django.urls import include, path
from rest_framework import routers
from .views import TokenViewSet, SaleTokenViewSet, VotersViewSet

router = routers.DefaultRouter()
router.register(r'collection', TokenViewSet)
router.register(r'sale', SaleTokenViewSet)
router.register(r'voters', VotersViewSet, basename='voters')

urlpatterns = [
    path('', include(router.urls)),
    path('api/', include('rest_framework.urls', namespace='rest_framework')),
]
