from django.urls import include, path
from rest_framework import routers
from .views import TokenViewSet

router = routers.DefaultRouter()
router.register(r'collection', TokenViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('api/', include('rest_framework.urls', namespace='rest_framework')),
]
