/* empty css                      */(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const a of e)if(a.type==="childList")for(const s of a.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&n(s)}).observe(document,{childList:!0,subtree:!0});function i(e){const a={};return e.integrity&&(a.integrity=e.integrity),e.referrerPolicy&&(a.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?a.credentials="include":e.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function n(e){if(e.ep)return;e.ep=!0;const a=i(e);fetch(e.href,a)}})();const w="https://tasty-treats-backend.p.goit.global/api";async function R(){return await(await fetch(`${w}/categories`)).json()}async function E({category:t="",page:r=1,limit:i=6,time:n="",area:e="",ingredient:a=""}={}){const s=new URL(`${w}/recipes`);return t&&s.searchParams.append("category",t),r&&s.searchParams.append("page",r),i&&s.searchParams.append("limit",i),n&&s.searchParams.append("time",n),e&&s.searchParams.append("area",e),a&&s.searchParams.append("ingredient",a),await(await fetch(s)).json()}async function A(){return await(await fetch(`${w}/recipes/popular`)).json()}const y=document.querySelector("#recipes-container"),v=document.querySelector("#pagination"),L=document.querySelector("#category-list"),g=document.querySelector(".categories-box");let o=1,T=1,c=null,f=b();function b(){const t=window.innerWidth;return t<768?6:t<1280?8:9}async function _(){try{const r=(await R()).map(n=>`
        <li>
          <button 
            class="category-btn ${n.name===c?"active":""}" 
            data-category="${n.name}">
            ${n.name}
          </button>
        </li>`).join("");L.innerHTML=r;const i=L.querySelectorAll(".category-btn");i.forEach(n=>{n.addEventListener("click",()=>{const e=n.dataset.category;e!==c&&(c=e,o=1,i.forEach(a=>a.classList.remove("active")),g.classList.remove("active"),n.classList.add("active"),d(o))})})}catch(t){console.error("Failed to load categories:",t)}}g&&g.addEventListener("click",()=>{c!==null&&(c=null,o=1,L.querySelectorAll(".category-btn").forEach(r=>r.classList.remove("active")),g.classList.add("active"),d(o))});async function d(t=1){try{f=b();const r=await E({page:t,limit:f,category:c||void 0}),i=r.results;if(T=r.totalPages||Math.ceil(r.totalResults/f),!i||i.length===0){y.innerHTML="<p>No recipes found to display.</p>",v.innerHTML="";return}const n=i.map(e=>{const a=e.rating/5*100;return`
        <div class="recipe-card" data-id="${e._id}">
          <button class="heart-btn" aria-label="Add to favorites">
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
                <div class="rating-stars" style="--rating: ${a}%">
                  <span>★★★★★</span>
                  <span class="stars-filled">★★★★★</span>
                </div>
              </div>
              <button class="recipe-card-button" type="button">See recipe</button>
            </div>
          </div>
        </div>`}).join("");y.innerHTML=n,F(T,t)}catch(r){console.error("An error occurred while loading recipes:",r),y.innerHTML="<p>The recipes could not be loaded. Please try again later.</p>",v.innerHTML=""}}function F(t,r){let i="";for(let e=1;e<=t;e++)i+=`<button class="pagination-btn ${e===r?"active":""}" data-page="${e}">${e}</button>`;v.innerHTML=i,v.querySelectorAll(".pagination-btn").forEach(e=>{e.addEventListener("click",()=>{const a=Number(e.dataset.page);a!==o&&(o=a,d(o))})})}window.addEventListener("resize",()=>{b()!==f&&(o=1,d(o))});_();d();const p=document.querySelector(".popular-recipe-wrapper");console.log(A());async function x(){try{p.innerHTML="<p>Loading recipes...</p>";const t=await A();if(!t||t.length===0){p.innerHTML="<p>No popular recipes found!</p>";return}const r=t.map(i=>`
    <div class="popular-recipes-card" data-id="${i._id}">
    <img class="popular-recipes-image" src="${i.preview}" alt="${i.title}" />
    <div class="popular-recipes-info">
    <h3 class="popular-recipes-title recipe-title">${i.title}</h3>
      <p class="popular-recipes-description popular-recipe-text ">${i.description}</p>
      </div>
    </div>
  `).join("");p.innerHTML=r}catch(t){console.error("Failed to fetch popular recipes:",t),p.innerHTML="<p>Sorry, we could not load the recipes at this time</p>"}}x();const C="favoriteRecipes";function q(){try{return JSON.parse(localStorage.getItem(C))||[]}catch{return[]}}function H(t){localStorage.setItem(C,JSON.stringify(t))}function N(t){const r=q();if(r.some(n=>n._id===t._id)){const n=r.filter(e=>e._id!==t._id);H(n)}else r.push(t),H(r)}function j(t){return q().some(i=>i._id===t)}const u=document.querySelector("#recipes-container"),m=document.querySelector("#pagination");let l=1,k=1,h=$();function $(){const t=window.innerWidth;return t<768?6:t<1280?8:9}async function M(t=1){try{h=$();const r=await E({page:t,limit:h}),i=r.results;if(k=r.totalPages||Math.ceil(r.totalResults/h),!i||i.length===0){u.innerHTML="<p>No recipes found to display.</p>",m.innerHTML="";return}const n=i.map(e=>{const a=e.rating/5*100,s=j(e._id)?"active":"";return`
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
                <div class="rating-stars" style="--rating: ${a}%">
                  <span>★★★★★</span>
                  <span class="stars-filled">★★★★★</span>
                </div>
              </div>
              <button class="recipe-card-button" type="button">See recipe</button>
            </div>
          </div>
        </div>`}).join("");u.innerHTML=n,u.onclick=function(e){const a=e.target.closest(".heart-btn");if(!a)return;const P=a.closest(".recipe-card").dataset.id,S=i.find(B=>B._id===P);S&&(N(S),a.classList.toggle("active"))},O(k,t)}catch(r){console.error("An error occurred while loading recipes:",r),u.innerHTML="<p>The recipes could not be loaded. Please try again later.</p>",m.innerHTML=""}}function O(t,r){let i="";for(let e=1;e<=t;e++)i+=`<button class="pagination-btn ${e===r?"active":""}" data-page="${e}">${e}</button>`;m.innerHTML=i,m.querySelectorAll(".pagination-btn").forEach(e=>{e.addEventListener("click",()=>{const a=Number(e.dataset.page);a!==l&&(l=a,M(l))})})}window.addEventListener("resize",()=>{$()!==h&&(l=1,M(l))});M();
//# sourceMappingURL=index.js.map
