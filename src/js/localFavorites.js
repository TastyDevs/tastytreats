const FAVORITES_KEY = 'favoriteRecipes';

// Tüm favorileri döndürür
export function getFavorites() {
  const favorites = localStorage.getItem(FAVORITES_KEY);
  return favorites ? JSON.parse(favorites) : [];
}

export function addFavorite(recipe) {
  const favorites = getFavorites();
  // Tarifin zaten favorilerde olup olmadığını kontrol et
  if (!favorites.some(fav => fav._id === recipe._id)) {
    favorites.push(recipe);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  }
}

export function removeFavorite(recipeId) {
  let favorites = getFavorites();
  favorites = favorites.filter(recipe => recipe._id !== recipeId);
  // Güncellenmiş diziyi Local Storage'a kaydet
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
}

// Bir tarifin favori olup olmadığını kontrol eder
export function isFavorite(recipeId) {
  const favorites = getFavorites();
  return favorites.some(recipe => recipe._id === recipeId);
}
