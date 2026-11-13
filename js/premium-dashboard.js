const ALLOWED_PREMIUM_EMAILS = [
    "raoahsan289@gmail.com"
];

async function enforcePremiumAccess() {
    const client = window.supabaseClient || window.supabase;
    if (!client || !client.auth) {
        window.location.href = "../coming-soon.html";
        return;
    }

    const { data: { session } } = await client.auth.getSession();
    const userEmail = session?.user?.email?.toLowerCase().trim();

    if (!userEmail) {
        // Not logged in -> Redirect to login/signup page
        window.location.href = "../signup.html";
        return;
    }

    if (!ALLOWED_PREMIUM_EMAILS.includes(userEmail)) {
        // Logged in with a non-whitelisted Gmail -> Redirect to locked page
        window.location.href = "../coming-soon.html";
    }
}

enforcePremiumAccess();
/**
 * VIP Premium Dashboard Logic
 * Manages 16-lesson progress tracking and lesson accessibility
 */

document.addEventListener('DOMContentLoaded', () => {
    console.log('VIP 16-Lesson Dashboard Initialized.');
    loadUserProgressStats();
});

async function loadUserProgressStats() {
    if (typeof supabase !== 'undefined') {
        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                const { data, error } = await supabase
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