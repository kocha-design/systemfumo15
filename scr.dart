const form = document.getElementById('coronaForm');
const resultDiv = document.getElementById('result');
const progressBar = document.getElementById('progressBar');
const modeToggle = document.getElementById('modeToggle');
const body = document.body;
const alertSound = document.getElementById('alertSound');

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

// Symptom Checker
form.addEventListener('submit', function(e) {
  e.preventDefault();

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
});
