/* Lesson 1 Dynamic Quiz Engine - Strict 3/3 Passing Logic */

const questionPool = [
    {
        question: "Who does an Independent Truck Dispatcher primarily represent in freight negotiations?",
        options: [
            { text: "The Shipper", correct: false },
            { text: "The Motor Carrier (Trucker)", correct: true },
            { text: "The Freight Receiver", correct: false }
        ],
        explanation: "Independent dispatchers represent motor carriers to help them secure profitable load rates and handle back-office operations."
    },
    {
        question: "What is the FMCSA Hours of Service (HOS) daily driving time limit for property-carrying drivers?",
        options: [
            { text: "11 Hours within a 14-hour window", correct: true },
            { text: "14 Hours continuous driving time", correct: false },
            { text: "8 Hours maximum driving time", correct: false }
        ],
        explanation: "Commercial motor drivers are restricted to a maximum of 11 hours of driving after 10 consecutive hours off duty."
    },
    {
        question: "Why do drivers rely on dispatchers for booking spot market loads?",
        options: [
            { text: "Drivers are legally prohibited from viewing load boards", correct: false },
            { text: "High-paying spot loads book in 60-90 seconds and calling while driving is unsafe", correct: true },
            { text: "Freight brokers only issue rate confirmations to dispatchers", correct: false }
        ],
        explanation: "Speed-to-book is critical, and searching/calling brokers while driving down the highway poses safety and legal risks."
    },
    {
        question: "What primary operational document outlines the fee structure and relationship between dispatcher and carrier?",
        options: [
            { text: "Rate Confirmation", correct: false },
            { text: "Dispatcher-Carrier Agreement", correct: true },
            { text: "Certificate of Insurance", correct: false }
        ],
        explanation: "The Dispatcher-Carrier Agreement legally defines your fee percentage (5%-10%) and administrative scope of work."
    },
    {
        question: "What is the core function of a Freight Broker compared to an Independent Dispatcher?",
        options: [
            { text: "Brokers represent shippers to find truck capacity", correct: true },
            { text: "Brokers own and operate their own truck fleets", correct: false },
            { text: "Brokers manage driver safety logs and fuel taxes", correct: false }
        ],
        explanation: "Freight Brokers connect Shippers seeking shipping capacity with Carriers/Dispatchers offering available trucks."
    }
];

let activeQuestions = [];
let currentAnswers = {};
const PASSING_SCORE = 3; // Strict 3/3 requirement

document.addEventListener("DOMContentLoaded", () => {
    initQuiz();

    // Attach listener for retake button
    const retakeBtn = document.getElementById("retake-btn");
    if (retakeBtn) {
        retakeBtn.addEventListener("click", retakeQuiz);
    }
});

function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
}

function initQuiz() {
    currentAnswers = {};
    document.getElementById("live-score").innerText = `0 / 3`;
    document.getElementById("next-lesson-btn").style.display = "none";
    document.getElementById("retake-btn").style.display = "none";
    document.getElementById("quiz-status-banner").style.display = "none";

    // Randomize 3 questions from pool
    const shuffledPool = shuffleArray([...questionPool]);
    activeQuestions = shuffledPool.slice(0, 3);

    renderQuestions();
}

function renderQuestions() {
    const container = document.getElementById("quiz-questions-container");
    container.innerHTML = "";

    activeQuestions.forEach((q, index) => {
        const shuffledOptions = shuffleArray([...q.options]);

        const card = document.createElement("div");
        card.className = "question-card";
        
        const h3 = document.createElement("h3");
        h3.className = "question-text";
        h3.innerText = `${index + 1}. ${q.question}`;
        card.appendChild(h3);

        const grid = document.createElement("div");
        grid.className = "options-grid";

        shuffledOptions.forEach((opt) => {
            const btn = document.createElement("button");
            btn.className = "option-btn";
            btn.innerHTML = `<i class="fa-regular fa-circle"></i> ${opt.text}`;
            btn.addEventListener("click", () => handleOptionSelect(index, opt.correct, btn));
            grid.appendChild(btn);
        });

        card.appendChild(grid);

        const expBox = document.createElement("div");
        expBox.id = `exp-${index}`;
        expBox.className = "explanation-box";
        expBox.innerHTML = `<strong>Explanation:</strong> ${q.explanation}`;
        card.appendChild(expBox);

        container.appendChild(card);
    });
}

function handleOptionSelect(qIndex, isCorrect, btn) {
    if (currentAnswers[qIndex] !== undefined) return;

    currentAnswers[qIndex] = isCorrect;

    const parentGrid = btn.parentElement;
    const buttons = parentGrid.querySelectorAll(".option-btn");
    buttons.forEach(b => b.style.pointerEvents = "none");

    if (isCorrect) {
        btn.classList.add("correct");
        btn.querySelector("i").className = "fa-solid fa-circle-check";
    } else {
        btn.classList.add("wrong");
        btn.querySelector("i").className = "fa-solid fa-circle-xmark";
    }

    const expBox = document.getElementById(`exp-${qIndex}`);
    if (expBox) expBox.style.display = "block";

    const scoreCount = Object.values(currentAnswers).filter(Boolean).length;
    document.getElementById("live-score").innerText = `${scoreCount} / ${activeQuestions.length}`;

    if (Object.keys(currentAnswers).length === activeQuestions.length) {
        evaluateQuizResult(scoreCount);
    }
}

function evaluateQuizResult(finalScore) {
    const banner = document.getElementById("quiz-status-banner");
    const nextBtn = document.getElementById("next-lesson-btn");
    const retakeBtn = document.getElementById("retake-btn");

    banner.style.display = "flex";

    if (finalScore >= PASSING_SCORE) {
        banner.className = "status-banner pass-banner";
        banner.innerHTML = `<i class="fa-solid fa-trophy"></i> <strong>Perfect Score! Passed (3/3)</strong>. Lesson 2 is now unlocked!`;
        nextBtn.style.display = "inline-flex";
        retakeBtn.style.display = "none";
    } else {
        banner.className = "status-banner fail-banner";
        banner.innerHTML = `<i class="fa-solid fa-lock"></i> <strong>Quiz Failed (${finalScore}/3)</strong>. You need a perfect 3/3 score to unlock Lesson 2. Please retake the quiz with a fresh set of questions.`;
        nextBtn.style.display = "none";
        retakeBtn.style.display = "inline-flex";
    }
}

function retakeQuiz() {
    initQuiz();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}