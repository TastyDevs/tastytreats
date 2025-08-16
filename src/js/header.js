// DOM elementleri
const menuIcon = document.getElementById('menu-icon');
const navMenu = document.getElementById('nav-menu');
const navCloseBtn = document.getElementById('nav-close-btn');
const desktopToggle = document.getElementById('desktop-toggle'); // header toggle
const mobileToggle = document.getElementById('mobile-toggle'); // nav-menu toggle

// Menü aç/kapa
menuIcon.addEventListener('click', () => {
  navMenu.classList.add('active'); // Menü sağdan açılır
});

navCloseBtn.addEventListener('click', () => {
  navMenu.classList.remove('active'); // Menü sola kayar
});

// Desktop header toggle
if (desktopToggle) {
  desktopToggle.addEventListener('click', () => {
    desktopToggle.classList.toggle('active'); // Toggle hareketi

    if (document.body.getAttribute('data-theme') === 'dark') {
      document.body.removeAttribute('data-theme');
    } else {
      document.body.setAttribute('data-theme', 'dark');
    }
  });
}

// Mobile nav-menu toggle
if (mobileToggle) {
  mobileToggle.addEventListener('click', () => {
    mobileToggle.classList.toggle('active'); // Toggle hareketi

    if (document.body.getAttribute('data-theme') === 'dark') {
      document.body.removeAttribute('data-theme');
    } else {
      document.body.setAttribute('data-theme', 'dark');
    }
  });
}
