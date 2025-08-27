from django.db import models

class Employee(models.Model):
    name = models.CharField(max_length=200)
    position = models.CharField(max_length=100)
    email = models.EmailField(unique=True)

    def __str__(self):
        return self.name
    
    
  
class Salary(models.Model):
    employee = models.ForeignKey(Employee, on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    pay_date = models.DateField()

    def __str__(self):
        return f"{self.employee.name} - {self.amount}"  

# Create your models here.
