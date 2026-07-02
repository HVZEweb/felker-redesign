(function () {
    'use strict';

    const SLIDES = [
        { src: 'assets/mainimg1.jpg', alt: 'Stainless steel pipe secured for transport' },
        { src: 'assets/final064.jpg', alt: 'Felker Brothers stainless steel products' },
        { src: 'assets/finalhirez.jpg', alt: 'High-grade stainless steel pipe' },
        { src: 'assets/finalInventory.jpg', alt: 'Pipe and tube inventory' },
        { src: 'assets/finalelbows.jpg', alt: 'Stainless steel elbows and fittings' },
        { src: 'assets/finalrings.jpg', alt: 'Stainless steel flanges and rings' },
        { src: 'assets/finalwwsystems.jpg', alt: 'Welded piping systems' },
        { src: 'assets/finalfelker3b.jpg', alt: 'Felker Brothers manufacturing' },
        { src: 'assets/finalxtra.jpg', alt: 'Felker Brothers product line' },
    ];

    const INTERVAL_MS = 5000;

    document.querySelectorAll('[data-hero-carousel]').forEach((root) => {
        const slidesEl = root.querySelector('.hero_slides');
        if (!slidesEl) return;

        const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        let index = 0;

        SLIDES.forEach((slide, i) => {
            const slideDiv = document.createElement('div');
            slideDiv.className = 'hero_slide' + (i === 0 ? ' is-active' : '');
            slideDiv.innerHTML = `<img src="${slide.src}" alt="${slide.alt}" width="1400" height="560" loading="${i === 0 ? 'eager' : 'lazy'}">`;
            slidesEl.appendChild(slideDiv);
        });

        const slideEls = slidesEl.querySelectorAll('.hero_slide');

        function next() {
            slideEls[index]?.classList.remove('is-active');
            index = (index + 1) % SLIDES.length;
            slideEls[index]?.classList.add('is-active');
        }

        if (!reducedMotion) {
            setInterval(next, INTERVAL_MS);
        }
    });
})();
