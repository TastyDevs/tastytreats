import"./assets/styles-BIzYtEVP.js";const p="favoriteRecipes";function g(){const e=localStorage.getItem(p);return e?JSON.parse(e):[]}function h(e){let t=g();t=t.filter(s=>s._id!==e),localStorage.setItem(p,JSON.stringify(t))}const o=document.querySelector("#favorite-recipes-container"),v=document.querySelector(".favorites-placeholder"),i=document.querySelector(".categories-filter");function m(){const e=g(),t=[...new Set(e.map(a=>a.category))];let s='<button class="categories-box category-btn active" type="button">All categories</button>';t.forEach(a=>{s+=`
      <button class="categories-box category-btn" type="button">
        ${a}
      </button>
      `}),i.innerHTML=s}function c(e="All categories"){let t=g();if(e!=="All categories"&&(t=t.filter(a=>a.category===e)),t.length===0){e==="All categories"?(v.classList.remove("hidden"),o.classList.add("hidden"),i.classList.add("hidden")):(v.classList.add("hidden"),o.classList.remove("hidden")),o.innerHTML="";return}v.classList.add("hidden"),o.classList.remove("hidden"),i.classList.remove("hidden");const s=t.map(a=>{const n=a.rating/5*100;return`
   <div class="favorite-recipe-card" data-id="${a._id}" data-category="${a.category}">
        <button class="heart-btn favorite-heart-btn active" aria-label="Remove from favorites">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
          </button>
        <img class="favorite-recipe-card-image" src="${a.thumb}" alt="${a.title}" loading="lazy">
        <div class="favorite-recipe-card-details">
            <h3 class="recipe-title favorite-recipe-title">${a.title}</h3>
            <p class="recipe-text favorite-recipe-text">${a.description}</p>
            <div class="favorite-recipe-card-footer">
                <div class="recipe-card-rating rating-box">
                   <span class="rating-value">${(a.rating||0).toFixed(1)}</span>
                    <div class="rating-stars " style="--rating: ${n}%">
                        <span>★★★★★</span>
                        <span class="stars-filled">★★★★★</span>
                    </div>
                </div>
                <button class="see-recipe-btn" type="button">See recipe</button>
            </div>
        </div>
      </div>`}).join("");o.innerHTML=s}function S(e){const t=e.target.closest(".favorite-heart-btn");if(!t)return;const s=t.closest(".favorite-recipe-card");if(!s)return;const a=s.dataset.id;h(a);const n=document.querySelector(".category-btn.active"),f=n?n.textContent:"All categories";m();const y=i.querySelectorAll(".category-btn");let u=!1;y.forEach(d=>{d.textContent===f?(d.classList.add("active"),u=!0):d.classList.remove("active")}),u?c(f):(i.querySelector(".category-btn").classList.add("active"),c("All categories"))}function x(e){if(!e.target.matches(".category-btn"))return;const t=e.target.textContent.trim();i.querySelectorAll(".category-btn").forEach(s=>{s.classList.remove("active")}),e.target.classList.add("active"),c(t)}function E(){m(),c()}const r=document.querySelector(".categories-filter");let l=!1,L,b;r.addEventListener("mousedown",e=>{l=!0,r.classList.add("grabbing"),L=e.pageX-r.offsetLeft,b=r.scrollLeft});r.addEventListener("mouseleave",()=>{l=!1,r.classList.remove("grabbing")});r.addEventListener("mouseup",()=>{l=!1,r.classList.remove("grabbing")});r.addEventListener("mousemove",e=>{if(!l)return;e.preventDefault();const s=(e.pageX-r.offsetLeft-L)*2;r.scrollLeft=b-s});document.addEventListener("DOMContentLoaded",E);o.addEventListener("click",S);i.addEventListener("click",x);
//# sourceMappingURL=favorites.js.map
