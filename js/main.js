document.addEventListener("DOMContentLoaded", async () => {
  const dashboardBtn = document.getElementById("dashboard-btn");
  const loginBtn = document.getElementById("login-btn");
  const logoutBtn = document.getElementById("logout-btn");

  try {
    // Check Supabase session if initialized (using your supabase config)
    if (typeof supabase !== 'undefined' && supabase.auth) {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session) {
        if (dashboardBtn) dashboardBtn.style.display = "inline-block";
        if (loginBtn) loginBtn.style.display = "none";
        if (logoutBtn) logoutBtn.style.display = "inline-block";
      } else {
        if (dashboardBtn) dashboardBtn.style.display = "none";
        if (loginBtn) loginBtn.style.display = "inline-block";
        if (logoutBtn) logoutBtn.style.display = "none";
      }
    } 
    // Fallback localStorage check
    else if (localStorage.getItem("isLoggedIn") === "true" || localStorage.getItem("sb-access-token")) {
      if (dashboardBtn) dashboardBtn.style.display = "inline-block";
      if (loginBtn) loginBtn.style.display = "none";
      if (logoutBtn) logoutBtn.style.display = "inline-block";
    }

    // Handle Logout click
    if (logoutBtn) {
      logoutBtn.addEventListener("click", async () => {
        if (typeof supabase !== 'undefined' && supabase.auth) {
          await supabase.auth.signOut();
        }
        localStorage.removeItem("isLoggedIn");
        window.location.href = "../login.html"; // Adjust path if needed based on folder depth
      });
    }
  } catch (error) {
    console.error("Auth state check error:", error);
  }
});