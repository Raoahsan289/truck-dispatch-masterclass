document.addEventListener("DOMContentLoaded", async () => {
    if (typeof supabaseClient === 'undefined') return;

    try {
        const { data: { session } } = await supabaseClient.auth.getSession();

        const loginBtn = document.getElementById("login-btn");
        const dashboardBtn = document.getElementById("dashboard-btn");
        const logoutBtn = document.getElementById("logout-btn");
        const freeCourseBtn = document.getElementById("free-course-btn");

        if (session) {
            // User IS logged in: hide Login, show Dashboard & Logout
            if (loginBtn) loginBtn.style.display = "none";
            if (dashboardBtn) dashboardBtn.style.display = "inline-block";
            if (logoutBtn) logoutBtn.style.display = "inline-block";
            
            // Redirect "Free Course" button straight to dashboard when logged in
            if (freeCourseBtn) {
                freeCourseBtn.href = "free/dashboard.html";
            }
        } else {
            // User is NOT logged in: show Login, hide Dashboard & Logout
            if (loginBtn) loginBtn.style.display = "inline-block";
            if (dashboardBtn) dashboardBtn.style.display = "none";
            if (logoutBtn) logoutBtn.style.display = "none";
            
            // Keep default link for non-logged-in users
            if (freeCourseBtn) {
                freeCourseBtn.href = "signup.html";
            }
        }

        // Handle Logout click cleanly
        if (logoutBtn) {
            logoutBtn.addEventListener("click", async () => {
                await supabaseClient.auth.signOut();
                window.location.href = "index.html";
            });
        }
    } catch (err) {
        console.error("Session check error:", err);
    }
});
if (dashboardBtn) {
    dashboardBtn.addEventListener("click", (e) => {
        e.preventDefault();
        window.location.href = dashboardBtn.getAttribute("href") || "free/dashboard.html";
    });
}