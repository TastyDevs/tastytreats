import { fetchFilteredRecipes, fetchCategories } from '../api/tastyTreatsApi.js';

const recipesContainer = document.querySelector('#recipes-container');
const paginationContainer = document.querySelector('#pagination');
const categoryList = document.querySelector('#category-list');
const allCategoriesBtn = document.querySelector('.categories-box'); // DÜZENLENDİ

let currentPage = 1;
let totalPages = 1;
let selectedCategory = null;
let limit = calculateLimit();

function calculateLimit() {
  const width = window.innerWidth;
  if (width < 768) return 6;
  if (width < 1280) return 8;
  return 9;
}

async function loadCategories() {
  try {
    const categories = await fetchCategories();

    const markup = categories
      .map(
        cat => `
        <li>
          <button 
            class="category-btn ${cat.name === selectedCategory ? 'active' : ''}" 
            data-category="${cat.name}">
            ${cat.name}
          </button>
        </li>`
      )
      .join('');

    categoryList.innerHTML = markup;

    const categoryButtons = categoryList.querySelectorAll('.category-btn');

    categoryButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const newCategory = btn.dataset.category;

        if (newCategory !== selectedCategory) {
          selectedCategory = newCategory;
          currentPage = 1;

          // Aktif class'ları temizle
          categoryButtons.forEach(b => b.classList.remove('active'));
          allCategoriesBtn.classList.remove('active');

          // Seçilen kategoriyi aktif yap
          btn.classList.add('active');

          loadAndDisplayRecipes(currentPage);
        }
      });
    });
  } catch (error) {
    console.error('Failed to load categories:', error);
  }
}

// All categories butonuna click eventi
if (allCategoriesBtn) {
  allCategoriesBtn.addEventListener('click', () => {
    if (selectedCategory !== null) {
      selectedCategory = null;
      currentPage = 1;

      // Aktif class'ları temizle
      const categoryButtons = categoryList.querySelectorAll('.category-btn');
      categoryButtons.forEach(btn => btn.classList.remove('active'));

      allCategoriesBtn.classList.add('active');

      loadAndDisplayRecipes(currentPage);
    }
  });
}

async function loadAndDisplayRecipes(page = 1) {
  try {
    limit = calculateLimit();
    const response = await fetchFilteredRecipes({
      page,
      limit,
      category: selectedCategory || undefined,
    });

    const recipes = response.results;
    totalPages =
      response.totalPages || Math.ceil(response.totalResults / limit);

    if (!recipes || recipes.length === 0) {
      recipesContainer.innerHTML = '<p>No recipes found to display.</p>';
      paginationContainer.innerHTML = '';
      return;
    }

    const recipesMarkup = recipes
      .map(
        recipe => `
        <div class="recipe-card" data-id="${recipe._id}">
          <img class="recipe-card-image" src="${recipe.thumb}" alt="${recipe.title}" loading="lazy">
          <div class="recipe-card-content">
            <h3 class="recipe-card-title">${recipe.title}</h3>
            <p class="recipe-card-description">${recipe.description}</p>
            <div class="recipe-card-rating"><span>${recipe.rating.toFixed(1)}</span></div>
            <button class="recipe-card-button" type="button">See recipe</button>
          </div>
        </div>`
      )
      .join('');

    recipesContainer.innerHTML = recipesMarkup;
    renderPagination(totalPages, page);
  } catch (error) {
    console.error('An error occurred while loading recipes:', error);
    recipesContainer.innerHTML =
      '<p>The recipes could not be loaded. Please try again later.</p>';
    paginationContainer.innerHTML = '';
  }
}

function renderPagination(total, current) {
  let buttonsMarkup = '';
  for (let i = 1; i <= total; i++) {
    buttonsMarkup += `<button class="pagination-btn ${i === current ? 'active' : ''}" data-page="${i}">${i}</button>`;
  }

  paginationContainer.innerHTML = buttonsMarkup;

  const allButtons = paginationContainer.querySelectorAll('.pagination-btn');
  allButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const selectedPage = Number(btn.dataset.page);
      if (selectedPage !== currentPage) {
        currentPage = selectedPage;
        loadAndDisplayRecipes(currentPage);
      }
    });
  });
}

window.addEventListener('resize', () => {
  const newLimit = calculateLimit();
  if (newLimit !== limit) {
    currentPage = 1;
    loadAndDisplayRecipes(currentPage);
  }
});

// İlk yükleme
loadCategories();
loadAndDisplayRecipes();
