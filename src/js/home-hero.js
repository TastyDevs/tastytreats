const slides = document.querySelectorAll(".home-slides");
const dots = document.querySelectorAll(".home-dot");

let currentPage = 0;

function showPage(page) {
  slides.forEach((slide, i) => {
    slide.classList.toggle("active", i === page);
  });
  dots.forEach((dot, i) => {
    dot.classList.toggle("active", i === page);
  });
}

// Dot tıklama
dots.forEach((dot, i) => {
  dot.addEventListener("click", () => {
    currentPage = i;
    showPage(currentPage);
  });
});

// İlk sayfayı göster
showPage(currentPage);
