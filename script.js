// Переключение меню
function toggleMenu() {
  const nav = document.getElementById("navLinks");
  nav.classList.toggle("active");
  
  // Анимация иконки
  const toggleBtn = document.querySelector(".nav-toggle");
  if (nav.classList.contains("active")) {
    toggleBtn.innerHTML = "✕";
  } else {
    toggleBtn.innerHTML = "☰";
  }
}

// Переключение темы
const toggle = document.getElementById("theme-toggle");
const body = document.body;

// Проверка сохраненной темы
if (localStorage.getItem("theme") === "dark") {
  body.classList.add("dark-mode");
  toggle.textContent = "🌞";
}

toggle.addEventListener("click", () => {
  body.classList.toggle("dark-mode");
  const isDark = body.classList.contains("dark-mode");
  toggle.textContent = isDark ? "🌞" : "🌙";
  localStorage.setItem("theme", isDark ? "dark" : "light");
});

// Кнопка "Наверх"
const scrollBtn = document.createElement("div");
scrollBtn.classList.add("scroll-top");
scrollBtn.innerHTML = "↑";
document.body.appendChild(scrollBtn);

window.addEventListener("scroll", () => {
  if (window.scrollY > 500) {
    scrollBtn.classList.add("show");
  } else {
    scrollBtn.classList.remove("show");
  }
});

scrollBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

// Анимация при прокрутке
document.addEventListener("DOMContentLoaded", () => {
  const animatedElements = document.querySelectorAll(".fade-in");
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animationPlayState = "running";
      }
    });
  }, { threshold: 0.1 });
  
  animatedElements.forEach(el => observer.observe(el));
});

// Параллакс эффект для героя
window.addEventListener("scroll", () => {
  const hero = document.querySelector(".hero");
  if (hero) {
    const scrollPosition = window.scrollY;
    hero.style.backgroundPositionY = `${scrollPosition * 0.5}px`;
  }
});

// Инициализация
document.addEventListener("DOMContentLoaded", function() {
  // Закрытие меню при клике на ссылку
  const navLinks = document.querySelectorAll(".nav-links a");
  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      document.getElementById("navLinks").classList.remove("active");
      document.querySelector(".nav-toggle").innerHTML = "☰";
    });
  });
});


