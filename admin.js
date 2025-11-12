// Проверка прав администратора
function checkAdminAuth() {
    const currentUser = localStorage.getItem('barbershop_current_user');
    if (!currentUser) {
        window.location.href = 'index.html';
        return;
    }

    const user = JSON.parse(currentUser);
    if (user.type !== 'admin') {
        window.location.href = 'index.html';
        return;
    }
}

// Инициализация данных галереи
function initializeGalleryData() {
    if (!localStorage.getItem('barbershop_gallery')) {
        const defaultGallery = [
            {
                id: 1,
                title: "Классическая стрижка",
                url: "https://images.unsplash.com/photo-1567894340315-735d7c361db0?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
            },
            {
                id: 2, 
                title: "Модный фейд",
                url: "https://images.unsplash.com/photo-1593705114312-a0ee03a3f7c1?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
            },
            {
                id: 3,
                title: "Уход за бородой",
                url: "https://images.unsplash.com/photo-1605497788044-5a32c7078486?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
            }
        ];
        localStorage.setItem('barbershop_gallery', JSON.stringify(defaultGallery));
    }
}

// Загрузка данных для админ-панели
function loadAdminData() {
    checkAdminAuth();
    initializeGalleryData();
    
    const services = JSON.parse(localStorage.getItem('barbershop_services') || '[]');
    const promotions = JSON.parse(localStorage.getItem('barbershop_promotions') || '[]');
    const users = JSON.parse(localStorage.getItem('barbershop_users') || '[]');
    const gallery = JSON.parse(localStorage.getItem('barbershop_gallery') || '[]');

    renderServices(services);
    renderPromotions(promotions);
    renderUsers(users);
    renderGallery(gallery);
}

// Превью фото
function previewPhoto(url) {
    const preview = document.getElementById('photoPreview');
    if (url && (url.startsWith('http') || url.startsWith('https'))) {
        preview.src = url;
        preview.style.display = 'block';
    } else {
        preview.style.display = 'none';
    }
}

// Отображение услуг
function renderServices(services) {
    const container = document.getElementById('servicesList');
    container.innerHTML = '';

    services.forEach(service => {
        const serviceHTML = `
            <div class="item-card">
                <div class="item-header">
                    <span class="item-title">${service.name} - ${service.price} руб.</span>
                    <button class="delete-btn" onclick="deleteService(${service.id})">УДАЛИТЬ</button>
                </div>
                <p>${service.description}</p>
            </div>
        `;
        container.innerHTML += serviceHTML;
    });
}

// Отображение акций
function renderPromotions(promotions) {
    const container = document.getElementById('promotionsList');
    container.innerHTML = '';

    promotions.forEach(promo => {
        const promoHTML = `
            <div class="item-card">
                <div class="item-header">
                    <span class="item-title">${promo.title}</span>
                    <button class="delete-btn" onclick="deletePromotion(${promo.id})">УДАЛИТЬ</button>
                </div>
                <p>${promo.description}</p>
            </div>
        `;
        container.innerHTML += promoHTML;
    });
}

// Отображение галереи в админке
function renderGallery(gallery) {
    const container = document.getElementById('galleryList');
    container.innerHTML = '';

    gallery.forEach(photo => {
        const photoHTML = `
            <div class="item-card">
                <div class="item-header">
                    <span class="item-title">${photo.title}</span>
                    <button class="delete-btn" onclick="deletePhoto(${photo.id})">УДАЛИТЬ</button>
                </div>
                <img src="${photo.url}" alt="${photo.title}" class="gallery-preview">
                <p style="margin-top: 10px; font-size: 12px; color: #ccc; word-break: break-all;">${photo.url}</p>
            </div>
        `;
        container.innerHTML += photoHTML;
    });
}

// Отображение пользователей
function renderUsers(users) {
    const container = document.getElementById('usersList');
    container.innerHTML = '';

    users.forEach(user => {
        const userHTML = `
            <div class="item-card">
                <div class="item-header">
                    <span class="item-title">${user.name} (${user.phone})</span>
                    <div>
                        <button class="action-btn" onclick="addPoints(${user.id}, 100)">+100 БАЛЛОВ</button>
                        <button class="action-btn" onclick="addVisit(${user.id})">+ ВИЗИТ</button>
                    </div>
                </div>
                <p>Баллы: ${user.points} | Посещений: ${user.visits}</p>
                <p>Зарегистрирован: ${new Date(user.registrationDate).toLocaleDateString()}</p>
            </div>
        `;
        container.innerHTML += userHTML;
    });
}

