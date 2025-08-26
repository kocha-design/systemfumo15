from django.shortcuts import render, redirect, get_object_or_404
from .models import Student, Result
from .forms import StudentForm, ResultForm

def student_list(request):
    students = Student.objects.all()
    return render(request, 'students/student_list.html', {'students': students})

def add_student(request):
    if request.method == 'POST':
        form = StudentForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('student_list')
    else:
        form = StudentForm()
    return render(request, 'students/add_student.html', {'form': form})

def add_result(request):
    if request.method == 'POST':
        form = ResultForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('student_list')
    else:
        form = ResultForm()
    return render(request, 'students/add_result.html', {'form': form})

def view_results(request, student_id):
    student = get_object_or_404(Student, pk=student_id)
    results = Result.objects.filter(student=student)
    return render(request, 'students/view_results.html', {'student': student, 'results': results})

# Create your views here.
