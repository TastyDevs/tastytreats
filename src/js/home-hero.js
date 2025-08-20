const homeslides = document.querySelectorAll(".home-slides");
const homedots = document.querySelectorAll(".home-dot");

// Popup 
const popup = document.createElement("div");
popup.classList.add("home-popup");
popup.innerHTML = `
  <div class="home-popup-content">
    <span class="home-popup-close">&times;</span>
    <h2>ORDER NOW</h2>
    <form class="home-popup-form">
      <label for="name">Name</label>
      <input type="text" id="name" name="name"  required />
      <label for="phone">Phone number</label>
      <input type="tel" id="phone" name="phone"  required />
      <label for="email">Email</label>
      <input type="email" id="email" name="email"  required />
      <label for="comment">Comment</label>
      <textarea id="comment" name="comment" ></textarea>
      <button type="submit">Send</button>
    </form>
  </div>
`;
document.body.appendChild(popup);

// Göster/gizle fonksiyonu
function showPopup() { popup.style.display = "flex"; }
function hidePopup() { popup.style.display = "none"; }

const heroBtn = document.querySelector(".home-hero-btn");
heroBtn.addEventListener("click", showPopup);

const popupClose = popup.querySelector(".home-popup-close");
popupClose.addEventListener("click", hidePopup);

popup.addEventListener("click", (e) => {
  if (e.target === popup) hidePopup();
});

// --- Carousel kodu ---
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


const slidePartials = document.querySelectorAll(".home-slide-partial");
const slideSmalls = document.querySelectorAll(".home-slide.small");


slidePartials.forEach((thumb) => {
  thumb.addEventListener("click", () => {
    currentPage = (currentPage + 1) % homeslides.length;
    showPage(currentPage);
  });
});


slideSmalls.forEach((thumb) => {
  thumb.addEventListener("click", () => {
    currentPage = (currentPage - 1 + homeslides.length) % homeslides.length;
    showPage(currentPage);
  });
});


showPage(currentPage);
