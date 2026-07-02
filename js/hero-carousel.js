(function () {
    'use strict';

    const SLIDES = [
        { src: 'assets/mainimg1.jpg', alt: 'Stainless steel pipe secured for transport', caption: 'Pipe & tube — ready to ship' },
        { src: 'assets/final064.jpg', alt: 'Felker Brothers stainless steel products', caption: 'Welded stainless steel piping' },
        { src: 'assets/finalhirez.jpg', alt: 'High-grade stainless steel pipe', caption: 'Process-grade quality' },
        { src: 'assets/finalInventory.jpg', alt: 'Pipe and tube inventory', caption: 'Extensive inventory on hand' },
        { src: 'assets/finalelbows.jpg', alt: 'Stainless steel elbows and fittings', caption: 'Fittings & elbows' },
        { src: 'assets/finalrings.jpg', alt: 'Stainless steel flanges and rings', caption: 'Flanges & specialty components' },
        { src: 'assets/finalwwsystems.jpg', alt: 'Welded piping systems', caption: 'Fabricated piping systems' },
        { src: 'assets/finalfelker3b.jpg', alt: 'Felker Brothers manufacturing', caption: 'US manufacturing since 1903' },
        { src: 'assets/finalxtra.jpg', alt: 'Felker Brothers product line', caption: 'Your complete combination' },
    ];

    const INTERVAL_MS = 5500;

    document.querySelectorAll('[data-hero-carousel]').forEach((root) => {
        const slidesEl = root.querySelector('.hero_slides');
        const dotsEl = root.querySelector('.hero_dots');
        const captionEl = root.querySelector('.hero_caption');
        const prevBtn = root.querySelector('.hero_arrow--prev');
        const nextBtn = root.querySelector('.hero_arrow--next');
        if (!slidesEl || !dotsEl) return;

        const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        let index = 0;
        let timer = null;

        SLIDES.forEach((slide, i) => {
            const slideDiv = document.createElement('div');
            slideDiv.className = 'hero_slide' + (i === 0 ? ' is-active' : '');
            slideDiv.innerHTML = `<img src="${slide.src}" alt="${slide.alt}" width="1400" height="560" loading="${i === 0 ? 'eager' : 'lazy'}">`;
            slidesEl.appendChild(slideDiv);

            const dot = document.createElement('button');
            dot.type = 'button';
            dot.className = 'hero_dot' + (i === 0 ? ' is-active' : '');
            dot.setAttribute('aria-label', `Slide ${i + 1}: ${slide.caption}`);
            dot.addEventListener('click', () => goTo(i, true));
            dotsEl.appendChild(dot);
        });

        const slideEls = slidesEl.querySelectorAll('.hero_slide');
        const dotEls = dotsEl.querySelectorAll('.hero_dot');

        function setCaption(i) {
            if (captionEl) captionEl.textContent = SLIDES[i].caption;
        }

        function goTo(i, userAction) {
            slideEls[index]?.classList.remove('is-active');
            dotEls[index]?.classList.remove('is-active');
            index = (i + SLIDES.length) % SLIDES.length;
            slideEls[index]?.classList.add('is-active');
            dotEls[index]?.classList.add('is-active');
            setCaption(index);
            if (userAction) restartTimer();
        }

        function next() {
            goTo(index + 1, false);
        }

        function prev() {
            goTo(index - 1, true);
        }

        function startTimer() {
            if (reducedMotion) return;
            clearInterval(timer);
            timer = setInterval(next, INTERVAL_MS);
        }

        function restartTimer() {
            startTimer();
        }

        prevBtn?.addEventListener('click', prev);
        nextBtn?.addEventListener('click', () => goTo(index + 1, true));
        root.addEventListener('mouseenter', () => clearInterval(timer));
        root.addEventListener('mouseleave', startTimer);
        root.addEventListener('focusin', () => clearInterval(timer));
        root.addEventListener('focusout', startTimer);

        setCaption(0);
        startTimer();
    });
})();
