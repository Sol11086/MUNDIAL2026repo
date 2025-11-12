let currentQuestion = 0;
let score = 0;
let currentCountry = "";
let questions = [];

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const resultEl = document.getElementById("result");
const nextBtn = document.getElementById("next-btn");
const titleEl = document.getElementById("country-title");

function iniciarTrivia(pais) {
  currentCountry = pais;
  currentQuestion = 0;
  score = 0;

  if (!triviaData[pais]) {
    console.error("País no encontrado en triviaData:", pais);
    return;
  }

  titleEl.textContent = `Trivia de ${triviaData[pais].nombre}`;
  questions = triviaData[pais].preguntas;

  loadQuestion();
}

function loadQuestion() {
  const q = questions[currentQuestion];
  questionEl.textContent = q.q;
  optionsEl.innerHTML = "";
  resultEl.textContent = "";

  q.opciones.forEach((opcion, index) => {
    const btn = document.createElement("button");
    btn.classList.add("btn", "btn-outline-dark", "w-100", "py-2", "option-btn" );
    btn.textContent = opcion;
    btn.onclick = () => checkAnswer(index);
    optionsEl.appendChild(btn);
  });
}

function checkAnswer(index) {
  const correcta = questions[currentQuestion].correcta;
  const buttons = document.querySelectorAll(".option-btn");

  buttons.forEach((btn, i) => {
    btn.disabled = true;
    if (i === correcta) {
      btn.classList.replace("btn-outline-dark", "btn-success");
    } else if (i === index) {
      btn.classList.replace("btn-outline-dark", "btn-danger");
    }
  });

  if (index === correcta) {
    score++;
    resultEl.textContent = "✅ ¡Correcto!";
    resultEl.style.color = "black";
  } else {
    resultEl.textContent = `❌ Incorrecto. Respuesta: ${questions[currentQuestion].opciones[correcta]}`;
    resultEl.style.color = "black";
  }
}

nextBtn.onclick = () => {
  currentQuestion++;
  if (currentQuestion < questions.length) {
    loadQuestion();
  } else {
    mostrarResultadoFinal();
  }
};

function mostrarResultadoFinal() {
  questionEl.textContent = "¡Trivia finalizada!";
  questionEl.style.color = "black";
  optionsEl.innerHTML = `<p class="fs-4 text-center text-black">Puntuación: ${score}/${questions.length}</p>`;
  optionsEl.style.color = "black";
  nextBtn.style.display = "none";
}
