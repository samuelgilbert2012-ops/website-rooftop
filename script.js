// Chicago Rooftop Bars & Speakeasies
// Interactive enhancements

document.addEventListener('DOMContentLoaded', function() {
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all venue cards
    document.querySelectorAll('.venue-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        observer.observe(card);
    });

    // Add visible class styles dynamically
    const style = document.createElement('style');
    style.textContent = `
        .venue-card.visible {
            opacity: 1 !important;
            transform: translateY(0) !important;
            transition: opacity 0.6s ease-out, transform 0.6s ease-out;
        }
    `;
    document.head.appendChild(style);

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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

    // Parallax effect for hero section
    const hero = document.querySelector('.hero');
    let ticking = false;

    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                const scrolled = window.pageYOffset;
                if (scrolled < window.innerHeight) {
                    hero.style.backgroundPosition = `center ${scrolled * 0.5}px`;
                }
                ticking = false;
            });
            ticking = true;
        }
    });

    // Add hover sound effect placeholder (visual feedback)
    document.querySelectorAll('.venue-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
        });
    });

    // Staggered animation delay for cards in view
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        const cards = section.querySelectorAll('.venue-card');
        cards.forEach((card, index) => {
            card.style.transitionDelay = `${index * 0.1}s`;
        });
    });

    // Add golden glow cursor effect on cards
    document.querySelectorAll('.venue-card').forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            card.style.background = `
                radial-gradient(
                    circle at ${x}px ${y}px,
                    rgba(212, 175, 55, 0.1) 0%,
                    transparent 50%
                ),
                linear-gradient(145deg, #141414 0%, #252525 100%)
            `;
        });

        card.addEventListener('mouseleave', function() {
            card.style.background = 'linear-gradient(145deg, #141414 0%, #252525 100%)';
        });
    });

    // Typewriter effect for tagline
    const tagline = document.querySelector('.tagline');
    if (tagline) {
        const text = tagline.textContent;
        tagline.textContent = '';
        tagline.style.borderRight = '2px solid var(--color-gold)';

        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                tagline.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            } else {
                setTimeout(() => {
                    tagline.style.borderRight = 'none';
                }, 500);
            }
        };

        // Start after a short delay
        setTimeout(typeWriter, 1000);
    }

    // Add subtle animation to deco ornaments
    const decoOrnaments = document.querySelectorAll('.deco-ornament');
    decoOrnaments.forEach(ornament => {
        ornament.style.animation = 'pulse 3s ease-in-out infinite';
    });

    // Pulse animation for ornaments
    const pulseStyle = document.createElement('style');
    pulseStyle.textContent = `
        @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.7; }
        }
    `;
    document.head.appendChild(pulseStyle);
});
