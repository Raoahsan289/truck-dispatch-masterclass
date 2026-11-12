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
            alert("Step 1 Fail: Supabase config did not load.");
            window.location.href = "coming-soon.html";
            return;
        }

        const originalText = masterclassBtn.innerText;
        masterclassBtn.innerText = "Checking access...";

        try {
            const { data: { session } } = await client.auth.getSession();
            const userEmail = session?.user?.email?.toLowerCase().trim();

            if (!userEmail) {
                alert("Step 2 Fail: You are NOT logged in on this browser. Please log in first!");
                masterclassBtn.innerText = originalText;
                window.location.href = "coming-soon.html";
                return;
            }

            if (ADMIN_TESTERS.includes(userEmail)) {
                window.location.href = "premium/premium-dashboard.html";
                return;
            } else {
                alert("Step 3 Fail: Logged in as " + userEmail + " (not in whitelist).");
            }
        } catch (err) {
            alert("Error: " + err.message);
        }

        masterclassBtn.innerText = originalText;
        window.location.href = "coming-soon.html";
    });
}

// Run immediately if DOM is ready, otherwise wait for it
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initPlanSelection);
} else {
    initPlanSelection();
}