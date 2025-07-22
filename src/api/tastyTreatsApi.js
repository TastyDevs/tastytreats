const BASE_URL = 'https://tasty-treats-backend.p.goit.global/api';

//  Etkinlikler
export async function fetchEvents() {
  const res = await fetch(`${BASE_URL}/events`);
  return await res.json();
}

//  Tüm kategorileri getir
export async function fetchCategories() {
  const res = await fetch(`${BASE_URL}/categories`);
  return await res.json();
}

//  Filtreli tarifleri getir (opsiyonel parametreler)
export async function fetchFilteredRecipes({
  category = '',
  page = 1,
  limit = 6,
  time = '',
  area = '',
  ingredient = '',
} = {}) {
  const url = new URL(`${BASE_URL}/recipes`);
  if (category) url.searchParams.append('category', category);
  if (page) url.searchParams.append('page', page);
  if (limit) url.searchParams.append('limit', limit);
  if (time) url.searchParams.append('time', time);
  if (area) url.searchParams.append('area', area);
  if (ingredient) url.searchParams.append('ingredient', ingredient);

  const res = await fetch(url);
  return await res.json();
}

//  Popüler tarifleri getir
export async function fetchPopularRecipes() {
  const res = await fetch(`${BASE_URL}/recipes/popular`);
  return await res.json();
}

//  Belirli tarifin detayını getir
export async function fetchRecipeDetails(recipeId) {
  const res = await fetch(`${BASE_URL}/recipes/${recipeId}`);
  return await res.json();
}

//  Belirli tarife puan ver
export async function rateRecipe(recipeId, rating) {
  const res = await fetch(`${BASE_URL}/recipes/${recipeId}/rating`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ rating }),
  });
  return await res.json();
}

//  Tüm malzemeleri getir
export async function fetchIngredients() {
  const res = await fetch(`${BASE_URL}/ingredients`);
  return await res.json();
}

//  Tüm bölgeleri getir
export async function fetchAreas() {
  const res = await fetch(`${BASE_URL}/areas`);
  return await res.json();
}

//  Sipariş oluştur
export async function createOrder(orderData) {
  const res = await fetch(`${BASE_URL}/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(orderData),
  });
  return await res.json();
}
