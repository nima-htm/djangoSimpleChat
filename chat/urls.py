from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('<str:room_name>/', views.room, name='room'),
    path('checkroom',views.checkroom, name='checkroom'),
    path('sendMessage', views.sendMessage, name='sendMessage'),
    path('getMessages/<str:room_name>/', views.getMessages, name='getMessages'),
]