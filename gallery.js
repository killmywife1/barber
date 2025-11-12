// Демо-галерея с рамками и заглушками
const DEMO_GALLERY = [
    {
        id: 1,
        title: "СКОРО ФОТО МАКСИМА",
        url: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAwIiBoZWlnaHQ9IjUwMCIgdmlld0JveD0iMCAwIDUwMCA1MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI1MDAiIGhlaWdodD0iNTAwIiBmaWxsPSIjMUExQTFBIi8+CjxwYXRoIGQ9Ik0xNzUgMjI1TDIyNSAxNzVMMjc1IDIyNUgyNzVWMjc1SDIyNVYyMjVIMTc1WiIgZmlsbD0iIzhCNDUxMyIvPgo8Y2lyY2xlIGN4PSIyNTAiIGN5PSIyNzUiIHI9IjI1IiBmaWxsPSIjOEU0RTVBIi8+CjxjaXJjbGUgY3g9IjI1MCIgY3k9IjI3NSIgcj0iMTUiIGZpbGw9IiM4QjQ1MTMiLz4KPHN2Zz4="
    },
    {
        id: 2, 
        title: "СТИЛЬНЫЕ СТРИЖКИ",
        url: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAwIiBoZWlnaHQ9IjUwMCIgdmlld0JveD0iMCAwIDUwMCA1MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI1MDAiIGhlaWdodD0iNTAwIiBmaWxsPSIjMUExQTFBIi8+CjxwYXRoIGQ9Ik0xNzUgMjI1TDIyNSAxNzVMMjc1IDIyNUgyNzVWMjc1SDIyNVYyMjVIMTc1WiIgZmlsbD0iIzhCNDUxMyIvPgo8Y2lyY2xlIGN4PSIyNTAiIGN5PSIyNzUiIHI9IjI1IiBmaWxsPSIjOEU0RTVBIi8+CjxjaXJjbGUgY3g9IjI1MCIgY3k9IjI3NSIgcj0iMTUiIGZpbGw9IiM4QjQ1MTMiLz4KPHN2Zz4="
    },
    {
        id: 3,
        title: "БРЮТАЛЬНЫЕ БОРОДЫ", 
        url: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAwIiBoZWlnaHQ9IjUwMCIgdmlld0JveD0iMCAwIDUwMCA1MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI1MDAiIGhlaWdodD0iNTAwIiBmaWxsPSIjMUExQTFBIi8+CjxwYXRoIGQ9Ik0xNzUgMjI1TDIyNSAxNzVMMjc1IDIyNUgyNzVWMjc1SDIyNVYyMjVIMTc1WiIgZmlsbD0iIzhCNDUxMyIvPgo8Y2lyY2xlIGN4PSIyNTAiIGN5PSIyNzUiIHI9IjI1IiBmaWxsPSIjOEU0RTVBIi8+CjxjaXJjbGUgY3g9IjI1MCIgY3k9IjI3NSIgcj0iMTUiIGZpbGw9IiM4QjQ1MTMiLz4KPHN2Zz4="
    },
    {
        id: 4,
        title: "КОРОЛЕВСКОЕ БРИТЬЕ",
        url: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAwIiBoZWlnaHQ9IjUwMCIgdmlld0JveD0iMCAwIDUwMCA1MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI1MDAiIGhlaWdodD0iNTAwIiBmaWxsPSIjMUExQTFBIi8+CjxwYXRoIGQ9Ik0xNzUgMjI1TDIyNSAxNzVMMjc1IDIyNUgyNzVWMjc1SDIyNVYyMjVIMTc1WiIgZmlsbD0iIzhCNDUxMyIvPgo8Y2lyY2xlIGN4PSIyNTAiIGN5PSIyNzUiIHI9IjI1IiBmaWxsPSIjOEU0RTVBIi8+CjxjaXJjbGUgY3g9IjI1MCIgY3k9IjI3NSIgcj0iMTUiIGZpbGw9IiM4QjQ1MTMiLz4KPHN2Zz4="
    },
    {
        id: 5,
        title: "МУЖСКОЙ ГРУМИНГ",
        url: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAwIiBoZWlnaHQ9IjUwMCIgdmlld0JveD0iMCAwIDUwMCA1MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI1MDAiIGhlaWdodD0iNTAwIiBmaWxsPSIjMUExQTFBIi8+CjxwYXRoIGQ9Ik0xNzUgMjI1TDIyNSAxNzVMMjc1IDIyNUgyNzVWMjc1SDIyNVYyMjVIMTc1WiIgZmlsbD0iIzhCNDUxMyIvPgo8Y2lyY2xlIGN4PSIyNTAiIGN5PSIyNzUiIHI9IjI1IiBmaWxsPSIjOEU0RTVBIi8+CjxjaXJjbGUgY3g9IjI1MCIgY3k9IjI3NSIgcj0iMTUiIGZpbGw9IiM4QjQ1MTMiLz4KPHN2Zz4="
    },
    {
        id: 6,
        title: "ИНДИВИДУАЛЬНЫЙ СТИЛЬ",
        url: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAwIiBoZWlnaHQ9IjUwMCIgdmlld0JveD0iMCAwIDUwMCA1MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI1MDAiIGhlaWdodD0iNTAwIiBmaWxsPSIjMUExQTFBIi8+CjxwYXRoIGQ9Ik0xNzUgMjI1TDIyNSAxNzVMMjc1IDIyNUgyNzVWMjc1SDIyNVYyMjVIMTc1WiIgZmlsbD0iIzhCNDUxMyIvPgo8Y2lyY2xlIGN4PSIyNTAiIGN5PSIyNzUiIHI9IjI1IiBmaWxsPSIjOEU0RTVBIi8+CjxjaXJjbGUgY3g9IjI1MCIgY3k9IjI3NSIgcj0iMTUiIGZpbGw9IiM4QjQ1MTMiLz4KPHN2Zz4="
    }
];

