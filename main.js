// Конфигурация метавселенной
// Это глобальный объект, который хранит все настройки и текущее состояние приложения.
const MetaverseConfig = {
    // Цветовые темы для сцены
    themes: {
        default: { background: 0x1a1a2e, primaryColor: '#4cc9f0' },
        nature: { background: 0x1b5e20, primaryColor: '#2ecc71' },
        tech: { background: 0x0d47a1, primaryColor: '#3498db' },
        dark: { background: 0x111111, primaryColor: '#9b59b6' },
        light: { background: 0xf5f5f5, primaryColor: '#2980b9' }
    },

    // Варианты аватаров, которые пользователь может выбрать
    avatarOptions: [
        'https://cdn-icons-png.flaticon.com/512/4333/4333609.png',
        'https://cdn-icons-png.flaticon.com/512/3667/3667325.png',
        'https://cdn-icons-png.flaticon.com/512/4140/4140048.png'
    ],

    // Настройки для различных режимов метавселенной (обучение, работа, развлечения)
    modeSettings: {
        learn: {
            background: 0x1a237e, // Темно-синий фон
            objects: ['book', 'laptop', 'blackboard'], // Пример объектов для этого режима
            description: 'Режим обучения и развития'
        },
        work: {
            background: 0x263238, // Темно-серый фон
            objects: ['desk', 'computer', 'chart'],
            description: 'Рабочее пространство'
        },
        fun: {
            background: 0x4a148c, // Фиолетовый фон
            objects: ['gamepad', 'ball', 'dancefloor'],
            description: 'Зона развлечений'
        }
    },

    // Определения достижений в игре
    achievements: {
        first_learn: {
            title: 'Любознательный',
            description: 'Впервые использовали режим обучения',
            icon: '📚'
        },
        all_modes: {
            title: 'Исследователь',
            description: 'Попробовали все режимы метавселенной',
            icon: '🌐'
        },
        vr_explorer: {
            title: 'VR Пионер',
            description: 'Впервые использовали VR режим',
            icon: '👓'
        },
        long_session: {
            title: 'Завсегдатай',
            description: 'Провели более 1 часа в метавселенной',
            icon: '⏳'
        },
        socializer: {
            title: 'Социальный',
            description: 'Добавили первого друга',
            icon: '👥'
        },
        gamer: {
            title: 'Игроман',
            description: 'Сыграли во все мини-игры',
            icon: '🎮'
        }
    },

    // Новые настройки для опыта и валюты
    xpPerMinute: 1,
    currencyPerMinute: 0.5,
    levelMultiplier: 1.2,
    
    // Предметы, которые можно купить в магазине
    shopItems: [
        { id: 'avatar1', name: 'Эксклюзивный аватар', price: 50 },
        { id: 'theme1', name: 'Тёмная тема', price: 30 },
        { id: 'effect1', name: 'Эффект частиц', price: 70 }
    ]
};

// Состояние приложения (глобальные переменные для Three.js и данных пользователя)
const AppState = {
    // THREE.js элементы
    scene: null,
    camera: null,
    renderer: null,
    controls: null, // Добавляем OrbitControls для управления камерой мышью

    // Состояние VR/AR
    vrEnabled: false,
    arEnabled: false, // Добавляем состояние для AR

    // Текущий режим метавселенной
    currentMode: null,

    // Данные пользователя
    userData: {
        username: '',
        avatar: '',
        theme: 'default',
        interests: [],
        achievements: [],
        stats: {
            timeSpent: 0, // В минутах
            lastLogin: null,
            level: 1, // Уровень пользователя
            experience: 0, // Опыт пользователя
            currency: 0 // Валюта пользователя
        },
        activityHistory: [],
        friends: [],
        gamesPlayed: []
    },

    // 3D объекты на сцене, которые могут быть интерактивными
    objects: [],

    // Время начала сессии для подсчета проведенного времени
    sessionStartTime: null,
    sessionTimer: null, // Идентификатор таймера сессии

    // WebSocket соединение (для чата и многопользовательского режима)
    socket: null,

    // Сообщения чата
    chatMessages: [],

    // Позиция игрока (для мини-карты и перемещения)
    playerPosition: { x: 0, y: 0, z: 0 },
    inventory: [], // Инвентарь пользователя
    settings: { // Настройки пользователя
        volume: 50,
        controls: 'standard'
    }
};

// Инициализация приложения при загрузке страницы
document.addEventListener('DOMContentLoaded', initApp);

// Основная функция инициализации всего приложения
async function initApp() {
    console.log("Начало инициализации приложения...");
    try {
        // Показываем экран загрузки
        showLoadingScreen(() => {
            // Эти функции будут вызваны после завершения загрузки
            loadUserData();
            init3DScene();
            setupEventListeners();
            startSessionTimer();
            updateMiniMap();
            initShop(); // Инициализация магазина
            initWebSocket(); // Инициализация WebSocket для чата
            showWelcomeBackNotification(); // Приветственное уведомление
        });
        console.log("Инициализация завершена.");
    } catch (error) {
        console.error("Ошибка инициализации приложения:", error);
        document.getElementById('loading-text').textContent = "Ошибка загрузки: " + error.message;
    }
}

// Функция для отображения экрана загрузки
function showLoadingScreen(callback) {
    const loadingScreen = document.getElementById('loading-screen');
    const loadingBar = document.getElementById('loading-bar');
    let progress = 0;

    const interval = setInterval(() => {
        progress += 5; // Увеличиваем прогресс
        if (progress > 100) {
            progress = 100;
            clearInterval(interval);
            // Скрываем экран загрузки после завершения
            loadingScreen.style.opacity = '0';
            setTimeout(() => {
                loadingScreen.style.display = 'none';
                if (callback) callback(); // Вызываем колбэк после скрытия
            }, 1000); // Задержка для анимации исчезновения
        }
        loadingBar.style.width = `${progress}%`;
        document.getElementById('loading-text').textContent = `Загрузка метавселенной... ${progress}%`;
    }, 100);
}

// Инициализация 3D сцены
function init3DScene() {
    console.log("Инициализация 3D сцены...");
    try {
        // 1. Сцена: Создаем новую сцену THREE.js
        AppState.scene = new THREE.Scene();
        // Устанавливаем фон сцены на основе текущей темы пользователя
        updateSceneTheme(); 
        
        // 2. Камера: Создаем перспективную камеру
        AppState.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        AppState.camera.position.set(0, 1.5, 5); // Немного приподнимаем камеру и отодвигаем назад
        
        // 3. Рендерер: Создаем WebGL рендерер для отрисовки 3D-графики
        AppState.renderer = new THREE.WebGLRenderer({ 
            antialias: true, // Сглаживание краев
            alpha: true // Позволяет прозрачность фона
        });
        AppState.renderer.setSize(window.innerWidth, window.innerHeight); // Устанавливаем размер рендерера
        AppState.renderer.setPixelRatio(window.devicePixelRatio); // Устанавливаем пиксельное соотношение для четкости
        // Добавляем DOM-элемент рендерера в контейнер на HTML-странице
        document.getElementById('metaverse-container').appendChild(AppState.renderer.domElement);
        
        // 4. Добавляем освещение в сцену
        addBasicLights();
        
        // 5. Добавляем стандартные объекты в сцену
        addDefaultObjects();

        // 6. Добавляем звездное поле и частицы для атмосферы
        createStarfield();
        createParticles();
        
        // 7. Настраиваем OrbitControls для управления камерой мышью
        // Это позволит пользователю вращать, приближать и отдалять камеру
        AppState.controls = new THREE.OrbitControls(AppState.camera, AppState.renderer.domElement);
        AppState.controls.enableDamping = true; // Плавное движение камеры
        AppState.controls.dampingFactor = 0.25; // Коэффициент демпфирования
        AppState.controls.screenSpacePanning = false; // Отключаем панорамирование в экранном пространстве
        AppState.controls.maxPolarAngle = Math.PI / 2; // Ограничиваем угол наклона камеры (нельзя смотреть под землю)
        
        // 8. Обработка изменения размера окна браузера
        window.addEventListener('resize', handleWindowResize);
        
        // 9. Запускаем главный цикл анимации
        animate();
        console.log("3D сцена инициализирована успешно.");
    } catch (e) {
        console.error("Ошибка инициализации 3D сцены:", e);
        throw e; // Пробрасываем ошибку дальше
    }
}

