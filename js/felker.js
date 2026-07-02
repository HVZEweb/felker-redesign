(function () {
    'use strict';

    const burger = document.querySelector('.burger');
    const mobileNav = document.querySelector('.mobile_nav');

    if (burger && mobileNav) {
        burger.addEventListener('click', () => {
            const open = mobileNav.classList.toggle('is-open');
            burger.setAttribute('aria-expanded', open ? 'true' : 'false');
        });

        mobileNav.querySelectorAll('a').forEach((link) => {
            link.addEventListener('click', () => mobileNav.classList.remove('is-open'));
        });
    }

    const current = location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav a, .mobile_nav a').forEach((link) => {
        const href = link.getAttribute('href');
        if (href === current || (current === '' && href === 'index.html')) {
            link.classList.add('is-active');
        }
    });

    function showToast(msg) {
        let el = document.getElementById('felker-toast');
        if (!el) {
            el = document.createElement('div');
            el.id = 'felker-toast';
            el.className = 'toast';
            el.setAttribute('role', 'status');
            document.body.appendChild(el);
        }
        el.textContent = msg;
        el.classList.add('is-visible');
        clearTimeout(el._timer);
        el._timer = setTimeout(() => el.classList.remove('is-visible'), 3200);
    }

    document.querySelectorAll('[data-demo-form]').forEach((form) => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            showToast('Request sent — this is a redesign concept demo.');
            form.reset();
        });
    });
})();
