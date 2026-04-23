"use strict";

// NEW QUIZ DATA - completely different questions about ICT
const quizData = [
  {
    question: "Which technology enables autonomous vehicles to communicate with nearby infrastructure in real-time?",
    options: ["LiDAR", "V2X (Vehicle-to-Everything)", "GPS", "HD Maps"],
    correct: 1,
    explanation: "V2X communication allows vehicles to exchange data with traffic lights, road signs, and other vehicles for safer autonomous navigation."
  },
  {
    question: "What is the primary advantage of edge computing compared to cloud computing?",
    options: ["Higher storage capacity", "Lower latency", "Cheaper hardware", "Easier backup"],
    correct: 1,
    explanation: "Edge computing processes data closer to the source, significantly reducing latency for time-sensitive applications."
  },
  {
    question: "Which protocol is specifically designed for low-power wide-area IoT networks?",
    options: ["Wi-Fi 6", "Bluetooth 5.0", "LoRaWAN", "Z-Wave"],
    correct: 2,
    explanation: "LoRaWAN is optimized for long-range, low-power communication ideal for IoT sensors in agriculture and smart cities."
  },
  {
    question: "What does 'homomorphic encryption' allow computation on?",
    options: ["Decrypted data only", "Encrypted data without decryption", "Compressed data", "Anonymized data"],
    correct: 1,
    explanation: "Homomorphic encryption enables computations on encrypted data, preserving privacy while allowing analysis."
  },
  {
    question: "Which company developed the Transformer neural network architecture?",
    options: ["OpenAI", "DeepMind", "Google Brain", "Meta AI"],
    correct: 2,
    explanation: "Google Brain introduced the Transformer architecture in 2017's 'Attention Is All You Need' paper."
  },
  {
    question: "What is the maximum theoretical speed of Wi-Fi 7 (802.11be)?",
    options: ["9.6 Gbps", "20 Gbps", "40 Gbps", "46 Gbps"],
    correct: 3,
    explanation: "Wi-Fi 7 can theoretically achieve up to 46 Gbps using 320 MHz channels and 4096-QAM modulation."
  },
  {
    question: "Which consensus mechanism is used by Ethereum after The Merge?",
    options: ["Proof of Work (PoW)", "Proof of Stake (PoS)", "Delegated Proof of Stake (DPoS)", "Proof of Authority (PoA)"],
    correct: 1,
    explanation: "Ethereum transitioned from Proof of Work to Proof of Stake in September 2022, reducing energy consumption by 99.9%."
  },
  {
    question: "What does 'quantum supremacy' refer to?",
    options: ["Faster quantum internet", "Quantum computer solving a problem classical computers cannot", "Unbreakable quantum encryption", "Quantum cloud computing"],
    correct: 1,
    explanation: "Quantum supremacy is achieved when a quantum computer performs a calculation that is infeasible for classical supercomputers."
  },
  {
    question: "Which programming language is most commonly used for statistical computing and data analysis?",
    options: ["Java", "C++", "Python", "R"],
    correct: 3,
    explanation: "R is specifically designed for statistical analysis, while Python is also popular for data science."
  },
  {
    question: "What is 'model drift' in machine learning?",
    options: ["Faster training time", "Decreased model accuracy over time due to changing data patterns", "Model size reduction", "Increased prediction speed"],
    correct: 1,
    explanation: "Model drift occurs when real-world data patterns change, causing a deployed ML model's performance to degrade over time."
  }
];

// DOM Elements
const quizContainer = document.getElementById("quizContainer");
const quizCounter = document.getElementById("quizCounter");
const quizScore = document.getElementById("quizScore");
const quizQuestion = document.getElementById("quizQuestion");
const quizOptions = document.getElementById("quizOptions");
const quizFeedback = document.getElementById("quizFeedback");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const quizResults = document.getElementById("quizResults");
const restartBtn = document.getElementById("restartBtn");

// Quiz State
let currentQuestion = 0;
let userAnswers = new Array(quizData.length).fill(null);
let score = 0;
let quizActive = true;

// Initialize Quiz
function initQuiz() {
  currentQuestion = 0;
  userAnswers.fill(null);
  score = 0;
  quizActive = true;
  updateScoreDisplay();
  showQuestion();
  updateNavButtons();
  quizResults.style.display = "none";
  document.querySelector(".quiz-card").style.display = "block";
  quizFeedback.innerHTML = "";
  quizFeedback.className = "quiz-feedback";
}

