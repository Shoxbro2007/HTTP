// Конфигурация метавселенной
const MetaverseConfig = {
    // Цветовые темы
    themes: {
        default: { background: 0x1a1a2e, primaryColor: '#4cc9f0' },
        nature: { background: 0x1b5e20, primaryColor: '#2ecc71' },
        tech: { background: 0x0d47a1, primaryColor: '#3498db' },
        dark: { background: 0x111111, primaryColor: '#9b59b6' },
        light: { background: 0xf5f5f5, primaryColor: '#2980b9' }
    },
    
    // Варианты аватаров
    avatarOptions: [
        'https://cdn-icons-png.flaticon.com/512/4333/4333609.png',
        'https://cdn-icons-png.flaticon.com/512/3667/3667325.png',
        'https://cdn-icons-png.flaticon.com/512/4140/4140048.png'
    ],
    
    // Настройки режимов
    modeSettings: {
        learn: { 
            background: 0x1a237e, 
            objects: ['book', 'laptop', 'blackboard'],
            description: 'Режим обучения и развития'
        },
        work: { 
            background: 0x263238, 
            objects: ['desk', 'computer', 'chart'],
            description: 'Рабочее пространство'
        },
        fun: { 
            background: 0x4a148c, 
            objects: ['gamepad', 'ball', 'dancefloor'],
            description: 'Зона развлечений'
        }
    },
    
    // Достижения
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
        }
    }
};

// Состояние приложения
const AppState = {
    // THREE.js элементы
    scene: null,
    camera: null,
    renderer: null,
    
    // Состояние VR
    vrEnabled: false,
    
    // Текущий режим
    currentMode: null,
    
    // Данные пользователя
    userData: {
        username: '',
        avatar: '',
        theme: 'default',
        interests: [],
        achievements: [],
        stats: {
            timeSpent: 0,    // В минутах
            lastLogin: null
        },
        activityHistory: []
    },
    
    // 3D объекты на сцене
    objects: [],
    
    // Время начала сессии
    sessionStartTime: null,
    
    // WebSocket соединение
    socket: null
};

// Инициализация приложения при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    initApp();
});

// Основная функция инициализации
function initApp() {
    // 1. Загружаем данные пользователя
    loadUserData();
    
    // 2. Показываем экран загрузки
    showLoadingScreen(() => {
        // 3. Инициализируем 3D сцену
        init3DScene();
        
        // 4. Настраиваем обработчики событий
        setupEventListeners();
        
        // 5. Если первый вход, показываем модальное окно
        if (!AppState.userData.username) {
            showUsernameModal();
        } else {
            showWelcomeBackNotification();
        }
        
        // 6. Запускаем таймер сессии
        startSessionTimer();
    });
}

// ======================
// ФУНКЦИИ ИНИЦИАЛИЗАЦИИ
// ======================

// Показ экрана загрузки
function showLoadingScreen(callback) {
    const loadingScreen = document.getElementById('loading-screen');
    loadingScreen.style.opacity = '1';
    loadingScreen.style.display = 'flex';
    
    setTimeout(() => {
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.style.display = 'none';
            callback();
        }, 1000);
    }, 2000);
}

// Инициализация 3D сцены
function init3DScene() {
    // 1. Создаем сцену
    AppState.scene = new THREE.Scene();
    updateSceneTheme();
    
    // 2. Настраиваем камеру
    AppState.camera = new THREE.PerspectiveCamera(
        75, 
        window.innerWidth / window.innerHeight, 
        0.1, 
        1000
    );
    AppState.camera.position.z = 5;
    
    // 3. Создаем рендерер
    AppState.renderer = new THREE.WebGLRenderer({ 
        antialias: true,
        alpha: true
    });
    AppState.renderer.setSize(window.innerWidth, window.innerHeight);
    AppState.renderer.setPixelRatio(window.devicePixelRatio);
    document.getElementById('metaverse-container').appendChild(AppState.renderer.domElement);
    
    // 4. Добавляем освещение
    addBasicLights();
    
    // 5. Добавляем стандартные объекты
    addDefaultObjects();
    
    // 6. Обработка изменения размера окна
    window.addEventListener('resize', handleWindowResize);
    
    // 7. Запускаем анимацию
    animate();
}

