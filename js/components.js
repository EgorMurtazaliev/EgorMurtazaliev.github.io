async function loadComponent(selector, file) {
    try {
        const response = await fetch(file);
        const html = await response.text();
        document.querySelector(selector).outerHTML = html;
    } catch (error) {
        console.error(`Ошибка загрузки ${file}:`, error);
    }
}

function updateAuthButton() {
    const authLink = document.querySelector('.header__auth');

    if (!authLink) return;
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    if (currentUser?.login) {
        authLink.textContent = currentUser.login;
        authLink.href = '#';

        authLink.onmouseenter = () => {
            authLink.textContent = 'Выход';
        };

        authLink.onmouseleave = () => {
            authLink.textContent = currentUser.login;
        };

        authLink.onclick = (e) => {
            e.preventDefault();
            logout();
        };
    } else {
        authLink.textContent = 'Вход';

        authLink.onclick = (e) => {
            e.preventDefault();
            localStorage.setItem('redirectAfterLogin', window.location.pathname);
            const path = window.location.pathname;
            const isInArticles = path.includes('/articles/');
            window.location.href = isInArticles ? '../auth.html' : 'auth.html';
        };

        authLink.onmouseenter = null;
        authLink.onmouseleave = null;
    }
}

function logout() {
    localStorage.removeItem('currentUser');
    updateAuthButton();
    location.reload();
}

function fixHeaderLinks() {
    const path = window.location.pathname;
    const isInArticles = path.includes('/articles/');

    document.querySelectorAll('.header a, .header__auth, .dropdown a').forEach(link => {
        let href = link.getAttribute('href');
        if (!href) return;
        if (href === '#' || href.startsWith('#')) return;

        if (href === 'index.html' || href === 'auth.html') {
            link.href = isInArticles ? '../' + href : href;
        } else if (href.includes('articles/')) {
            if (isInArticles && !href.startsWith('../')) {
                link.href = '../' + href;
            }
        }
    });
}

document.addEventListener('DOMContentLoaded', async () => {
    const path = window.location.pathname;
    const isInArticles = path.includes('/articles/');
    const prefix = isInArticles ? '../' : '';

    await loadComponent('header', prefix + 'components/header.html');
    await loadComponent('footer', prefix + 'components/footer.html');

    setTimeout(() => {
        fixHeaderLinks();
        updateAuthButton();
    }, 50);
});