from rest_framework.routers import SimpleRouter, DefaultRouter
from django.urls import path, include
from .views import  ReceivedMessageViewSet


#받은 메세지 
received_router = DefaultRouter(trailing_slash=True)
received_router.register(r'received/(?P<user_id>\d+)', ReceivedMessageViewSet, basename='received')



urlpatterns = [
    
    path('',include(received_router.urls)),
]