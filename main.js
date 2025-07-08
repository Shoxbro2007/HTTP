// Конфигурация метавселенной

// Состояние приложения

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
        if (!({
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
                    timeSpent: 0, // В минутах
                    lastLogin: null
                },
                activityHistory: [],
                friends: [],
                gamesPlayed: []
            },

            // 3D объекты на сцене
            objects: [],

            // Время начала сессии
            sessionStartTime: null,

            // WebSocket соединение
            socket: null,

            // Сообщения чата
            chatMessages: []
        }).userData.username) {
            showUsernameModal();
        } else {
            showWelcomeBackNotification();
        }
        
        // 6. Запускаем таймер сессии
        startSessionTimer();
        
        // 7. Инициализируем чат
        updateChatUI();
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
    
    // Анимация прогресс-бара
    let progress = 0;
    const progressInterval = setInterval(() => {
        progress += 5;
        document.getElementById('loading-bar').style.width = `${progress}%`;
        
        if (progress >= 100) {
            clearInterval(progressInterval);
            setTimeout(() => {
                loadingScreen.style.opacity = '0';
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                    callback();
                }, 1000);
            }, 300);
        }
    }, 100);
}

// Инициализация 3D сцены
function init3DScene() {
    // 1. Создаем сцену
    ({
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
                timeSpent: 0, // В минутах
                lastLogin: null
            },
            activityHistory: [],
            friends: [],
            gamesPlayed: []
        },

        // 3D объекты на сцене
        objects: [],

        // Время начала сессии
        sessionStartTime: null,

        // WebSocket соединение
        socket: null,

        // Сообщения чата
        chatMessages: []
    }).scene = new THREE.Scene();
    updateSceneTheme();
    
    // 2. Настраиваем камеру
    ({
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
                timeSpent: 0, // В минутах
                lastLogin: null
            },
            activityHistory: [],
            friends: [],
            gamesPlayed: []
        },

        // 3D объекты на сцене
        objects: [],

        // Время начала сессии
        sessionStartTime: null,

        // WebSocket соединение
        socket: null,

        // Сообщения чата
        chatMessages: []
    }).camera = new THREE.PerspectiveCamera(
        75, 
        window.innerWidth / window.innerHeight, 
        0.1, 
        1000
    );
    ({
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
                timeSpent: 0, // В минутах
                lastLogin: null
            },
            activityHistory: [],
            friends: [],
            gamesPlayed: []
        },

        // 3D объекты на сцене
        objects: [],

        // Время начала сессии
        sessionStartTime: null,

        // WebSocket соединение
        socket: null,

        // Сообщения чата
        chatMessages: []
    }).camera.position.z = 5;
    
    // 3. Создаем рендерер
    ({
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
                timeSpent: 0, // В минутах
                lastLogin: null
            },
            activityHistory: [],
            friends: [],
            gamesPlayed: []
        },

        // 3D объекты на сцене
        objects: [],

        // Время начала сессии
        sessionStartTime: null,

        // WebSocket соединение
        socket: null,

        // Сообщения чата
        chatMessages: []
    }).renderer = new THREE.WebGLRenderer({ 
        antialias: true,
        alpha: true
    });
    ({
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
                timeSpent: 0, // В минутах
                lastLogin: null
            },
            activityHistory: [],
            friends: [],
            gamesPlayed: []
        },

        // 3D объекты на сцене
        objects: [],

        // Время начала сессии
        sessionStartTime: null,

        // WebSocket соединение
        socket: null,

        // Сообщения чата
        chatMessages: []
    }).renderer.setSize(window.innerWidth, window.innerHeight);
    ({
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
                timeSpent: 0, // В минутах
                lastLogin: null
            },
            activityHistory: [],
            friends: [],
            gamesPlayed: []
        },

        // 3D объекты на сцене
        objects: [],

        // Время начала сессии
        sessionStartTime: null,

        // WebSocket соединение
        socket: null,

        // Сообщения чата
        chatMessages: []
    }).renderer.setPixelRatio(window.devicePixelRatio);
    document.getElementById('metaverse-container').appendChild(({
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
                    timeSpent: 0, // В минутах
                    lastLogin: null
                },
                activityHistory: [],
                friends: [],
                gamesPlayed: []
            },

            // 3D объекты на сцене
            objects: [],

            // Время начала сессии
            sessionStartTime: null,

            // WebSocket соединение
            socket: null,

            // Сообщения чата
            chatMessages: []
        }).renderer.domElement);
    
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
    ({
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
                timeSpent: 0, // В минутах
                lastLogin: null
            },
            activityHistory: [],
            friends: [],
            gamesPlayed: []
        },

        // 3D объекты на сцене
        objects: [],

        // Время начала сессии
        sessionStartTime: null,

        // WebSocket соединение
        socket: null,

        // Сообщения чата
        chatMessages: []
    }).scene.add(ambientLight);
    
    // 2. Направленный свет
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(1, 1, 1);
    ({
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
                timeSpent: 0, // В минутах
                lastLogin: null
            },
            activityHistory: [],
            friends: [],
            gamesPlayed: []
        },

        // 3D объекты на сцене
        objects: [],

        // Время начала сессии
        sessionStartTime: null,

        // WebSocket соединение
        socket: null,

        // Сообщения чата
        chatMessages: []
    }).scene.add(directionalLight);
    
    // 3. Точечный свет
    const pointLight = new THREE.PointLight(0x4cc9f0, 1, 10);
    pointLight.position.set(0, 2, 2);
    ({
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
                timeSpent: 0, // В минутах
                lastLogin: null
            },
            activityHistory: [],
            friends: [],
            gamesPlayed: []
        },

        // 3D объекты на сцене
        objects: [],

        // Время начала сессии
        sessionStartTime: null,

        // WebSocket соединение
        socket: null,

        // Сообщения чата
        chatMessages: []
    }).scene.add(pointLight);
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
    ({
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
                timeSpent: 0, // В минутах
                lastLogin: null
            },
            activityHistory: [],
            friends: [],
            gamesPlayed: []
        },

        // 3D объекты на сцене
        objects: [],

        // Время начала сессии
        sessionStartTime: null,

        // WebSocket соединение
        socket: null,

        // Сообщения чата
        chatMessages: []
    }).scene.add(cube);
    ({
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
                timeSpent: 0, // В минутах
                lastLogin: null
            },
            activityHistory: [],
            friends: [],
            gamesPlayed: []
        },

        // 3D объекты на сцене
        objects: [],

        // Время начала сессии
        sessionStartTime: null,

        // WebSocket соединение
        socket: null,

        // Сообщения чата
        chatMessages: []
    }).objects.push(cube);
    
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
    ({
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
                timeSpent: 0, // В минутах
                lastLogin: null
            },
            activityHistory: [],
            friends: [],
            gamesPlayed: []
        },

        // 3D объекты на сцене
        objects: [],

        // Время начала сессии
        sessionStartTime: null,

        // WebSocket соединение
        socket: null,

        // Сообщения чата
        chatMessages: []
    }).scene.add(sphere);
    ({
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
                timeSpent: 0, // В минутах
                lastLogin: null
            },
            activityHistory: [],
            friends: [],
            gamesPlayed: []
        },

        // 3D объекты на сцене
        objects: [],

        // Время начала сессии
        sessionStartTime: null,

        // WebSocket соединение
        socket: null,

        // Сообщения чата
        chatMessages: []
    }).objects.push(sphere);
    
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
    ({
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
                timeSpent: 0, // В минутах
                lastLogin: null
            },
            activityHistory: [],
            friends: [],
            gamesPlayed: []
        },

        // 3D объекты на сцене
        objects: [],

        // Время начала сессии
        sessionStartTime: null,

        // WebSocket соединение
        socket: null,

        // Сообщения чата
        chatMessages: []
    }).scene.add(torus);
    ({
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
                timeSpent: 0, // В минутах
                lastLogin: null
            },
            activityHistory: [],
            friends: [],
            gamesPlayed: []
        },

        // 3D объекты на сцене
        objects: [],

        // Время начала сессии
        sessionStartTime: null,

        // WebSocket соединение
        socket: null,

        // Сообщения чата
        chatMessages: []
    }).objects.push(torus);
}