// Добавление базового освещения в сцену
function addBasicLights() {
    // 1. Фоновое освещение: равномерно освещает все объекты
    const ambientLight = new THREE.AmbientLight(0x404040, 0.5);
    AppState.scene.add(ambientLight);
    
    // 2. Направленный свет: имитирует солнечный свет, идущий из одного направления
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 10, 7.5); // Позиция источника света
    directionalLight.castShadow = true; // Включаем тени от этого света
    AppState.scene.add(directionalLight);
    
    // 3. Точечный свет: свет, исходящий из одной точки во все стороны
    const pointLight = new THREE.PointLight(0x4cc9f0, 1, 100); // Цвет, интенсивность, дистанция
    pointLight.position.set(0, 5, 0); // Позиция лампочки
    AppState.scene.add(pointLight);
}

// Добавление стандартных 3D-объектов в сцену
function addDefaultObjects() {
    // 1. Пол: большая плоская поверхность
    const planeGeometry = new THREE.PlaneGeometry(20, 20); // Размеры 20x20
    const planeMaterial = new THREE.MeshPhongMaterial({ 
        color: 0x333333, // Темно-серый цвет
        side: THREE.DoubleSide // Виден с обеих сторон
    });
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.rotation.x = -Math.PI / 2; // Поворачиваем плоскость, чтобы она была горизонтальной
    plane.position.y = -0.5; // Опускаем немного ниже
    plane.receiveShadow = true; // Пол может принимать тени
    AppState.scene.add(plane);
    
    // 2. Центральный куб (уже был)
    const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
    const cubeMaterial = new THREE.MeshPhongMaterial({ 
        color: 0x4cc9f0, // Голубой цвет
        shininess: 100 // Блеск
    });
    const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    cube.userData = { 
        interactive: true, 
        type: 'welcome',
        name: 'Приветственный куб'
    };
    cube.position.set(0, 0.5, 0); // Поднимаем над полом
    cube.castShadow = true; // Куб отбрасывает тени
    AppState.scene.add(cube);
    AppState.objects.push(cube); // Добавляем в список интерактивных объектов
    
    // 3. Сфера для обучения (уже была)
    const sphereGeometry = new THREE.SphereGeometry(0.7, 32, 32); // Увеличим размер
    const sphereMaterial = new THREE.MeshPhongMaterial({ 
        color: 0xf72585, // Розовый цвет
        emissive: 0xff0066, // Излучающий свет (немного светится)
        emissiveIntensity: 0.2 // Интенсивность свечения
    });
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    sphere.position.set(-3, 1, 0); // Позиция
    sphere.userData = { 
        interactive: true, 
        type: 'learn',
        name: 'Сфера знаний'
    };
    sphere.castShadow = true;
    AppState.scene.add(sphere);
    AppState.objects.push(sphere);
    
    // 4. Тор для развлечений (уже был)
    const torusGeometry = new THREE.TorusGeometry(0.8, 0.3, 16, 100); // Увеличим размер
    const torusMaterial = new THREE.MeshPhongMaterial({ 
        color: 0x7209b7, // Фиолетовый цвет
        specular: 0xffffff // Блики
    });
    const torus = new THREE.Mesh(torusGeometry, torusMaterial);
    torus.position.set(3, 1, 0); // Позиция
    torus.userData = { 
        interactive: true, 
        type: 'fun',
        name: 'Кольцо развлечений'
    };
    torus.castShadow = true;
    AppState.scene.add(torus);
    AppState.objects.push(torus);

    // 5. Добавим новый объект: Цилиндр для работы
    const cylinderGeometry = new THREE.CylinderGeometry(0.6, 0.6, 2, 32); // Радиус верх/низ, высота, сегменты
    const cylinderMaterial = new THREE.MeshPhongMaterial({
        color: 0x4895ef, // Синий цвет
        flatShading: true // Плоское затенение
    });
    const cylinder = new THREE.Mesh(cylinderGeometry, cylinderMaterial);
    cylinder.position.set(0, 1, -3); // Позиция
    cylinder.userData = {
        interactive: true,
        type: 'work',
        name: 'Цилиндр работы'
    };
    cylinder.castShadow = true;
    AppState.scene.add(cylinder);
    AppState.objects.push(cylinder);
}

// Создание звездного поля на заднем плане
function createStarfield() {
    const starsGeometry = new THREE.BufferGeometry();
    const starsMaterial = new THREE.PointsMaterial({
        color: 0xffffff, // Белые звезды
        size: 0.1, // Размер звезды
        transparent: true,
        opacity: 0.8 // Немного прозрачные
    });

    const starsVertices = [];
    // Создаем 5000 случайных звезд в большом объеме
    for (let i = 0; i < 5000; i++) {
        starsVertices.push(
            THREE.MathUtils.randFloatSpread(2000), // X координата от -1000 до 1000
            THREE.MathUtils.randFloatSpread(2000), // Y координата
            THREE.MathUtils.randFloatSpread(2000)  // Z координата
        );
    }

    // Устанавливаем позиции звезд
    starsGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starsVertices, 3));
    const starField = new THREE.Points(starsGeometry, starsMaterial);
    AppState.scene.add(starField); // Добавляем звездное поле в сцену
}

// Создание частиц (например, для эффекта пыли или тумана)
function createParticles() {
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCnt = 1000; // Количество частиц
    
    const posArray = new Float32Array(particlesCnt * 3); // Массив для хранения позиций (x, y, z для каждой частицы)
    for(let i = 0; i < particlesCnt * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 10; // Случайная позиция от -5 до 5
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.02, // Размер частицы
        color: 0x4cc9f0, // Цвет частиц (голубой)
        transparent: true,
        opacity: 0.8 // Прозрачность
    });
    
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    AppState.scene.add(particlesMesh); // Добавляем частицы в сцену
}

// ======================
// ОСНОВНЫЕ ФУНКЦИИ
// ======================

// Главный цикл анимации: вызывается много раз в секунду для обновления сцены
function animate() {
    requestAnimationFrame(animate); // Запрашиваем следующий кадр анимации

    // Обновляем OrbitControls (если они используются)
    if (AppState.controls) {
        AppState.controls.update();
    }

    // Вращение интерактивных объектов
    AppState.objects.forEach(obj => {
        if (obj.userData.interactive) {
            obj.rotation.x += 0.005; // Вращение по оси X
            obj.rotation.y += 0.01;  // Вращение по оси Y
        }
    });
    
    // Рендеринг сцены: отрисовываем текущее состояние сцены с помощью камеры
    AppState.renderer.render(AppState.scene, AppState.camera);
    
    // Обновление VR сессии, если активна
    if (AppState.vrEnabled && AppState.renderer.xr.isPresenting) {
        AppState.renderer.xr.update();
    }
}

// Обработка изменения размера окна браузера
function handleWindowResize() {
    // Обновляем соотношение сторон камеры
    AppState.camera.aspect = window.innerWidth / window.innerHeight;
    AppState.camera.updateProjectionMatrix(); // Обновляем матрицу проекции камеры
    
    // Обновляем размер рендерера
    AppState.renderer.setSize(window.innerWidth, window.innerHeight);
}

// ======================
// РАБОТА С ПОЛЬЗОВАТЕЛЕМ
// ======================

// Загрузка данных пользователя из локального хранилища браузера
function loadUserData() {
    const savedData = localStorage.getItem('metaverseUserData');
    
    if (savedData) {
        try {
            AppState.userData = JSON.parse(savedData);
            // Обновляем время последнего входа
            AppState.userData.stats.lastLogin = new Date().toISOString();
            updateUI(); // Обновляем интерфейс пользователя
        } catch (error) {
            console.error('Ошибка загрузки данных пользователя:', error);
            resetUserData(); // Если данные повреждены, сбрасываем их
        }
    } else {
        resetUserData(); // Если данных нет, создаем новые
    }
}

