// Theme Toggle
const themeToggle = document.getElementById('themeToggle');
const themeIcon = themeToggle?.querySelector('i');

// Check for saved theme
const savedTheme = localStorage.getItem('theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    document.documentElement.setAttribute('data-theme', 'dark');
    if (themeIcon) themeIcon.classList.replace('fa-moon', 'fa-sun');
}

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        
        if (currentTheme === 'dark') {
            document.documentElement.removeAttribute('data-theme');
            themeIcon.classList.replace('fa-sun', 'fa-moon');
            localStorage.setItem('theme', 'light');
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            themeIcon.classList.replace('fa-moon', 'fa-sun');
            localStorage.setItem('theme', 'dark');
        }
    });
}

// Search Functionality
const searchModal = document.getElementById('searchModal');
const quickSearchBtn = document.getElementById('quickSearchBtn');
const modalClose = document.querySelector('.modal-close');
const searchInput = document.getElementById('searchInput');
const modalSearchInput = document.getElementById('modalSearchInput');
const searchBtn = document.getElementById('searchBtn');
const modalSearchBtn = document.getElementById('modalSearchBtn');
const searchTags = document.querySelectorAll('.search-tag');

// Open search modal
if (quickSearchBtn) {
    quickSearchBtn.addEventListener('click', () => {
        searchModal.style.display = 'flex';
    });
}

// Close modal
if (modalClose) {
    modalClose.addEventListener('click', () => {
        searchModal.style.display = 'none';
    });
}

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === searchModal) {
        searchModal.style.display = 'none';
    }
});

// Search functions
function performSearch(query) {
    const language = document.getElementById('searchLanguage')?.value || 'all';
    const category = document.getElementById('searchCategory')?.value || 'all';
    
    // In a real implementation, this would call an API
    console.log('Searching for:', { query, language, category });
    
    // For demo, show alert and close modal
    alert(`Searching for "${query}" in ${language} (${category})`);
    searchModal.style.display = 'none';
    
    // In a real app, you would redirect to search results page
    // window.location.href = `search.html?q=${encodeURIComponent(query)}&lang=${language}&cat=${category}`;
}

// Quick search tag clicks
searchTags.forEach(tag => {
    tag.addEventListener('click', () => {
        const searchTerm = tag.getAttribute('data-search');
        modalSearchInput.value = searchTerm;
    });
});

// Search button handlers
if (searchBtn) {
    searchBtn.addEventListener('click', () => {
        if (searchInput.value.trim()) {
            performSearch(searchInput.value.trim());
        }
    });
}

if (modalSearchBtn) {
    modalSearchBtn.addEventListener('click', () => {
        if (modalSearchInput.value.trim()) {
            performSearch(modalSearchInput.value.trim());
        }
    });
}

// Enter key for search
if (modalSearchInput) {
    modalSearchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && modalSearchInput.value.trim()) {
            performSearch(modalSearchInput.value.trim());
        }
    });
}

if (searchInput) {
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && searchInput.value.trim()) {
            performSearch(searchInput.value.trim());
        }
    });
}

// Sample dictionary data
const sampleWords = {
    egyptian: [
        {
            hieroglyph: "𓋹",
            transliteration: "ꜥnḫ",
            pronunciation: "/ˈɑːnək/",
            translation: "life, to live",
            category: "concepts",
            gardiner: "S34",
            period: "Old Kingdom - Ptolemaic"
        },
        {
            hieroglyph: "𓊹",
            transliteration: "nṯr",
            pronunciation: "/ˈnɛʧɛɾ/",
            translation: "god, deity",
            category: "religion",
            gardiner: "R8",
            period: "Old Kingdom - Roman"
        },
        {
            hieroglyph: "𓂀",
            transliteration: "wḏꜣ",
            pronunciation: "/ˈwɛʤɑ/",
            translation: "Eye of Horus",
            category: "symbols",
            gardiner: "D10",
            period: "All periods"
        }
    ],
    sumerian: [
        {
            cuneiform: "𒀭",
            transliteration: "an",
            pronunciation: "/an/",
            translation: "sky, heaven, god An",
            category: "religion",
            signName: "AN",
            period: "Early Dynastic - Old Babylonian"
        },
        {
            cuneiform: "𒆠",
            transliteration: "ki",
            pronunciation: "/ki/",
            translation: "earth, place, ground",
            category: "nature",
            signName: "KI",
            period: "All periods"
        },
        {
            cuneiform: "𒈬",
            transliteration: "mu",
            pronunciation: "/mu/",
            translation: "name, year, to speak",
            category: "concepts",
            signName: "MU",
            period: "All periods"
        }
    ]
};

