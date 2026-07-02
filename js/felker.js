(function () {
    'use strict';

    const SUBMENUS = {
        piping: {
            label: 'Piping Products',
            links: [
                { text: 'Certifications', href: 'about.html#certifications' },
                { text: 'Customer Service', href: 'contact.html' },
                { text: 'List Price Sheets', href: 'contact.html#quote' },
                { text: 'Product Catalog', href: 'http://www.felkerbrothers.com/files/common/felkercatalog071406-web.pdf', external: true },
                { text: 'Product Line Card', href: 'products.html#piping' },
                { text: 'Value Added Services', href: 'products.html#services' },
            ],
        },
        fabrication: {
            label: 'Fabrication Products',
            links: [
                { text: 'Fabrication Overview', href: 'products.html#fabrication' },
                { text: 'Custom Spools', href: 'products.html#spools' },
                { text: 'Certifications', href: 'about.html#certifications' },
                { text: 'Request Fabrication Quote', href: 'contact.html#quote' },
                { text: 'Engineering Support', href: 'contact.html' },
                { text: 'Value Added Services', href: 'products.html#services' },
            ],
        },
        service: {
            label: 'Customer Service',
            links: [
                { text: 'Office Hours', href: 'contact.html#hours' },
                { text: 'Order Status', href: 'https://www.felkerbrothers.com/pipeline-portal.aspx', external: true },
                { text: 'Material Test Reports', href: 'index.html#mtr' },
                { text: 'Credit Applications', href: 'contact.html' },
                { text: 'Request Quote', href: 'contact.html#quote' },
                { text: 'Find a Representative', href: 'contact.html' },
            ],
        },
        news: {
            label: 'Industry News',
            links: [
                { text: 'Company Updates', href: 'about.html' },
                { text: 'Product Announcements', href: 'products.html' },
                { text: 'Trade Shows', href: 'about.html#events' },
                { text: 'Industry Resources', href: 'products.html#resources' },
                { text: 'Press Contact', href: 'contact.html' },
            ],
        },
    };

    const burger = document.querySelector('.burger');
    const mobileNav = document.querySelector('.mobile_nav');
    const submenuPanel = document.getElementById('submenu-panel');
    const tabButtons = document.querySelectorAll('[data-tab]');
    const activeTab = document.body.dataset.activeTab || 'piping';

    function renderSubmenu(tabKey) {
        if (!submenuPanel) return;
        const menu = SUBMENUS[tabKey] || SUBMENUS.piping;
        submenuPanel.innerHTML = `
            <p class="submenu_title">${menu.label}</p>
            <ul class="submenu_list">
                ${menu.links
                    .map(
                        (link) =>
                            `<li><a href="${link.href}"${link.external ? ' target="_blank" rel="noopener noreferrer"' : ''}>${link.text}</a></li>`
                    )
                    .join('')}
            </ul>`;
    }

    function setActiveTab(tabKey, pushState) {
        tabButtons.forEach((btn) => {
            const on = btn.dataset.tab === tabKey;
            btn.classList.toggle('is-active', on);
            btn.setAttribute('aria-selected', on ? 'true' : 'false');
        });
        document.body.dataset.activeTab = tabKey;
        renderSubmenu(tabKey);
        if (pushState && history.replaceState) {
            history.replaceState(null, '', `#${tabKey}`);
        }
    }

    tabButtons.forEach((btn) => {
        btn.addEventListener('click', () => {
            setActiveTab(btn.dataset.tab, true);
            submenuPanel?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        });
    });

    const hashTab = location.hash.replace('#', '');
    if (SUBMENUS[hashTab]) {
        setActiveTab(hashTab, false);
    } else {
        setActiveTab(activeTab, false);
    }

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
    document.querySelectorAll('.utility_nav a, .mobile_nav a').forEach((link) => {
        const href = link.getAttribute('href')?.split('#')[0];
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

    document.querySelectorAll('[data-portal-form]').forEach((form) => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            showToast('Portal login — use felkerbrothers.com for live access.');
        });
    });
})();