// Сброс данных пользователя к значениям по умолчанию
function resetUserData() {
    AppState.userData = {
        username: '',
        avatar: '',
        theme: 'default',
        interests: [],
        achievements: [],
        stats: {
            timeSpent: 0,
            lastLogin: new Date().toISOString(),
            level: 1,
            experience: 0,
            currency: 0
        },
        activityHistory: [],
        friends: [],
        gamesPlayed: []
    };
}

// Сохранение данных пользователя в локальное хранилище браузера
function saveUserData() {
    localStorage.setItem('metaverseUserData', JSON.stringify(AppState.userData));
}

// Обновление элементов пользовательского интерфейса (UI) на основе данных AppState.userData
function updateUI() {
    // 1. Имя пользователя и уровень
    const usernameElement = document.querySelector('.username');
    const levelElement = document.querySelector('.level');
    if (usernameElement) {
        usernameElement.textContent = AppState.userData.username || 'Гость';
    }
    if (levelElement) {
        levelElement.textContent = `Уровень: ${AppState.userData.stats.level}`;
    }
    
    // 2. Аватар пользователя
    updateAvatarUI();
    
    // 3. Количество достижений
    const achievementsCountElement = document.getElementById('achievements-count');
    if (achievementsCountElement) {
        achievementsCountElement.textContent = AppState.userData.achievements.length;
    }
    
    // 4. Время, проведенное в метавселенной
    updateTimeSpentUI();

    // 5. Полоса опыта
    updateExperienceBar();

    // 6. Валюта
    updateCurrencyUI();
    
    // 7. Друзья онлайн
    updateFriendsOnline();
}

// Обновление аватара в UI
function updateAvatarUI() {
    const avatarElement = document.getElementById('avatar');
    if (!avatarElement) return;

    avatarElement.innerHTML = ''; // Очищаем содержимое

    if (AppState.userData.avatar) {
        // Если есть URL аватара, используем изображение
        const img = document.createElement('img');
        img.src = AppState.userData.avatar;
        img.alt = 'Аватар пользователя';
        avatarElement.appendChild(img);
        avatarElement.style.backgroundColor = 'transparent'; // Убираем фон, если есть изображение
    } else if (AppState.userData.username) {
        // Если нет URL, но есть имя, используем первую букву и генерируем цвет
        avatarElement.textContent = AppState.userData.username.charAt(0).toUpperCase();
        avatarElement.style.backgroundColor = stringToColor(AppState.userData.username);
    } else {
        // Если нет ни того, ни другого, ставим вопросительный знак
        avatarElement.textContent = '?';
        avatarElement.style.backgroundColor = '#4cc9f0';
    }
}

// Генерация цвета из строки (для аватаров по первой букве)
function stringToColor(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    const color = `hsl(${hash % 360}, 70%, 60%)`;
    return color;
}

// Обновление отображения времени, проведенного в метавселенной
function updateTimeSpentUI() {
    const timeSpentElement = document.getElementById('time-spent');
    if (!timeSpentElement) return;

    const hours = Math.floor(AppState.userData.stats.timeSpent / 60);
    const minutes = AppState.userData.stats.timeSpent % 60;
    timeSpentElement.textContent = `${hours > 0 ? `${hours}h ` : ''}${minutes}m`;
}

// Обновление полосы опыта
function updateExperienceBar() {
    const expBar = document.querySelector('.experience-bar .progress');
    const currentLevelExp = AppState.userData.stats.experience;
    const nextLevelExpNeeded = calculateExpForNextLevel(AppState.userData.stats.level);

    if (expBar) {
        const progress = (currentLevelExp / nextLevelExpNeeded) * 100;
        expBar.style.width = `${progress}%`;
    }
}

// Расчет опыта для следующего уровня
function calculateExpForNextLevel(level) {
    return Math.floor(100 * (level * MetaverseConfig.levelMultiplier));
}

// Обновление отображения валюты
function updateCurrencyUI() {
    const currencyElement = document.querySelector('.currency');
    if (currencyElement) {
        currencyElement.textContent = `${Math.floor(AppState.userData.stats.currency)} монет`;
    }
}

// Обновление счетчика друзей онлайн
function updateFriendsOnline() {
    const friendsOnlineElement = document.getElementById('friends-online');
    if (!friendsOnlineElement) return;

    const onlineFriends = AppState.userData.friends.filter(friend => friend.status === 'онлайн');
    friendsOnlineElement.textContent = onlineFriends.length;
}

// ======================
// МОДАЛЬНЫЕ ОКНА
// ======================

// Показ модального окна с запросом имени пользователя (если оно не установлено)
function showUsernameModal() {
    // Вместо prompt, используем кастомный модал
    const usernameModal = document.createElement('div');
    usernameModal.className = 'modal';
    usernameModal.id = 'initial-username-modal';
    usernameModal.innerHTML = `
        <div class="modal-content">
            <h2>Добро пожаловать в метавселенную!</h2>
            <p>Как вас зовут?</p>
            <input type="text" id="initial-username-input" placeholder="Введите ваше имя" value="${AppState.userData.username || 'Гость'}">
            <button id="set-initial-username">Продолжить</button>
        </div>
    `;
    document.body.appendChild(usernameModal);
    usernameModal.style.display = 'flex'; // Показываем модал

    const usernameInput = document.getElementById('initial-username-input');
    const setUsernameBtn = document.getElementById('set-initial-username');

    setUsernameBtn.addEventListener('click', () => {
        const username = usernameInput.value.trim();
        if (username) {
            AppState.userData.username = username;
            saveUserData();
            updateUI();
            usernameModal.style.display = 'none';
            usernameModal.remove(); // Удаляем модал после использования
            showAvatarModal(); // Предлагаем выбрать аватар
        } else {
            showNotification('Пожалуйста, введите ваше имя!');
        }
    });

    // Автофокус на поле ввода
    setTimeout(() => usernameInput.focus(), 100);
}


// Показ модального окна выбора аватара
function showAvatarModal() {
    const modal = document.getElementById('avatar-modal');
    if (!modal) return;
    modal.style.display = 'flex';
    
    // Обработка выбора стандартного аватара
    document.querySelectorAll('.avatar-option').forEach(option => {
        // Удаляем старые обработчики, чтобы избежать дублирования
        const oldClickListener = option.__clickListener;
        if (oldClickListener) {
            option.removeEventListener('click', oldClickListener);
        }

        const newClickListener = function() {
            const avatarIndex = parseInt(this.getAttribute('data-avatar')) - 1;
            setAvatar(MetaverseConfig.avatarOptions[avatarIndex]);
        };
        option.addEventListener('click', newClickListener);
        option.__clickListener = newClickListener; // Сохраняем ссылку на обработчик
    });
    
    // Обработка кастомного аватара
    const setCustomAvatarBtn = document.getElementById('set-custom-avatar');
    if (setCustomAvatarBtn) {
        const oldCustomClickListener = setCustomAvatarBtn.__clickListener;
        if (oldCustomClickListener) {
            setCustomAvatarBtn.removeEventListener('click', oldCustomClickListener);
        }

        const newCustomClickListener = () => {
            const url = document.getElementById('custom-avatar-url').value.trim();
            if (url) {
                setAvatar(url);
            } else {
                showNotification('Пожалуйста, введите URL аватара');
            }
        };
        setCustomAvatarBtn.addEventListener('click', newCustomClickListener);
        setCustomAvatarBtn.__clickListener = newCustomClickListener;
    }
    
    // Закрытие модального окна
    const closeAvatarModalBtn = document.getElementById('close-avatar-modal');
    if (closeAvatarModalBtn) {
        const oldCloseListener = closeAvatarModalBtn.__clickListener;
        if (oldCloseListener) {
            closeAvatarModalBtn.removeEventListener('click', oldCloseListener);
        }

        const newCloseListener = () => {
            modal.style.display = 'none';
            // Если имя пользователя еще не установлено, показываем модал имени
            if (!AppState.userData.username) {
                showUsernameModal();
            } else {
                showWelcomeBackNotification();
            }
        };
        closeAvatarModalBtn.addEventListener('click', newCloseListener);
        closeAvatarModalBtn.__clickListener = newCloseListener;
    }
}

