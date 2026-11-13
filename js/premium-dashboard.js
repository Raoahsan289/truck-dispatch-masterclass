const ALLOWED_PREMIUM_EMAILS = [
    "raoahsan289@gmail.com"
];

async function enforcePremiumAccess() {
    const client = window.supabaseClient || window.supabase;
    if (!client || !client.auth) {
        window.location.href = "../coming-soon.html";
        return false;
    }

    const { data: { session } } = await client.auth.getSession();
    const userEmail = session?.user?.email?.toLowerCase().trim();

    if (!userEmail) {
        // Redirect logged-out users to login.html from the premium subfolder
        window.location.href = "../login.html";
        return false;
    }

    if (!ALLOWED_PREMIUM_EMAILS.includes(userEmail)) {
        window.location.href = "../coming-soon.html";
        return false;
    }

    return true;
}

/**
 * VIP Premium Dashboard Logic
 * Manages 16-lesson progress tracking and lesson accessibility
 */
async function initPremiumDashboard() {
    const hasAccess = await enforcePremiumAccess();
    if (!hasAccess) return;

    console.log('VIP 16-Lesson Dashboard Initialized.');
    loadUserProgressStats();
}

async function loadUserProgressStats() {
    const client = window.supabaseClient || window.supabase;
    if (client && client.auth) {
        try {
            const { data: { user } } = await client.auth.getUser();
            if (user) {
                const { data, error } = await client
                    .from('user_progress')
                    .select('*')
                    .eq('user_id', user.id);

                if (!error && data) {
                    console.log('User Progress Loaded:', data.length);
                }
            }
        } catch (err) {
            console.error('Error loading progress:', err);
        }
    }
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initPremiumDashboard);
} else {
    initPremiumDashboard();
}