# employees/views.py

from rest_framework import generics
from .models import Employee, Salary
from .serializers import EmployeeSerializer, SalarySerializer

class EmployeeListCreateView(generics.ListCreateAPIView):
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer

class SalaryListCreateView(generics.ListCreateAPIView):
    queryset = Salary.objects.all().order_by('-pay_date')
    serializer_class = SalarySerializer

# Create your views here.