// Установка аватара пользователя
function setAvatar(url) {
    // Проверка URL на корректность
    if (!url.match(/^https?:\/\/.+\..+/)) {
        showNotification('Некорректный URL аватара. Используйте полный URL с http:// или https://');
        return;
    }
    
    // Предварительная загрузка изображения для проверки
    const img = new Image();
    img.onload = () => {
        AppState.userData.avatar = url;
        saveUserData();
        updateAvatarUI(); // Обновляем аватар в интерфейсе
        showNotification('Аватар успешно установлен!');
        document.getElementById('avatar-modal').style.display = 'none'; // Закрываем модал
    };
    img.onerror = () => {
        showNotification('Не удалось загрузить изображение по указанному URL. Проверьте ссылку.');
    };
    img.src = url;
}

// Показ модального окна друзей
function showFriendsModal() {
    const modal = document.getElementById('friends-modal');
    if (!modal) return;
    modal.style.display = 'flex';
    
    // Заполнение списка друзей
    const friendsList = document.getElementById('friends-list');
    if (friendsList) {
        friendsList.innerHTML = ''; // Очищаем список перед заполнением
        AppState.userData.friends.forEach(friend => {
            const friendTemplate = document.getElementById('friend-template');
            const friendElement = friendTemplate.content.cloneNode(true);
            
            // Аватар друга
            const avatar = friendElement.querySelector('.friend-avatar');
            avatar.textContent = friend.name.charAt(0).toUpperCase();
            avatar.style.backgroundColor = stringToColor(friend.name);
            
            friendElement.querySelector('.friend-name').textContent = friend.name;
            friendElement.querySelector('.friend-status').textContent = friend.status;
            
            // Кнопка чата с другом
            const chatWithFriendBtn = friendElement.querySelector('.chat-with-friend');
            if (chatWithFriendBtn) {
                chatWithFriendBtn.addEventListener('click', () => {
                    const chatInput = document.getElementById('chat-input');
                    if (chatInput) {
                        chatInput.value = `@${friend.name} `;
                        chatInput.focus();
                    }
                    modal.style.display = 'none';
                    showNotification(`Начат приватный чат с ${friend.name}`);
                });
            }
            friendsList.appendChild(friendElement);
        });
    }
    
    // Добавление друга
    const addFriendBtn = document.getElementById('add-friend-btn');
    if (addFriendBtn) {
        // Удаляем старые обработчики, чтобы избежать дублирования
        const oldAddFriendListener = addFriendBtn.__clickListener;
        if (oldAddFriendListener) {
            addFriendBtn.removeEventListener('click', oldAddFriendListener);
        }
        addFriendBtn.addEventListener('click', addFriend);
        addFriendBtn.__clickListener = addFriend; // Сохраняем ссылку на обработчик
    }
    
    // Закрытие модального окна
    const closeModalBtn = document.querySelector('#friends-modal .close-modal');
    if (closeModalBtn) {
        // Удаляем старые обработчики
        const oldCloseListener = closeModalBtn.__clickListener;
        if (oldCloseListener) {
            closeModalBtn.removeEventListener('click', oldCloseListener);
        }
        const newCloseListener = () => {
            modal.style.display = 'none';
        };
        closeModalBtn.addEventListener('click', newCloseListener);
        closeModalBtn.__clickListener = newCloseListener;
    }
}

// Добавление нового друга
function addFriend() {
    const friendNameInput = document.getElementById('friend-username');
    if (!friendNameInput) return;

    const friendName = friendNameInput.value.trim();
    
    if (!friendName) {
        showNotification('Введите имя пользователя для добавления в друзья.');
        return;
    }
    
    // Проверка на дубликат или добавление самого себя
    if (AppState.userData.friends.some(f => f.name.toLowerCase() === friendName.toLowerCase()) || 
        friendName.toLowerCase() === AppState.userData.username.toLowerCase()) {
        showNotification('Этот друг уже добавлен или это ваше имя.');
        return;
    }
    
    // Добавление друга (статус случайный для примера)
    AppState.userData.friends.push({
        name: friendName,
        status: Math.random() > 0.5 ? 'онлайн' : 'офлайн'
    });
    
    saveUserData();
    updateUI(); // Обновляем UI, чтобы отобразить нового друга
    showFriendsModal(); // Перезагружаем модал друзей для обновления списка
    friendNameInput.value = ''; // Очищаем поле ввода
    
    // Разблокировка достижения "Социальный", если это первый друг
    if (AppState.userData.friends.length === 1) {
        unlockAchievement('socializer');
    }
}

// Показ модального окна мини-игр
function showGamesModal() {
    const modal = document.getElementById('games-modal');
    if (!modal) return;
    modal.style.display = 'flex';
    
    // Обработка выбора игры
    document.querySelectorAll('.game-card').forEach(card => {
        // Удаляем старые обработчики
        const oldGameClickListener = card.__gameClickListener;
        if (oldGameClickListener) {
            card.removeEventListener('click', oldGameClickListener);
        }

        const newGameClickListener = function() {
            const game = this.getAttribute('data-game');
            launchMiniGame(game);
            modal.style.display = 'none'; // Закрываем модал после выбора игры
        };
        card.addEventListener('click', newGameClickListener);
        card.__gameClickListener = newGameClickListener;
    });
    
    // Закрытие модального окна
    const closeModalBtn = document.querySelector('#games-modal .close-modal');
    if (closeModalBtn) {
        const oldCloseListener = closeModalBtn.__clickListener;
        if (oldCloseListener) {
            closeModalBtn.removeEventListener('click', oldCloseListener);
        }
        const newCloseListener = () => {
            modal.style.display = 'none';
        };
        closeModalBtn.addEventListener('click', newCloseListener);
        closeModalBtn.__clickListener = newCloseListener;
    }
}

// Запуск мини-игры (пока только уведомление)
function launchMiniGame(game) {
    let gameName = '';
    switch (game) {
        case 'quiz':
            gameName = 'Викторина';
            break;
        case 'platformer':
            gameName = 'Платформер';
            break;
        case 'puzzle':
            gameName = 'Головоломка';
            break;
        default:
            gameName = 'Неизвестная игра';
    }
    
    // Добавление игры в историю сыгранных, если еще не играли
    if (!AppState.userData.gamesPlayed.includes(game)) {
        AppState.userData.gamesPlayed.push(game);
        saveUserData();
        
        // Проверка достижения "Игроман" (сыграли во все 3 игры)
        if (AppState.userData.gamesPlayed.length === 3) {
            unlockAchievement('gamer');
        }
    }
    
    showNotification(`Запуск игры: ${gameName}. (Эта функция пока не реализована.)`);
}

// Показ модального окна достижений
function showAchievementsModal() {
    const modal = document.getElementById('achievements-modal');
    if (!modal) return;
    modal.style.display = 'flex';
    
    const achievementsList = document.getElementById('achievements-list');
    if (achievementsList) {
        achievementsList.innerHTML = ''; // Очищаем список
        
        // Отображение всех достижений из MetaverseConfig
        Object.entries(MetaverseConfig.achievements).forEach(([id, achievement]) => {
            const template = document.getElementById('achievement-template');
            const achievementElement = template.content.cloneNode(true);
            
            // Проверяем, разблокировано ли достижение для текущего пользователя
            const unlocked = AppState.userData.achievements.includes(id);
            
            // Устанавливаем иконку, заголовок и описание
            achievementElement.querySelector('.achievement-icon').textContent = 
                unlocked ? achievement.icon : '🔒'; // Показываем замок, если не разблокировано
                
            achievementElement.querySelector('.achievement-title').textContent = 
                unlocked ? achievement.title : 'Заблокировано';
                
            achievementElement.querySelector('.achievement-description').textContent = 
                unlocked ? achievement.description : 'Достижение еще не получено. Продолжайте исследовать!';
                
            achievementsList.appendChild(achievementElement);
        });
    }
    
    // Закрытие модального окна
    const closeModalBtn = document.querySelector('#achievements-modal .close-modal');
    if (closeModalBtn) {
        const oldCloseListener = closeModalBtn.__clickListener;
        if (oldCloseListener) {
            closeModalBtn.removeEventListener('click', oldCloseListener);
        }
        const newCloseListener = () => {
            modal.style.display = 'none';
        };
        closeModalBtn.addEventListener('click', newCloseListener);
        closeModalBtn.__clickListener = newCloseListener;
    }
}

