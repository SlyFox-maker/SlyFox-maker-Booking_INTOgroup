from django.urls import path
from . import views

urlpatterns = [
    path('registration/', views.account_register, name='registration'),
    path('login/', views.account_login, name='login'),
    path('logout/', views.account_logout, name='logout'),
]