let currentImageIndex = 0;

// Загрузка галереи
function loadGallery() {
    const container = document.getElementById('galleryContainer');
    if (!container) return;

    container.innerHTML = '';

    // Всегда показываем демо-галерею с заглушками
    const galleryToShow = DEMO_GALLERY;

    galleryToShow.forEach((image, index) => {
        const galleryHTML = `
            <div class="gallery-item" onclick="openGallery(${index})">
                <div class="gallery-image-container">
                    <img src="${image.url}" alt="${image.title}" loading="lazy">
                    <div class="gallery-frame"></div>
                    <div class="gallery-placeholder-text">${image.title}</div>
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
    
    // Добавляем текст поверх изображения в модалке
    const existingText = document.querySelector('.modal-image-text');
    if (existingText) {
        existingText.remove();
    }
    
    const modalText = document.createElement('div');
    modalText.className = 'modal-image-text';
    modalText.textContent = image.title;
    modalText.style.cssText = `
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: #8b4513;
        font-size: 24px;
        font-weight: bold;
        text-align: center;
        text-shadow: 2px 2px 4px rgba(0,0,0,0.8);
        font-family: 'Arial', sans-serif;
        text-transform: uppercase;
        letter-spacing: 2px;
        z-index: 10;
        pointer-events: none;
    `;
    
    document.querySelector('.gallery-modal').appendChild(modalText);
    document.getElementById('galleryModal').style.display = 'block';
}

// Закрытие галереи
function closeGallery() {
    document.getElementById('galleryModal').style.display = 'none';
    
    // Удаляем текст при закрытии
    const modalText = document.querySelector('.modal-image-text');
    if (modalText) {
        modalText.remove();
    }
}

// Следующее изображение
function nextImage() {
    const galleryData = window.galleryData || DEMO_GALLERY;
    if (galleryData.length === 0) return;
    
    currentImageIndex = (currentImageIndex + 1) % galleryData.length;
    const image = galleryData[currentImageIndex];
    document.getElementById('galleryImage').src = image.url;
    
    // Обновляем текст
    const modalText = document.querySelector('.modal-image-text');
    if (modalText) {
        modalText.textContent = image.title;
    }
}

// Предыдущее изображение
function prevImage() {
    const galleryData = window.galleryData || DEMO_GALLERY;
    if (galleryData.length === 0) return;
    
    currentImageIndex = (currentImageIndex - 1 + galleryData.length) % galleryData.length;
    const image = galleryData[currentImageIndex];
    document.getElementById('galleryImage').src = image.url;
    
    // Обновляем текст
    const modalText = document.querySelector('.modal-image-text');
    if (modalText) {
        modalText.textContent = image.title;
    }
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