// Показ модального окна настроек
function showSettingsModal() {
    const modal = document.getElementById('settings-modal'); // Предполагается, что такой модал есть в HTML
    if (!modal) {
        showNotification('Модальное окно настроек пока не реализовано в HTML.');
        return;
    }
    modal.style.display = 'flex';

    // Здесь можно добавить логику для заполнения настроек (громкость, управление и т.д.)
    // Например, ползунок для громкости
    const volumeSlider = modal.querySelector('#volume-slider'); // Предполагается id="volume-slider"
    if (volumeSlider) {
        volumeSlider.value = AppState.settings.volume;
        volumeSlider.oninput = (e) => {
            AppState.settings.volume = parseInt(e.target.value);
            // Здесь можно обновить громкость звуков в приложении
            console.log('Громкость:', AppState.settings.volume);
            saveUserData();
        };
    }

    // Закрытие модального окна
    const closeModalBtn = modal.querySelector('.close-modal');
    if (closeModalBtn) {
        const oldCloseListener = closeModalBtn.__clickListener;
        if (oldCloseListener) {
            closeModalBtn.removeEventListener('click', oldCloseListener);
        }
        const newCloseListener = () => {
            modal.style.display = 'none';
        };
        closeModalBtn.addEventListener('click', newCloseListener);
        closeModalBtn.__clickListener = newCloseListener;
    }
}


// ======================
// УВЕДОМЛЕНИЯ
// ======================

// Показ всплывающего уведомления в верхней части экрана
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    
    const container = document.getElementById('notification-container');
    if (!container) {
        console.error('Элемент #notification-container не найден.');
        return;
    }
    container.appendChild(notification);
    
    // Анимация появления уведомления
    setTimeout(() => {
        notification.classList.add('show');
    }, 10); // Небольшая задержка для срабатывания CSS-перехода
    
    // Автоматическое скрытие уведомления через 5 секунд
    setTimeout(() => {
        notification.classList.remove('show'); // Запускаем анимацию исчезновения
        setTimeout(() => {
            notification.remove(); // Удаляем элемент из DOM после анимации
        }, 300); // Время должно соответствовать transition в CSS
    }, 5000);
}

// Приветственное уведомление при загрузке страницы
function showWelcomeBackNotification() {
    if (AppState.userData.username) {
        showNotification(`С возвращением, ${AppState.userData.username}!`);
    }
}

// ======================
// РЕЖИМЫ И ТЕМЫ (3D, VR, AR, Обучение, Работа, Развлечения)
// ======================

// Установка текущего режима метавселенной
function setMode(mode) {
    // Проверяем, существует ли такой режим в конфигурации и не является ли он уже активным
    if (!MetaverseConfig.modeSettings[mode] && mode !== null) {
        showNotification(`Режим "${mode}" не найден.`);
        return;
    }
    if (AppState.currentMode === mode) {
        showNotification(`Вы уже находитесь в режиме "${mode || '3D'}"`);
        return;
    }
    
    AppState.currentMode = mode; // Обновляем текущий режим
    
    // 1. Обновляем визуальную сцену в соответствии с новым режимом
    updateSceneForMode(mode);
    
    // 2. Записываем активность пользователя (какой режим был активирован)
    recordActivity(mode);
    
    // 3. Проверяем, не разблокированы ли новые достижения
    checkAchievements();
    
    // 4. Показываем уведомление о смене режима
    const modeDescription = mode ? MetaverseConfig.modeSettings[mode].description : 'Стандартный 3D режим';
    showNotification(`Активирован режим: ${modeDescription}`);

    // Обновляем активную кнопку режима в UI
    document.querySelectorAll('#mode-panel .mode-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    if (mode === null) { // Для стандартного 3D режима
        document.getElementById('3d-btn').classList.add('active');
    } else {
        const activeBtn = document.querySelector(`.action-btn[data-mode="${mode}"]`) || document.getElementById(`${mode}-btn`);
        if (activeBtn) {
            activeBtn.classList.add('active');
        }
    }
}

// Обновление сцены THREE.js в соответствии с выбранным режимом
function updateSceneForMode(mode) {
    const modeConfig = MetaverseConfig.modeSettings[mode];
    
    if (modeConfig) {
        // 1. Изменяем цвет фона сцены
        AppState.scene.background = new THREE.Color(modeConfig.background);
        
        // 2. Можно добавить логику для загрузки или изменения объектов в зависимости от режима
        // Например, если в режиме "learn" должны быть книги, а в "fun" - игры.
        // Пока мы просто меняем фон.
        
        // 3. Обновляем освещение для режима (если нужно)
        updateLightingForMode(mode);
    } else {
        // Если режим не задан (т.е. стандартный 3D), возвращаем фон по умолчанию
        AppState.scene.background = new THREE.Color(MetaverseConfig.themes.default.background);
        updateLightingForMode('default');
    }
}

// Обновление освещения для разных режимов
function updateLightingForMode(mode) {
    // Находим существующие источники света в сцене
    const ambientLight = AppState.scene.children.find(child => child instanceof THREE.AmbientLight);
    const directionalLight = AppState.scene.children.find(child => child instanceof THREE.DirectionalLight);
    const pointLight = AppState.scene.children.find(child => child instanceof THREE.PointLight);
    
    if (ambientLight) {
        switch (mode) {
            case 'learn':
                ambientLight.intensity = 0.6; // Немного ярче
                break;
            case 'work':
                ambientLight.intensity = 0.8; // Ярче
                break;
            case 'fun':
                ambientLight.intensity = 0.4; // Темнее, для атмосферы
                break;
            default:
                ambientLight.intensity = 0.5; // По умолчанию
        }
    }
    // Здесь можно настроить другие параметры света (цвет, позиция) для каждого режима
    if (directionalLight) {
        directionalLight.color.set(0xffffff); // Белый свет по умолчанию
        directionalLight.intensity = 0.8;
    }
    if (pointLight) {
        pointLight.color.set(0x4cc9f0); // Голубой свет по умолчанию
        pointLight.intensity = 1;
    }
}

// Обновление темы сцены (используется при инициализации)
function updateSceneTheme() {
    const theme = MetaverseConfig.themes[AppState.userData.theme || 'default'];
    if (AppState.scene) {
        AppState.scene.background = new THREE.Color(theme.background);
    }
    // Можно также обновить цвета UI-элементов, если они зависят от темы
    document.documentElement.style.setProperty('--primary-color', theme.primaryColor);
}

// ======================
// VR/AR ФУНКЦИИ
// ======================

// Переключение VR режима
function toggleVR() {
    if (!AppState.vrEnabled) {
        enableVR();
    } else {
        disableVR();
    }
}

// Включение VR режима
async function enableVR() {
    if (!('xr' in navigator)) {
        showNotification('WebXR (VR) не поддерживается вашим браузером или устройством.');
        return;
    }
    
    try {
        const supported = await navigator.xr.isSessionSupported('immersive-vr');
        if (supported) {
            const sessionInit = { optionalFeatures: ['local-floor', 'bounded-floor'] }; // Дополнительные возможности для VR
            const session = await navigator.xr.requestSession('immersive-vr', sessionInit);
            setupVRSession(session);
        } else {
            showNotification('VR режим не поддерживается вашим устройством.');
        }
    } catch (err) {
        console.error('Ошибка при запуске VR сессии:', err);
        showNotification('Не удалось запустить VR режим: ' + err.message);
    }
}

