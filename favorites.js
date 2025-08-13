import{e as v}from"./assets/tastyTreatsApi-D_6eBPKE.js";const n="favoriteRecipes";function c(){const e=localStorage.getItem(n);return e?JSON.parse(e):[]}function f(e){let i=c();i=i.filter(a=>a._id!==e),localStorage.setItem(n,JSON.stringify(i))}const r=document.querySelector("#favorite-recipes-container"),s=document.querySelector(".favorites-placeholder");async function l(){try{const e=c();if(e.length===0){s.classList.remove("hidden"),r.classList.add("hidden"),r.innerHTML="";return}const i=e.map(t=>v(t._id)),a=await Promise.all(i);s.classList.add("hidden"),r.classList.remove("hidden");const o=a.map(t=>{const d=(t.rating||0)/5*100;return`
        <div class="favorite-recipe-card" data-id="${t._id}">
          <button class="heart-btn favorite-heart-btn active" aria-label="Remove from favorites">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
          </button>
          
          <img class="favorite-recipe-card-image" src="${t.thumb||"./path-to-your-placeholder-image.jpg"}" alt="${t.title}" loading="lazy">
          
          <div class="favorite-recipe-card-details">
            <h3 class="recipe-title favorite-recipe-title">${t.title||"No Title"}</h3>
            <p class="recipe-text favorite-recipe-text">${t.description||""}</p>
            <div class="favorite-recipe-card-footer">
              <div class="recipe-card-rating rating-box">
                <span class="rating-value">${(t.rating||0).toFixed(1)}</span>
                <div class="rating-stars " style="--rating: ${d}%">
                  <span>★★★★★</span>
                  <span class="stars-filled">★★★★★</span>
                </div>
              </div>
              <button class="see-recipe-btn" type="button">See recipe</button>
            </div>
          </div>
        </div>`}).join("");r.innerHTML=o}catch(e){console.error("Favori tarifler yüklenirken bir hata oluştu:",e),s.textContent="Tarifler yüklenirken bir sorun oluştu. Lütfen daha sonra tekrar deneyin.",s.classList.remove("hidden"),r.classList.add("hidden")}}function p(e){const i=e.target.closest(".favorite-heart-btn");if(!i)return;const a=i.closest(".favorite-recipe-card");if(!a)return;const o=a.dataset.id;f(o),l()}document.addEventListener("DOMContentLoaded",l);r.addEventListener("click",p);
//# sourceMappingURL=favorites.js.map