// Добавление освещения
function addBasicLights() {
    // 1. Фоновое освещение
    const ambientLight = new THREE.AmbientLight(0x404040, 0.5);
    AppState.scene.add(ambientLight);
    
    // 2. Направленный свет
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(1, 1, 1);
    AppState.scene.add(directionalLight);
    
    // 3. Точечный свет
    const pointLight = new THREE.PointLight(0x4cc9f0, 1, 10);
    pointLight.position.set(0, 2, 2);
    AppState.scene.add(pointLight);
}

// Добавление стандартных объектов
function addDefaultObjects() {
    // 1. Центральный куб
    const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
    const cubeMaterial = new THREE.MeshPhongMaterial({ 
        color: 0x4cc9f0,
        shininess: 100
    });
    const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    cube.userData = { 
        interactive: true, 
        type: 'welcome',
        name: 'Приветственный куб'
    };
    AppState.scene.add(cube);
    AppState.objects.push(cube);
    
    // 2. Сфера для обучения
    const sphereGeometry = new THREE.SphereGeometry(0.5, 32, 32);
    const sphereMaterial = new THREE.MeshPhongMaterial({ 
        color: 0xf72585,
        emissive: 0xff0066,
        emissiveIntensity: 0.2
    });
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    sphere.position.set(-2, 0, 0);
    sphere.userData = { 
        interactive: true, 
        type: 'learn',
        name: 'Сфера знаний'
    };
    AppState.scene.add(sphere);
    AppState.objects.push(sphere);
    
    // 3. Тор для развлечений
    const torusGeometry = new THREE.TorusGeometry(0.5, 0.2, 16, 100);
    const torusMaterial = new THREE.MeshPhongMaterial({ 
        color: 0x7209b7,
        specular: 0xffffff
    });
    const torus = new THREE.Mesh(torusGeometry, torusMaterial);
    torus.position.set(2, 0, 0);
    torus.userData = { 
        interactive: true, 
        type: 'fun',
        name: 'Кольцо развлечений'
    };
    AppState.scene.add(torus);
    AppState.objects.push(torus);
}

// ======================
// ОСНОВНЫЕ ФУНКЦИИ
// ======================

// Главный цикл анимации
function animate() {
    requestAnimationFrame(animate);
    
    // Вращение интерактивных объектов
    AppState.objects.forEach(obj => {
        if (obj.userData.interactive) {
            obj.rotation.x += 0.005;
            obj.rotation.y += 0.01;
        }
    });
    
    // Рендеринг сцены
    AppState.renderer.render(AppState.scene, AppState.camera);
    
    // Обновление VR сессии, если активна
    if (AppState.vrEnabled && AppState.renderer.xr.isPresenting) {
        AppState.renderer.xr.update();
    }
}

// Обработка изменения размера окна
function handleWindowResize() {
    AppState.camera.aspect = window.innerWidth / window.innerHeight;
    AppState.camera.updateProjectionMatrix();
    AppState.renderer.setSize(window.innerWidth, window.innerHeight);
}

// ======================
// РАБОТА С ПОЛЬЗОВАТЕЛЕМ
// ======================

// Загрузка данных пользователя
function loadUserData() {
    const savedData = localStorage.getItem('metaverseUserData');
    
    if (savedData) {
        try {
            AppState.userData = JSON.parse(savedData);
            AppState.userData.stats.lastLogin = new Date().toISOString();
            updateUI();
        } catch (error) {
            console.error('Ошибка загрузки данных:', error);
            resetUserData();
        }
    } else {
        resetUserData();
    }
}

// Сброс данных пользователя
function resetUserData() {
    AppState.userData = {
        username: '',
        avatar: '',
        theme: 'default',
        interests: [],
        achievements: [],
        stats: {
            timeSpent: 0,
            lastLogin: new Date().toISOString()
        },
        activityHistory: []
    };
}

// Сохранение данных пользователя
function saveUserData() {
    localStorage.setItem('metaverseUserData', JSON.stringify(AppState.userData));
}

// Обновление интерфейса
function updateUI() {
    // 1. Имя пользователя
    const userInfoElement = document.getElementById('user-info');
    if (AppState.userData.username) {
        userInfoElement.textContent = AppState.userData.username;
    } else {
        userInfoElement.textContent = 'Гость';
    }
    
    // 2. Аватар
    updateAvatarUI();
    
    // 3. Достижения
    document.getElementById('achievements-count').textContent = 
        AppState.userData.achievements.length;
    
    // 4. Время в метавселенной
    updateTimeSpentUI();
}

