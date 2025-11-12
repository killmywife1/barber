// Демо-галерея с рамками и заглушками
const DEMO_GALLERY = [
    {
        id: 1,
        title: "КЛАССИЧЕСКАЯ СТРИЖКА",
        url: "https://images.unsplash.com/photo-1567894340315-735d7c361db0?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 2, 
        title: "МОДНЫЙ ФЕЙД",
        url: "https://images.unsplash.com/photo-1593705114312-a0ee03a3f7c1?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 3,
        title: "УХОД ЗА БОРОДОЙ",
        url: "https://images.unsplash.com/photo-1605497788044-5a32c7078486?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 4,
        title: "БРИТЬЕ ОПАСНОЙ БРИТВОЙ",
        url: "https://images.unsplash.com/photo-1621605815976-ac25731f6e3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 5,
        title: "СТРИЖКА + УКЛАДКА", 
        url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 6,
        title: "МУЖСКОЙ ГРУМИНГ",
        url: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    }
];

let currentImageIndex = 0;

// Загрузка галереи
function loadGallery() {
    const container = document.getElementById('galleryContainer');
    if (!container) return;

    container.innerHTML = '';

    // Всегда показываем демо-галерею для GitHub Pages
    // Но если есть свои фото в localStorage - показываем их
    const userGallery = JSON.parse(localStorage.getItem('barbershop_gallery') || '[]');
    const galleryToShow = userGallery.length > 0 ? userGallery : DEMO_GALLERY;

    galleryToShow.forEach((image, index) => {
        const galleryHTML = `
            <div class="gallery-item" onclick="openGallery(${index})">
                <div class="gallery-image-container">
                    <img src="${image.url}" alt="${image.title}" loading="lazy" 
                         onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAwIiBoZWlnaHQ9IjUwMCIgdmlld0JveD0iMCAwIDUwMCA1MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI1MDAiIGhlaWdodD0iNTAwIiBmaWxsPSIjMUEyQTMzIi8+CjxwYXRoIGQ9Ik0xNzUgMjI1TDIyNSAxNzVMMjc1IDIyNUgyNzVWMjc1SDIyNVYyMjVIMTc1WiIgZmlsbD0iIzhCNDUxMyIvPgo8Y2lyY2xlIGN4PSIyNTAiIGN5PSIyNzUiIHI9IjI1IiBmaWxsPSIjOEU0RTVBIi8+CjxjaXJjbGUgY3g9IjI1MCIgY3k9IjI3NSIgcj0iMTUiIGZpbGw9IiM4QjQ1MTMiLz4KPHN2Zz4='">
                    <div class="gallery-frame"></div>
                </div>
                <div class="gallery-overlay">${image.title}</div>
            </div>
        `;
        container.innerHTML += galleryHTML;
    });

    // Сохраняем данные для галереи
    window.galleryData = galleryToShow;
}

// Открытие галереи
function openGallery(index) {
    const galleryData = window.galleryData || DEMO_GALLERY;
    if (galleryData.length === 0) return;
    
    currentImageIndex = index;
    const image = galleryData[currentImageIndex];
    const galleryImage = document.getElementById('galleryImage');
    
    galleryImage.src = image.url;
    galleryImage.alt = image.title;
    document.getElementById('galleryModal').style.display = 'block';
}

// Закрытие галереи
function closeGallery() {
    document.getElementById('galleryModal').style.display = 'none';
}

// Следующее изображение
function nextImage() {
    const galleryData = window.galleryData || DEMO_GALLERY;
    if (galleryData.length === 0) return;
    
    currentImageIndex = (currentImageIndex + 1) % galleryData.length;
    document.getElementById('galleryImage').src = galleryData[currentImageIndex].url;
}

// Предыдущее изображение
function prevImage() {
    const galleryData = window.galleryData || DEMO_GALLERY;
    if (galleryData.length === 0) return;
    
    currentImageIndex = (currentImageIndex - 1 + galleryData.length) % galleryData.length;
    document.getElementById('galleryImage').src = galleryData[currentImageIndex].url;
}

// Мобильное меню
function toggleMenu() {
    const nav = document.getElementById('mainNav');
    nav.classList.toggle('active');
}

// Закрытие меню при клике на ссылку
document.addEventListener('click', function(e) {
    if (e.target.matches('.nav a')) {
        const nav = document.getElementById('mainNav');
        nav.classList.remove('active');
    }
});

// Закрытие по ESC
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeGallery();
    }
    
    // Управление галереей стрелками
    if (document.getElementById('galleryModal').style.display === 'block') {
        if (e.key === 'ArrowRight') nextImage();
        if (e.key === 'ArrowLeft') prevImage();
    }
});

// Загрузка при старте
document.addEventListener('DOMContentLoaded', function() {
    loadGallery();
    
    // Закрытие галереи по клику вне изображения
    document.getElementById('galleryModal').addEventListener('click', function(e) {
        if (e.target === this) {
            closeGallery();
        }
    });
});