/* Intro Dispatching Interactive Script */
function switchTab(evt, tabName) {
    var i, tabSection, tabBtn;
    
    tabSection = document.getElementsByClassName("tab-section");
    for (i = 0; i < tabSection.length; i++) {
        tabSection[i].classList.remove("active-section");
    }
    
    tabBtn = document.getElementsByClassName("tab-btn");
    for (i = 0; i < tabBtn.length; i++) {
        tabBtn[i].classList.remove("active");
    }
    
    var targetTab = document.getElementById(tabName);
    if (targetTab) {
        targetTab.classList.add("active-section");
    }
    
    if (evt && evt.currentTarget) {
        evt.currentTarget.classList.add("active");
    }
}