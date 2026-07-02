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

    const page = location.pathname.split('/').pop() || 'index.html';
    const isHome = page === 'index.html' || page === '';

    const burger = document.querySelector('.burger');
    const mobileNav = document.querySelector('.mobile_nav');
    const submenuPanel = document.getElementById('submenu-panel');
    const tabButtons = document.querySelectorAll('[data-tab]');
    const activeTab = document.body.dataset.activeTab || 'piping';
    let submenuBody = null;
    let submenuToggle = null;

    if (submenuPanel && !submenuPanel.querySelector('.submenu_body')) {
        submenuToggle = document.createElement('button');
        submenuToggle.type = 'button';
        submenuToggle.className = 'submenu_toggle';
        submenuToggle.setAttribute('aria-expanded', 'true');
        submenuToggle.innerHTML = '<span>Division menu</span><svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true"><path d="M2 4l4 4 4-4" stroke="currentColor" stroke-width="1.5" fill="none"/></svg>';
        submenuBody = document.createElement('div');
        submenuBody.className = 'submenu_body';
        submenuPanel.append(submenuToggle, submenuBody);
        submenuToggle.addEventListener('click', () => {
            const collapsed = submenuPanel.classList.toggle('is-collapsed');
            submenuToggle.setAttribute('aria-expanded', collapsed ? 'false' : 'true');
        });
    } else if (submenuPanel) {
        submenuBody = submenuPanel.querySelector('.submenu_body');
    }

    function linkIsCurrent(href) {
        const url = new URL(href, location.href);
        const linkPage = url.pathname.split('/').pop() || 'index.html';
        if (linkPage !== page && !(linkPage === 'index.html' && isHome)) return false;
        if (url.hash && location.hash !== url.hash) return false;
        return true;
    }

    function renderSubmenu(tabKey) {
        if (!submenuBody) return;
        const menu = SUBMENUS[tabKey] || SUBMENUS.piping;
        submenuBody.innerHTML = `
            <p class="submenu_hint">Division resources</p>
            <p class="submenu_label">${menu.label}</p>
            <ul class="submenu_list">
                ${menu.links
                    .map((link) => {
                        const current = linkIsCurrent(link.href);
                        return `<li><a href="${link.href}" class="${current ? 'is-current' : ''}"${link.external ? ' target="_blank" rel="noopener noreferrer"' : ''}>${link.text}</a></li>`;
                    })
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
        if (pushState && history.replaceState && isHome) {
            history.replaceState(null, '', `#${tabKey}`);
        }
    }

    tabButtons.forEach((btn) => {
        btn.addEventListener('click', () => {
            const tab = btn.dataset.tab;
            if (!isHome) {
                location.href = `index.html#${tab}`;
                return;
            }
            setActiveTab(tab, true);
        });
    });

    const hashTab = location.hash.replace('#', '');
    if (isHome && SUBMENUS[hashTab]) {
        setActiveTab(hashTab, false);
    } else {
        setActiveTab(activeTab, false);
    }

    if (burger && mobileNav) {
        burger.addEventListener('click', () => {
            const open = mobileNav.classList.toggle('is-open');
            burger.classList.toggle('is-open', open);
            burger.setAttribute('aria-expanded', open ? 'true' : 'false');
            document.body.classList.toggle('menu-open', open);
        });
        mobileNav.querySelectorAll('a').forEach((link) => {
            link.addEventListener('click', () => {
                mobileNav.classList.remove('is-open');
                burger.classList.remove('is-open');
                document.body.classList.remove('menu-open');
            });
        });
    }

    document.querySelectorAll('.utility_nav a, .mobile_nav a').forEach((link) => {
        if (linkIsCurrent(link.getAttribute('href') || '')) {
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