// Populate sample words on page load
function populateSampleWords() {
    const wordsContainer = document.getElementById('wordsContainer');
    if (!wordsContainer) return;
    
    // Clear existing content
    wordsContainer.innerHTML = '';
    
    // Add Egyptian words
    sampleWords.egyptian.forEach(word => {
        const wordElement = createWordElement(word, 'egyptian');
        wordsContainer.appendChild(wordElement);
    });
    
    // Add Sumerian words
    sampleWords.sumerian.forEach(word => {
        const wordElement = createWordElement(word, 'sumerian');
        wordsContainer.appendChild(wordElement);
    });
}

function createWordElement(word, language) {
    const div = document.createElement('div');
    div.className = 'word-card';
    
    const icon = language === 'egyptian' ? '𓋹' : '𒆠';
    const type = language === 'egyptian' ? 'Hieroglyph' : 'Cuneiform';
    
    div.innerHTML = `
        <div class="word-header">
            <span class="word-icon">${icon}</span>
            <h3>${language === 'egyptian' ? word.hieroglyph : word.cuneiform}</h3>
            <span class="word-type">${type}</span>
        </div>
        <div class="word-details">
            <p><strong>Transliteration:</strong> ${word.transliteration}</p>
            <p><strong>Pronunciation:</strong> ${word.pronunciation}</p>
            <p><strong>Translation:</strong> ${word.translation}</p>
            <p><strong>Category:</strong> <span class="category-tag">${word.category}</span></p>
            <p><strong>Period:</strong> ${word.period}</p>
        </div>
    `;
    
    return div;
}

// ================ PAGINATION SYSTEM ================
// Add this section after your existing functions

let currentPage = 1;
const itemsPerPage = 20; // Change this based on how many words per page
let currentLanguage = 'egyptian'; // or 'sumerian' based on page
let currentData = [];

// Function to get current page from URL
function getCurrentPageFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    const page = parseInt(urlParams.get('page')) || 1;
    return Math.max(1, page); // Ensure page is at least 1
}

// Function to update URL without reloading (for SPA feel)
function updatePageURL(page) {
    if (history.pushState) {
        const newURL = `${window.location.pathname}?page=${page}`;
        window.history.pushState({page: page}, '', newURL);
    }
    return page;
}

// Function to calculate which words to show
function getWordsForPage(pageNumber, wordsArray) {
    const startIndex = (pageNumber - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return {
        words: wordsArray.slice(startIndex, endIndex),
        totalPages: Math.ceil(wordsArray.length / itemsPerPage),
        totalWords: wordsArray.length,
        currentPage: pageNumber
    };
}

// Function to render pagination controls
function renderPagination(currentPage, totalPages) {
    const paginationContainer = document.getElementById('pagination');
    if (!paginationContainer) return;
    
    let paginationHTML = '';
    const maxVisiblePages = 5;
    
    // Previous button
    if (currentPage > 1) {
        paginationHTML += `
            <a href="?page=${currentPage - 1}" class="page-link prev">
                <i class="fas fa-chevron-left"></i> Previous
            </a>
        `;
    }
    
    // Page numbers
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    // Adjust if we're near the end
    if (endPage - startPage + 1 < maxVisiblePages) {
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }
    
    // First page
    if (startPage > 1) {
        paginationHTML += `<a href="?page=1" class="page-link">1</a>`;
        if (startPage > 2) {
            paginationHTML += `<span class="page-dots">...</span>`;
        }
    }
    
    // Page numbers
    for (let i = startPage; i <= endPage; i++) {
        if (i === currentPage) {
            paginationHTML += `<span class="page-link active">${i}</span>`;
        } else {
            paginationHTML += `<a href="?page=${i}" class="page-link">${i}</a>`;
        }
    }
    
    // Last page
    if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
            paginationHTML += `<span class="page-dots">...</span>`;
        }
        paginationHTML += `<a href="?page=${totalPages}" class="page-link">${totalPages}</a>`;
    }
    
    // Next button
    if (currentPage < totalPages) {
        paginationHTML += `
            <a href="?page=${currentPage + 1}" class="page-link next">
                Next <i class="fas fa-chevron-right"></i>
            </a>
        `;
    }
    
    // Add page info
    paginationHTML += `
        <div class="page-info">
            Page ${currentPage} of ${totalPages} 
            <span class="word-count">(${itemsPerPage} words per page)</span>
        </div>
    `;
    
    paginationContainer.innerHTML = paginationHTML;
    
    // Add click handlers for SPA behavior (optional)
    if (window.location.pathname.includes('.html')) {
        attachPaginationHandlers();
    }
}

