// FS Food Group — site interactions

document.addEventListener('DOMContentLoaded', function () {
    // Current year in footer
    var yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // Mobile nav toggle
    var toggle = document.getElementById('navToggle');
    var links = document.getElementById('navLinks');
    if (toggle && links) {
        toggle.addEventListener('click', function () {
            var open = links.classList.toggle('open');
            toggle.classList.toggle('open', open);
            toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
        });
        // Close menu when a link is clicked
        links.querySelectorAll('a').forEach(function (a) {
            a.addEventListener('click', function () {
                links.classList.remove('open');
                toggle.classList.remove('open');
                toggle.setAttribute('aria-expanded', 'false');
            });
        });
    }

    // Scroll reveal
    var revealTargets = document.querySelectorAll(
        '.card, .step, .quote, .menu-col, .why-list li, .stat, .section-head'
    );
    revealTargets.forEach(function (el) { el.classList.add('reveal'); });

    if ('IntersectionObserver' in window) {
        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });
        revealTargets.forEach(function (el) { observer.observe(el); });
    } else {
        revealTargets.forEach(function (el) { el.classList.add('visible'); });
    }

    // Contact form (front-end only demo)
    var form = document.getElementById('quoteForm');
    var status = document.getElementById('formStatus');
    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            var name = form.querySelector('#name');
            var email = form.querySelector('#email');
            var emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim());

            if (!name.value.trim() || !emailValid) {
                status.textContent = 'Please add your name and a valid email so we can reach you.';
                status.className = 'form-status error';
                return;
            }

            status.textContent = 'Thanks! Your request is in — our dispatch team will reach out within one business day.';
            status.className = 'form-status success';
            form.reset();
        });
    }
});