// ======================
// ОСНОВНЫЕ ФУНКЦИИ
// ======================

// Главный цикл анимации
function animate() {
    requestAnimationFrame(animate);
    
    // Вращение интерактивных объектов
    ({
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
                timeSpent: 0, // В минутах
                lastLogin: null
            },
            activityHistory: [],
            friends: [],
            gamesPlayed: []
        },

        // 3D объекты на сцене
        objects: [],

        // Время начала сессии
        sessionStartTime: null,

        // WebSocket соединение
        socket: null,

        // Сообщения чата
        chatMessages: []
    }).objects.forEach(obj => {
        if (obj.userData.interactive) {
            obj.rotation.x += 0.005;
            obj.rotation.y += 0.01;
        }
    });
    
    // Рендеринг сцены
    ({
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
                timeSpent: 0, // В минутах
                lastLogin: null
            },
            activityHistory: [],
            friends: [],
            gamesPlayed: []
        },

        // 3D объекты на сцене
        objects: [],

        // Время начала сессии
        sessionStartTime: null,

        // WebSocket соединение
        socket: null,

        // Сообщения чата
        chatMessages: []
    }).renderer.render(({
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
                    timeSpent: 0, // В минутах
                    lastLogin: null
                },
                activityHistory: [],
                friends: [],
                gamesPlayed: []
            },

            // 3D объекты на сцене
            objects: [],

            // Время начала сессии
            sessionStartTime: null,

            // WebSocket соединение
            socket: null,

            // Сообщения чата
            chatMessages: []
        }).scene, ({
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
                    timeSpent: 0, // В минутах
                    lastLogin: null
                },
                activityHistory: [],
                friends: [],
                gamesPlayed: []
            },

            // 3D объекты на сцене
            objects: [],

            // Время начала сессии
            sessionStartTime: null,

            // WebSocket соединение
            socket: null,

            // Сообщения чата
            chatMessages: []
        }).camera);
    
    // Обновление VR сессии, если активна
    if (({
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
                timeSpent: 0, // В минутах
                lastLogin: null
            },
            activityHistory: [],
            friends: [],
            gamesPlayed: []
        },

        // 3D объекты на сцене
        objects: [],

        // Время начала сессии
        sessionStartTime: null,

        // WebSocket соединение
        socket: null,

        // Сообщения чата
        chatMessages: []
    }).vrEnabled && ({
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
                timeSpent: 0, // В минутах
                lastLogin: null
            },
            activityHistory: [],
            friends: [],
            gamesPlayed: []
        },

        // 3D объекты на сцене
        objects: [],

        // Время начала сессии
        sessionStartTime: null,

        // WebSocket соединение
        socket: null,

        // Сообщения чата
        chatMessages: []
    }).renderer.xr.isPresenting) {
        ({
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
                    timeSpent: 0, // В минутах
                    lastLogin: null
                },
                activityHistory: [],
                friends: [],
                gamesPlayed: []
            },

            // 3D объекты на сцене
            objects: [],

            // Время начала сессии
            sessionStartTime: null,

            // WebSocket соединение
            socket: null,

            // Сообщения чата
            chatMessages: []
        }).renderer.xr.update();
    }
}

// Обработка изменения размера окна
function handleWindowResize() {
    ({
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
                timeSpent: 0, // В минутах
                lastLogin: null
            },
            activityHistory: [],
            friends: [],
            gamesPlayed: []
        },

        // 3D объекты на сцене
        objects: [],

        // Время начала сессии
        sessionStartTime: null,

        // WebSocket соединение
        socket: null,

        // Сообщения чата
        chatMessages: []
    }).camera.aspect = window.innerWidth / window.innerHeight;
    ({
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
                timeSpent: 0, // В минутах
                lastLogin: null
            },
            activityHistory: [],
            friends: [],
            gamesPlayed: []
        },

        // 3D объекты на сцене
        objects: [],

        // Время начала сессии
        sessionStartTime: null,

        // WebSocket соединение
        socket: null,

        // Сообщения чата
        chatMessages: []
    }).camera.updateProjectionMatrix();
    ({
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
                timeSpent: 0, // В минутах
                lastLogin: null
            },
            activityHistory: [],
            friends: [],
            gamesPlayed: []
        },

        // 3D объекты на сцене
        objects: [],

        // Время начала сессии
        sessionStartTime: null,

        // WebSocket соединение
        socket: null,

        // Сообщения чата
        chatMessages: []
    }).renderer.setSize(window.innerWidth, window.innerHeight);
}

// ======================
// РАБОТА С ПОЛЬЗОВАТЕЛЕМ
// ======================

// Загрузка данных пользователя
function loadUserData() {
    const savedData = localStorage.getItem('metaverseUserData');
    
    if (savedData) {
        try {
            ({
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
                        timeSpent: 0, // В минутах
                        lastLogin: null
                    },
                    activityHistory: [],
                    friends: [],
                    gamesPlayed: []
                },

                // 3D объекты на сцене
                objects: [],

                // Время начала сессии
                sessionStartTime: null,

                // WebSocket соединение
                socket: null,

                // Сообщения чата
                chatMessages: []
            }).userData = JSON.parse(savedData);
            ({
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
                        timeSpent: 0, // В минутах
                        lastLogin: null
                    },
                    activityHistory: [],
                    friends: [],
                    gamesPlayed: []
                },

                // 3D объекты на сцене
                objects: [],

                // Время начала сессии
                sessionStartTime: null,

                // WebSocket соединение
                socket: null,

                // Сообщения чата
                chatMessages: []
            }).userData.stats.lastLogin = new Date().toISOString();
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
    ({
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
                timeSpent: 0, // В минутах
                lastLogin: null
            },
            activityHistory: [],
            friends: [],
            gamesPlayed: []
        },

        // 3D объекты на сцене
        objects: [],

        // Время начала сессии
        sessionStartTime: null,

        // WebSocket соединение
        socket: null,

        // Сообщения чата
        chatMessages: []
    }).userData = {
        username: '',
        avatar: '',
        theme: 'default',
        interests: [],
        achievements: [],
        stats: {
            timeSpent: 0,
            lastLogin: new Date().toISOString()
        },
        activityHistory: [],
        friends: [],
        gamesPlayed: []
    };
}

// Сохранение данных пользователя
function saveUserData() {
    localStorage.setItem('metaverseUserData', JSON.stringify(({
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
                    timeSpent: 0, // В минутах
                    lastLogin: null
                },
                activityHistory: [],
                friends: [],
                gamesPlayed: []
            },

            // 3D объекты на сцене
            objects: [],

            // Время начала сессии
            sessionStartTime: null,

            // WebSocket соединение
            socket: null,

            // Сообщения чата
            chatMessages: []
        }).userData));
}