// Настройка VR сессии
function setupVRSession(session) {
    AppState.vrEnabled = true;
    document.getElementById('vr-btn').textContent = 'Выйти из VR';
    
    AppState.renderer.xr.setSession(session);
    AppState.renderer.xr.enabled = true;
    
    session.addEventListener('end', disableVR); // Слушаем событие окончания VR сессии
    
    setupVRControllers(); // Настраиваем VR-контроллеры
    
    showNotification('VR режим активирован!');
    unlockAchievement('vr_explorer'); // Разблокируем достижение
}

// Выключение VR режима
function disableVR() {
    if (AppState.renderer.xr.getSession()) {
        AppState.renderer.xr.getSession().end().catch(e => console.error("Ошибка завершения VR сессии:", e));
    }
    
    AppState.vrEnabled = false;
    document.getElementById('vr-btn').textContent = 'VR';
    AppState.renderer.xr.enabled = false;
    showNotification('VR режим деактивирован.');
}

// Настройка VR контроллеров (для взаимодействия в VR)
function setupVRControllers() {
    // Загрузчик моделей контроллеров
    const controllerModelFactory = new THREE.XRControllerModelFactory();
    
    for (let i = 0; i < 2; i++) { // Для левого и правого контроллера
        const controller = AppState.renderer.xr.getController(i);
        controller.addEventListener('selectstart', onVRSelectStart); // Нажатие кнопки
        controller.addEventListener('selectend', onVRSelectEnd);   // Отпускание кнопки
        AppState.scene.add(controller); // Добавляем контроллер в сцену

        // Добавляем 3D-модель контроллера, чтобы его было видно в VR
        const controllerGrip = AppState.renderer.xr.getControllerGrip(i);
        controllerGrip.add(controllerModelFactory.createControllerModel(controllerGrip));
        AppState.scene.add(controllerGrip);
    }
}

// Обработка нажатия кнопки на VR-контроллере
function onVRSelectStart(event) {
    const controller = event.target;
    // Определяем, с каким объектом в 3D-мире пересекается луч от контроллера
    const intersections = getControllerIntersections(controller);
    
    if (intersections.length > 0) {
        const object = intersections[0].object;
        if (object.userData.interactive) {
            handleObjectInteraction(object); // Обрабатываем взаимодействие с объектом
        }
    }
}

// Обработка отпускания кнопки на VR-контроллере
function onVRSelectEnd(event) {
    // Здесь можно добавить дополнительную логику, если нужно
}

// Получение пересечений луча от контроллера с объектами сцены
function getControllerIntersections(controller) {
    const tempMatrix = new THREE.Matrix4();
    tempMatrix.identity().extractRotation(controller.matrixWorld); // Получаем вращение контроллера
    
    const raycaster = new THREE.Raycaster();
    raycaster.ray.origin.setFromMatrixPosition(controller.matrixWorld); // Начало луча - позиция контроллера
    raycaster.ray.direction.set(0, 0, -1).applyMatrix4(tempMatrix); // Направление луча (вперед от контроллера)
    
    // Возвращаем объекты, с которыми пересекся луч
    return raycaster.intersectObjects(AppState.objects);
}

// AR реализация (дополнительно)
async function enableAR() {
    if (!('xr' in navigator)) {
        showNotification('WebXR (AR) не поддерживается вашим браузером или устройством.');
        return;
    }

    try {
        const session = await navigator.xr.requestSession('immersive-ar', { requiredFeatures: ['hit-test'] });
        setupARSession(session);
    } catch (err) {
        console.error('Ошибка при запуске AR сессии:', err);
        showNotification('Не удалось запустить AR режим: ' + err.message);
    }
}

function setupARSession(session) {
    AppState.arEnabled = true;
    document.getElementById('ar-btn').textContent = 'Выйти из AR';

    AppState.renderer.xr.setReferenceSpaceType('local'); // Тип пространства для AR
    AppState.renderer.xr.setSession(session);
    AppState.renderer.xr.enabled = true;

    session.addEventListener('end', disableAR);

    showNotification('AR режим активирован! Попробуйте нажать на поверхность для размещения объекта.');

    // Пример: размещение объекта при касании экрана в AR
    session.addEventListener('select', (event) => {
        if (event.inputSource.handedness === 'none') { // Если это касание экрана
            const raycaster = new THREE.Raycaster();
            const pointer = new THREE.Vector2();
            pointer.x = (event.frame.session.inputSources[0].gamepad.axes[2] * 0.5) + 0.5;
            pointer.y = (event.frame.session.inputSources[0].gamepad.axes[3] * 0.5) + 0.5;

            raycaster.setFromCamera(pointer, AppState.camera);
            const intersections = raycaster.intersectObjects(AppState.scene.children);

            if (intersections.length > 0) {
                const intersect = intersections[0];
                const arObject = new THREE.Mesh(
                    new THREE.BoxGeometry(0.1, 0.1, 0.1),
                    new THREE.MeshBasicMaterial({ color: Math.random() * 0xffffff })
                );
                arObject.position.copy(intersect.point).add(intersect.face.normal);
                arObject.lookAt(AppState.camera.position); // Поворачиваем к камере
                AppState.scene.add(arObject);
                showNotification('Объект добавлен в AR!');
            }
        }
    });
}

function disableAR() {
    if (AppState.renderer.xr.getSession()) {
        AppState.renderer.xr.getSession().end().catch(e => console.error("Ошибка завершения AR сессии:", e));
    }
    AppState.arEnabled = false;
    document.getElementById('ar-btn').textContent = 'AR';
    AppState.renderer.xr.enabled = false;
    showNotification('AR режим деактивирован.');
}


// ======================
// ВЗАИМОДЕЙСТВИЕ С ОБЪЕКТАМИ
// ======================

// Обработка кликов мышью по 3D-объектам
function onObjectClick(event) {
    // Если активен VR/AR режим, то клики мышью не обрабатываем
    if (AppState.vrEnabled || AppState.arEnabled) return;
    
    // Преобразуем координаты клика мыши в нормализованные координаты устройства (-1 до 1)
    const mouse = new THREE.Vector2(
        (event.clientX / window.innerWidth) * 2 - 1,
        -(event.clientY / window.innerHeight) * 2 + 1
    );
    
    const raycaster = new THREE.Raycaster();
    // Устанавливаем луч из камеры в направлении клика мыши
    raycaster.setFromCamera(mouse, AppState.camera);
    
    // Находим объекты, с которыми пересекается луч
    const intersections = raycaster.intersectObjects(AppState.objects);
    
    if (intersections.length > 0) {
        const object = intersections[0].object; // Берем первый (ближайший) объект
        if (object.userData.interactive) {
            handleObjectInteraction(object); // Обрабатываем взаимодействие
        }
    }
}

// Обработка взаимодействия с 3D-объектом
function handleObjectInteraction(obj) {
    // Проверяем, есть ли у объекта пользовательские данные о типе
    if (!obj.userData.type) return;
    
    // В зависимости от типа объекта выполняем разные действия
    switch (obj.userData.type) {
        case 'learn':
            setMode('learn'); // Переключаем режим на "обучение"
            break;
        case 'fun':
            setMode('fun'); // Переключаем режим на "развлечения"
            break;
        case 'work':
            setMode('work'); // Переключаем режим на "работа"
            break;
        case 'welcome':
            showNotification(`Привет, ${AppState.userData.username || 'друг'}! Вы кликнули на приветственный куб.`);
            break;
        default:
            showNotification(`Вы взаимодействуете с ${obj.userData.name || 'объектом'}`);
    }
}

// ======================
// АКТИВНОСТЬ И ДОСТИЖЕНИЯ
// ======================

// Запись активности пользователя (например, смена режима)
function recordActivity(mode) {
    AppState.userData.activityHistory.push({
        mode,
        timestamp: new Date().toISOString() // Записываем время активности
    });
    
    // Ограничиваем историю 100 последними записями, чтобы не переполнять хранилище
    if (AppState.userData.activityHistory.length > 100) {
        AppState.userData.activityHistory.shift(); // Удаляем самую старую запись
    }
    
    saveUserData(); // Сохраняем обновленные данные пользователя
}

