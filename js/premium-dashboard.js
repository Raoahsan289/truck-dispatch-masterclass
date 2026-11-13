const ALLOWED_PREMIUM_EMAILS = [
    "raoahsan289@gmail.com"
];

async function enforcePremiumAccess() {
    const client = window.supabaseClient || window.supabase;
    if (!client || !client.auth) {
        alert("Dashboard Error: supabase-config.js did not load on this page.");
        window.location.href = "../coming-soon.html";
        return false;
    }

    const { data: { session } } = await client.auth.getSession();
    const userEmail = session?.user?.email?.toLowerCase().trim();

    if (!userEmail) {
        alert("Dashboard Guard: You are not logged in. Redirecting to login...");
        window.location.href = "../signup.html";
        return false;
    }

    if (!ALLOWED_PREMIUM_EMAILS.includes(userEmail)) {
        alert("Dashboard Guard: " + userEmail + " is not in the allowed list.");
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