function toggleMenu() {
  const nav = document.getElementById("navLinks");
  nav.classList.toggle("active");
}

function submitForm(event) {
  event.preventDefault();
  document.getElementById("formResult").innerText =
    "Спасибо! Форма отправлена (тестовая)";
}