// Обновление интерфейса
function updateUI() {
    // 1. Имя пользователя
    const userInfoElement = document.getElementById('user-info');
    if (({
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
                timeSpent: 0, // В минутах
                lastLogin: null
            },
            activityHistory: [],
            friends: [],
            gamesPlayed: []
        },

        // 3D объекты на сцене
        objects: [],

        // Время начала сессии
        sessionStartTime: null,

        // WebSocket соединение
        socket: null,

        // Сообщения чата
        chatMessages: []
    }).userData.username) {
        userInfoElement.textContent = ({
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
                    timeSpent: 0, // В минутах
                    lastLogin: null
                },
                activityHistory: [],
                friends: [],
                gamesPlayed: []
            },

            // 3D объекты на сцене
            objects: [],

            // Время начала сессии
            sessionStartTime: null,

            // WebSocket соединение
            socket: null,

            // Сообщения чата
            chatMessages: []
        }).userData.username;
    } else {
        userInfoElement.textContent = 'Гость';
    }
    
    // 2. Аватар
    updateAvatarUI();
    
    // 3. Достижения
    document.getElementById('achievements-count').textContent = 
        ({
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
                    timeSpent: 0, // В минутах
                    lastLogin: null
                },
                activityHistory: [],
                friends: [],
                gamesPlayed: []
            },

            // 3D объекты на сцене
            objects: [],

            // Время начала сессии
            sessionStartTime: null,

            // WebSocket соединение
            socket: null,

            // Сообщения чата
            chatMessages: []
        }).userData.achievements.length;
    
    // 4. Время в метавселенной
    updateTimeSpentUI();
    
    // 5. Друзья онлайн
    updateFriendsOnline();
}

// Обновление аватара в UI
function updateAvatarUI() {
    const avatarElement = document.getElementById('avatar');
    
    if (({
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
                timeSpent: 0, // В минутах
                lastLogin: null
            },
            activityHistory: [],
            friends: [],
            gamesPlayed: []
        },

        // 3D объекты на сцене
        objects: [],

        // Время начала сессии
        sessionStartTime: null,

        // WebSocket соединение
        socket: null,

        // Сообщения чата
        chatMessages: []
    }).userData.avatar) {
        avatarElement.innerHTML = `<img src="${({
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
                    timeSpent: 0, // В минутах
                    lastLogin: null
                },
                activityHistory: [],
                friends: [],
                gamesPlayed: []
            },

            // 3D объекты на сцене
            objects: [],

            // Время начала сессии
            sessionStartTime: null,

            // WebSocket соединение
            socket: null,

            // Сообщения чата
            chatMessages: []
        }).userData.avatar}" alt="Аватар">`;
    } else if (({
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
                timeSpent: 0, // В минутах
                lastLogin: null
            },
            activityHistory: [],
            friends: [],
            gamesPlayed: []
        },

        // 3D объекты на сцене
        objects: [],

        // Время начала сессии
        sessionStartTime: null,

        // WebSocket соединение
        socket: null,

        // Сообщения чата
        chatMessages: []
    }).userData.username) {
        avatarElement.textContent = ({
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
                    timeSpent: 0, // В минутах
                    lastLogin: null
                },
                activityHistory: [],
                friends: [],
                gamesPlayed: []
            },

            // 3D объекты на сцене
            objects: [],

            // Время начала сессии
            sessionStartTime: null,

            // WebSocket соединение
            socket: null,

            // Сообщения чата
            chatMessages: []
        }).userData.username.charAt(0).toUpperCase();
        avatarElement.style.backgroundColor = stringToColor(({
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
                        timeSpent: 0, // В минутах
                        lastLogin: null
                    },
                    activityHistory: [],
                    friends: [],
                    gamesPlayed: []
                },

                // 3D объекты на сцене
                objects: [],

                // Время начала сессии
                sessionStartTime: null,

                // WebSocket соединение
                socket: null,

                // Сообщения чата
                chatMessages: []
            }).userData.username);
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
    const hours = Math.floor(({
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
                    timeSpent: 0, // В минутах
                    lastLogin: null
                },
                activityHistory: [],
                friends: [],
                gamesPlayed: []
            },

            // 3D объекты на сцене
            objects: [],

            // Время начала сессии
            sessionStartTime: null,

            // WebSocket соединение
            socket: null,

            // Сообщения чата
            chatMessages: []
        }).userData.stats.timeSpent / 60);
    const minutes = ({
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
                timeSpent: 0, // В минутах
                lastLogin: null
            },
            activityHistory: [],
            friends: [],
            gamesPlayed: []
        },

        // 3D объекты на сцене
        objects: [],

        // Время начала сессии
        sessionStartTime: null,

        // WebSocket соединение
        socket: null,

        // Сообщения чата
        chatMessages: []
    }).userData.stats.timeSpent % 60;
    document.getElementById('time-spent').textContent = 
        `${hours > 0 ? `${hours}h ` : ''}${minutes}m`;
}

// Обновление счетчика друзей онлайн
function updateFriendsOnline() {
    const onlineFriends = ({
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
                timeSpent: 0, // В минутах
                lastLogin: null
            },
            activityHistory: [],
            friends: [],
            gamesPlayed: []
        },

        // 3D объекты на сцене
        objects: [],

        // Время начала сессии
        sessionStartTime: null,

        // WebSocket соединение
        socket: null,

        // Сообщения чата
        chatMessages: []
    }).userData.friends.filter(friend => friend.status === 'онлайн');
    document.getElementById('friends-online').textContent = onlineFriends.length;
}

// ======================
// МОДАЛЬНЫЕ ОКНА
// ======================

// Показ модального окна с именем пользователя
function showUsernameModal() {
    const username = prompt('Добро пожаловать в метавселенную!\nКак вас зовут?', 'Гость');
    
    if (username !== null) {
        ({
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
                    timeSpent: 0, // В минутах
                    lastLogin: null
                },
                activityHistory: [],
                friends: [],
                gamesPlayed: []
            },

            // 3D объекты на сцене
            objects: [],

            // Время начала сессии
            sessionStartTime: null,

            // WebSocket соединение
            socket: null,

            // Сообщения чата
            chatMessages: []
        }).userData.username = username || 'Гость';
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
            setAvatar(({
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
                    }
                }).avatarOptions[avatarIndex]);
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
        ({
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
                    timeSpent: 0, // В минутах
                    lastLogin: null
                },
                activityHistory: [],
                friends: [],
                gamesPlayed: []
            },

            // 3D объекты на сцене
            objects: [],

            // Время начала сессии
            sessionStartTime: null,

            // WebSocket соединение
            socket: null,

            // Сообщения чата
            chatMessages: []
        }).userData.avatar = url;
        saveUserData();
        updateAvatarUI();
        showNotification('Аватар успешно установлен!');
    };
    img.onerror = () => {
        showNotification('Не удалось загрузить изображение');
    };
    img.src = url;
}

// Показ модального окна друзей
function showFriendsModal() {
    const modal = document.getElementById('friends-modal');
    modal.style.display = 'flex';
    
    // Заполнение списка друзей
    const friendsList = document.getElementById('friends-list');
    friendsList.innerHTML = '';
    
    ({
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
                timeSpent: 0, // В минутах
                lastLogin: null
            },
            activityHistory: [],
            friends: [],
            gamesPlayed: []
        },

        // 3D объекты на сцене
        objects: [],

        // Время начала сессии
        sessionStartTime: null,

        // WebSocket соединение
        socket: null,

        // Сообщения чата
        chatMessages: []
    }).userData.friends.forEach(friend => {
        const friendTemplate = document.getElementById('friend-template');
        const friendElement = friendTemplate.content.cloneNode(true);
        
        // Аватар друга
        const avatar = friendElement.querySelector('.friend-avatar');
        avatar.textContent = friend.name.charAt(0).toUpperCase();
        avatar.style.backgroundColor = stringToColor(friend.name);
        
        friendElement.querySelector('.friend-name').textContent = friend.name;
        friendElement.querySelector('.friend-status').textContent = friend.status;
        
        // Кнопка чата с другом
        friendElement.querySelector('.chat-with-friend').addEventListener('click', () => {
            const chatInput = document.getElementById('chat-input');
            chatInput.value = `@${friend.name} `;
            chatInput.focus();
            modal.style.display = 'none';
            showNotification(`Начат чат с ${friend.name}`);
        });
        
        friendsList.appendChild(friendElement);
    });
    
    // Добавление друга
    document.getElementById('add-friend-btn').addEventListener('click', addFriend);
    
    // Закрытие модального окна
    document.querySelector('#friends-modal .close-modal').addEventListener('click', () => {
        modal.style.display = 'none';
    });
}

