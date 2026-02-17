const questions = [
  {
    question: "Apa kepanjangan CBP?",
    options: [
      "Cinta Bangga Paham",
      "Cerdas Bangga Pintar",
      "Cinta Bangga Pakai",
      "Cerdas Bangga Pakai",
    ],
    answer: 0,
  },
  {
    question: "Siapa yang berwenang mencetak Rupiah?",
    options: ["Kementerian Keuangan", "Bank Indonesia", "OJK", "BPK"],
    answer: 1,
  },
  {
    question: "Apa tujuan gerakan CBP Rupiah?",
    options: [
      "Mengganti Rupiah",
      "Menumbuhkan nasionalisme terhadap Rupiah",
      "Menaikkan pajak",
      "Menghapus uang tunai",
    ],
    answer: 1,
  },
  {
    question: "Rupiah merupakan alat pembayaran yang sah di?",
    options: ["Asia Tenggara", "Indonesia", "ASEAN", "Dunia"],
    answer: 1,
  },
  {
    question: "Siapa Gubernur Bank Indonesia saat ini?",
    options: ["Sri Mulyani", "Perry Warjiyo", "Mahfud MD", "Erick Thohir"],
    answer: 1,
  },
];

let countdown;
let time = 7;

function loadQuestion() {
  clearInterval(countdown);
  time = 7;
  document.getElementById("timeLeft").innerText = time;

  const randomIndex = Math.floor(Math.random() * questions.length);
  const q = questions[randomIndex];

  document.getElementById("question").innerText = q.question;
  const optionsDiv = document.getElementById("options");
  optionsDiv.innerHTML = "";

  q.options.forEach((opt, index) => {
    const btn = document.createElement("button");
    btn.className = "option-btn";
    btn.innerText = opt;
    btn.onclick = () => checkAnswer(index, q.answer);
    optionsDiv.appendChild(btn);
  });

  countdown = setInterval(() => {
    time--;
    document.getElementById("timeLeft").innerText = time;

    if (time <= 0) {
      clearInterval(countdown);
      showTimeUp();
    }
  }, 1000);
}

function checkAnswer(selected, correct) {
  clearInterval(countdown);

  const popup = document.getElementById("popup");
  const icon = document.getElementById("popupIcon");
  const text = document.getElementById("popupText");

  popup.style.display = "flex";

  if (selected === correct) {
    icon.innerHTML = `<div class="success-icon">✓</div>`;
    text.innerText = "Jawaban Benar!";
  } else {
    icon.innerHTML = `<div class="error-icon">✕</div>`;
    text.innerText = "Jawaban Salah!";
  }
}

function showTimeUp() {
  const popup = document.getElementById("popup");
  const icon = document.getElementById("popupIcon");
  const text = document.getElementById("popupText");

  popup.style.display = "flex";
  icon.innerHTML = `<div class="error-icon">⏰</div>`;
  text.innerText = "Waktu Habis!";
}

loadQuestion();
