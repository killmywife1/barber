// Данные администратора (в реальном проекте хранить на сервере)
const ADMIN_CREDENTIALS = {
    login: "admin",
    password: "admin"
};

// Ключи для localStorage
const STORAGE_KEYS = {
    USERS: 'barbershop_users',
    CURRENT_USER: 'barbershop_current_user',
    SERVICES: 'barbershop_services',
    PROMOTIONS: 'barbershop_promotions'
};

// Инициализация данных
function initializeData() {
    if (!localStorage.getItem(STORAGE_KEYS.USERS)) {
        localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify([]));
    }
    if (!localStorage.getItem(STORAGE_KEYS.SERVICES)) {
        const defaultServices = [
            {
                id: 1,
                name: "МУЖСКАЯ СТРИЖКА",
                price: 800,
                description: "Стрижка машинкой и ножницами, укладка"
            },
            {
                id: 2,
                name: "КОРОЛЕВСКОЕ БРИТЬЕ",
                price: 1200,
                description: "Бритье опасной бритвой с распариванием"
            },
            {
                id: 3,
                name: "СТРИЖКА БОРОДЫ",
                price: 500,
                description: "Коррекция формы и уход за бородой"
            }
        ];
        localStorage.setItem(STORAGE_KEYS.SERVICES, JSON.stringify(defaultServices));
    }
    if (!localStorage.getItem(STORAGE_KEYS.PROMOTIONS)) {
        const defaultPromotions = [
            {
                id: 1,
                title: "ПЕРВАЯ СКИДКА 20%",
                description: "Для новых клиентов на первую стрижку"
            }
        ];
        localStorage.setItem(STORAGE_KEYS.PROMOTIONS, JSON.stringify(defaultPromotions));
    }
}

// Модальное окно
function showAuthModal() {
    document.getElementById('authModal').style.display = 'block';
    showLoginForm();
}

function hideAuthModal() {
    document.getElementById('authModal').style.display = 'none';
}

function showLoginForm() {
    document.getElementById('userLoginForm').style.display = 'block';
    document.getElementById('userRegisterForm').style.display = 'none';
    document.getElementById('adminLoginForm').style.display = 'none';
}

function showRegisterForm() {
    document.getElementById('userLoginForm').style.display = 'none';
    document.getElementById('userRegisterForm').style.display = 'block';
    document.getElementById('adminLoginForm').style.display = 'none';
}

function showAdminForm() {
    document.getElementById('userLoginForm').style.display = 'none';
    document.getElementById('userRegisterForm').style.display = 'none';
    document.getElementById('adminLoginForm').style.display = 'block';
}

// Регистрация пользователя
function userRegister() {
    const name = document.getElementById('regName').value.trim();
    const phone = document.getElementById('regPhone').value.trim();
    const password = document.getElementById('regPassword').value;

    if (!name || !phone || !password) {
        alert('Заполните все поля!');
        return;
    }

    if (phone.length !== 11 || !phone.startsWith('89')) {
        alert('Введите корректный номер телефона (11 цифр, начинается с 89)');
        return;
    }

    const users = JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS));
    
    if (users.find(user => user.phone === phone)) {
        alert('Пользователь с таким номером уже зарегистрирован!');
        return;
    }

    const newUser = {
        id: Date.now(),
        name: name,
        phone: phone,
        password: password,
        points: 0,
        visits: 0,
        registrationDate: new Date().toISOString()
    };

    users.push(newUser);
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
    
    alert('Регистрация успешна! Теперь войдите в систему.');
    showLoginForm();
    clearAuthForms();
}

// Вход пользователя
function userLogin() {
    const phone = document.getElementById('userPhone').value.trim();
    const password = document.getElementById('userPassword').value;

    const users = JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS));
    const user = users.find(u => u.phone === phone && u.password === password);

    if (user) {
        localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
        updateNavigation('user');
        hideAuthModal();
        alert(`Добро пожаловать, ${user.name}!`);
    } else {
        alert('Неверный номер телефона или пароль!');
    }
}

// Вход администратора
function adminLogin() {
    const login = document.getElementById('adminLogin').value;
    const password = document.getElementById('adminPassword').value;

    if (login === ADMIN_CREDENTIALS.login && password === ADMIN_CREDENTIALS.password) {
        localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify({
            type: 'admin',
            name: 'Администратор'
        }));
        updateNavigation('admin');
        hideAuthModal();
        window.location.href = 'admin.html';
    } else {
        alert('Неверные данные администратора!');
    }
}

// Выход из системы
function logout() {
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
    updateNavigation('guest');
    alert('Вы вышли из системы');
}

// Обновление навигации
function updateNavigation(userType) {
    const loginBtn = document.getElementById('loginBtn');
    const profileBtn = document.getElementById('profileBtn');
    const adminBtn = document.getElementById('adminBtn');
    const logoutBtn = document.getElementById('logoutBtn');

    loginBtn.style.display = 'none';
    profileBtn.style.display = 'none';
    adminBtn.style.display = 'none';
    logoutBtn.style.display = 'none';

    if (userType === 'guest') {
        loginBtn.style.display = 'block';
    } else if (userType === 'user') {
        profileBtn.style.display = 'block';
        logoutBtn.style.display = 'block';
    } else if (userType === 'admin') {
        adminBtn.style.display = 'block';
        logoutBtn.style.display = 'block';
    }
}

// Показать профиль
function showProfile() {
    const user = JSON.parse(localStorage.getItem(STORAGE_KEYS.CURRENT_USER));
    if (user && user.type !== 'admin') {
        alert(`ПРОФИЛЬ\nИмя: ${user.name}\nТелефон: ${user.phone}\nБаллы: ${user.points}\nПосещений: ${user.visits}`);
    }
}

// Очистка форм
function clearAuthForms() {
    document.getElementById('regName').value = '';
    document.getElementById('regPhone').value = '';
    document.getElementById('regPassword').value = '';
    document.getElementById('userPhone').value = '';
    document.getElementById('userPassword').value = '';
    document.getElementById('adminLogin').value = '';
    document.getElementById('adminPassword').value = '';
}

// Инициализация при загрузке
document.addEventListener('DOMContentLoaded', function() {
    initializeData();
    
    // Проверяем авторизацию
    const currentUser = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
    if (currentUser) {
        const user = JSON.parse(currentUser);
        updateNavigation(user.type === 'admin' ? 'admin' : 'user');
    } else {
        updateNavigation('guest');
    }

    // Закрытие модального окна
    document.querySelector('.close').addEventListener('click', hideAuthModal);
    window.addEventListener('click', function(event) {
        if (event.target === document.getElementById('authModal')) {
            hideAuthModal();
        }
    });
});