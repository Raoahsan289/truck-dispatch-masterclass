const ADMIN_TESTERS = [
    "raoahsan289@gmail.com"
];

function initPlanSelection() {
    const masterclassBtn = document.getElementById("masterclass-btn");
    if (!masterclassBtn) return;

    masterclassBtn.addEventListener("click", async (event) => {
        event.preventDefault();

        const client = window.supabaseClient || window.supabase;
        if (!client || !client.auth) {
            window.location.href = "coming-soon.html";
            return;
        }

        const originalText = masterclassBtn.innerText;
        masterclassBtn.innerText = "Checking access...";

        try {
            const { data: { session } } = await client.auth.getSession();
            const userEmail = session?.user?.email?.toLowerCase().trim();

            if (!userEmail) {
                // Redirect logged-out users to login.html
                window.location.href = "login.html";
                return;
            }

            if (ADMIN_TESTERS.includes(userEmail)) {
                window.location.href = "premium/premium-dashboard.html";
                return;
            }
        } catch (err) {
            console.error("Auth check error:", err);
        }

        masterclassBtn.innerText = originalText;
        window.location.href = "coming-soon.html";
    });
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initPlanSelection);
} else {
    initPlanSelection();
}