/**
 * Truck Dispatch Masterclass - Dashboard Sync Engine
 */

document.addEventListener("DOMContentLoaded", async () => {
    await initDashboard();
});

async function initDashboard() {
    if (typeof supabaseClient === 'undefined') {
        console.error("Supabase client is not loaded.");
        return;
    }

    const { data: { session }, error: sessionError } = await supabaseClient.auth.getSession();

    if (sessionError || !session) {
        console.warn("No active session found. Redirecting to login...");
        window.location.href = "../login.html"; // Adjust path if login.html is in root
        return;
    }

    const userId = session.user.id;

    const { data, error } = await supabaseClient
        .from('user_progress')
        .select('completed_lessons')
        .eq('user_id', userId)
        .maybeSingle();

    if (error) {
        console.error("Error fetching user progress:", error.message);
        return;
    }

    const completedLessons = (data && data.completed_lessons) ? data.completed_lessons : [];

    // Always unlock Lesson 1 by default
    unlockLessonCard(1);

    // Unlock completed lessons and the next sequential lesson
    completedLessons.forEach(lessonId => {
        const match = lessonId.match(/\d+/);
        if (match) {
            const lessonNum = parseInt(match[0], 10);
            unlockLessonCard(lessonNum);
            if (lessonNum < 8) {
                unlockLessonCard(lessonNum + 1);
            }
        }
    });

    updateProgressBar(completedLessons.length);
}

/**
 * Saves a completed lesson to Supabase and unlocks the next lesson
 * Call this function from your lesson pages or complete buttons: markLessonComplete('lesson-1')
 */
async function markLessonComplete(lessonId) {
    if (typeof supabaseClient === 'undefined') return;

    const { data: { session } } = await supabaseClient.auth.getSession();
    if (!session) return;

    const userId = session.user.id;

    // Fetch current progress
    const { data, error } = await supabaseClient
        .from('user_progress')
        .select('completed_lessons')
        .eq('user_id', userId)
        .maybeSingle();

    let completed = (data && data.completed_lessons) ? data.completed_lessons : [];

    // Avoid duplicate entries
    if (!completed.includes(lessonId)) {
        completed.push(lessonId);

        // Update database
        const { error: updateError } = await supabaseClient
            .from('user_progress')
            .update({ completed_lessons: completed, updated_at: new Date() })
            .eq('user_id', userId);

        if (updateError) {
            console.error("Error saving progress:", updateError.message);
            alert("Error saving progress: " + updateError.message);
        } else {
            // Update UI immediately
            const match = lessonId.match(/\d+/);
            if (match) {
                const lessonNum = parseInt(match[0], 10);
                unlockLessonCard(lessonNum);
                if (lessonNum < 8) unlockLessonCard(lessonNum + 1);
            }
            updateProgressBar(completed.length);
        }
    }
}

function unlockLessonCard(lessonNum) {
    const card = document.getElementById(`card-lesson-${lessonNum}`) || document.getElementById(`lesson-card-${lessonNum}`);
    const btn = document.getElementById(`btn-lesson-${lessonNum}`) || document.getElementById(`lesson-btn-${lessonNum}`);

    if (card) {
        card.style.opacity = '1';
        card.style.pointerEvents = 'auto';
        card.classList.remove('locked');
    }

    if (btn) {
        btn.href = `lesson-${lessonNum}.html`;
        btn.innerText = "Start Lesson →";
        btn.style.background = "#2563eb";
        btn.style.color = "#ffffff";
        btn.style.pointerEvents = "auto";
        btn.style.cursor = "pointer";
    }
}

function updateProgressBar(completedCount) {
    const textElem = document.getElementById("progress-text") || document.getElementById("progress-status-text");
    const barElem = document.getElementById("progress-bar") || document.getElementById("progress-bar-fill");

    const percentage = Math.min(Math.round((completedCount / 8) * 100), 100);

    if (textElem) {
        textElem.innerText = `${completedCount} of 8 Free Lessons Completed (${percentage}%)`;
    }

    if (barElem) {
        barElem.style.width = `${percentage}%`;
    }
}
async function completeAndRedirect(lessonId, nextLessonUrl) {
    await markLessonComplete(lessonId);
    window.location.href = nextLessonUrl || "dashboard.html";
}