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
  {
    question: "Apa peran utama Bank Indonesia?",
    options: [
      "Mengatur anggaran negara",
      "Menjaga kestabilan nilai Rupiah",
      "Menentukan pajak masyarakat",
      "Mengelola bantuan sosial"
    ],
    correct: 1
  },
  {
    question: "CBP Rupiah merupakan singkatan dari…",
    options: [
      "Cerdas, Bijak, Produktif",
      "Cinta, Bangga, dan Paham Rupiah",
      "Cermat, Belanja, Pakai Rupiah",
      "Cukup, Bijak, Punya Rupiah"
    ],
    correct: 1
  },
  {
    question: "Manakah perilaku yang mencerminkan Cinta Rupiah?",
    options: [
      "Melipat uang sampai lecek",
      "Mencoret uang kertas",
      "Menyimpan uang dengan rapi",
      "Meremas uang di saku"
    ],
    correct: 2
  },
  {
    question: "Menggunakan Rupiah sebagai alat pembayaran di Indonesia menunjukkan sikap…",
    options: [
      "Terpaksa karena aturan",
      "Ikut tren",
      "Bangga terhadap simbol kedaulatan negara",
      "Tidak punya pilihan"
    ],
    correct: 2
  },
  {
    question: "Manakah yang termasuk ciri keaslian uang Rupiah?",
    options: [
      "Warna mudah pudar",
      "Kertas sangat tipis",
      "Ada unsur pengaman (watermark/benang)",
      "Mudah sobek"
    ],
    correct: 2
  },
  {
    question: "Lembaga yang berwenang mengedarkan uang Rupiah adalah…",
    options: [
      "Kementerian Keuangan",
      "Bank Indonesia",
      "Bank umum",
      "Otoritas Jasa Keuangan"
    ],
    correct: 1
  },
  {
    question: "Tujuan utama program CBP Rupiah adalah…",
    options: [
      "Menggantikan mata uang nasional",
      "Meningkatkan kebanggaan dan pemahaman masyarakat terhadap Rupiah",
      "Membatasi penggunaan uang tunai",
      "Mengurangi peredaran uang"
    ],
    correct: 1
  },
  {
    question: "Manakah yang TIDAK mencerminkan CBP Rupiah?",
    options: [
      "Menggunakan Rupiah dalam transaksi",
      "Menyimpan uang dengan rapi",
      "Merusak uang kertas",
      "Mengenali ciri uang asli"
    ],
    correct: 2
  }

];

let countdown;
let time = 7;

const soundCorrect = new Audio("assets/audio/correct.mp3");
const soundWrong = new Audio("assets/audio/wrong.mp3");
const soundTimeUp = new Audio("assets/audio/timeout.mp3");

function startCountdown() {
  const overlay = document.getElementById("countdownOverlay");
  const numberEl = document.getElementById("countdownNumber");

  let count = 3;
  numberEl.innerText = count;

  const interval = setInterval(() => {
    count--;

    if (count > 0) {
      numberEl.innerText = count;
      numberEl.style.animation = "none";
      void numberEl.offsetWidth; // restart animation
      numberEl.style.animation = "zoom 0.8s ease";
    } else {
      clearInterval(interval);
      overlay.style.display = "none";
      loadQuestion(); // mulai soal setelah countdown
    }
  }, 1000);
}

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
    soundCorrect.play();
    icon.innerHTML = `<div class="success-icon">✓</div>`;
    text.innerText = "Jawaban Benar!";
  } else {
    soundWrong.play();
    icon.innerHTML = `<div class="error-icon">✕</div>`;
    text.innerText = "Jawaban Salah!";
  }
}

function showTimeUp() {
  const popup = document.getElementById("popup");
  const icon = document.getElementById("popupIcon");
  const text = document.getElementById("popupText");

  soundTimeUp.play();

  popup.style.display = "flex";
  icon.innerHTML = `<div class="error-icon">⏰</div>`;
  text.innerText = "Waktu Habis!";
}

startCountdown();
