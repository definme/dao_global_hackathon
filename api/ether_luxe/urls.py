from django.urls import include, path
from rest_framework import routers
from .views import TokenViewSet, SaleTokenViewSet

router = routers.DefaultRouter()
router.register(r'collection', TokenViewSet)
router.register(r'sale', SaleTokenViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('api/', include('rest_framework.urls', namespace='rest_framework')),
]
