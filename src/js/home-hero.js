const homeslides = document.querySelectorAll(".home-slides");
const homedots = document.querySelectorAll(".home-dot");

let currentPage = 0;

function showPage(page) {
  homeslides.forEach((slide, i) => {
    slide.classList.toggle("active", i === page);
  });
  homedots.forEach((dot, i) => {
    dot.classList.toggle("active", i === page);
  });
}

// Dot tıklama
homedots.forEach((dot, i) => {
  dot.addEventListener("click", () => {
    currentPage = i;
    showPage(currentPage);
  });
});

// İlk sayfayı göster
showPage(currentPage);
