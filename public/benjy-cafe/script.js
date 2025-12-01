// ===================================
// GSAP SCROLLTRIGGER SETUP
// ===================================
gsap.registerPlugin(ScrollTrigger);

// ===================================
// MOBILE MENU TOGGLE
// ===================================
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        mobileMenuToggle.classList.toggle('active');
    });
}

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
    });
});

// ===================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ===================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));

        if (target) {
            const navbarHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = target.offsetTop - navbarHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===================================
// NAVBAR SCROLL EFFECT
// ===================================
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = 'none';
    }

    lastScroll = currentScroll;
});

// ===================================
// FOOD SHOWCASE BACKGROUND CHANGE
// ===================================
const foodShowcases = document.querySelectorAll('.food-showcase');

foodShowcases.forEach((showcase) => {
    const bgColor = showcase.getAttribute('data-bg');

    ScrollTrigger.create({
        trigger: showcase,
        start: 'top center',
        end: 'bottom center',
        onEnter: () => {
            showcase.style.backgroundColor = bgColor;
        },
        onEnterBack: () => {
            showcase.style.backgroundColor = bgColor;
        },
    });
});

// ===================================
// FOOD SHOWCASE ANIMATIONS
// ===================================
foodShowcases.forEach((showcase, index) => {
    const image = showcase.querySelector('.food-image');
    const info = showcase.querySelector('.food-info');

    // Image reveal animation
    gsap.from(image, {
        scrollTrigger: {
            trigger: showcase,
            start: 'top 80%',
            end: 'top 20%',
            scrub: 1,
        },
        opacity: 0,
        scale: 0.8,
        y: 100,
    });

    // Info fade in
    gsap.from(info, {
        scrollTrigger: {
            trigger: showcase,
            start: 'top 70%',
            end: 'top 30%',
            scrub: 1,
        },
        opacity: 0,
        x: index % 2 === 0 ? 50 : -50,
    });
});

// ===================================
// INTRO SECTION ANIMATION
// ===================================
const introTitle = document.querySelector('.intro-title');

if (introTitle) {
    gsap.from(introTitle, {
        scrollTrigger: {
            trigger: '.intro-section',
            start: 'top 80%',
            end: 'top 30%',
            scrub: 1,
        },
        opacity: 0,
        y: 50,
    });
}

// ===================================
// MENU CATEGORIES ANIMATION (FIXED)
// ===================================
const menuCategories = document.querySelectorAll('.menu-category');

// Use toggle instead of scrub for reliable first-load visibility
menuCategories.forEach((category, index) => {
    gsap.from(category, {
        scrollTrigger: {
            trigger: category,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
        },
        opacity: 0,
        y: 80,
        duration: 0.8,
        delay: index * 0.15,
        ease: 'power3.out',
    });
});

// ===================================
// CTA SECTION ANIMATION
// ===================================
const ctaTitle = document.querySelector('.cta-title');
const ctaButton = document.querySelector('.cta-button');

if (ctaTitle) {
    gsap.from(ctaTitle, {
        scrollTrigger: {
            trigger: '.cta-section',
            start: 'top 80%',
            end: 'top 40%',
            scrub: 1,
        },
        opacity: 0,
        scale: 0.9,
    });
}

if (ctaButton) {
    gsap.from(ctaButton, {
        scrollTrigger: {
            trigger: '.cta-section',
            start: 'top 70%',
            end: 'top 30%',
            scrub: 1,
        },
        opacity: 0,
        y: 30,
    });
}

// ===================================
// CONTACT SECTION ANIMATION
// ===================================
const contactInfo = document.querySelector('.contact-info');
const contactMap = document.querySelector('.contact-map');

if (contactInfo) {
    gsap.from(contactInfo, {
        scrollTrigger: {
            trigger: '.contact-section',
            start: 'top 80%',
            end: 'top 40%',
            scrub: 1,
        },
        opacity: 0,
        x: -50,
    });
}

if (contactMap) {
    gsap.from(contactMap, {
        scrollTrigger: {
            trigger: '.contact-section',
            start: 'top 80%',
            end: 'top 40%',
            scrub: 1,
        },
        opacity: 0,
        x: 50,
    });
}

// ===================================
// PARALLAX EFFECT FOR IMAGES
// ===================================
const foodImages = document.querySelectorAll('.food-image img');

foodImages.forEach((img) => {
    gsap.to(img, {
        scrollTrigger: {
            trigger: img.closest('.food-showcase'),
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
        },
        y: -50,
        ease: 'none',
    });
});

// ===================================
// ACTIVE NAV LINK HIGHLIGHTING
// ===================================
const sections = document.querySelectorAll('section[id]');

function highlightNavLink() {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-link').forEach(link => {
                link.style.color = '';
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.style.color = 'var(--color-accent)';
                }
            });
        }
    });
}

window.addEventListener('scroll', highlightNavLink);

// ===================================
// LAZY LOADING IMAGES
// ===================================
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ===================================
// SCROLL PROGRESS INDICATOR (Optional)
// ===================================
function updateScrollProgress() {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;

    // You can use this to show a progress bar if needed
    // document.getElementById('progressBar').style.width = scrolled + '%';
}

window.addEventListener('scroll', updateScrollProgress);

// ===================================
// REFRESH SCROLLTRIGGER ON RESIZE
// ===================================
window.addEventListener('resize', () => {
    ScrollTrigger.refresh();
});

// ===================================
// CONSOLE WELCOME MESSAGE
// ===================================
console.log('%c Welcome to Benjy Cafe! ', 'background: #0A0A0A; color: #FFFFFF; font-size: 20px; padding: 10px; border-radius: 5px;');
console.log('%c Modern scroll experience powered by GSAP ', 'color: #D2691E; font-size: 14px; font-style: italic;');

// ===================================
// PERFORMANCE OPTIMIZATION
// ===================================
// Debounce function for scroll events
function debounce(func, wait = 10, immediate = true) {
    let timeout;
    return function () {
        const context = this, args = arguments;
        const later = function () {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// ===================================
// PRELOADER (Optional)
// ===================================
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    ScrollTrigger.refresh();
});
