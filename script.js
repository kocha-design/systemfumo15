const form = document.getElementById('coronaForm');
const resultDiv = document.getElementById('result');
const progressBar = document.getElementById('progressBar');
const modeToggle = document.getElementById('modeToggle');
const body = document.body;
const alertSound = document.getElementById('alertSound');
const ctx = document.getElementById('symptomChart').getContext('2d');

// Dark/Light Mode Toggle
modeToggle.addEventListener('change', () => {
  body.classList.toggle('dark');
  localStorage.setItem('mode', body.classList.contains('dark') ? 'dark' : 'light');
});

// Load saved mode
if(localStorage.getItem('mode') === 'dark') {
  body.classList.add('dark');
  modeToggle.checked = true;
}

// Initialize Chart
const symptomLabels = ['Fever', 'Cough', 'Tiredness', 'Loss of taste/smell', 'Difficulty breathing', 'Sore throat'];
let symptomChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: symptomLabels,
    datasets: [{
      label: 'Symptoms Selected',
      data: [0,0,0,0,0,0],
      backgroundColor: '#0f7a4a'
    }]
  },
  options: {
    indexAxis: 'y',
    scales: {
      x: { beginAtZero: true, max: 1 }
    },
    plugins: {
      legend: { display: false }
    }
  }
});

// Symptom Checker
form.addEventListener('submit', function(e) {
  e.preventDefault();

  const checkboxes = document.querySelectorAll('input[name="symptom"]');
  const checkedSymptoms = document.querySelectorAll('input[name="symptom"]:checked');
  const total = checkedSymptoms.length;

  let riskLevel = '';
  let progress = 0;

  if(total === 0) {
    riskLevel = 'No symptoms detected. Low risk.';
    progress = 20;
  } else if(total <= 2) {
    riskLevel = 'Some symptoms detected. Medium risk. Consider monitoring yourself.';
    progress = 50;
    alertSound.play();
  } else {
    riskLevel = 'Multiple symptoms detected. High risk! Please consult a doctor immediately.';
    progress = 100;
    alertSound.play();
  }

  resultDiv.textContent = riskLevel;
  resultDiv.style.opacity = 0;
  setTimeout(() => resultDiv.style.opacity = 1, 50);

  // Animate Progress Bar
  progressBar.style.width = progress + '%';

  // Update Chart
  const data = Array.from(checkboxes).map(chk => chk.checked ? 1 : 0);
  symptomChart.data.datasets[0].data = data;
  symptomChart.update();
});
