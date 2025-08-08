/* empty css                      */(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const n of e)if(n.type==="childList")for(const s of n.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&a(s)}).observe(document,{childList:!0,subtree:!0});function i(e){const n={};return e.integrity&&(n.integrity=e.integrity),e.referrerPolicy&&(n.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?n.credentials="include":e.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function a(e){if(e.ep)return;e.ep=!0;const n=i(e);fetch(e.href,n)}})();const w="https://tasty-treats-backend.p.goit.global/api";async function _(){return await(await fetch(`${w}/categories`)).json()}async function A({category:t="",page:r=1,limit:i=6,time:a="",area:e="",ingredient:n=""}={}){const s=new URL(`${w}/recipes`);return t&&s.searchParams.append("category",t),r&&s.searchParams.append("page",r),i&&s.searchParams.append("limit",i),a&&s.searchParams.append("time",a),e&&s.searchParams.append("area",e),n&&s.searchParams.append("ingredient",n),await(await fetch(s)).json()}async function C(){return await(await fetch(`${w}/recipes/popular`)).json()}const v=document.querySelector("#recipes-container"),m=document.querySelector("#pagination"),L=document.querySelector("#category-list"),f=document.querySelector(".categories-box");let o=1,T=1,c=null,g=$();function $(){const t=window.innerWidth;return t<768?6:t<1280?8:9}async function B(){try{const r=(await _()).map(a=>`
        <li>
          <button 
            class="category-btn ${a.name===c?"active":""}" 
            data-category="${a.name}">
            ${a.name}
          </button>
        </li>`).join("");L.innerHTML=r;const i=L.querySelectorAll(".category-btn");i.forEach(a=>{a.addEventListener("click",()=>{const e=a.dataset.category;e!==c&&(c=e,o=1,i.forEach(n=>n.classList.remove("active")),f.classList.remove("active"),a.classList.add("active"),d(o))})})}catch(t){console.error("Failed to load categories:",t)}}f&&f.addEventListener("click",()=>{c!==null&&(c=null,o=1,L.querySelectorAll(".category-btn").forEach(r=>r.classList.remove("active")),f.classList.add("active"),d(o))});async function d(t=1){try{g=$();const r=await A({page:t,limit:g,category:c||void 0}),i=r.results;if(T=r.totalPages||Math.ceil(r.totalResults/g),!i||i.length===0){v.innerHTML="<p>No recipes found to display.</p>",m.innerHTML="";return}const a=i.map(e=>`
        <div class="recipe-card" data-id="${e._id}">
          <img class="recipe-card-image" src="${e.thumb}" alt="${e.title}" loading="lazy">
          <div class="recipe-card-content">
            <h3 class="recipe-card-title">${e.title}</h3>
            <p class="recipe-card-description">${e.description}</p>
            <div class="recipe-card-rating"><span>${e.rating.toFixed(1)}</span></div>
            <button class="recipe-card-button" type="button">See recipe</button>
          </div>
        </div>`).join("");v.innerHTML=a,F(T,t)}catch(r){console.error("An error occurred while loading recipes:",r),v.innerHTML="<p>The recipes could not be loaded. Please try again later.</p>",m.innerHTML=""}}function F(t,r){let i="";for(let e=1;e<=t;e++)i+=`<button class="pagination-btn ${e===r?"active":""}" data-page="${e}">${e}</button>`;m.innerHTML=i,m.querySelectorAll(".pagination-btn").forEach(e=>{e.addEventListener("click",()=>{const n=Number(e.dataset.page);n!==o&&(o=n,d(o))})})}window.addEventListener("resize",()=>{$()!==g&&(o=1,d(o))});B();d();const p=document.querySelector(".popular-recipe-wrapper");console.log(C());async function N(){try{p.innerHTML="<p>Loading recipes...</p>";const t=await C();if(!t||t.length===0){p.innerHTML="<p>No popular recipes found!</p>";return}const r=t.map(i=>`
    <div class="popular-recipes-card" data-id="${i._id}">
    <img class="popular-recipes-image" src="${i.preview}" alt="${i.title}" />
    <div class="popular-recipes-info">
    <h3 class="popular-recipes-title recipe-title">${i.title}</h3>
      <p class="popular-recipes-description popular-recipe-text ">${i.description}</p>
      </div>
    </div>
  `).join("");p.innerHTML=r}catch(t){console.error("Failed to fetch popular recipes:",t),p.innerHTML="<p>Sorry, we could not load the recipes at this time</p>"}}N();const k="favoriteRecipes";function q(){try{return JSON.parse(localStorage.getItem(k))||[]}catch{return[]}}function H(t){localStorage.setItem(k,JSON.stringify(t))}function O(t){const r=q();if(r.some(a=>a._id===t._id)){const a=r.filter(e=>e._id!==t._id);H(a)}else r.push(t),H(r)}function j(t){return q().some(i=>i._id===t)}const u=document.querySelector("#recipes-container"),y=document.querySelector("#pagination");let l=1,E=1,h=b();function b(){const t=window.innerWidth;return t<768?6:t<1280?8:9}async function M(t=1){try{h=b();const r=await A({page:t,limit:h}),i=r.results;if(E=r.totalPages||Math.ceil(r.totalResults/h),!i||i.length===0){u.innerHTML="<p>No recipes found to display.</p>",y.innerHTML="";return}const a=i.map(e=>{const n=e.rating/5*100,s=j(e._id)?"active":"";return`
        <div class="recipe-card" data-id="${e._id}">
          {/* Kontrol sonucuna göre 'active' sınıfını butona ekle */}
          <button class="heart-btn ${s}" aria-label="Add to favorites">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
          </button>
          <img class="recipe-card-image" src="${e.thumb}" alt="${e.title}" loading="lazy">
          <div class="recipe-card-details">
            <h3 class="recipe-card-title">${e.title}</h3>
            <p class="recipe-card-description">${e.description}</p>
            <div class="recipe-card-footer">
              <div class="recipe-card-rating">
                <span class="rating-value">${e.rating.toFixed(1)}</span>
                <div class="rating-stars" style="--rating: ${n}%">
                  <span>★★★★★</span>
                  <span class="stars-filled">★★★★★</span>
                </div>
              </div>
              <button class="recipe-card-button" type="button">See recipe</button>
            </div>
          </div>
        </div>`}).join("");u.innerHTML=a,u.onclick=function(e){const n=e.target.closest(".heart-btn");if(!n)return;const P=n.closest(".recipe-card").dataset.id,S=i.find(R=>R._id===P);S&&(O(S),n.classList.toggle("active"))},x(E,t)}catch(r){console.error("An error occurred while loading recipes:",r),u.innerHTML="<p>The recipes could not be loaded. Please try again later.</p>",y.innerHTML=""}}function x(t,r){let i="";for(let e=1;e<=t;e++)i+=`<button class="pagination-btn ${e===r?"active":""}" data-page="${e}">${e}</button>`;y.innerHTML=i,y.querySelectorAll(".pagination-btn").forEach(e=>{e.addEventListener("click",()=>{const n=Number(e.dataset.page);n!==l&&(l=n,M(l))})})}window.addEventListener("resize",()=>{b()!==h&&(l=1,M(l))});M();
//# sourceMappingURL=index.js.map