// Добавление друга
function addFriend() {
    const friendNameInput = document.getElementById('friend-username');
    const friendName = friendNameInput.value.trim();
    
    if (!friendName) {
        showNotification('Введите имя друга');
        return;
    }
    
    // Проверка на дубликат
    if (({
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
                timeSpent: 0, // В минутах
                lastLogin: null
            },
            activityHistory: [],
            friends: [],
            gamesPlayed: []
        },

        // 3D объекты на сцене
        objects: [],

        // Время начала сессии
        sessionStartTime: null,

        // WebSocket соединение
        socket: null,

        // Сообщения чата
        chatMessages: []
    }).userData.friends.some(f => f.name === friendName)) {
        showNotification('Этот друг уже добавлен');
        return;
    }
    
    // Добавление друга
    ({
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
                timeSpent: 0, // В минутах
                lastLogin: null
            },
            activityHistory: [],
            friends: [],
            gamesPlayed: []
        },

        // 3D объекты на сцене
        objects: [],

        // Время начала сессии
        sessionStartTime: null,

        // WebSocket соединение
        socket: null,

        // Сообщения чата
        chatMessages: []
    }).userData.friends.push({
        name: friendName,
        status: Math.random() > 0.5 ? 'онлайн' : 'офлайн'
    });
    
    saveUserData();
    updateUI();
    showFriendsModal();
    friendNameInput.value = '';
    
    // Разблокировка достижения
    if (({
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
                timeSpent: 0, // В минутах
                lastLogin: null
            },
            activityHistory: [],
            friends: [],
            gamesPlayed: []
        },

        // 3D объекты на сцене
        objects: [],

        // Время начала сессии
        sessionStartTime: null,

        // WebSocket соединение
        socket: null,

        // Сообщения чата
        chatMessages: []
    }).userData.friends.length === 1) {
        unlockAchievement('socializer');
    }
}

// Показ модального окна мини-игр
function showGamesModal() {
    const modal = document.getElementById('games-modal');
    modal.style.display = 'flex';
    
    // Обработка выбора игры
    document.querySelectorAll('.game-card').forEach(card => {
        card.addEventListener('click', function() {
            const game = this.getAttribute('data-game');
            launchMiniGame(game);
            modal.style.display = 'none';
        });
    });
    
    // Закрытие модального окна
    document.querySelector('#games-modal .close-modal').addEventListener('click', () => {
        modal.style.display = 'none';
    });
}

// Запуск мини-игры
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
    }
    
    // Добавление в историю игр
    if (!({
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
                timeSpent: 0, // В минутах
                lastLogin: null
            },
            activityHistory: [],
            friends: [],
            gamesPlayed: []
        },

        // 3D объекты на сцене
        objects: [],

        // Время начала сессии
        sessionStartTime: null,

        // WebSocket соединение
        socket: null,

        // Сообщения чата
        chatMessages: []
    }).userData.gamesPlayed.includes(game)) {
        ({
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
                    timeSpent: 0, // В минутах
                    lastLogin: null
                },
                activityHistory: [],
                friends: [],
                gamesPlayed: []
            },

            // 3D объекты на сцене
            objects: [],

            // Время начала сессии
            sessionStartTime: null,

            // WebSocket соединение
            socket: null,

            // Сообщения чата
            chatMessages: []
        }).userData.gamesPlayed.push(game);
        saveUserData();
        
        // Проверка достижений
        if (({
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
                    timeSpent: 0, // В минутах
                    lastLogin: null
                },
                activityHistory: [],
                friends: [],
                gamesPlayed: []
            },

            // 3D объекты на сцене
            objects: [],

            // Время начала сессии
            sessionStartTime: null,

            // WebSocket соединение
            socket: null,

            // Сообщения чата
            chatMessages: []
        }).userData.gamesPlayed.length === 3) {
            unlockAchievement('gamer');
        }
    }
    
    showNotification(`Запуск игры: ${gameName}`);
}

// Показ модального окна достижений
function showAchievementsModal() {
    const modal = document.getElementById('achievements-modal');
    modal.style.display = 'flex';
    
    const achievementsList = document.getElementById('achievements-list');
    achievementsList.innerHTML = '';
    
    // Отображение всех достижений
    Object.entries(({
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
            }
        }).achievements).forEach(([id, achievement]) => {
        const template = document.getElementById('achievement-template');
        const achievementElement = template.content.cloneNode(true);
        
        const unlocked = ({
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
                    timeSpent: 0, // В минутах
                    lastLogin: null
                },
                activityHistory: [],
                friends: [],
                gamesPlayed: []
            },

            // 3D объекты на сцене
            objects: [],

            // Время начала сессии
            sessionStartTime: null,

            // WebSocket соединение
            socket: null,

            // Сообщения чата
            chatMessages: []
        }).userData.achievements.includes(id);
        
        achievementElement.querySelector('.achievement-icon').textContent = 
            unlocked ? achievement.icon : '🔒';
            
        achievementElement.querySelector('.achievement-title').textContent = 
            unlocked ? achievement.title : 'Заблокировано';
            
        achievementElement.querySelector('.achievement-description').textContent = 
            unlocked ? achievement.description : 'Достижение еще не получено';
            
        achievementsList.appendChild(achievementElement);
    });
    
    // Закрытие модального окна
    document.querySelector('#achievements-modal .close-modal').addEventListener('click', () => {
        modal.style.display = 'none';
    });
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
    if (({
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
                timeSpent: 0, // В минутах
                lastLogin: null
            },
            activityHistory: [],
            friends: [],
            gamesPlayed: []
        },

        // 3D объекты на сцене
        objects: [],

        // Время начала сессии
        sessionStartTime: null,

        // WebSocket соединение
        socket: null,

        // Сообщения чата
        chatMessages: []
    }).userData.username) {
        showNotification(`С возвращением, ${({
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
                        timeSpent: 0, // В минутах
                        lastLogin: null
                    },
                    activityHistory: [],
                    friends: [],
                    gamesPlayed: []
                },

                // 3D объекты на сцене
                objects: [],

                // Время начала сессии
                sessionStartTime: null,

                // WebSocket соединение
                socket: null,

                // Сообщения чата
                chatMessages: []
            }).userData.username}!`);
    }
}

// ======================
// РЕЖИМЫ И ТЕМЫ
// ======================

// Установка режима
function setMode(mode) {
    if (!({
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
        }
    }).modeSettings[mode] || ({
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
                    timeSpent: 0, // В минутах
                    lastLogin: null
                },
                activityHistory: [],
                friends: [],
                gamesPlayed: []
            },

            // 3D объекты на сцене
            objects: [],

            // Время начала сессии
            sessionStartTime: null,

            // WebSocket соединение
            socket: null,

            // Сообщения чата
            chatMessages: []
        }).currentMode === mode) return;
    
    ({
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
                timeSpent: 0, // В минутах
                lastLogin: null
            },
            activityHistory: [],
            friends: [],
            gamesPlayed: []
        },

        // 3D объекты на сцене
        objects: [],

        // Время начала сессии
        sessionStartTime: null,

        // WebSocket соединение
        socket: null,

        // Сообщения чата
        chatMessages: []
    }).currentMode = mode;
    
    // 1. Обновляем сцену
    updateSceneForMode(mode);
    
    // 2. Записываем активность
    recordActivity(mode);
    
    // 3. Проверяем достижения
    checkAchievements();
    
    // 4. Показываем описание режима
    showNotification(({
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
            }
        }).modeSettings[mode].description);
}

