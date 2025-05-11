// Navigation System
document.querySelectorAll('.nav-links a, .cta-button').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const pageId = link.getAttribute('href').substring(1);
        showPage(pageId);
        updateActiveNav(link);
        
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        
        history.pushState(null, null, `#${pageId}`);
    });
});

// History Management
window.addEventListener('popstate', () => {
    const pageId = window.location.hash.substring(1) || 'home';
    showPage(pageId);
    const activeLink = document.querySelector(`[href="#${pageId}"]`);
    updateActiveNav(activeLink);
});

function showPage(pageId) {
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    
    const targetPage = document.getElementById(pageId);
    targetPage ? targetPage.classList.add('active') : 
        document.getElementById('home').classList.add('active');
}

function updateActiveNav(activeLink) {
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
    });
    activeLink.classList.add('active');
}

// Theme Toggle
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-theme');
    localStorage.setItem('theme', body.classList.contains('dark-theme') ? 'dark' : 'light');
});

// Apply Saved Theme
const savedTheme = localStorage.getItem('theme') || 'light';
body.classList.toggle('dark-theme', savedTheme === 'dark');

// Mobile Menu
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.textContent = navLinks.classList.contains('active') ? '✕' : '☰';
});

// Form Validation
document.getElementById('contactForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    
    if (!validateEmail(email)) {
        alert('Please enter a valid email address');
        return;
    }
    
    alert('Message sent successfully!');
    e.target.reset();
});

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Initial Page Load
window.addEventListener('load', () => {
    const pageId = window.location.hash.substring(1) || 'home';
    showPage(pageId);
    const activeLink = document.querySelector(`[href="#${pageId}"]`);
    if (activeLink) updateActiveNav(activeLink);
});

// Close mobile menu on click outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.navbar') && navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        hamburger.textContent = '☰';
    }
});