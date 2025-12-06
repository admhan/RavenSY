const Menu = (() => {
  function toggleMenu() {
    const nav = document.querySelector('nav');
    nav.classList.toggle('open');
  }

  function highlightActive() {
    const path = window.location.pathname.split('/').pop() || 'index.html';
    const links = document.querySelectorAll('nav a');
    links.forEach((link) => {
      const href = link.getAttribute('href');
      const match = href === path || (path === '' && href === 'index.html');
      link.classList.toggle('active', match);
    });
  }

  function init() {
    const toggle = document.querySelector('.menu-toggle');
    if (toggle) {
      toggle.addEventListener('click', toggleMenu);
    }
    highlightActive();
  }

  return { init };
})();

document.addEventListener('DOMContentLoaded', Menu.init);