// Проверка достижений на основе текущей активности пользователя
function checkAchievements() {
    // 1. Проверка первого использования режима обучения
    if (!AppState.userData.achievements.includes('first_learn') && 
        AppState.userData.activityHistory.some(a => a.mode === 'learn')) {
        unlockAchievement('first_learn');
    }
    
    // 2. Проверка использования всех режимов (обучение, работа, развлечения)
    const modes = Object.keys(MetaverseConfig.modeSettings);
    const allModesUsed = modes.every(mode => 
        AppState.userData.activityHistory.some(a => a.mode === mode)
    );
    
    if (allModesUsed && !AppState.userData.achievements.includes('all_modes')) {
        unlockAchievement('all_modes');
    }
    
    // 3. Проверка времени в сессии (более 1 часа)
    if (AppState.userData.stats.timeSpent >= 60 && 
        !AppState.userData.achievements.includes('long_session')) {
        unlockAchievement('long_session');
    }

    // 4. Проверка достижения "Игроман" уже есть в launchMiniGame
}

// Разблокировка достижения и показ уведомления
function unlockAchievement(id) {
    // Проверяем, существует ли такое достижение и не разблокировано ли оно уже
    if (!MetaverseConfig.achievements[id] || AppState.userData.achievements.includes(id)) {
        return;
    }
    
    AppState.userData.achievements.push(id); // Добавляем ID достижения в список разблокированных
    
    // Обновляем счетчик достижений в UI
    const achievementsCountElement = document.getElementById('achievements-count');
    if (achievementsCountElement) {
        achievementsCountElement.textContent = AppState.userData.achievements.length;
    }
    
    const achievement = MetaverseConfig.achievements[id];
    // Показываем красивое уведомление о получении достижения
    showNotification(
        `${achievement.icon || '🏆'} Достижение разблокировано: ${achievement.title}\n${achievement.description}`
    );
    
    saveUserData(); // Сохраняем данные пользователя
}

// ======================
// ЧАТ
// ======================

// Инициализация WebSocket для чата
function initWebSocket() {
    // Подключаемся к серверу Socket.IO. В реальном приложении здесь будет адрес твоего сервера.
    // Пока что это просто заглушка, так как у нас нет бэкенда.
    AppState.socket = io(); 

    AppState.socket.on('connect', () => {
        console.log('Подключено к WebSocket серверу.');
        showNotification('Чат подключен!');
    });

    AppState.socket.on('disconnect', () => {
        console.log('Отключено от WebSocket сервера.');
        showNotification('Чат отключен.');
    });

    // Пример обработки входящих сообщений (если бы был сервер)
    AppState.socket.on('message', (msg) => {
        console.log('Получено сообщение:', msg);
        AppState.chatMessages.push(msg);
        updateChatUI();
    });
}

// Отправка сообщения в чат
function sendChatMessage() {
    const input = document.getElementById('chat-input');
    if (!input) return;

    const message = input.value.trim();
    
    if (!message) return; // Не отправляем пустые сообщения
    
    // Создаем объект сообщения
    const newMessage = {
        sender: AppState.userData.username || 'Гость',
        text: message,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) // Форматируем время
    };
    
    // Добавляем сообщение в локальную историю чата
    AppState.chatMessages.push(newMessage);
    
    // Ограничиваем историю чата 100 последними сообщениями
    if (AppState.chatMessages.length > 100) {
        AppState.chatMessages.shift(); // Удаляем самое старое сообщение
    }
    
    // Обновляем интерфейс чата
    updateChatUI();
    
    // Очищаем поле ввода
    input.value = '';

    // Отправляем сообщение на сервер через WebSocket (если он подключен)
    if (AppState.socket && AppState.socket.connected) {
        AppState.socket.emit('sendMessage', newMessage);
    } else {
        showNotification('Не удалось отправить сообщение: нет подключения к чату.');
    }
}

// Обновление интерфейса чата (добавление новых сообщений)
function updateChatUI() {
    const chatMessagesContainer = document.getElementById('chat-messages');
    if (!chatMessagesContainer) return;

    chatMessagesContainer.innerHTML = ''; // Очищаем контейнер перед заполнением
    
    AppState.chatMessages.forEach(message => {
        const template = document.getElementById('message-template');
        const messageElement = template.content.cloneNode(true); // Клонируем шаблон
        
        // Аватар отправителя (первая буква имени)
        const avatar = messageElement.querySelector('.message-avatar');
        avatar.textContent = message.sender.charAt(0).toUpperCase();
        avatar.style.backgroundColor = stringToColor(message.sender);
        
        messageElement.querySelector('.message-sender').textContent = message.sender;
        messageElement.querySelector('.message-time').textContent = message.time;
        messageElement.querySelector('.message-text').textContent = message.text;
        
        chatMessagesContainer.appendChild(messageElement);
    });
    
    // Автоматическая прокрутка чата вниз к последнему сообщению
    chatMessagesContainer.scrollTop = chatMessagesContainer.scrollHeight;
}

// ======================
// ТАЙМЕР СЕССИИ И ПРОГРЕСС
// ======================

// Запуск таймера сессии для отслеживания времени, опыта и валюты
function startSessionTimer() {
    AppState.sessionStartTime = new Date(); // Записываем время начала сессии
    
    // Устанавливаем интервал для обновления каждую минуту
    AppState.sessionTimer = setInterval(() => {
        AppState.userData.stats.timeSpent += 1; // Увеличиваем проведенное время
        AppState.userData.stats.experience += MetaverseConfig.xpPerMinute; // Добавляем опыт
        AppState.userData.stats.currency += MetaverseConfig.currencyPerMinute; // Добавляем валюту

        // Проверяем, достаточно ли опыта для нового уровня
        const expNeededForNextLevel = calculateExpForNextLevel(AppState.userData.stats.level);
        if (AppState.userData.stats.experience >= expNeededForNextLevel) {
            AppState.userData.stats.level++; // Увеличиваем уровень
            AppState.userData.stats.experience -= expNeededForNextLevel; // Вычитаем опыт для текущего уровня
            showNotification(`Поздравляем! Вы достигли Уровня ${AppState.userData.stats.level}!`);
        }

        updateUI(); // Обновляем весь интерфейс
        
        // Автосохранение данных пользователя каждые 10 минут
        if (AppState.userData.stats.timeSpent % 10 === 0) {
            saveUserData();
            showNotification('Данные автоматически сохранены.');
        }
        
        checkAchievements(); // Проверяем достижения
    }, 60000); // Каждые 60 секунд (1 минута)
}

// ======================
// ИНВЕНТАРЬ И МАГАЗИН
// ======================

// Инициализация магазина (пока только заглушка)
function initShop() {
    // Здесь можно было бы загрузить товары из базы данных
    console.log('Магазин инициализирован. Доступные товары:', MetaverseConfig.shopItems);
}

// Показ модального окна инвентаря
function showInventoryModal() {
    const modal = document.getElementById('inventory-modal'); // Предполагается, что такой модал есть в HTML
    if (!modal) {
        showNotification('Модальное окно инвентаря пока не реализовано в HTML.');
        return;
    }
    modal.style.display = 'flex';

    const inventoryList = modal.querySelector('#inventory-list'); // Предполагается id="inventory-list"
    if (inventoryList) {
        inventoryList.innerHTML = '';
        if (AppState.inventory.length === 0) {
            inventoryList.innerHTML = '<p>Ваш инвентарь пуст.</p>';
        } else {
            AppState.inventory.forEach(item => {
                const itemDiv = document.createElement('div');
                itemDiv.textContent = `${item.name} (x${item.quantity})`;
                inventoryList.appendChild(itemDiv);
            });
        }
    }

    const closeModalBtn = modal.querySelector('.close-modal');
    if (closeModalBtn) {
        const oldCloseListener = closeModalBtn.__clickListener;
        if (oldCloseListener) {
            closeModalBtn.removeEventListener('click', oldCloseListener);
        }
        const newCloseListener = () => {
            modal.style.display = 'none';
        };
        closeModalBtn.addEventListener('click', newCloseListener);
        closeModalBtn.__clickListener = newCloseListener;
    }
}

