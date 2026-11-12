// Tab Switching and Sidebar Outline Synchronization
function switchTab(evt, tabId) {
    const sections = document.querySelectorAll('.tab-section');
    sections.forEach(section => section.classList.remove('active-section'));

    const buttons = document.querySelectorAll('.tab-btn');
    buttons.forEach(btn => btn.classList.remove('active'));

    const sidebarLinks = document.querySelectorAll('.sidebar .nav-link');
    sidebarLinks.forEach(link => link.classList.remove('active'));

    const activeSection = document.getElementById(tabId);
    if (activeSection) {
        activeSection.classList.add('active-section');
    }

    if (evt && evt.currentTarget) {
        evt.currentTarget.classList.add('active');
    }

    const matchingSidebarLink = document.querySelector(`.sidebar .nav-link[href="#${tabId}"]`);
    if (matchingSidebarLink) {
        matchingSidebarLink.classList.add('active');
    }
}

function scrollToSection(evt, tabId) {
    evt.preventDefault();
    switchTab(null, tabId);
    
    const matchingTabBtn = document.querySelector(`.tab-btn[onclick*="${tabId}"]`);
    if (matchingTabBtn) {
        const buttons = document.querySelectorAll('.tab-btn');
        buttons.forEach(btn => btn.classList.remove('active'));
        matchingTabBtn.classList.add('active');
    }
}

// Knowledge Check Quiz Submission & Validation
function submitQuiz() {
    const q1 = document.querySelector('input[name="q1"]:checked');
    const q2 = document.querySelector('input[name="q2"]:checked');
    const q3 = document.querySelector('input[name="q3"]:checked');
    const res = document.getElementById('quizResult');

    if (!q1 || !q2 || !q3) {
        res.style.color = "#fbbf24";
        res.textContent = "⚠️ Please answer all questions before submitting.";
        return;
    }

    if (q1.value === 'correct' && q2.value === 'correct' && q3.value === 'correct') {
        res.style.color = "#22c55e";
        res.textContent = "🎉 Outstanding! 100% correct. You have mastered Lesson 1: US Freight Ecosystem Overview!";
    } else {
        res.style.color = "#ef4444";
        res.textContent = "❌ Some answers are incorrect. Review the lesson tabs above and try again.";
    }
}

// Global Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    const backBtn = document.getElementById('backToDashboardBtn');
    if (backBtn) {
        backBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const userType = localStorage.getItem('userType');
            if (userType === 'free') {
                window.location.href = '../free-dashboard.html';
            } else {
                window.location.href = 'premium-dashboard.html';
            }
        });
    }
});