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

            // 1. Not logged in -> Send to login page first
            if (!userEmail) {
                window.location.href = "signup.html";
                return;
            }

            // 2. Whitelisted Gmail -> Unlock dashboard
            if (ADMIN_TESTERS.includes(userEmail)) {
                window.location.href = "premium/premium-dashboard.html";
                return;
            }

            // 3. Any other Gmail -> Send to locked page
            window.location.href = "coming-soon.html";
        } catch (err) {
            masterclassBtn.innerText = originalText;
            window.location.href = "coming-soon.html";
        }
    });
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initPlanSelection);
} else {
    initPlanSelection();
}