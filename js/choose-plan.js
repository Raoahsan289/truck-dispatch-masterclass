function initPlanSelection() {
    const masterclassBtn = document.getElementById("masterclass-btn");
    if (!masterclassBtn) return;

    masterclassBtn.addEventListener("click", (event) => {
        event.preventDefault();
        window.location.href = "premium/premium-dashboard.html";
    });
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initPlanSelection);
} else {
    initPlanSelection();
}