// Обновление сцены для режима
function updateSceneForMode(mode) {
    const modeConfig = ({
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
        }
    }).modeSettings[mode];
    
    if (modeConfig) {
        // 1. Изменяем фон
        ({
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
                    timeSpent: 0, // В минутах
                    lastLogin: null
                },
                activityHistory: [],
                friends: [],
                gamesPlayed: []
            },

            // 3D объекты на сцене
            objects: [],

            // Время начала сессии
            sessionStartTime: null,

            // WebSocket соединение
            socket: null,

            // Сообщения чата
            chatMessages: []
        }).scene.background = new THREE.Color(modeConfig.background);
        
        // 2. Обновляем освещение
        updateLightingForMode(mode);
        
        // 3. Можно добавить другие изменения сцены
    }
}

// Обновление освещения для режима
function updateLightingForMode(mode) {
    // Здесь можно настроить разное освещение для разных режимов
    const ambientLight = ({
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
                timeSpent: 0, // В минутах
                lastLogin: null
            },
            activityHistory: [],
            friends: [],
            gamesPlayed: []
        },

        // 3D объекты на сцене
        objects: [],

        // Время начала сессии
        sessionStartTime: null,

        // WebSocket соединение
        socket: null,

        // Сообщения чата
        chatMessages: []
    }).scene.children.find(child => 
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
    const theme = ({
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
        }
    }).themes[({
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
                    timeSpent: 0, // В минутах
                    lastLogin: null
                },
                activityHistory: [],
                friends: [],
                gamesPlayed: []
            },

            // 3D объекты на сцене
            objects: [],

            // Время начала сессии
            sessionStartTime: null,

            // WebSocket соединение
            socket: null,

            // Сообщения чата
            chatMessages: []
        }).userData.theme || 'default'];
    ({
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
                timeSpent: 0, // В минутах
                lastLogin: null
            },
            activityHistory: [],
            friends: [],
            gamesPlayed: []
        },

        // 3D объекты на сцене
        objects: [],

        // Время начала сессии
        sessionStartTime: null,

        // WebSocket соединение
        socket: null,

        // Сообщения чата
        chatMessages: []
    }).scene.background = new THREE.Color(theme.background);
}

// ======================
// VR ФУНКЦИИ
// ======================

// Переключение VR режима
function toggleVR() {
    if (!({
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
                timeSpent: 0, // В минутах
                lastLogin: null
            },
            activityHistory: [],
            friends: [],
            gamesPlayed: []
        },

        // 3D объекты на сцене
        objects: [],

        // Время начала сессии
        sessionStartTime: null,

        // WebSocket соединение
        socket: null,

        // Сообщения чата
        chatMessages: []
    }).vrEnabled) {
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
    ({
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
                timeSpent: 0, // В минутах
                lastLogin: null
            },
            activityHistory: [],
            friends: [],
            gamesPlayed: []
        },

        // 3D объекты на сцене
        objects: [],

        // Время начала сессии
        sessionStartTime: null,

        // WebSocket соединение
        socket: null,

        // Сообщения чата
        chatMessages: []
    }).vrEnabled = true;
    document.getElementById('vr-btn').textContent = 'Выйти из VR';
    
    // 1. Настройка рендерера для VR
    ({
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
                timeSpent: 0, // В минутах
                lastLogin: null
            },
            activityHistory: [],
            friends: [],
            gamesPlayed: []
        },

        // 3D объекты на сцене
        objects: [],

        // Время начала сессии
        sessionStartTime: null,

        // WebSocket соединение
        socket: null,

        // Сообщения чата
        chatMessages: []
    }).renderer.xr.setSession(session);
    ({
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
                timeSpent: 0, // В минутах
                lastLogin: null
            },
            activityHistory: [],
            friends: [],
            gamesPlayed: []
        },

        // 3D объекты на сцене
        objects: [],

        // Время начала сессии
        sessionStartTime: null,

        // WebSocket соединение
        socket: null,

        // Сообщения чата
        chatMessages: []
    }).renderer.xr.enabled = true;
    
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
    if (({
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
                timeSpent: 0, // В минутах
                lastLogin: null
            },
            activityHistory: [],
            friends: [],
            gamesPlayed: []
        },

        // 3D объекты на сцене
        objects: [],

        // Время начала сессии
        sessionStartTime: null,

        // WebSocket соединение
        socket: null,

        // Сообщения чата
        chatMessages: []
    }).renderer.xr.getSession()) {
        ({
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
                    timeSpent: 0, // В минутах
                    lastLogin: null
                },
                activityHistory: [],
                friends: [],
                gamesPlayed: []
            },

            // 3D объекты на сцене
            objects: [],

            // Время начала сессии
            sessionStartTime: null,

            // WebSocket соединение
            socket: null,

            // Сообщения чата
            chatMessages: []
        }).renderer.xr.getSession().end();
    }
    
    ({
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
                timeSpent: 0, // В минутах
                lastLogin: null
            },
            activityHistory: [],
            friends: [],
            gamesPlayed: []
        },

        // 3D объекты на сцене
        objects: [],

        // Время начала сессии
        sessionStartTime: null,

        // WebSocket соединение
        socket: null,

        // Сообщения чата
        chatMessages: []
    }).vrEnabled = false;
    document.getElementById('vr-btn').textContent = 'VR';
    ({
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
                timeSpent: 0, // В минутах
                lastLogin: null
            },
            activityHistory: [],
            friends: [],
            gamesPlayed: []
        },

        // 3D объекты на сцене
        objects: [],

        // Время начала сессии
        sessionStartTime: null,

        // WebSocket соединение
        socket: null,

        // Сообщения чата
        chatMessages: []
    }).renderer.xr.enabled = false;
}

// Настройка VR контроллеров
function setupVRControllers() {
    const controllerModelFactory = new THREE.XRControllerModelFactory();
    
    for (let i = 0; i < 2; i++) {
        const controller = ({
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
                    timeSpent: 0, // В минутах
                    lastLogin: null
                },
                activityHistory: [],
                friends: [],
                gamesPlayed: []
            },

            // 3D объекты на сцене
            objects: [],

            // Время начала сессии
            sessionStartTime: null,

            // WebSocket соединение
            socket: null,

            // Сообщения чата
            chatMessages: []
        }).renderer.xr.getController(i);
        controller.addEventListener('selectstart', onVRSelectStart);
        controller.addEventListener('selectend', onVRSelectEnd);
        ({
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
                    timeSpent: 0, // В минутах
                    lastLogin: null
                },
                activityHistory: [],
                friends: [],
                gamesPlayed: []
            },

            // 3D объекты на сцене
            objects: [],

            // Время начала сессии
            sessionStartTime: null,

            // WebSocket соединение
            socket: null,

            // Сообщения чата
            chatMessages: []
        }).scene.add(controller);
        
        const controllerGrip = ({
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
                    timeSpent: 0, // В минутах
                    lastLogin: null
                },
                activityHistory: [],
                friends: [],
                gamesPlayed: []
            },

            // 3D объекты на сцене
            objects: [],

            // Время начала сессии
            sessionStartTime: null,

            // WebSocket соединение
            socket: null,

            // Сообщения чата
            chatMessages: []
        }).renderer.xr.getControllerGrip(i);
        controllerGrip.add(controllerModelFactory.createControllerModel(controllerGrip));
        ({
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
                    timeSpent: 0, // В минутах
                    lastLogin: null
                },
                activityHistory: [],
                friends: [],
                gamesPlayed: []
            },

            // 3D объекты на сцене
            objects: [],

            // Время начала сессии
            sessionStartTime: null,

            // WebSocket соединение
            socket: null,

            // Сообщения чата
            chatMessages: []
        }).scene.add(controllerGrip);
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
    
    return raycaster.intersectObjects(({
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
                    timeSpent: 0, // В минутах
                    lastLogin: null
                },
                activityHistory: [],
                friends: [],
                gamesPlayed: []
            },

            // 3D объекты на сцене
            objects: [],

            // Время начала сессии
            sessionStartTime: null,

            // WebSocket соединение
            socket: null,

            // Сообщения чата
            chatMessages: []
        }).objects);
}

