const menuIcon = document.getElementById('menu-icon');
const navMenu = document.getElementById('nav-menu');
const navCloseBtn = document.getElementById('nav-close-btn');
const themeToggleBtn = document.getElementById('theme-toggle-btn');
menuIcon.addEventListener('click', () => {
  navMenu.classList.add('active');
});

navCloseBtn.addEventListener('click', () => {
  navMenu.classList.remove('active');
});


themeToggleBtn.addEventListener('click', () => {
  if (document.body.getAttribute('data-theme') === 'dark') {
    document.body.removeAttribute('data-theme');
  } else {
    document.body.setAttribute('data-theme', 'dark');
  }
});