// Обновление аватара в UI
function updateAvatarUI() {
    const avatarElement = document.getElementById('avatar');
    
    if (AppState.userData.avatar) {
        avatarElement.innerHTML = `<img src="${AppState.userData.avatar}" alt="Аватар">`;
    } else if (AppState.userData.username) {
        avatarElement.textContent = AppState.userData.username.charAt(0).toUpperCase();
        avatarElement.style.backgroundColor = stringToColor(AppState.userData.username);
    } else {
        avatarElement.textContent = '?';
        avatarElement.style.backgroundColor = '#4cc9f0';
    }
}

// Генерация цвета из строки
function stringToColor(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    
    const color = `hsl(${hash % 360}, 70%, 60%)`;
    return color;
}

// Обновление времени в UI
function updateTimeSpentUI() {
    const hours = Math.floor(AppState.userData.stats.timeSpent / 60);
    const minutes = AppState.userData.stats.timeSpent % 60;
    document.getElementById('time-spent').textContent = 
        `${hours > 0 ? `${hours}h ` : ''}${minutes}m`;
}

// ======================
// МОДАЛЬНЫЕ ОКНА
// ======================

// Показ модального окна с именем пользователя
function showUsernameModal() {
    const username = prompt('Добро пожаловать в метавселенную!\nКак вас зовут?', 'Гость');
    
    if (username !== null) {
        AppState.userData.username = username || 'Гость';
        saveUserData();
        updateUI();
        showAvatarModal();
    }
}

// Показ модального окна аватара
function showAvatarModal() {
    const modal = document.getElementById('avatar-modal');
    modal.style.display = 'flex';
    
    // Обработка выбора стандартного аватара
    document.querySelectorAll('.avatar-option').forEach(option => {
        option.addEventListener('click', function() {
            const avatarIndex = parseInt(this.getAttribute('data-avatar')) - 1;
            setAvatar(MetaverseConfig.avatarOptions[avatarIndex]);
        });
    });
    
    // Обработка кастомного аватара
    document.getElementById('set-custom-avatar').addEventListener('click', () => {
        const url = document.getElementById('custom-avatar-url').value.trim();
        if (url) {
            setAvatar(url);
        } else {
            showNotification('Пожалуйста, введите URL аватара');
        }
    });
    
    // Закрытие модального окна
    document.getElementById('close-avatar-modal').addEventListener('click', () => {
        modal.style.display = 'none';
        showWelcomeBackNotification();
    });
}

// Установка аватара
function setAvatar(url) {
    // Проверка URL
    if (!url.match(/^https?:\/\/.+\..+/)) {
        showNotification('Некорректный URL аватара');
        return;
    }
    
    // Предварительная загрузка изображения
    const img = new Image();
    img.onload = () => {
        AppState.userData.avatar = url;
        saveUserData();
        updateAvatarUI();
        showNotification('Аватар успешно установлен!');
    };
    img.onerror = () => {
        showNotification('Не удалось загрузить изображение');
    };
    img.src = url;
}

// ======================
// УВЕДОМЛЕНИЯ
// ======================

// Показ уведомления
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    
    const container = document.getElementById('notification-container');
    container.appendChild(notification);
    
    // Анимация появления
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    // Автоматическое скрытие через 5 секунд
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 5000);
}

// Приветственное уведомление
function showWelcomeBackNotification() {
    if (AppState.userData.username) {
        showNotification(`С возвращением, ${AppState.userData.username}!`);
    }
}

// ======================
// РЕЖИМЫ И ТЕМЫ
// ======================

// Установка режима
function setMode(mode) {
    if (!MetaverseConfig.modeSettings[mode] || AppState.currentMode === mode) return;
    
    AppState.currentMode = mode;
    
    // 1. Обновляем сцену
    updateSceneForMode(mode);
    
    // 2. Записываем активность
    recordActivity(mode);
    
    // 3. Проверяем достижения
    checkAchievements();
    
    // 4. Показываем описание режима
    showNotification(MetaverseConfig.modeSettings[mode].description);
}

// Обновление сцены для режима
function updateSceneForMode(mode) {
    const modeConfig = MetaverseConfig.modeSettings[mode];
    
    if (modeConfig) {
        // 1. Изменяем фон
        AppState.scene.background = new THREE.Color(modeConfig.background);
        
        // 2. Обновляем освещение
        updateLightingForMode(mode);
        
        // 3. Можно добавить другие изменения сцены
    }
}

