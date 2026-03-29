const html = document.documentElement;
const themeButton = document.getElementById("themeBtn");

function syncThemeButton() {
  themeButton.textContent = html.getAttribute("data-theme") === "dark" ? "☀️" : "🌙";
}

function toggleTheme() {
  const currentTheme = html.getAttribute("data-theme");
  html.setAttribute("data-theme", currentTheme === "dark" ? "light" : "dark");
  syncThemeButton();
}

themeButton.addEventListener("click", toggleTheme);
syncThemeButton();

const reveals = document.querySelectorAll(".reveal");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.transitionDelay = "0s";
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
);

reveals.forEach((element) => observer.observe(element));
