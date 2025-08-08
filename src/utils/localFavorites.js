const FAVORITES_KEY = 'favoriteRecipes';

export function getFavorites() {
  try {
    return JSON.parse(localStorage.getItem(FAVORITES_KEY)) || [];
  } catch (e) {
    return [];
  }
}

export function saveFavorites(favorites) {
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
}

export function toggleFavorite(recipe) {
  const favorites = getFavorites();
  const exists = favorites.some(fav => fav._id === recipe._id);

  if (exists) {
    const updated = favorites.filter(fav => fav._id !== recipe._id);
    saveFavorites(updated);
  } else {
    favorites.push(recipe);
    saveFavorites(favorites);
  }
}

export function isFavorite(recipeId) {
  const favorites = getFavorites();
  return favorites.some(fav => fav._id === recipeId);
}