// Обновление освещения для режима
function updateLightingForMode(mode) {
    // Здесь можно настроить разное освещение для разных режимов
    const ambientLight = AppState.scene.children.find(child => 
        child instanceof THREE.AmbientLight
    );
    
    if (ambientLight) {
        switch (mode) {
            case 'learn':
                ambientLight.intensity = 0.6;
                break;
            case 'work':
                ambientLight.intensity = 0.8;
                break;
            case 'fun':
                ambientLight.intensity = 0.4;
                break;
            default:
                ambientLight.intensity = 0.5;
        }
    }
}

// Обновление темы сцены
function updateSceneTheme() {
    const theme = MetaverseConfig.themes[AppState.userData.theme || 'default'];
    AppState.scene.background = new THREE.Color(theme.background);
}

// ======================
// VR ФУНКЦИИ
// ======================

// Переключение VR режима
function toggleVR() {
    if (!AppState.vrEnabled) {
        enableVR();
    } else {
        disableVR();
    }
}

// Включение VR
function enableVR() {
    if (!('xr' in navigator)) {
        showNotification('WebXR не поддерживается вашим браузером');
        return;
    }
    
    navigator.xr.isSessionSupported('immersive-vr').then(supported => {
        if (supported) {
            const sessionInit = { optionalFeatures: ['local-floor'] };
            
            navigator.xr.requestSession('immersive-vr', sessionInit)
                .then(session => {
                    setupVRSession(session);
                })
                .catch(err => {
                    console.error('Ошибка VR сессии:', err);
                    showNotification('Не удалось запустить VR');
                });
        } else {
            showNotification('VR не поддерживается вашим устройством');
        }
    });
}

// Настройка VR сессии
function setupVRSession(session) {
    AppState.vrEnabled = true;
    document.getElementById('vr-btn').textContent = 'Выйти из VR';
    
    // 1. Настройка рендерера для VR
    AppState.renderer.xr.setSession(session);
    AppState.renderer.xr.enabled = true;
    
    // 2. Обработка окончания сессии
    session.addEventListener('end', disableVR);
    
    // 3. Настройка контроллеров
    setupVRControllers();
    
    // 4. Уведомление и достижение
    showNotification('VR режим активирован!');
    unlockAchievement('vr_explorer');
}

// Выключение VR
function disableVR() {
    if (AppState.renderer.xr.getSession()) {
        AppState.renderer.xr.getSession().end();
    }
    
    AppState.vrEnabled = false;
    document.getElementById('vr-btn').textContent = 'VR';
    AppState.renderer.xr.enabled = false;
}

// Настройка VR контроллеров
function setupVRControllers() {
    const controllerModelFactory = new THREE.XRControllerModelFactory();
    
    for (let i = 0; i < 2; i++) {
        const controller = AppState.renderer.xr.getController(i);
        controller.addEventListener('selectstart', onVRSelectStart);
        controller.addEventListener('selectend', onVRSelectEnd);
        AppState.scene.add(controller);
        
        const controllerGrip = AppState.renderer.xr.getControllerGrip(i);
        controllerGrip.add(controllerModelFactory.createControllerModel(controllerGrip));
        AppState.scene.add(controllerGrip);
    }
}

// Обработка нажатия в VR
function onVRSelectStart(event) {
    const controller = event.target;
    const intersections = getControllerIntersections(controller);
    
    if (intersections.length > 0) {
        const object = intersections[0].object;
        if (object.userData.interactive) {
            handleObjectInteraction(object);
        }
    }
}

// Обработка отпускания в VR
function onVRSelectEnd(event) {
    // Можно добавить дополнительную логику
}

// Получение пересечений контроллера
function getControllerIntersections(controller) {
    const tempMatrix = new THREE.Matrix4();
    tempMatrix.identity().extractRotation(controller.matrixWorld);
    
    const raycaster = new THREE.Raycaster();
    raycaster.ray.origin.setFromMatrixPosition(controller.matrixWorld);
    raycaster.ray.direction.set(0, 0, -1).applyMatrix4(tempMatrix);
    
    return raycaster.intersectObjects(AppState.objects);
}

// ======================
// ВЗАИМОДЕЙСТВИЕ С ОБЪЕКТАМИ
// ======================

// Обработка кликов по объектам
function onObjectClick(event) {
    if (AppState.vrEnabled) return;
    
    const mouse = new THREE.Vector2(
        (event.clientX / window.innerWidth) * 2 - 1,
        -(event.clientY / window.innerHeight) * 2 + 1
    );
    
    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(mouse, AppState.camera);
    
    const intersections = raycaster.intersectObjects(AppState.objects);
    
    if (intersections.length > 0) {
        const object = intersections[0].object;
        if (object.userData.interactive) {
            handleObjectInteraction(object);
        }
    }
}