// Добавление услуги
function addService() {
    const name = document.getElementById('serviceName').value.trim();
    const price = document.getElementById('servicePrice').value;
    const desc = document.getElementById('serviceDesc').value.trim();

    if (name && price) {
        const services = JSON.parse(localStorage.getItem('barbershop_services') || '[]');
        
        const newService = {
            id: Date.now(),
            name: name.toUpperCase(),
            price: parseInt(price),
            description: desc
        };

        services.push(newService);
        localStorage.setItem('barbershop_services', JSON.stringify(services));
        renderServices(services);
        
        document.getElementById('serviceName').value = '';
        document.getElementById('servicePrice').value = '';
        document.getElementById('serviceDesc').value = '';
    } else {
        alert('Заполните название и цену!');
    }
}

// Добавление акции
function addPromotion() {
    const title = document.getElementById('promoTitle').value.trim();
    const desc = document.getElementById('promoDesc').value.trim();

    if (title) {
        const promotions = JSON.parse(localStorage.getItem('barbershop_promotions') || '[]');
        
        const newPromo = {
            id: Date.now(),
            title: title.toUpperCase(),
            description: desc
        };

        promotions.push(newPromo);
        localStorage.setItem('barbershop_promotions', JSON.stringify(promotions));
        renderPromotions(promotions);
        
        document.getElementById('promoTitle').value = '';
        document.getElementById('promoDesc').value = '';
    } else {
        alert('Заполните заголовок акции!');
    }
}

// Добавление фото
function addPhoto() {
    const title = document.getElementById('photoTitle').value.trim();
    const url = document.getElementById('photoUrl').value.trim();

    if (title && url) {
        if (!url.startsWith('http')) {
            alert('Введите корректную ссылку на фото (должна начинаться с http или https)');
            return;
        }

        const gallery = JSON.parse(localStorage.getItem('barbershop_gallery') || '[]');
        
        const newPhoto = {
            id: Date.now(),
            title: title,
            url: url
        };

        gallery.push(newPhoto);
        localStorage.setItem('barbershop_gallery', JSON.stringify(gallery));
        renderGallery(gallery);
        
        document.getElementById('photoTitle').value = '';
        document.getElementById('photoUrl').value = '';
        document.getElementById('photoPreview').style.display = 'none';
    } else {
        alert('Заполните название и ссылку на фото!');
    }
}

// Удаление услуги
function deleteService(id) {
    if (confirm('Удалить эту услугу?')) {
        const services = JSON.parse(localStorage.getItem('barbershop_services') || '[]');
        const filteredServices = services.filter(service => service.id !== id);
        localStorage.setItem('barbershop_services', JSON.stringify(filteredServices));
        renderServices(filteredServices);
    }
}

// Удаление акции
function deletePromotion(id) {
    if (confirm('Удалить эту акцию?')) {
        const promotions = JSON.parse(localStorage.getItem('barbershop_promotions') || '[]');
        const filteredPromotions = promotions.filter(promo => promo.id !== id);
        localStorage.setItem('barbershop_promotions', JSON.stringify(filteredPromotions));
        renderPromotions(filteredPromotions);
    }
}

// Удаление фото
function deletePhoto(id) {
    if (confirm('Удалить это фото из галереи?')) {
        const gallery = JSON.parse(localStorage.getItem('barbershop_gallery') || '[]');
        const filteredGallery = gallery.filter(photo => photo.id !== id);
        localStorage.setItem('barbershop_gallery', JSON.stringify(filteredGallery));
        renderGallery(filteredGallery);
    }
}

// Добавление баллов пользователю
function addPoints(userId, points) {
    const users = JSON.parse(localStorage.getItem('barbershop_users') || '[]');
    const userIndex = users.findIndex(user => user.id === userId);
    
    if (userIndex !== -1) {
        users[userIndex].points += points;
        localStorage.setItem('barbershop_users', JSON.stringify(users));
        renderUsers(users);
        alert(`Добавлено ${points} баллов пользователю ${users[userIndex].name}`);
    }
}

// Добавление визита
function addVisit(userId) {
    const users = JSON.parse(localStorage.getItem('barbershop_users') || '[]');
    const userIndex = users.findIndex(user => user.id === userId);
    
    if (userIndex !== -1) {
        users[userIndex].visits += 1;
        users[userIndex].points += 100; // 100 баллов за визит
        localStorage.setItem('barbershop_users', JSON.stringify(users));
        renderUsers(users);
        alert(`Записан визит для ${users[userIndex].name}. Добавлено 100 баллов.`);
    }
}

// Загрузка при старте
document.addEventListener('DOMContentLoaded', loadAdminData);