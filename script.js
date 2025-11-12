// Загрузка данных для главной страницы
function loadHomePageData() {
    const services = JSON.parse(localStorage.getItem('barbershop_services') || '[]');
    const promotions = JSON.parse(localStorage.getItem('barbershop_promotions') || '[]');

    renderServicesForClients(services);
    renderPromotionsForClients(promotions);
}

// Отображение услуг для клиентов
function renderServicesForClients(services) {
    const container = document.getElementById('servicesContainer');
    if (!container) return;

    container.innerHTML = '';

    services.forEach(service => {
        const serviceHTML = `
            <div class="service-card">
                <h3>${service.name}</h3>
                <div class="service-price">${service.price} РУБ.</div>
                <p class="service-description">${service.description}</p>
            </div>
        `;
        container.innerHTML += serviceHTML;
    });
}

// Отображение акций для клиентов
function renderPromotionsForClients(promotions) {
    const container = document.getElementById('promotionsContainer');
    if (!container) return;

    container.innerHTML = '';

    promotions.forEach(promo => {
        const promoHTML = `
            <div class="promo-card">
                <h3>${promo.title}</h3>
                <p>${promo.description}</p>
            </div>
        `;
        container.innerHTML += promoHTML;
    });
}

// Прокрутка к услугам
function scrollToServices() {
    document.getElementById('services').scrollIntoView({
        behavior: 'smooth'
    });
}

// Плавная прокрутка для всех якорей
document.addEventListener('DOMContentLoaded', function() {
    // Загрузка данных
    if (document.getElementById('servicesContainer')) {
        loadHomePageData();
    }
    
    // Плавная прокрутка
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});