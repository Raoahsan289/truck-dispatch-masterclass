const ADMIN_TESTERS = ["raoahsan289@gmail.com"];

document.addEventListener("DOMContentLoaded", () => {
    const masterclassBtn = document.getElementById("masterclass-btn");
    if (!masterclassBtn) return;

    masterclassBtn.addEventListener("click", async (event) => {
        event.preventDefault();

        try {
            const { data: { user } } = await supabase.auth.getUser();

            if (user && ADMIN_TESTERS.includes(user.email)) {
                window.location.href = "premium/premium-dashboard.html";
                return;
            }
        } catch (err) {
            console.error("Auth check failed:", err);
        }

        // Everyone else goes to the locked Coming Soon page
        window.location.href = "coming-soon.html";
    });
});