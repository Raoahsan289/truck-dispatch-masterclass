const ADMIN_TESTERS = [
    "raoahsan289@gmail.com",
    "second-email@gmail.com"
];

document.addEventListener("DOMContentLoaded", () => {
    const masterclassBtn = document.getElementById("masterclass-btn");
    if (!masterclassBtn) return;

    masterclassBtn.addEventListener("click", async (event) => {
        event.preventDefault();

        // Safety check: if supabase client failed to load, go straight to coming soon
        if (typeof supabase === 'undefined' || !supabase.auth) {
            window.location.href = "coming-soon.html";
            return;
        }

        const originalText = masterclassBtn.innerText;
        masterclassBtn.innerText = "Checking access...";

        try {
            const { data: { session } } = await supabase.auth.getSession();
            const userEmail = session?.user?.email?.toLowerCase().trim();

            if (userEmail && ADMIN_TESTERS.includes(userEmail)) {
                window.location.href = "premium/premium-dashboard.html";
                return;
            }
        } catch (err) {
            console.error("Auth check failed:", err);
        }

        masterclassBtn.innerText = originalText;
        window.location.href = "coming-soon.html";
    });
});