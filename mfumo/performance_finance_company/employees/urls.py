# employees/urls.py
# employees/urls.py

from django.urls import path
from .views import EmployeeListCreateView, SalaryListCreateView

urlpatterns = [
    path('employees/', EmployeeListCreateView.as_view(), name='employee-list-create'),
    path('salaries/', SalaryListCreateView.as_view(), name='salary-list-create'),
]