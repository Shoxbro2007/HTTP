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

// Кастомный курсор
const cursor = document.querySelector('.custom-cursor');
const cursorFollower = document.querySelector('.cursor-follower');

document.addEventListener('mousemove', (e) => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
  
  setTimeout(() => {
    cursorFollower.style.left = e.clientX + 'px';
    cursorFollower.style.top = e.clientY + 'px';
  }, 100);
});

document.querySelectorAll('a, button, .cta-button, .portfolio-item, .social-icon').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.transform = 'translate(-50%, -50%) scale(2.5)';
    cursorFollower.style.transform = 'translate(-50%, -50%) scale(2)';
    cursorFollower.style.borderColor = 'transparent';
    cursorFollower.style.background = 'rgba(67, 97, 238, 0.3)';
  });
  
  el.addEventListener('mouseleave', () => {
    cursor.style.transform = 'translate(-50%, -50%) scale(1)';
    cursorFollower.style.transform = 'translate(-50%, -50%) scale(1)';
    cursorFollower.style.borderColor = 'var(--primary)';
    cursorFollower.style.background = 'transparent';
  });
});

// Параллакс эффект для героя
window.addEventListener("scroll", () => {
  const hero = document.querySelector(".hero");
  if (hero) {
    const scrollPosition = window.scrollY;
    hero.style.backgroundPositionY = `${scrollPosition * 0.5}px`;
  }
});

// Анимация прогресс-баров при скролле
document.addEventListener('DOMContentLoaded', () => {
  const progressBars = document.querySelectorAll('.progress-bar');
  
  const barObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const width = entry.target.style.width;
        entry.target.style.width = '0';
        setTimeout(() => {
          entry.target.style.width = width;
        }, 300);
      }
    });
  }, { threshold: 0.5 });
  
  progressBars.forEach(bar => barObserver.observe(bar));
});

// Инициализация 3D аватара
function init3DAvatar() {
  const container = document.getElementById('avatar-3d');
  if (!container) return;

  // Создаем сцену Three.js
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ alpha: true });
  
  renderer.setSize(300, 300);
  container.appendChild(renderer.domElement);

  // Создаем персонажа (простую модель)
  const geometry = new THREE.SphereGeometry(1, 32, 32);
  const material = new THREE.MeshPhongMaterial({ 
    color: 0xffffff,
    emissive: 0x4361ee,
    shininess: 100
  });
  
  const avatar = new THREE.Mesh(geometry, material);
  scene.add(avatar);

  // Добавляем свет
  const light = new THREE.PointLight(0xffffff, 1.5);
  light.position.set(2, 2, 3);
  scene.add(light);
  scene.add(new THREE.AmbientLight(0x404040));

  camera.position.z = 3;

  // Анимация и интерактивность
  let isRotating = true;
  
  function animate() {
    requestAnimationFrame(animate);
    
    if (isRotating) {
      avatar.rotation.x += 0.01;
      avatar.rotation.y += 0.01;
    }
    
    renderer.render(scene, camera);
  }
  
  animate();

  // Интерактивность
  container.addEventListener('mouseenter', () => {
    isRotating = false;
    avatar.material.emissive.setHex(0x4cc9f0);
  });
  
  container.addEventListener('mouseleave', () => {
    isRotating = true;
    avatar.material.emissive.setHex(0x4361ee);
  });
  
  container.addEventListener('mousemove', (e) => {
    if (!isRotating) {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width * 2 - 1;
      const y = -(e.clientY - rect.top) / rect.height * 2 + 1;
      
      avatar.rotation.y = x;
      avatar.rotation.x = y;
    }
  });
}

// Добавить в конец script.js
document.addEventListener('DOMContentLoaded', init3DAvatar);
// Голосовой помощник
const voiceAssistant = document.getElementById('voice-assistant');

if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();
  recognition.lang = 'ru-RU';
  recognition.continuous = false;
  recognition.interimResults = true; // Показывать промежуточные результаты

  // Озвучивание ответов
  function speak(text) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'ru-RU';
    utterance.rate = 1.0;
    speechSynthesis.speak(utterance);
  }

  recognition.onresult = function(event) {
    const result = event.results[0][0].transcript.toLowerCase();
    console.log('Распознано: ' + result);
    
    // Обработка команд
    let commandHandled = false;
    
    if (result.includes('главная') || result.includes('домой')) {
      window.location.href = './index.html';
      commandHandled = true;
    } 
    else if (result.includes('обо мне') || result.includes('о себе')) {
      window.location.href = './about.html';
      commandHandled = true;
    } 
    else if (result.includes('портфолио') || result.includes('работы')) {
      document.getElementById('portfolio').scrollIntoView({ behavior: 'smooth' });
      speak("Показываю мои работы");
      commandHandled = true;
    } 
    else if (result.includes('контакты') || result.includes('связаться')) {
      document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
      speak("Мои контакты ниже");
      commandHandled = true;
    } 
    else if (result.includes('сменить тему') || result.includes('тема')) {
      document.getElementById('theme-toggle').click();
      speak("Меняю тему");
      commandHandled = true;
    }
    else if (result.includes('меню') || result.includes('навигация')) {
      toggleMenu();
      speak("Открываю меню");
      commandHandled = true;
    }
    else if (result.includes('наверх') || result.includes('вверх')) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      speak("Прокручиваю вверх");
      commandHandled = true;
    }
    else if (result.includes('комплимент') || result.includes('похвали')) {
      document.getElementById('compliment-btn').click();
      speak("Готовлю комплимент");
      commandHandled = true;
    }
    
    if (!commandHandled) {
      speak("Извините, не понял команду. Попробуйте сказать: портфолио, контакты, или сменить тему");
    }
  };

  recognition.onerror = function(event) {
    console.error('Ошибка распознавания: ', event.error);
    voiceAssistant.classList.remove('listening');
    speak("Ошибка микрофона. Проверьте разрешения");
  };

  recognition.onend = function() {
    voiceAssistant.classList.remove('listening');
  };

  voiceAssistant.addEventListener('click', () => {
    try {
      recognition.start();
      voiceAssistant.classList.add('listening');
      speak("Слушаю вас...");
    } catch (error) {
      console.error('Ошибка запуска распознавания: ', error);
      voiceAssistant.classList.remove('listening');
      speak("Не удалось запустить распознавание речи");
    }
  });
} else {
  // Скрыть кнопку, если браузер не поддерживает
  voiceAssistant.style.display = 'none';
  console.warn('Браузер не поддерживает SpeechRecognition');
}