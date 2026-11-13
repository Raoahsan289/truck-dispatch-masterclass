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
            alert("System Notice: Authentication client failed to initialize.");
            window.location.href = "coming-soon.html";
            return;
        }

        const originalText = masterclassBtn.innerText;
        masterclassBtn.innerText = "Checking access...";

        try {
            // Speed up response by checking local session cache immediately
            const { data: { session } } = await client.auth.getSession();
            const userEmail = session?.user?.email?.toLowerCase().trim();

            if (!userEmail) {
                alert("Access Denied: You must be logged in to access the Full Masterclass. Redirecting to login...");
                window.location.href = "signup.html"; // Change to login.html if your login page differs
                return;
            }

            if (ADMIN_TESTERS.includes(userEmail)) {
                window.location.href = "premium/premium-dashboard.html";
                return;
            } else {
                alert("Access Restricted: " + userEmail + " is not authorized for the masterclass preview yet.");
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