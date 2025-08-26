from django.urls import path
from . import views

urlpatterns = [
    path('', views.student_list, name='student_list'),
    path('add/', views.add_student, name='add_student'),
    path('add_result/', views.add_result, name='add_result'),
    path('results/<int:student_id>/', views.view_results, name='view_results'),
]