// Function to handle page navigation without reload (SPA style)
function attachPaginationHandlers() {
    document.querySelectorAll('.page-link[href^="?page="]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const pageMatch = this.getAttribute('href').match(/page=(\d+)/);
            if (pageMatch) {
                const pageNum = parseInt(pageMatch[1]);
                navigateToPage(pageNum);
            }
        });
    });
}

// Main navigation function
function navigateToPage(pageNum) {
    currentPage = updatePageURL(pageNum);
    
    // Get filtered/sorted data if filters are active
    let displayData = currentData;
    
    // Apply active filters
    const activeCategory = document.querySelector('.filter-btn.active')?.dataset.category;
    if (activeCategory && activeCategory !== 'all') {
        displayData = displayData.filter(word => 
            word.category === activeCategory
        );
    }
    
    // Apply active sort
    const sortSelect = document.getElementById('sortSelect');
    if (sortSelect) {
        displayData = sortWords(displayData, sortSelect.value);
    }
    
    // Get page data
    const pageData = getWordsForPage(pageNum, displayData);
    
    // Display words
    displayWords(pageData.words);
    
    // Update pagination
    renderPagination(pageNum, pageData.totalPages);
    
    // Update page info
    updatePageInfo(pageData);
    
    // Scroll to top of word list
    const wordsContainer = document.getElementById('wordsContainer');
    if (wordsContainer) {
        wordsContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// Function to display words
function displayWords(words) {
    const container = document.getElementById('wordsContainer');
    if (!container) return;
    
    if (words.length === 0) {
        container.innerHTML = `
            <div class="no-results">
                <i class="fas fa-scroll"></i>
                <h3>No words found</h3>
                <p>Try adjusting your filters or search term</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = words.map(word => {
        // Check if it's Egyptian or Sumerian word
        const isEgyptian = word.hieroglyph !== undefined;
        
        return `
            <div class="word-card" data-id="${word.id}" data-category="${word.category}">
                <div class="word-header">
                    <div class="word-glyph">
                        ${isEgyptian ? word.hieroglyph : word.cuneiform}
                    </div>
                    <div class="word-info">
                        <h3 class="word-transliteration">${isEgyptian ? word.transliteration : word.transliteration}</h3>
                        <p class="word-meaning">${word.meaning}</p>
                        <div class="word-meta">
                            <span class="word-category">${word.category}</span>
                            <span class="word-period">${word.period ? word.period[0] : ''}</span>
                            ${isEgyptian ? 
                                `<span class="word-gardiner">${word.gardiner || ''}</span>` : 
                                `<span class="word-sign">${word.sign_name || ''}</span>`
                            }
                        </div>
                    </div>
                </div>
                ${word.usage ? `
                    <div class="word-examples">
                        <h4>Examples:</h4>
                        <ul>
                            ${Array.isArray(word.usage) ? 
                                word.usage.map(example => `<li>${example}</li>`).join('') : 
                                `<li>${word.usage}</li>`
                            }
                        </ul>
                    </div>
                ` : ''}
                <div class="word-footer">
                    <button class="btn btn-sm btn-outline view-details">
                        <i class="fas fa-info-circle"></i> Details
                    </button>
                    <button class="btn btn-sm btn-outline add-favorite">
                        <i class="far fa-star"></i> Save
                    </button>
                </div>
            </div>
        `;
    }).join('');
    
    // Add event listeners to word cards
    attachWordCardListeners();
}

// Function to update page information
function updatePageInfo(pageData) {
    const pageInfo = document.getElementById('pageInfo');
    if (pageInfo) {
        const startIndex = (pageData.currentPage - 1) * itemsPerPage + 1;
        const endIndex = Math.min(startIndex + itemsPerPage - 1, pageData.totalWords);
        
        pageInfo.innerHTML = `
            Showing ${startIndex}-${endIndex} of ${pageData.totalWords} words
        `;
    }
}

// Function to sort words
function sortWords(words, criteria) {
    const sorted = [...words];
    
    switch(criteria) {
        case 'hieroglyph':
            return sorted.sort((a, b) => {
                const aGlyph = a.hieroglyph || '';
                const bGlyph = b.hieroglyph || '';
                return aGlyph.localeCompare(bGlyph);
            });
            
        case 'transliteration':
            return sorted.sort((a, b) => {
                const aTrans = a.transliteration || '';
                const bTrans = b.transliteration || '';
                return aTrans.localeCompare(bTrans);
            });
            
        case 'translation':
            return sorted.sort((a, b) => {
                const aMeaning = a.meaning || '';
                const bMeaning = b.meaning || '';
                return aMeaning.localeCompare(bMeaning);
            });
            
        case 'gardiner':
            return sorted.sort((a, b) => {
                const aGardiner = a.gardiner || 'ZZZ';
                const bGardiner = b.gardiner || 'ZZZ';
                return aGardiner.localeCompare(bGardiner);
            });
            
        default:
            return sorted;
    }
}

// Function to attach event listeners to word cards
function attachWordCardListeners() {
    // View details buttons
    document.querySelectorAll('.view-details').forEach(btn => {
        btn.addEventListener('click', function() {
            const wordCard = this.closest('.word-card');
            const wordId = wordCard.dataset.id;
            showWordDetails(wordId);
        });
    });
    
    // Favorite buttons
    document.querySelectorAll('.add-favorite').forEach(btn => {
        btn.addEventListener('click', function() {
            const wordCard = this.closest('.word-card');
            const wordId = wordCard.dataset.id;
            toggleFavorite(wordId);
            
            // Toggle icon
            const icon = this.querySelector('i');
            if (icon.classList.contains('far')) {
                icon.classList.replace('far', 'fas');
                this.innerHTML = '<i class="fas fa-star"></i> Saved';
            } else {
                icon.classList.replace('fas', 'far');
                this.innerHTML = '<i class="far fa-star"></i> Save';
            }
        });
    });
}

// Function to show word details (placeholder)
function showWordDetails(wordId) {
    const word = currentData.find(w => w.id === wordId);
    if (!word) return;
    
    // Create modal with word details
    const modal = document.createElement('div');
    modal.className = 'word-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <button class="modal-close"><i class="fas fa-times"></i></button>
            <div class="word-detail-header">
                <div class="word-glyph-large">
                    ${word.hieroglyph || word.cuneiform}
                </div>
                <div class="word-detail-info">
                    <h2>${word.transliteration}</h2>
                    <h3>${word.meaning}</h3>
                    <div class="word-detail-meta">
                        <span class="category">${word.category}</span>
                        <span class="period">${word.period ? word.period.join(', ') : ''}</span>
                        ${word.gardiner ? `<span class="gardiner">${word.gardiner}</span>` : ''}
                        ${word.sign_name ? `<span class="sign-name">${word.sign_name}</span>` : ''}
                    </div>
                </div>
            </div>
            <div class="word-detail-body">
                ${word.pronunciation ? `
                    <div class="detail-section">
                        <h4>Pronunciation</h4>
                        <p>${word.pronunciation}</p>
                    </div>
                ` : ''}
                
                ${word.usage ? `
                    <div class="detail-section">
                        <h4>Usage Examples</h4>
                        <ul>
                            ${Array.isArray(word.usage) ? 
                                word.usage.map(ex => `<li>${ex}</li>`).join('') : 
                                `<li>${word.usage}</li>`
                            }
                        </ul>
                    </div>
                ` : ''}
                
                ${word.notes ? `
                    <div class="detail-section">
                        <h4>Notes</h4>
                        <p>${word.notes}</p>
                    </div>
                ` : ''}
                
                ${word.etymology ? `
                    <div class="detail-section">
                        <h4>Etymology</h4>
                        <p>${word.etymology}</p>
                    </div>
                ` : ''}
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Add animation
    setTimeout(() => modal.classList.add('show'), 10);
    
    // Close modal
    modal.querySelector('.modal-close').addEventListener('click', () => {
        modal.classList.remove('show');
        setTimeout(() => modal.remove(), 300);
    });
    
    // Close on background click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('show');
            setTimeout(() => modal.remove(), 300);
        }
    });
}

// Function to toggle favorite
function toggleFavorite(wordId) {
    let favorites = JSON.parse(localStorage.getItem('wordFavorites') || '[]');
    
    if (favorites.includes(wordId)) {
        favorites = favorites.filter(id => id !== wordId);
    } else {
        favorites.push(wordId);
    }
    
    localStorage.setItem('wordFavorites', JSON.stringify(favorites));
}

// ================ END PAGINATION SYSTEM ================

// Initialize word display
document.addEventListener('DOMContentLoaded', () => {
    populateSampleWords();
    
    // Initialize tooltips for hieroglyphs
    initHieroglyphTooltips();
});

// Hieroglyph tooltips
function initHieroglyphTooltips() {
    const hieroglyphs = document.querySelectorAll('.hieroglyph, .cuneiform');
    hieroglyphs.forEach(glyph => {
        glyph.addEventListener('mouseenter', (e) => {
            const text = e.target.textContent;
            showGlyphTooltip(e, text);
        });
        
        glyph.addEventListener('mouseleave', () => {
            hideGlyphTooltip();
        });
    });
}

function showGlyphTooltip(event, text) {
    // Create tooltip if it doesn't exist
    let tooltip = document.getElementById('glyph-tooltip');
    if (!tooltip) {
        tooltip = document.createElement('div');
        tooltip.id = 'glyph-tooltip';
        tooltip.style.cssText = `
            position: absolute;
            background: var(--card-bg);
            border: 1px solid var(--border-color);
            padding: 10px;
            border-radius: 4px;
            box-shadow: var(--shadow);
            z-index: 10000;
            font-size: 14px;
            max-width: 200px;
        `;
        document.body.appendChild(tooltip);
    }
    
    // Find meaning (simplified)
    let meaning = "Ancient character";
    sampleWords.egyptian.concat(sampleWords.sumerian).forEach(word => {
        if (word.hieroglyph === text || word.cuneiform === text) {
            meaning = word.translation;
        }
    });
    
    tooltip.innerHTML = `<strong>${text}</strong><br>${meaning}`;
    tooltip.style.left = `${event.pageX + 10}px`;
    tooltip.style.top = `${event.pageY + 10}px`;
    tooltip.style.display = 'block';
}

function hideGlyphTooltip() {
    const tooltip = document.getElementById('glyph-tooltip');
    if (tooltip) {
        tooltip.style.display = 'none';
    }
}

// Back to Top Button
const backToTop = document.getElementById('backToTop');
if (backToTop) {
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTop.style.display = 'flex';
        } else {
            backToTop.style.display = 'none';
        }
    });
    
    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// Mobile Menu Toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');
if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}

// Deploy Button Animation
const deployBtn = document.getElementById('deployBtn');
if (deployBtn) {
    deployBtn.addEventListener('click', () => {
        deployBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Deploying...';
        
        setTimeout(() => {
            deployBtn.innerHTML = '<i class="fas fa-check"></i> Deployed!';
            deployBtn.style.background = '#10b981';
            
            setTimeout(() => {
                deployBtn.innerHTML = '<i class="fas fa-rocket"></i> Deploy Now';
                deployBtn.style.background = '';
            }, 3000);
        }, 2000);
    });
}

// Category card clicks
const categoryCards = document.querySelectorAll('.category-card');
categoryCards.forEach(card => {
    card.addEventListener('click', () => {
        const category = card.querySelector('h3').textContent;
        alert(`Loading ${category} words...`);
        // In real implementation: window.location.href = `category.html?cat=${encodeURIComponent(category)}`;
    });
});

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.02); }
        100% { transform: scale(1); }
    }
    
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }
    
    .feature-card, .category-card, .artifact-card {
        animation: fadeIn 0.6s ease-out;
    }
    
    .word-card {
        background: var(--card-bg);
        border-radius: var(--radius);
        border: 1px solid var(--border-color);
        padding: 1.5rem;
        margin-bottom: 1rem;
        transition: var(--transition);
    }
    
    .word-card:hover {
        transform: translateY(-3px);
        box-shadow: var(--shadow);
        border-color: var(--primary-color);
    }
    
    .word-header {
        display: flex;
        align-items: center;
        gap: 1rem;
        margin-bottom: 1rem;
        border-bottom: 1px solid var(--border-color);
        padding-bottom: 0.5rem;
    }
    
    .word-icon {
        font-size: 2rem;
        color: var(--primary-color);
    }
    
    .word-type {
        margin-left: auto;
        font-size: 0.875rem;
        color: var(--text-secondary);
        background: var(--bg-secondary);
        padding: 2px 8px;
        border-radius: 12px;
    }
    
    .word-details p {
        margin-bottom: 0.5rem;
        font-size: 0.95rem;
    }
`;
document.head.appendChild(style);

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.feature-card, .category-card, .artifact-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Initialize with console greeting
console.log('%c𓋹 Welcome to Ancient Lexicon!', 'color: #8b4513; font-size: 18px; font-weight: bold;');
console.log('%cExplore 5,000+ ancient Egyptian and Sumerian words', 'color: #d4a76a;');


async function loadEgyptianWords() {
    try {
        const response = await fetch('https://your-api/egyptian-words');
        const data = await response.json();
        return data.words;
    } catch (error) {
        // Fallback to local data
        return localEgyptianWords;
    }
}

// Initialize everything when DOM loads
document.addEventListener('DOMContentLoaded', async () => {
    // Initialize theme, search, etc. (your existing code)
    
    // Determine which language page we're on
    const path = window.location.pathname;
    
    if (path.includes('egyptian.html') || path.includes('egyptian')) {
        currentLanguage = 'egyptian';
        await initializeEgyptianPage();
    } 
    else if (path.includes('sumerian.html') || path.includes('sumerian')) {
        currentLanguage = 'sumerian';
        await initializeSumerianPage();
    }
    else if (path.includes('index.html') || path === '/' || path.endsWith('/')) {
        // Home page - only load samples
        await initializeHomePage();
    }
    
    // Your existing code for other pages...
});

// Initialize Egyptian dictionary page
async function initializeEgyptianPage() {
    try {
        // Load Egyptian data
        const response = await fetch('./data/egyptian.json');
        const data = await response.json();
        currentData = data.words;
        
        // Get current page from URL
        currentPage = getCurrentPageFromURL();
        
        // Display first page
        const pageData = getWordsForPage(currentPage, currentData);
        displayWords(pageData.words);
        renderPagination(currentPage, pageData.totalPages);
        updatePageInfo(pageData);
        
        // Initialize filter buttons (your existing code)
        initializeFilters();
        
        // Initialize sort dropdown
        initializeSorting();
        
    } catch (error) {
        console.error('Error loading Egyptian data:', error);
        // Fallback to sample data
        currentData = getSampleEgyptianData();
        const pageData = getWordsForPage(1, currentData);
        displayWords(pageData.words);
        renderPagination(1, pageData.totalPages);
    }
}

// Initialize Sumerian dictionary page  
async function initializeSumerianPage() {
    try {
        // Load Sumerian data
        const response = await fetch('./data/sumerian.json');
        const data = await response.json();
        currentData = data.words;
        
        // Get current page from URL
        currentPage = getCurrentPageFromURL();
        
        // Display first page
        const pageData = getWordsForPage(currentPage, currentData);
        displayWords(pageData.words);
        renderPagination(currentPage, pageData.totalPages);
        updatePageInfo(pageData);
        
        // Initialize filter buttons
        initializeFilters();
        
        // Initialize sort dropdown
        initializeSorting();
        
    } catch (error) {
        console.error('Error loading Sumerian data:', error);
        // Fallback to sample data
        currentData = getSampleSumerianData();
        const pageData = getWordsForPage(1, currentData);
        displayWords(pageData.words);
        renderPagination(1, pageData.totalPages);
    }
}

// Initialize home page (just samples)
async function initializeHomePage() {
    // Your existing home page code...
    // This might include showing recent words, featured words, etc.
}

// Initialize filter buttons
function initializeFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            // Navigate to page 1 with new filter
            navigateToPage(1);
        });
    });
}

// Initialize sorting dropdown
function initializeSorting() {
    const sortSelect = document.getElementById('sortSelect');
    if (sortSelect) {
        sortSelect.addEventListener('change', function() {
            // Navigate to page 1 with new sort
            navigateToPage(1);
        });
    }
}

// Sample data fallback functions
function getSampleEgyptianData() {
    return [
        {
            id: "EG001",
            hieroglyph: "??",
            transliteration: "?n?",
            pronunciation: "/'??n?x/",
            meaning: "life, to live",
            category: "concepts",
            gardiner: "S34",
            period: ["OK", "MK", "NK", "LP"],
            usage: ["?????? - ?n?t - life (feminine)"],
            notes: "The ankh symbol representing life."
        },
        // Add more sample words...
    ];
}

function getSampleSumerianData() {
    return [
        {
            id: "SU001",
            cuneiform: "??",
            transliteration: "an",
            pronunciation: "/an/",
            meaning: "sky, heaven",
            category: "deities",
            sign_name: "AN",
            period: ["ED", "OAkk", "OB"],
            usage: ["???? - an.ki - universe"],
            notes: "The supreme sky god."
        },
        // Add more sample words...
    ];
}
