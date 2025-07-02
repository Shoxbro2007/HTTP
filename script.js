function showMessage() {
  const msg = document.getElementById("message");
  msg.textContent = "Ты нажал кнопку — поздравляю!";
}
function sayHello() {
  const name = document.getElementById("nameInput").value;
  const output = document.getElementById("greeting");
  output.textContent = `Привет, ${name}! Рад тебя видеть!`;
}
function submitForm(event) {
  event.preventDefault(); // отменяет стандартную отправку формы

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();
  const result = document.getElementById("formResult");

  if (!name || !email || !message) {
    result.textContent = "Пожалуйста, заполните все поля.";
    result.style.color = "red";
    return;
  }

  result.textContent = `Спасибо, ${name}! Ваше сообщение отправлено.`;
  result.style.color = "green";

  // Очистим форму
  document.getElementById("contactForm").reset();
}
