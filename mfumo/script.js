document.addEventListener('DOMContentLoaded', () => {
    const employeeForm = document.getElementById('employee-form');
    const salaryForm = document.getElementById('salary-form');
    const employeeTableBody = document.querySelector('#employee-table tbody');
    const salaryTableBody = document.querySelector('#salary-table tbody');
    const employeeSelect = document.getElementById('employee-select');

    // Kazi ya kupakia wafanyakazi kutoka backend na kuijaza kwenye select box
    async function fetchEmployees() {
        const response = await fetch('http://127.0.0.1:8000/api/employees/');
        const employees = await response.json();
        employeeTableBody.innerHTML = '';
        employeeSelect.innerHTML = '<option value="">Chagua Mfanyakazi</option>';
        employees.forEach(employee => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${employee.name}</td>
                <td>${employee.position}</td>
                <td>${employee.email}</td>
            `;
            employeeTableBody.appendChild(row);

            const option = document.createElement('option');
            option.value = employee.id;
            option.textContent = employee.name;
            employeeSelect.appendChild(option);
        });
    }

    // Kazi ya kupakia mishahara kutoka backend
    async function fetchSalaries() {
        const response = await fetch('http://127.0.0.1:8000/api/salaries/');
        const salaries = await response.json();
        salaryTableBody.innerHTML = '';
        salaries.forEach(salary => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${salary.employee_name}</td>
                <td>${salary.amount}</td>
                <td>${salary.pay_date}</td>
            `;
            salaryTableBody.appendChild(row);
        });
    }

    // Kazi ya kutuma data mpya ya mfanyakazi kwa backend
    employeeForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const position = document.getElementById('position').value;
        const email = document.getElementById('email').value;

        const response = await fetch('http://127.0.0.1:8000/api/employees/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, position, email }),
        });

        if (response.ok) {
            alert('Mfanyakazi ameongezwa!');
            employeeForm.reset();
            fetchEmployees();
        } else {
            alert('Kuna tatizo la kuongeza mfanyakazi.');
        }
    });

    // Kazi ya kutuma data mpya ya mshahara kwa backend
    salaryForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const employeeId = document.getElementById('employee-select').value;
        const amount = document.getElementById('amount').value;
        const payDate = document.getElementById('pay-date').value;

        const response = await fetch('http://127.0.0.1:8000/api/salaries/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ employee: employeeId, amount, pay_date: payDate }),
        });

        if (response.ok) {
            alert('Mshahara umeongezwa!');
            salaryForm.reset();
            fetchSalaries();
        } else {
            alert('Kuna tatizo la kuongeza mshahara.');
        }
    });

    // Pakia data zote mara moja ukurasa unapoanza
    fetchEmployees();
    fetchSalaries();
});