// Показ модального окна магазина
function showShopModal() {
    const modal = document.getElementById('shop-modal'); // Предполагается, что такой модал есть в HTML
    if (!modal) {
        showNotification('Модальное окно магазина пока не реализовано в HTML.');
        return;
    }
    modal.style.display = 'flex';

    const shopItemsGrid = modal.querySelector('#shop-items-grid'); // Предполагается id="shop-items-grid"
    if (shopItemsGrid) {
        shopItemsGrid.innerHTML = '';
        MetaverseConfig.shopItems.forEach(item => {
            const itemCard = document.createElement('div');
            itemCard.className = 'shop-item-card';
            itemCard.innerHTML = `
                <h3>${item.name}</h3>
                <p>Цена: ${item.price} монет</p>
                <button data-item-id="${item.id}" class="buy-item-btn">Купить</button>
            `;
            shopItemsGrid.appendChild(itemCard);
        });

        // Обработчики для кнопок покупки
        shopItemsGrid.querySelectorAll('.buy-item-btn').forEach(button => {
            // Удаляем старые обработчики
            const oldBuyListener = button.__buyListener;
            if (oldBuyListener) {
                button.removeEventListener('click', oldBuyListener);
            }
            const newBuyListener = function() {
                const itemId = this.getAttribute('data-item-id');
                buyItem(itemId);
            };
            button.addEventListener('click', newBuyListener);
            button.__buyListener = newBuyListener;
        });
    }

    const closeModalBtn = modal.querySelector('.close-modal');
    if (closeModalBtn) {
        const oldCloseListener = closeModalBtn.__clickListener;
        if (oldCloseListener) {
            closeModalBtn.removeEventListener('click', oldCloseListener);
        }
        const newCloseListener = () => {
            modal.style.display = 'none';
        };
        closeModalBtn.addEventListener('click', newCloseListener);
        closeModalBtn.__clickListener = newCloseListener;
    }
}

// Функция покупки предмета
function buyItem(itemId) {
    const item = MetaverseConfig.shopItems.find(i => i.id === itemId);
    if (!item) {
        showNotification('Предмет не найден.');
        return;
    }

    if (AppState.userData.stats.currency >= item.price) {
        AppState.userData.stats.currency -= item.price; // Вычитаем стоимость
        // Добавляем предмет в инвентарь или применяем эффект
        // Для простоты, пока просто добавляем в инвентарь
        const existingItem = AppState.inventory.find(i => i.id === item.id);
        if (existingItem) {
            existingItem.quantity++;
        } else {
            AppState.inventory.push({ id: item.id, name: item.name, quantity: 1 });
        }
        saveUserData();
        updateUI();
        showNotification(`Вы купили ${item.name}!`);
        showShopModal(); // Обновляем магазин
    } else {
        showNotification('Недостаточно монет для покупки.');
    }
}


// ======================
// ПЕРЕМЕЩЕНИЕ И МИНИ-КАРТА
// ======================

// Обновление мини-карты на основе позиции игрока
function updateMiniMap() {
    const miniMap = document.getElementById('mini-map');
    if (!miniMap) return;

    // Очищаем мини-карту
    miniMap.innerHTML = '';
    
    // Создаем точку, представляющую игрока
    const playerDot = document.createElement('div');
    playerDot.className = 'player-dot';
    // Позиционируем точку на мини-карте (центр 50%, затем смещение)
    // Масштабируем позицию игрока (например, на 5% от размера карты на единицу 3D-пространства)
    playerDot.style.left = `${50 + AppState.playerPosition.x * 5}%`;
    playerDot.style.top = `${50 + AppState.playerPosition.z * 5}%`; // Используем Z для "вперед/назад"
    miniMap.appendChild(playerDot);
}

// Обработка движения игрока по нажатию клавиш
function handleMovement() {
    document.addEventListener('keydown', (e) => {
        const speed = 0.5; // Скорость перемещения
        let moved = false;

        // Перемещаем камеру и обновляем позицию игрока
        switch(e.key.toLowerCase()) { // Используем .toLowerCase() для удобства
            case 'w': // Вперед
                AppState.camera.position.z -= speed;
                AppState.playerPosition.z -= speed;
                moved = true;
                break;
            case 's': // Назад
                AppState.camera.position.z += speed;
                AppState.playerPosition.z += speed;
                moved = true;
                break;
            case 'a': // Влево
                AppState.camera.position.x -= speed;
                AppState.playerPosition.x -= speed;
                moved = true;
                break;
            case 'd': // Вправо
                AppState.camera.position.x += speed;
                AppState.playerPosition.x += speed;
                moved = true;
                break;
            case 'q': // Вверх (прыжок или полет)
                AppState.camera.position.y += speed;
                AppState.playerPosition.y += speed;
                moved = true;
                break;
            case 'e': // Вниз
                AppState.camera.position.y -= speed;
                AppState.playerPosition.y -= speed;
                moved = true;
                break;
        }

        // Если произошло движение, обновляем мини-карту и контролы камеры
        if (moved) {
            updateMiniMap();
            if (AppState.controls) {
                AppState.controls.target.copy(AppState.camera.position); // Центрируем OrbitControls на новой позиции
                AppState.controls.update();
            }
        }
    });
}

// ======================
// НАСТРОЙКА ОБРАБОТЧИКОВ СОБЫТИЙ
// ======================

function setupEventListeners() {
    // 1. Кнопки режимов (VR, AR, 3D)
    document.getElementById('vr-btn')?.addEventListener('click', toggleVR);
    document.getElementById('ar-btn')?.addEventListener('click', enableAR);
    document.getElementById('3d-btn')?.addEventListener('click', () => {
        setMode(null); // Сброс режима на стандартный 3D
    });
    document.getElementById('settings-btn')?.addEventListener('click', showSettingsModal); // Кнопка настроек
    
    // 2. Кнопки действий (Обучение, Работа, Развлечения, Друзья, Игры)
    document.querySelectorAll('.action-btn[data-mode]').forEach(btn => {
        btn.addEventListener('click', function() {
            const mode = this.getAttribute('data-mode');
            setMode(mode);
        });
    });
    
    document.getElementById('friends-btn')?.addEventListener('click', showFriendsModal);
    document.getElementById('games-btn')?.addEventListener('click', showGamesModal);
    
    // 3. Обработка кликов по 3D объектам
    // Используем `?.` для безопасного доступа, так как элементы могут быть не сразу доступны
    AppState.renderer?.domElement.addEventListener('click', onObjectClick, false);
    
    // 4. Отправка сообщений в чат
    document.getElementById('send-btn')?.addEventListener('click', sendChatMessage);
    document.getElementById('chat-input')?.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendChatMessage();
        }
    });
    
    // 5. Клик по аватару для изменения
    document.getElementById('avatar-container')?.addEventListener('click', showAvatarModal);
    
    // 6. Клик по счетчику достижений
    document.getElementById('achievements-count')?.addEventListener('click', showAchievementsModal);

    // 7. Клик по инвентарю (если есть)
    document.getElementById('inventory-btn')?.addEventListener('click', showInventoryModal); // Предполагается, что есть такая кнопка

    // 8. Клик по магазину (если есть)
    document.getElementById('shop-btn')?.addEventListener('click', showShopModal); // Предполагается, что есть такая кнопка

    // 9. Обработка движения игрока (клавиши WASDQE)
    handleMovement();
    
    // 10. Обработка выхода из страницы (сохранение данных)
    window.addEventListener('beforeunload', () => {
        if (AppState.sessionTimer) {
            clearInterval(AppState.sessionTimer); // Останавливаем таймер
        }
        saveUserData(); // Сохраняем данные перед закрытием
        console.log("Данные сохранены перед выходом.");
    });

    // Проверяем, нужно ли показать модал имени пользователя при первом запуске
    if (!AppState.userData.username) {
        showUsernameModal();
    }
}

// Инициализация звуков (заглушка)
function initSounds() {
    console.log('Инициализация звуков...');
    // Здесь можно было бы загрузить и настроить аудио
}