// ======================
// ВЗАИМОДЕЙСТВИЕ С ОБЪЕКТАМИ
// ======================

// Обработка кликов по объектам
function onObjectClick(event) {
    if (({
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
                timeSpent: 0, // В минутах
                lastLogin: null
            },
            activityHistory: [],
            friends: [],
            gamesPlayed: []
        },

        // 3D объекты на сцене
        objects: [],

        // Время начала сессии
        sessionStartTime: null,

        // WebSocket соединение
        socket: null,

        // Сообщения чата
        chatMessages: []
    }).vrEnabled) return;
    
    const mouse = new THREE.Vector2(
        (event.clientX / window.innerWidth) * 2 - 1,
        -(event.clientY / window.innerHeight) * 2 + 1
    );
    
    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(mouse, ({
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
                    timeSpent: 0, // В минутах
                    lastLogin: null
                },
                activityHistory: [],
                friends: [],
                gamesPlayed: []
            },

            // 3D объекты на сцене
            objects: [],

            // Время начала сессии
            sessionStartTime: null,

            // WebSocket соединение
            socket: null,

            // Сообщения чата
            chatMessages: []
        }).camera);
    
    const intersections = raycaster.intersectObjects(({
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
                    timeSpent: 0, // В минутах
                    lastLogin: null
                },
                activityHistory: [],
                friends: [],
                gamesPlayed: []
            },

            // 3D объекты на сцене
            objects: [],

            // Время начала сессии
            sessionStartTime: null,

            // WebSocket соединение
            socket: null,

            // Сообщения чата
            chatMessages: []
        }).objects);
    
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
            showNotification(`Привет, ${({
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
                            timeSpent: 0, // В минутах
                            lastLogin: null
                        },
                        activityHistory: [],
                        friends: [],
                        gamesPlayed: []
                    },

                    // 3D объекты на сцене
                    objects: [],

                    // Время начала сессии
                    sessionStartTime: null,

                    // WebSocket соединение
                    socket: null,

                    // Сообщения чата
                    chatMessages: []
                }).userData.username || 'друг'}!`);
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
    ({
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
                timeSpent: 0, // В минутах
                lastLogin: null
            },
            activityHistory: [],
            friends: [],
            gamesPlayed: []
        },

        // 3D объекты на сцене
        objects: [],

        // Время начала сессии
        sessionStartTime: null,

        // WebSocket соединение
        socket: null,

        // Сообщения чата
        chatMessages: []
    }).userData.activityHistory.push({
        mode,
        timestamp: new Date().toISOString()
    });
    
    // Ограничиваем историю 100 последними записями
    if (({
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
                timeSpent: 0, // В минутах
                lastLogin: null
            },
            activityHistory: [],
            friends: [],
            gamesPlayed: []
        },

        // 3D объекты на сцене
        objects: [],

        // Время начала сессии
        sessionStartTime: null,

        // WebSocket соединение
        socket: null,

        // Сообщения чата
        chatMessages: []
    }).userData.activityHistory.length > 100) {
        ({
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
                    timeSpent: 0, // В минутах
                    lastLogin: null
                },
                activityHistory: [],
                friends: [],
                gamesPlayed: []
            },

            // 3D объекты на сцене
            objects: [],

            // Время начала сессии
            sessionStartTime: null,

            // WebSocket соединение
            socket: null,

            // Сообщения чата
            chatMessages: []
        }).userData.activityHistory.shift();
    }
    
    saveUserData();
}

// Проверка достижений
function checkAchievements() {
    // 1. Проверка первого использования режима обучения
    if (!({
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
                timeSpent: 0, // В минутах
                lastLogin: null
            },
            activityHistory: [],
            friends: [],
            gamesPlayed: []
        },

        // 3D объекты на сцене
        objects: [],

        // Время начала сессии
        sessionStartTime: null,

        // WebSocket соединение
        socket: null,

        // Сообщения чата
        chatMessages: []
    }).userData.achievements.includes('first_learn') && 
        ({
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
                    timeSpent: 0, // В минутах
                    lastLogin: null
                },
                activityHistory: [],
                friends: [],
                gamesPlayed: []
            },

            // 3D объекты на сцене
            objects: [],

            // Время начала сессии
            sessionStartTime: null,

            // WebSocket соединение
            socket: null,

            // Сообщения чата
            chatMessages: []
        }).userData.activityHistory.some(a => a.mode === 'learn')) {
        unlockAchievement('first_learn');
    }
    
    // 2. Проверка использования всех режимов
    const modes = Object.keys(({
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
            }
        }).modeSettings);
    const allModesUsed = modes.every(mode => 
        ({
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
                    timeSpent: 0, // В минутах
                    lastLogin: null
                },
                activityHistory: [],
                friends: [],
                gamesPlayed: []
            },

            // 3D объекты на сцене
            objects: [],

            // Время начала сессии
            sessionStartTime: null,

            // WebSocket соединение
            socket: null,

            // Сообщения чата
            chatMessages: []
        }).userData.activityHistory.some(a => a.mode === mode)
    );
    
    if (allModesUsed && !({
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
                timeSpent: 0, // В минутах
                lastLogin: null
            },
            activityHistory: [],
            friends: [],
            gamesPlayed: []
        },

        // 3D объекты на сцене
        objects: [],

        // Время начала сессии
        sessionStartTime: null,

        // WebSocket соединение
        socket: null,

        // Сообщения чата
        chatMessages: []
    }).userData.achievements.includes('all_modes')) {
        unlockAchievement('all_modes');
    }
    
    // 3. Проверка времени в сессии
    if (({
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
                timeSpent: 0, // В минутах
                lastLogin: null
            },
            activityHistory: [],
            friends: [],
            gamesPlayed: []
        },

        // 3D объекты на сцене
        objects: [],

        // Время начала сессии
        sessionStartTime: null,

        // WebSocket соединение
        socket: null,

        // Сообщения чата
        chatMessages: []
    }).userData.stats.timeSpent >= 60 && 
        !({
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
                    timeSpent: 0, // В минутах
                    lastLogin: null
                },
                activityHistory: [],
                friends: [],
                gamesPlayed: []
            },

            // 3D объекты на сцене
            objects: [],

            // Время начала сессии
            sessionStartTime: null,

            // WebSocket соединение
            socket: null,

            // Сообщения чата
            chatMessages: []
        }).userData.achievements.includes('long_session')) {
        unlockAchievement('long_session');
    }
}

// Разблокировка достижения
function unlockAchievement(id) {
    if (!({
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
        }
    }).achievements[id] || 
        ({
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
                    timeSpent: 0, // В минутах
                    lastLogin: null
                },
                activityHistory: [],
                friends: [],
                gamesPlayed: []
            },

            // 3D объекты на сцене
            objects: [],

            // Время начала сессии
            sessionStartTime: null,

            // WebSocket соединение
            socket: null,

            // Сообщения чата
            chatMessages: []
        }).userData.achievements.includes(id)) {
        return;
    }
    
    ({
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
                timeSpent: 0, // В минутах
                lastLogin: null
            },
            activityHistory: [],
            friends: [],
            gamesPlayed: []
        },

        // 3D объекты на сцене
        objects: [],

        // Время начала сессии
        sessionStartTime: null,

        // WebSocket соединение
        socket: null,

        // Сообщения чата
        chatMessages: []
    }).userData.achievements.push(id);
    document.getElementById('achievements-count').textContent = 
        ({
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
                    timeSpent: 0, // В минутах
                    lastLogin: null
                },
                activityHistory: [],
                friends: [],
                gamesPlayed: []
            },

            // 3D объекты на сцене
            objects: [],

            // Время начала сессии
            sessionStartTime: null,

            // WebSocket соединение
            socket: null,

            // Сообщения чата
            chatMessages: []
        }).userData.achievements.length;
    
    const achievement = ({
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
        }
    }).achievements[id];
    showNotification(
        `${achievement.icon || '🏆'} Достижение: ${achievement.title}\n${achievement.description}`
    );
    
    saveUserData();
}

