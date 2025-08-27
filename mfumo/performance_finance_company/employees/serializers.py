
# employees/serializers.py

from rest_framework import serializers
from .models import Employee, Salary

class EmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields = '__all__'

class SalarySerializer(serializers.ModelSerializer):
    employee_name = serializers.ReadOnlyField(source='employee.name')

    class Meta:
        model = Salary
        fields = ['id', 'employee', 'employee_name', 'amount', 'pay_date']