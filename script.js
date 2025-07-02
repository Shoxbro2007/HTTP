function submitForm(event) {
  event.preventDefault();
  document.getElementById("formResult").innerText =
    "Спасибо! Форма отправлена (но пока без сервера)";
}
