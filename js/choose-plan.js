const ADMIN_TESTERS = [
    "raoahsan289@gmail.com"
];

document.addEventListener("DOMContentLoaded", () => {
    const masterclassBtn = document.getElementById("masterclass-btn");
    if (!masterclassBtn) return;

    masterclassBtn.addEventListener("click", async (event) => {
        event.preventDefault();

        const client = window.supabaseClient || window.supabase;

        if (!client || !client.auth) {
            alert("Step 1 Fail: Supabase config did not load.");
            return;
        }

        try {
            const { data: { session } } = await client.auth.getSession();
            const userEmail = session?.user?.email?.toLowerCase().trim();

            if (!userEmail) {
                alert("Step 2 Fail: You are NOT logged in on this phone. Please log in first!");
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

        window.location.href = "coming-soon.html";
    });
});