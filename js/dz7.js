const cardsContainer = document.getElementById('cardsContainer');
const API_URL = 'https://jsonplaceholder.typicode.com/posts';
const DEFAULT_IMAGE = 'https://cdn-icons-png.flaticon.com/256/11565/11565113.png';

async function loadPosts() {
    try {
        showLoading();
        
        const response = await fetch(API_URL);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const posts = await response.json();
        
        renderCards(posts);
        
    } catch (error) {
        showError(`Failed to load posts: ${error.message}`);
        console.error('Error loading posts:', error);
    }
}

function renderCards(posts) {
    if (!posts || posts.length === 0) {
        showError('No posts found');
        return;
    }

    const cardsHTML = posts.map(post => `
        <div class="card">
            <div class="card_image">
                <img src="${DEFAULT_IMAGE}" alt="Post icon">
            </div>
            <h3 class="card_title">${escapeHTML(post.title)}</h3>
            <p class="card_body">${escapeHTML(post.body)}</p>
        </div>
    `).join('');

    cardsContainer.innerHTML = cardsHTML;
}

// Функция для показа состояния загрузки
function showLoading() {
    cardsContainer.innerHTML = '<div class="cards_loading">Loading posts...</div>';
}

// Функция для показа ошибки
function showError(message) {
    cardsContainer.innerHTML = `<div class="cards_error">${escapeHTML(message)}</div>`;
}

// Функция для экранирования HTML (защита от XSS)
function escapeHTML(unsafe) {
    if (!unsafe) return '';
    return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

// Загружаем посты при загрузке страницы
document.addEventListener('DOMContentLoaded', loadPosts);