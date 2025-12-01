// Scroll Progress Bar
function updateScrollProgress() {
    const scrollProgress = document.querySelector('.scroll-progress');
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight - windowHeight;
    const scrolled = window.scrollY;
    const progress = (scrolled / documentHeight) * 100;

    scrollProgress.style.transform = `scaleX(${progress / 100})`;
}

// Floating Mascot
function updateFloatingMascot() {
    const floatingMascot = document.querySelector('.floating-mascot');
    const scrolled = window.scrollY;

    if (scrolled > 300) {
        floatingMascot.classList.add('visible');
    } else {
        floatingMascot.classList.remove('visible');
    }
}

// Scroll Reveal Animation
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -100px 0px'
};

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const delay = entry.target.dataset.delay || 0;
            setTimeout(() => {
                entry.target.classList.add('revealed');
            }, delay);
            revealObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

// Parallax Effect
function updateParallax() {
    const parallaxElements = document.querySelectorAll('[data-scroll-speed]');
    const scrolled = window.scrollY;

    parallaxElements.forEach(element => {
        const speed = parseFloat(element.dataset.scrollSpeed);
        const elementTop = element.getBoundingClientRect().top + scrolled;
        const distance = scrolled - elementTop;
        const yPos = -(distance * speed);

        element.style.transform = `translateY(${yPos}px)`;
    });
}

// Smooth Scroll for Anchor Links
function initSmoothScroll() {
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
}

// Chapter Tracking
function trackChapters() {
    const chapters = document.querySelectorAll('.chapter');
    const windowHeight = window.innerHeight;
    const scrolled = window.scrollY;

    chapters.forEach(chapter => {
        const chapterTop = chapter.offsetTop;
        const chapterHeight = chapter.offsetHeight;
        const chapterBottom = chapterTop + chapterHeight;
        const viewportMiddle = scrolled + (windowHeight / 2);

        if (viewportMiddle >= chapterTop && viewportMiddle < chapterBottom) {
            chapter.classList.add('active');
        } else {
            chapter.classList.remove('active');
        }
    });
}

// Initialize on Load
document.addEventListener('DOMContentLoaded', () => {
    // Observe all scroll-reveal elements
    const revealElements = document.querySelectorAll('[data-scroll-reveal]');
    revealElements.forEach(element => {
        revealObserver.observe(element);
    });

    // Initialize smooth scroll
    initSmoothScroll();

    // Initial updates
    updateScrollProgress();
    updateFloatingMascot();
    updateParallax();
    trackChapters();
});

// Scroll Event Listeners
let ticking = false;

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            updateScrollProgress();
            updateFloatingMascot();
            updateParallax();
            trackChapters();
            ticking = false;
        });
        ticking = true;
    }
});

// Resize Handler
window.addEventListener('resize', () => {
    updateParallax();
});

// Add stagger animation to menu items
document.addEventListener('DOMContentLoaded', () => {
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.1}s`;
    });
});
