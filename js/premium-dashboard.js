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