// Обработка взаимодействия с объектом
function handleObjectInteraction(obj) {
    if (!obj.userData.type) return;
    
    switch (obj.userData.type) {
        case 'learn':
            setMode('learn');
            showNotification('Добро пожаловать в зону обучения!');
            break;
        case 'fun':
            setMode('fun');
            showNotification('Время развлечений!');
            break;
        case 'work':
            setMode('work');
            showNotification('Режим работы активирован');
            break;
        case 'welcome':
            showNotification(`Привет, ${AppState.userData.username || 'друг'}!`);
            break;
        default:
            showNotification(`Вы взаимодействуете с ${obj.userData.name || 'объектом'}`);
    }
}

// ======================
// АКТИВНОСТЬ И ДОСТИЖЕНИЯ
// ======================

// Запись активности
function recordActivity(mode) {
    AppState.userData.activityHistory.push({
        mode,
        timestamp: new Date().toISOString()
    });
    
    // Ограничиваем историю 100 последними записями
    if (AppState.userData.activityHistory.length > 100) {
        AppState.userData.activityHistory.shift();
    }
    
    saveUserData();
}

// Проверка достижений
function checkAchievements() {
    // 1. Проверка первого использования режима обучения
    if (!AppState.userData.achievements.includes('first_learn') && 
        AppState.userData.activityHistory.some(a => a.mode === 'learn')) {
        unlockAchievement('first_learn');
    }
    
    // 2. Проверка использования всех режимов
    const modes = Object.keys(MetaverseConfig.modeSettings);
    const allModesUsed = modes.every(mode => 
        AppState.userData.activityHistory.some(a => a.mode === mode)
    );
    
    if (allModesUsed && !AppState.userData.achievements.includes('all_modes')) {
        unlockAchievement('all_modes');
    }
    
    // 3. Проверка времени в сессии
    if (AppState.userData.stats.timeSpent >= 60 && 
        !AppState.userData.achievements.includes('long_session')) {
        unlockAchievement('long_session');
    }
}

// Разблокировка достижения
function unlockAchievement(id) {
    if (!MetaverseConfig.achievements[id] || 
        AppState.userData.achievements.includes(id)) {
        return;
    }
    
    AppState.userData.achievements.push(id);
    document.getElementById('achievements-count').textContent = 
        AppState.userData.achievements.length;
    
    const achievement = MetaverseConfig.achievements[id];
    showNotification(
        `${achievement.icon || '🏆'} Достижение: ${achievement.title}\n${achievement.description}`
    );
    
    saveUserData();
}

// ======================
// ТАЙМЕР СЕССИИ
// ======================

// Запуск таймера сессии
function startSessionTimer() {
    AppState.sessionStartTime = new Date();
    
    // Обновляем каждую минуту
    AppState.sessionTimer = setInterval(() => {
        AppState.userData.stats.timeSpent += 1;
        updateTimeSpentUI();
        
        // Автосохранение каждые 10 минут
        if (AppState.userData.stats.timeSpent % 10 === 0) {
            saveUserData();
        }
        
        // Проверка достижений
        checkAchievements();
    }, 60000);
}

// ======================
// НАСТРОЙКА ОБРАБОТЧИКОВ СОБЫТИЙ
// ======================

function setupEventListeners() {
    // 1. Кнопки режимов
    document.getElementById('vr-btn').addEventListener('click', toggleVR);
    document.getElementById('ar-btn').addEventListener('click', () => {
        showNotification('AR режим в разработке');
    });
    document.getElementById('3d-btn').addEventListener('click', () => {
        setMode(null); // Сброс режима
        showNotification('Стандартный 3D режим');
    });
    
    // 2. Кнопки действий
    document.querySelectorAll('.action-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const mode = this.getAttribute('data-mode');
            setMode(mode);
        });
    });
    
    // 3. Обработка кликов по 3D объектам
    window.addEventListener('click', onObjectClick, false);
    
    // 4. Обработка выхода
    window.addEventListener('beforeunload', () => {
        clearInterval(AppState.sessionTimer);
        saveUserData();
    });
}

// ======================
// ЗАПУСК ПРИЛОЖЕНИЯ
// ======================

// Инициализация уже запускается через DOMContentLoaded