// ======================
// ЧАТ
// ======================

// Отправка сообщения в чат
function sendChatMessage() {
    const input = document.getElementById('chat-input');
    const message = input.value.trim();
    
    if (!message) return;
    
    // Создание объекта сообщения
    const newMessage = {
        sender: ({
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
                    timeSpent: 0, // В минутах
                    lastLogin: null
                },
                activityHistory: [],
                friends: [],
                gamesPlayed: []
            },

            // 3D объекты на сцене
            objects: [],

            // Время начала сессии
            sessionStartTime: null,

            // WebSocket соединение
            socket: null,

            // Сообщения чата
            chatMessages: []
        }).userData.username || 'Гость',
        text: message,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    // Добавление в историю
    ({
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
                timeSpent: 0, // В минутах
                lastLogin: null
            },
            activityHistory: [],
            friends: [],
            gamesPlayed: []
        },

        // 3D объекты на сцене
        objects: [],

        // Время начала сессии
        sessionStartTime: null,

        // WebSocket соединение
        socket: null,

        // Сообщения чата
        chatMessages: []
    }).chatMessages.push(newMessage);
    
    // Ограничение истории
    if (({
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
                timeSpent: 0, // В минутах
                lastLogin: null
            },
            activityHistory: [],
            friends: [],
            gamesPlayed: []
        },

        // 3D объекты на сцене
        objects: [],

        // Время начала сессии
        sessionStartTime: null,

        // WebSocket соединение
        socket: null,

        // Сообщения чата
        chatMessages: []
    }).chatMessages.length > 100) {
        ({
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
                    timeSpent: 0, // В минутах
                    lastLogin: null
                },
                activityHistory: [],
                friends: [],
                gamesPlayed: []
            },

            // 3D объекты на сцене
            objects: [],

            // Время начала сессии
            sessionStartTime: null,

            // WebSocket соединение
            socket: null,

            // Сообщения чата
            chatMessages: []
        }).chatMessages.shift();
    }
    
    // Обновление UI
    updateChatUI();
    
    // Очистка поля ввода
    input.value = '';
}

// Обновление интерфейса чата
function updateChatUI() {
    const chatMessagesContainer = document.getElementById('chat-messages');
    chatMessagesContainer.innerHTML = '';
    
    ({
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
                timeSpent: 0, // В минутах
                lastLogin: null
            },
            activityHistory: [],
            friends: [],
            gamesPlayed: []
        },

        // 3D объекты на сцене
        objects: [],

        // Время начала сессии
        sessionStartTime: null,

        // WebSocket соединение
        socket: null,

        // Сообщения чата
        chatMessages: []
    }).chatMessages.forEach(message => {
        const template = document.getElementById('message-template');
        const messageElement = template.content.cloneNode(true);
        
        // Аватар отправителя
        const avatar = messageElement.querySelector('.message-avatar');
        avatar.textContent = message.sender.charAt(0).toUpperCase();
        avatar.style.backgroundColor = stringToColor(message.sender);
        
        messageElement.querySelector('.message-sender').textContent = message.sender;
        messageElement.querySelector('.message-time').textContent = message.time;
        messageElement.querySelector('.message-text').textContent = message.text;
        
        chatMessagesContainer.appendChild(messageElement);
    });
    
    // Прокрутка вниз
    chatMessagesContainer.scrollTop = chatMessagesContainer.scrollHeight;
}

// ======================
// ТАЙМЕР СЕССИИ
// ======================

// Запуск таймера сессии
function startSessionTimer() {
    ({
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
                timeSpent: 0, // В минутах
                lastLogin: null
            },
            activityHistory: [],
            friends: [],
            gamesPlayed: []
        },

        // 3D объекты на сцене
        objects: [],

        // Время начала сессии
        sessionStartTime: null,

        // WebSocket соединение
        socket: null,

        // Сообщения чата
        chatMessages: []
    }).sessionStartTime = new Date();
    
    // Обновляем каждую минуту
    ({
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
                timeSpent: 0, // В минутах
                lastLogin: null
            },
            activityHistory: [],
            friends: [],
            gamesPlayed: []
        },

        // 3D объекты на сцене
        objects: [],

        // Время начала сессии
        sessionStartTime: null,

        // WebSocket соединение
        socket: null,

        // Сообщения чата
        chatMessages: []
    }).sessionTimer = setInterval(() => {
        ({
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
                    timeSpent: 0, // В минутах
                    lastLogin: null
                },
                activityHistory: [],
                friends: [],
                gamesPlayed: []
            },

            // 3D объекты на сцене
            objects: [],

            // Время начала сессии
            sessionStartTime: null,

            // WebSocket соединение
            socket: null,

            // Сообщения чата
            chatMessages: []
        }).userData.stats.timeSpent += 1;
        updateTimeSpentUI();
        
        // Автосохранение каждые 10 минут
        if (({
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
                    timeSpent: 0, // В минутах
                    lastLogin: null
                },
                activityHistory: [],
                friends: [],
                gamesPlayed: []
            },

            // 3D объекты на сцене
            objects: [],

            // Время начала сессии
            sessionStartTime: null,

            // WebSocket соединение
            socket: null,

            // Сообщения чата
            chatMessages: []
        }).userData.stats.timeSpent % 10 === 0) {
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
    document.querySelectorAll('.action-btn[data-mode]').forEach(btn => {
        btn.addEventListener('click', function() {
            const mode = this.getAttribute('data-mode');
            setMode(mode);
        });
    });
    
    // 3. Кнопка друзей
    document.getElementById('friends-btn').addEventListener('click', showFriendsModal);
    
    // 4. Кнопка игр
    document.getElementById('games-btn').addEventListener('click', showGamesModal);
    
    // 5. Обработка кликов по 3D объектам
    window.addEventListener('click', onObjectClick, false);
    
    // 6. Отправка сообщений
    document.getElementById('send-btn').addEventListener('click', sendChatMessage);
    document.getElementById('chat-input').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendChatMessage();
        }
    });
    
    // 7. Клик по аватару
    document.getElementById('avatar-container').addEventListener('click', showAvatarModal);
    
    // 8. Клик по достижениям
    document.getElementById('achievements-count').addEventListener('click', showAchievementsModal);
    
    // 9. Обработка выхода
    window.addEventListener('beforeunload', () => {
        clearInterval(({
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
                        timeSpent: 0, // В минутах
                        lastLogin: null
                    },
                    activityHistory: [],
                    friends: [],
                    gamesPlayed: []
                },

                // 3D объекты на сцене
                objects: [],

                // Время начала сессии
                sessionStartTime: null,

                // WebSocket соединение
                socket: null,

                // Сообщения чата
                chatMessages: []
            }).sessionTimer);
        saveUserData();
    });
}
// Расширенная конфигурация
const MetaverseConfig = {
    // Добавлены новые настройки
    xpPerMinute: 1,
    currencyPerMinute: 0.5,
    levelMultiplier: 1.2,
    
    // Добавлены предметы для магазина
    shopItems: [
        { id: 'avatar1', name: 'Эксклюзивный аватар', price: 50 },
        { id: 'theme1', name: 'Тёмная тема', price: 30 },
        { id: 'effect1', name: 'Эффект частиц', price: 70 }
    ]
};

