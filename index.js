/* empty css                      */(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const a of e)if(a.type==="childList")for(const o of a.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function i(e){const a={};return e.integrity&&(a.integrity=e.integrity),e.referrerPolicy&&(a.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?a.credentials="include":e.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function n(e){if(e.ep)return;e.ep=!0;const a=i(e);fetch(e.href,a)}})();const w="https://tasty-treats-backend.p.goit.global/api";async function E(){return await(await fetch(`${w}/categories`)).json()}async function H({category:t="",page:r=1,limit:i=6,time:n="",area:e="",ingredient:a=""}={}){const o=new URL(`${w}/recipes`);return t&&o.searchParams.append("category",t),r&&o.searchParams.append("page",r),i&&o.searchParams.append("limit",i),n&&o.searchParams.append("time",n),e&&o.searchParams.append("area",e),a&&o.searchParams.append("ingredient",a),await(await fetch(o)).json()}async function S(){return await(await fetch(`${w}/recipes/popular`)).json()}const y=document.querySelector("#recipes-container"),h=document.querySelector("#pagination"),L=document.querySelector("#category-list"),u=document.querySelector(".categories-box");let s=1,P=1,c=null,g=$();function $(){const t=window.innerWidth;return t<768?6:t<1280?8:9}async function q(){try{const r=(await E()).map(n=>`
        <li>
          <button 
            class="category-btn ${n.name===c?"active":""}" 
            data-category="${n.name}">
            ${n.name}
          </button>
        </li>`).join("");L.innerHTML=r;const i=L.querySelectorAll(".category-btn");i.forEach(n=>{n.addEventListener("click",()=>{const e=n.dataset.category;e!==c&&(c=e,s=1,i.forEach(a=>a.classList.remove("active")),u.classList.remove("active"),n.classList.add("active"),d(s))})})}catch(t){console.error("Failed to load categories:",t)}}u&&u.addEventListener("click",()=>{c!==null&&(c=null,s=1,L.querySelectorAll(".category-btn").forEach(r=>r.classList.remove("active")),u.classList.add("active"),d(s))});async function d(t=1){try{g=$();const r=await H({page:t,limit:g,category:c||void 0}),i=r.results;if(P=r.totalPages||Math.ceil(r.totalResults/g),!i||i.length===0){y.innerHTML="<p>No recipes found to display.</p>",h.innerHTML="";return}const n=i.map(e=>`
        <div class="recipe-card" data-id="${e._id}">
          <img class="recipe-card-image" src="${e.thumb}" alt="${e.title}" loading="lazy">
          <div class="recipe-card-content">
            <h3 class="recipe-card-title">${e.title}</h3>
            <p class="recipe-card-description">${e.description}</p>
            <div class="recipe-card-rating"><span>${e.rating.toFixed(1)}</span></div>
            <button class="recipe-card-button" type="button">See recipe</button>
          </div>
        </div>`).join("");y.innerHTML=n,A(P,t)}catch(r){console.error("An error occurred while loading recipes:",r),y.innerHTML="<p>The recipes could not be loaded. Please try again later.</p>",h.innerHTML=""}}function A(t,r){let i="";for(let e=1;e<=t;e++)i+=`<button class="pagination-btn ${e===r?"active":""}" data-page="${e}">${e}</button>`;h.innerHTML=i,h.querySelectorAll(".pagination-btn").forEach(e=>{e.addEventListener("click",()=>{const a=Number(e.dataset.page);a!==s&&(s=a,d(s))})})}window.addEventListener("resize",()=>{$()!==g&&(s=1,d(s))});q();d();const p=document.querySelector(".popular-recipe-wrapper");console.log(S());async function C(){try{p.innerHTML="<p>Loading recipes...</p>";const t=await S();if(!t||t.length===0){p.innerHTML="<p>No popular recipes found!</p>";return}const r=t.map(i=>`
    <div class="popular-recipes-card" data-id="${i._id}">
    <img class="popular-recipes-image" src="${i.preview}" alt="${i.title}" />
    <div class="popular-recipes-info">
    <h3 class="popular-recipes-title recipe-title">${i.title}</h3>
      <p class="popular-recipes-description popular-recipe-text ">${i.description}</p>
      </div>
    </div>
  `).join("");p.innerHTML=r}catch(t){console.error("Failed to fetch popular recipes:",t),p.innerHTML="<p>Sorry, we could not load the recipes at this time</p>"}}C();const v=document.querySelector("#recipes-container"),m=document.querySelector("#pagination");let l=1,T=1,f=b();function b(){const t=window.innerWidth;return t<768?6:t<1280?8:9}async function M(t=1){try{f=b();const r=await H({page:t,limit:f}),i=r.results;if(T=r.totalPages||Math.ceil(r.totalResults/f),!i||i.length===0){v.innerHTML="<p>No recipes found to display.</p>",m.innerHTML="";return}const n=i.map(e=>{const a=e.rating/5*100;return`
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
        </div>`}).join("");v.innerHTML=n,k(T,t)}catch(r){console.error("An error occurred while loading recipes:",r),v.innerHTML="<p>The recipes could not be loaded. Please try again later.</p>",m.innerHTML=""}}function k(t,r){let i="";for(let e=1;e<=t;e++)i+=`<button class="pagination-btn ${e===r?"active":""}" data-page="${e}">${e}</button>`;m.innerHTML=i,m.querySelectorAll(".pagination-btn").forEach(e=>{e.addEventListener("click",()=>{const a=Number(e.dataset.page);a!==l&&(l=a,M(l))})})}window.addEventListener("resize",()=>{b()!==f&&(l=1,M(l))});M();
//# sourceMappingURL=index.js.map
