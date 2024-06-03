const navTop = document.querySelector(".nav-top");

var navHeader = document.querySelector(".nav-header");
window.addEventListener("scroll", fixedMenu);

var temp;
function fixedMenu() {
    temp = navTop.getBoundingClientRect().top + navTop.getBoundingClientRect().height;
    if (temp <= 0) {
        navHeader.style.position = "fixed";
        navHeader.style.top = "0px";
    } else {
        navHeader.style.position = "static";
        navHeader.style.top = "auto";
    }
}