function showQuestion() {
  const q = quizData[currentQuestion];
  quizQuestion.textContent = q.question;
  quizCounter.textContent = `Question ${currentQuestion + 1} / ${quizData.length}`;
  
  const selectedAnswer = userAnswers[currentQuestion];
  quizOptions.innerHTML = "";
  
  q.options.forEach((option, idx) => {
    const btn = document.createElement("button");
    btn.className = "quiz-option";
    if (selectedAnswer !== null) {
      if (idx === q.correct) btn.classList.add("correct");
      if (idx === selectedAnswer && idx !== q.correct) btn.classList.add("wrong");
      if (idx === selectedAnswer) btn.classList.add("selected");
    }
    btn.textContent = option;
    btn.onclick = () => selectAnswer(idx);
    quizOptions.appendChild(btn);
  });
  
  if (selectedAnswer !== null) {
    const isCorrect = selectedAnswer === q.correct;
    showFeedback(isCorrect);
  } else {
    quizFeedback.innerHTML = "";
    quizFeedback.className = "quiz-feedback";
  }
}

function selectAnswer(selectedIdx) {
  if (!quizActive) return;
  if (userAnswers[currentQuestion] !== null) return;
  
  const q = quizData[currentQuestion];
  const isCorrect = selectedIdx === q.correct;
  
  userAnswers[currentQuestion] = selectedIdx;
  if (isCorrect) score++;
  updateScoreDisplay();
  
  showQuestion();
  
  setTimeout(() => {
    if (currentQuestion < quizData.length - 1) {
      currentQuestion++;
      showQuestion();
      updateNavButtons();
    } else {
      finishQuiz();
    }
  }, 800);
}

function showFeedback(isCorrect) {
  const q = quizData[currentQuestion];
  if (isCorrect) {
    quizFeedback.innerHTML = `✓ Correct! ${q.explanation}`;
    quizFeedback.className = "quiz-feedback correct-feedback";
  } else {
    const correctAnswer = q.options[q.correct];
    quizFeedback.innerHTML = `✗ Incorrect. The correct answer is "${correctAnswer}". ${q.explanation}`;
    quizFeedback.className = "quiz-feedback wrong-feedback";
  }
}

function updateScoreDisplay() {
  quizScore.textContent = `Score: ${score}`;
}

function updateNavButtons() {
  prevBtn.disabled = currentQuestion === 0;
  if (currentQuestion === quizData.length - 1) {
    nextBtn.textContent = "Finish →";
  } else {
    nextBtn.textContent = "Next →";
  }
}

function nextQuestion() {
  if (!quizActive) return;
  if (userAnswers[currentQuestion] === null) {
    quizFeedback.innerHTML = "⚠ Please select an answer before proceeding.";
    quizFeedback.className = "quiz-feedback wrong-feedback";
    return;
  }
  if (currentQuestion < quizData.length - 1) {
    currentQuestion++;
    showQuestion();
    updateNavButtons();
  } else {
    finishQuiz();
  }
}

function prevQuestion() {
  if (currentQuestion > 0) {
    currentQuestion--;
    showQuestion();
    updateNavButtons();
  }
}

function finishQuiz() {
  quizActive = false;
  const percentage = (score / quizData.length) * 100;
  const resultsCard = document.querySelector(".quiz-card");
  resultsCard.style.display = "none";
  
  let message = "";
  let icon = "";
  if (percentage === 100) {
    message = "Perfect score! You're an ICT expert! 🎓";
    icon = "🏆";
  } else if (percentage >= 80) {
    message = "Excellent! Great understanding of modern ICT technologies! 🌟";
    icon = "🎉";
  } else if (percentage >= 60) {
    message = "Good job! Review the sections above to master all topics! 📚";
    icon = "👍";
  } else {
    message = "Keep learning! Explore the technology sections and try the quiz again! 💪";
    icon = "📖";
  }
  
  document.getElementById("resultsIcon").textContent = icon;
  document.getElementById("resultsTitle").textContent = "Quiz Complete!";
  document.getElementById("resultsScore").textContent = `Your Score: ${score}/${quizData.length}`;
  document.getElementById("resultsMessage").textContent = message;
  quizResults.style.display = "block";
}

function restartQuiz() {
  initQuiz();
}

// Event Listeners
nextBtn.addEventListener("click", nextQuestion);
prevBtn.addEventListener("click", prevQuestion);
restartBtn.addEventListener("click", restartQuiz);

// Custom cursor, progress bar, sidebar, scroll reveal, accordion, etc.
const cursor = document.getElementById("cursor");
const cursorFollower = document.getElementById("cursor-follower");
const progressBar = document.getElementById("progressBar");
const sidebar = document.getElementById("sidebar");
const hamburger = document.getElementById("hamburger");
const backToTop = document.getElementById("backToTop");
const navLinks = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll("section[id]");
const revealEls = document.querySelectorAll(".reveal");
const accordionBtns = document.querySelectorAll(".accordion-btn");

