/* Lesson 2 Dynamic Quiz Engine - Strict 3/3 Passing Logic */

const questionPool = [
    {
        question: "What is the primary purpose of a Motor Carrier Authority (MC Number) issued by the FMCSA?",
        options: [
            { text: "To authorize a carrier to transport regulated commodities across state lines", correct: true },
            { text: "To register a commercial vehicle for state fuel tax permits (IFTA)", correct: false },
            { text: "To serve as the carrier's tax identification number with the IRS", correct: false }
        ],
        explanation: "An MC Number (Motor Carrier authority) grants interstate operating authority to transport regulated goods across state lines."
    },
    {
        question: "What minimum level of Auto Liability Insurance is standard and required by most brokers for general freight carriers?",
        options: [
            { text: "$100,000", correct: false },
            { text: "$1,000,000", correct: true },
            { text: "$50,000", correct: false }
        ],
        explanation: "Brokers and shippers universally require a minimum of $1,000,000 in public auto liability insurance before tendering loads."
    },
    {
        question: "What document does a broker issue to a carrier that acts as the official binding contract for a specific load movement?",
        options: [
            { text: "Dispatcher-Carrier Agreement", correct: false },
            { text: "Rate Confirmation", correct: true },
            { text: "Bill of Lading (BOL)", correct: false }
        ],
        explanation: "The Rate Confirmation details the agreed rate, pickup/delivery locations, reference numbers, and load-specific terms."
    },
    {
        question: "What does Cargo Insurance primarily protect against during transit?",
        options: [
            { text: "Mechanical failure or engine breakdown of the semi-truck", correct: false },
            { text: "Physical damage, theft, or destruction of the cargo being hauled", correct: true },
            { text: "Injuries sustained by the driver during loading operations", correct: false }
        ],
        explanation: "Cargo insurance covers loss or damage to the freight itself while it is in the custody and transit of the motor carrier."
    },
    {
        question: "Why must dispatchers verify a carrier's W-9 and Notice of Assignment (NOA) before booking loads?",
        options: [
            { text: "To ensure factoring company payment remittances go to the correct authorized account", correct: true },
            { text: "To report the driver's weekly hours of service directly to the IRS", correct: false },
            { text: "To apply for state fuel tax refunds on behalf of the carrier", correct: false }
        ],
        explanation: "The Notice of Assignment (NOA) legally directs where broker payouts must be sent when a carrier utilizes a factoring company."
    }
];

let activeQuestions = [];
let currentAnswers = {};
const PASSING_SCORE = 3; // Strict 3/3 requirement

document.addEventListener("DOMContentLoaded", () => {
    initQuiz();

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
        banner.innerHTML = `<i class="fa-solid fa-trophy"></i> <strong>Perfect Score! Passed (3/3)</strong>. Lesson 3 is now unlocked!`;
        nextBtn.style.display = "inline-flex";
        retakeBtn.style.display = "none";
    } else {
        banner.className = "status-banner fail-banner";
        banner.innerHTML = `<i class="fa-solid fa-lock"></i> <strong>Quiz Failed (${finalScore}/3)</strong>. You need a perfect 3/3 score to unlock Lesson 3. Please retake the quiz with a fresh set of questions.`;
        nextBtn.style.display = "none";
        retakeBtn.style.display = "inline-flex";
    }
}

function retakeQuiz() {
    initQuiz();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}