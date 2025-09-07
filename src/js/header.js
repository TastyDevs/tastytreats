
const menuIcon = document.getElementById('menu-icon');
const navMenu = document.getElementById('nav-menu');
const navCloseBtn = document.getElementById('nav-close-btn');
const desktopToggle = document.getElementById('desktop-toggle'); 
const mobileToggle = document.getElementById('mobile-toggle'); 


function setTheme(dark) {
  if (dark) {
    document.body.setAttribute('data-theme', 'dark');
    localStorage.setItem('theme', 'dark');
  } else {
    document.body.removeAttribute('data-theme');
    localStorage.setItem('theme', 'light');
  }
}


window.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    document.body.setAttribute('data-theme', 'dark');
    desktopToggle?.classList.add('active');
    mobileToggle?.classList.add('active');
  }
});


menuIcon.addEventListener('click', () => {
  navMenu.classList.add('active');
});

navCloseBtn.addEventListener('click', () => {
  navMenu.classList.remove('active');
});


if (desktopToggle) {
  desktopToggle.addEventListener('click', () => {
    desktopToggle.classList.toggle('active');
    setTheme(document.body.getAttribute('data-theme') !== 'dark');
  });
}


if (mobileToggle) {
  mobileToggle.addEventListener('click', () => {
    mobileToggle.classList.toggle('active');
    setTheme(document.body.getAttribute('data-theme') !== 'dark');
  });
}


window.addEventListener('resize', () => {
  if (window.innerWidth > 768) {
    navMenu.classList.remove('active');
  }
});