function initCursor() {
  if (window.matchMedia("(pointer: fine)").matches && window.innerWidth > 900) {
    let mouseX = 0, mouseY = 0, followerX = 0, followerY = 0;
    document.addEventListener("mousemove", (e) => {
      mouseX = e.clientX; mouseY = e.clientY;
      if (cursor) cursor.style.cssText = `left: ${mouseX}px; top: ${mouseY}px;`;
    });
    function animateFollower() {
      followerX += (mouseX - followerX) * 0.12;
      followerY += (mouseY - followerY) * 0.12;
      if (cursorFollower) cursorFollower.style.cssText = `left: ${followerX}px; top: ${followerY}px;`;
      requestAnimationFrame(animateFollower);
    }
    animateFollower();
    const hoverTargets = document.querySelectorAll("a, button, .tech-card, .bento-card, .cloud-tier, .accordion-btn, .quiz-option, .quiz-btn");
    hoverTargets.forEach(el => {
      el.addEventListener("mouseenter", () => { cursor?.classList.add("hover"); cursorFollower?.classList.add("hover"); });
      el.addEventListener("mouseleave", () => { cursor?.classList.remove("hover"); cursorFollower?.classList.remove("hover"); });
    });
  } else {
    if (cursor) cursor.style.display = "none";
    if (cursorFollower) cursorFollower.style.display = "none";
  }
}

function updateProgressBar() {
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = (window.scrollY / docHeight) * 100;
  if (progressBar) progressBar.style.width = progress + "%";
}
window.addEventListener("scroll", updateProgressBar);

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add("visible"); revealObserver.unobserve(entry.target); } });
}, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
revealEls.forEach(el => revealObserver.observe(el));

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute("id");
      navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${id}`) link.classList.add("active");
      });
    }
  });
}, { threshold: 0.35 });
sections.forEach(section => sectionObserver.observe(section));

accordionBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    const accordion = btn.closest(".accordion");
    if (accordion.classList.contains("open")) accordion.classList.remove("open");
    else { document.querySelectorAll(".accordion.open").forEach(open => open.classList.remove("open")); accordion.classList.add("open"); }
  });
});

hamburger?.addEventListener("click", () => { sidebar?.classList.toggle("open"); hamburger.classList.toggle("open"); });
navLinks.forEach(link => {
  link.addEventListener("click", () => { sidebar?.classList.remove("open"); hamburger?.classList.remove("open"); });
});
document.addEventListener("click", (e) => {
  if (sidebar?.classList.contains("open") && !sidebar.contains(e.target) && !hamburger?.contains(e.target)) {
    sidebar.classList.remove("open"); hamburger?.classList.remove("open");
  }
});

backToTop?.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

navLinks.forEach(link => {
  link.addEventListener("click", (e) => {
    if (link.getAttribute("href")?.startsWith("#")) {
      e.preventDefault();
      const targetId = link.getAttribute("href").slice(1);
      const targetEl = document.getElementById(targetId);
      if (targetEl) targetEl.scrollIntoView({ behavior: "smooth" });
    }
  });
});

const titleLines = document.querySelectorAll(".title-line");
titleLines.forEach((line, i) => {
  const text = line.textContent;
  line.innerHTML = `<span class="line-inner" style="display:inline-block; opacity:0; transform:translateY(60px); transition:opacity 0.9s cubic-bezier(0.16,1,0.3,1) ${0.2 + i * 0.15}s, transform 0.9s cubic-bezier(0.16,1,0.3,1) ${0.2 + i * 0.15}s;">${text}</span>`;
});
setTimeout(() => { document.querySelectorAll(".line-inner").forEach(el => { el.style.opacity = "1"; el.style.transform = "translateY(0)"; }); }, 100);

if (window.matchMedia("(min-width: 900px) and (pointer: fine)").matches) {
  const tiltCards = document.querySelectorAll(".tech-card, .bento-card");
  tiltCards.forEach(card => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const dx = (e.clientX - (rect.left + rect.width/2)) / (rect.width/2);
      const dy = (e.clientY - (rect.top + rect.height/2)) / (rect.height/2);
      card.style.transform = `translateY(-4px) rotateX(${dy * -4}deg) rotateY(${dx * 4}deg)`;
    });
    card.addEventListener("mouseleave", () => { card.style.transform = ""; });
  });
}

window.addEventListener("resize", () => {
  if (window.innerWidth <= 900) {
    if (cursor) cursor.style.display = "none";
    if (cursorFollower) cursorFollower.style.display = "none";
  } else if (window.matchMedia("(pointer: fine)").matches) {
    if (cursor) cursor.style.display = "block";
    if (cursorFollower) cursorFollower.style.display = "block";
  }
});

initCursor();
initQuiz();