// Обновлённое состояние приложения
const AppState = {
    // Добавлены новые свойства
    playerPosition: { x: 0, y: 0, z: 0 },
    inventory: [],
    settings: {
        volume: 50,
        controls: 'standard'
    },
    
    // Остальные свойства остаются
};

// Новые функции
function updateMiniMap() {
    const miniMap = document.getElementById('mini-map');
    const playerDot = document.createElement('div');
    playerDot.className = 'player-dot';
    playerDot.style.left = `${50 + ({
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
                timeSpent: 0, // В минутах
                lastLogin: null
            },
            activityHistory: [],
            friends: [],
            gamesPlayed: []
        },

        // 3D объекты на сцене
        objects: [],

        // Время начала сессии
        sessionStartTime: null,

        // WebSocket соединение
        socket: null,

        // Сообщения чата
        chatMessages: []
    }).playerPosition.x * 10}%`;
    playerDot.style.top = `${50 + ({
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
                timeSpent: 0, // В минутах
                lastLogin: null
            },
            activityHistory: [],
            friends: [],
            gamesPlayed: []
        },

        // 3D объекты на сцене
        objects: [],

        // Время начала сессии
        sessionStartTime: null,

        // WebSocket соединение
        socket: null,

        // Сообщения чата
        chatMessages: []
    }).playerPosition.z * 10}%`;
    miniMap.innerHTML = '';
    miniMap.appendChild(playerDot);
}

function handleMovement() {
    document.addEventListener('keydown', (e) => {
        const speed = 0.1;
        switch(e.key) {
            case 'w': ({
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
                        timeSpent: 0, // В минутах
                        lastLogin: null
                    },
                    activityHistory: [],
                    friends: [],
                    gamesPlayed: []
                },

                // 3D объекты на сцене
                objects: [],

                // Время начала сессии
                sessionStartTime: null,

                // WebSocket соединение
                socket: null,

                // Сообщения чата
                chatMessages: []
            }).playerPosition.z -= speed; break;
            case 's': ({
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
                        timeSpent: 0, // В минутах
                        lastLogin: null
                    },
                    activityHistory: [],
                    friends: [],
                    gamesPlayed: []
                },

                // 3D объекты на сцене
                objects: [],

                // Время начала сессии
                sessionStartTime: null,

                // WebSocket соединение
                socket: null,

                // Сообщения чата
                chatMessages: []
            }).playerPosition.z += speed; break;
            case 'a': ({
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
                        timeSpent: 0, // В минутах
                        lastLogin: null
                    },
                    activityHistory: [],
                    friends: [],
                    gamesPlayed: []
                },

                // 3D объекты на сцене
                objects: [],

                // Время начала сессии
                sessionStartTime: null,

                // WebSocket соединение
                socket: null,

                // Сообщения чата
                chatMessages: []
            }).playerPosition.x -= speed; break;
            case 'd': ({
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
                        timeSpent: 0, // В минутах
                        lastLogin: null
                    },
                    activityHistory: [],
                    friends: [],
                    gamesPlayed: []
                },

                // 3D объекты на сцене
                objects: [],

                // Время начала сессии
                sessionStartTime: null,

                // WebSocket соединение
                socket: null,

                // Сообщения чата
                chatMessages: []
            }).playerPosition.x += speed; break;
        }
        updateMiniMap();
    });
}

// Обновлённая функция инициализации
function initApp() {
    // Добавлены новые инициализации
    initSounds();
    handleMovement();
    initShop();
    
    // Остальная инициализация
    loadUserData();
    showLoadingScreen(() => {
        init3DScene();
        setupEventListeners();
        startSessionTimer();
        updateMiniMap();
    });
}

// Новые обработчики событий
function setupEventListeners() {
    // Добавлены новые обработчики
    document.getElementById('settings-btn').addEventListener('click', showSettingsModal);
    document.getElementById('ar-btn').addEventListener('click', enableAR);
    
    // Остальные обработчики
}

// AR реализация
async function enableAR() {
    try {
        const session = await navigator.xr.requestSession('immersive-ar');
        setupARSession(session);
    } catch (err) {
        showNotification('AR не поддерживается: ' + err.message);
    }
}

function setupARSession(session) {
    // Настройка AR сцены
    ({
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
                timeSpent: 0, // В минутах
                lastLogin: null
            },
            activityHistory: [],
            friends: [],
            gamesPlayed: []
        },

        // 3D объекты на сцене
        objects: [],

        // Время начала сессии
        sessionStartTime: null,

        // WebSocket соединение
        socket: null,

        // Сообщения чата
        chatMessages: []
    }).renderer.xr.setReferenceSpaceType('local');
    ({
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
                timeSpent: 0, // В минутах
                lastLogin: null
            },
            activityHistory: [],
            friends: [],
            gamesPlayed: []
        },

        // 3D объекты на сцене
        objects: [],

        // Время начала сессии
        sessionStartTime: null,

        // WebSocket соединение
        socket: null,

        // Сообщения чата
        chatMessages: []
    }).renderer.xr.setSession(session);
    
    // Добавление AR объектов
    const arObject = new THREE.Mesh(
        new THREE.BoxGeometry(0.1, 0.1, 0.1),
        new THREE.MeshBasicMaterial({ color: 0xff0000 })
    );
    arObject.position.set(0, 0, -0.5);
    ({
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
                timeSpent: 0, // В минутах
                lastLogin: null
            },
            activityHistory: [],
            friends: [],
            gamesPlayed: []
        },

        // 3D объекты на сцене
        objects: [],

        // Время начала сессии
        sessionStartTime: null,

        // WebSocket соединение
        socket: null,

        // Сообщения чата
        chatMessages: []
    }).scene.add(arObject);
    
    showNotification('AR режим активирован!');
}
function createStarfield() {
    const starsGeometry = new THREE.BufferGeometry();
    const starsMaterial = new THREE.PointsMaterial({
        color: 0xffffff,
        size: 0.1,
        transparent: true
    });

    const starsVertices = [];
    for (let i = 0; i < 5000; i++) {
        starsVertices.push(
            THREE.MathUtils.randFloatSpread(2000),
            THREE.MathUtils.randFloatSpread(2000),
            THREE.MathUtils.randFloatSpread(2000)
        );
    }

    starsGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starsVertices, 3));
    const starField = new THREE.Points(starsGeometry, starsMaterial);
    AppState.scene.add(starField);
}
function createParticles() {
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCnt = 1000;
    
    const posArray = new Float32Array(particlesCnt * 3);
    for(let i = 0; i < particlesCnt * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 10;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.02,
        color: 0x4cc9f0,
        transparent: true,
        opacity: 0.8
    });
    
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    AppState.scene.add(particlesMesh);
}
new THREE.RGBELoader()
    .load('path/to/your.hdr', function(texture) {
        texture.mapping = THREE.EquirectangularReflectionMapping;
        AppState.scene.background = texture;
        AppState.scene.environment = texture;
    });
    const bgShader = {
    uniforms: {},
    vertexShader: `
        void main() {
            gl_Position = vec4(position, 1.0);
        }
    `,
    fragmentShader: `
        uniform float time;
        void main() {
            vec2 uv = gl_FragCoord.xy / resolution.xy;
            vec3 col = 0.5 + 0.5*cos(time+uv.xyx+vec3(0,2,4));
            gl_FragColor = vec4(col, 1.0);
        }
    `
};
if (AppState.scene.background.isColor) {
    AppState.scene.background.offset.y += 0.0001;
}
const bgMesh = new THREE.Mesh(
    new THREE.PlaneGeometry(2, 2),
    new THREE.ShaderMaterial(bgShader)
);
AppState.scene.add(bgMesh);
import { Galaxy } from 'three-galaxy';
const galaxy = new Galaxy(AppState.scene);
background: radial-gradient