/* ============================================
   CHICAGO AFTER DARK - Interactive Features
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all features
    initScrollAnimations();
    initParallaxEffect();
    initCardHoverEffects();
    initSmoothScroll();
    initNavHighlight();
    initTypewriterEffect();
});

/**
 * Scroll-triggered animations using Intersection Observer
 */
function initScrollAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');

                // Stagger animation for grid items
                if (entry.target.classList.contains('venue-card')) {
                    const cards = document.querySelectorAll('.venue-card');
                    const index = Array.from(cards).indexOf(entry.target);
                    entry.target.style.animationDelay = `${index * 0.1}s`;
                }
            }
        });
    }, observerOptions);

    // Observe venue cards
    document.querySelectorAll('.venue-card').forEach(card => {
        card.classList.add('animate-target');
        observer.observe(card);
    });

    // Observe section headers
    document.querySelectorAll('.section-header').forEach(header => {
        header.classList.add('animate-target');
        observer.observe(header);
    });

    // Add CSS for animations
    const style = document.createElement('style');
    style.textContent = `
        .animate-target {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }

        .animate-target.animate-in {
            opacity: 1;
            transform: translateY(0);
        }

        .venue-card.animate-target {
            transition-delay: var(--delay, 0s);
        }
    `;
    document.head.appendChild(style);
}

/**
 * Parallax effect for hero section
 */
function initParallaxEffect() {
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');

    if (!hero || !heroContent) return;

    let ticking = false;

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const scrolled = window.pageYOffset;
                const heroHeight = hero.offsetHeight;

                if (scrolled < heroHeight) {
                    const parallaxValue = scrolled * 0.4;
                    const opacityValue = 1 - (scrolled / heroHeight) * 0.8;

                    heroContent.style.transform = `translateY(${parallaxValue}px)`;
                    heroContent.style.opacity = opacityValue;
                }

                ticking = false;
            });

            ticking = true;
        }
    });
}

/**
 * Enhanced card hover effects
 */
function initCardHoverEffects() {
    const cards = document.querySelectorAll('.venue-card');

    cards.forEach(card => {
        // Mouse move effect for subtle tilt
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });

        // Add shine effect on hover
        const shine = document.createElement('div');
        shine.className = 'card-shine';
        card.appendChild(shine);

        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            shine.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(212, 175, 55, 0.15) 0%, transparent 50%)`;
        });
    });

    // Add shine CSS
    const style = document.createElement('style');
    style.textContent = `
        .venue-card {
            transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .card-shine {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            pointer-events: none;
            z-index: 10;
        }
    `;
    document.head.appendChild(style);
}

/**
 * Smooth scroll for navigation links
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Highlight active navigation based on scroll position
 */
function initNavHighlight() {
    const sections = document.querySelectorAll('.venue-section');
    const navLinks = document.querySelectorAll('.nav-link');

    if (sections.length === 0 || navLinks.length === 0) return;

    const observerOptions = {
        root: null,
        rootMargin: '-50% 0px -50% 0px',
        threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');

                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => observer.observe(section));

    // Add active state CSS
    const style = document.createElement('style');
    style.textContent = `
        .nav-link.active {
            background: var(--color-gold);
            color: var(--color-black);
            border-color: var(--color-gold);
        }
    `;
    document.head.appendChild(style);
}

/**
 * Typewriter effect for hero tagline
 */
function initTypewriterEffect() {
    const subtitle = document.querySelector('.hero .subtitle');
    if (!subtitle) return;

    const text = subtitle.textContent;
    subtitle.textContent = '';
    subtitle.style.visibility = 'visible';

    let charIndex = 0;
    const typingSpeed = 50;

    // Wait for page load animation
    setTimeout(() => {
        function typeChar() {
            if (charIndex < text.length) {
                subtitle.textContent += text.charAt(charIndex);
                charIndex++;
                setTimeout(typeChar, typingSpeed);
            }
        }
        typeChar();
    }, 1500);
}

/**
 * Add subtle floating particles in background
 */
function initParticles() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    const particleCount = 30;
    const particleContainer = document.createElement('div');
    particleContainer.className = 'particle-container';
    particleContainer.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        overflow: hidden;
        z-index: 1;
    `;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 3 + 1}px;
            height: ${Math.random() * 3 + 1}px;
            background: rgba(212, 175, 55, ${Math.random() * 0.3 + 0.1});
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: floatParticle ${Math.random() * 10 + 10}s ease-in-out infinite;
            animation-delay: ${Math.random() * 5}s;
        `;
        particleContainer.appendChild(particle);
    }

    hero.appendChild(particleContainer);

    // Add particle animation CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes floatParticle {
            0%, 100% {
                transform: translateY(0) translateX(0);
                opacity: 0;
            }
            10% {
                opacity: 1;
            }
            90% {
                opacity: 1;
            }
            50% {
                transform: translateY(-100px) translateX(${Math.random() * 50 - 25}px);
            }
        }
    `;
    document.head.appendChild(style);
}

// Initialize particles after a short delay
setTimeout(initParticles, 500);

/**
 * Lazy loading for images
 */
function initLazyLoading() {
    const images = document.querySelectorAll('.card-image img');

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

        images.forEach(img => imageObserver.observe(img));
    }
}

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');

    const style = document.createElement('style');
    style.textContent = `
        body:not(.loaded) {
            overflow: hidden;
        }

        body:not(.loaded)::after {
            content: '';
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: var(--color-black, #0a0a0a);
            z-index: 9999;
            animation: fadeOut 0.5s ease forwards;
            animation-delay: 0.5s;
        }

        @keyframes fadeOut {
            to {
                opacity: 0;
                visibility: hidden;
            }
        }
    `;
    document.head.appendChild(style);
});

/**
 * Add keyboard navigation support
 */
document.addEventListener('keydown', (e) => {
    // Press 'R' to scroll to Rooftops
    if (e.key === 'r' || e.key === 'R') {
        if (document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
            const rooftops = document.querySelector('#rooftops');
            if (rooftops) {
                rooftops.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }

    // Press 'S' to scroll to Speakeasies
    if (e.key === 's' || e.key === 'S') {
        if (document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
            const speakeasies = document.querySelector('#speakeasies');
            if (speakeasies) {
                speakeasies.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }

    // Press 'Home' to scroll to top
    if (e.key === 'Home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
});
