/* empty css                      */(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))o(n);new MutationObserver(n=>{for(const r of n)if(r.type==="childList")for(const s of r.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&o(s)}).observe(document,{childList:!0,subtree:!0});function i(n){const r={};return n.integrity&&(r.integrity=n.integrity),n.referrerPolicy&&(r.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?r.credentials="include":n.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function o(n){if(n.ep)return;n.ep=!0;const r=i(n);fetch(n.href,r)}})();const y="https://tasty-treats-backend.p.goit.global/api";async function R(){return await(await fetch(`${y}/categories`)).json()}async function x({category:e="",page:t=1,limit:i=6,time:o="",area:n="",ingredient:r=""}={}){const s=new URL(`${y}/recipes`);return e&&s.searchParams.append("category",e),t&&s.searchParams.append("page",t),i&&s.searchParams.append("limit",i),o&&s.searchParams.append("time",o),n&&s.searchParams.append("area",n),r&&s.searchParams.append("ingredient",r),await(await fetch(s)).json()}async function C(){return await(await fetch(`${y}/recipes/popular`)).json()}const b=document.querySelector("#recipes-container"),v=document.querySelector("#pagination"),m=document.querySelector("#category-list"),u=document.querySelector(".categories-box");let a=1,T=1,c=null,g=$();function $(){const e=window.innerWidth;return e<768?6:e<1280?8:9}async function B(){try{const t=(await R()).map(o=>`
        <li>
          <button 
            class="category-btn ${o.name===c?"active":""}" 
            data-category="${o.name}">
            ${o.name}
          </button>
        </li>`).join("");m.innerHTML=t;const i=m.querySelectorAll(".category-btn");i.forEach(o=>{o.addEventListener("click",()=>{const n=o.dataset.category;n!==c&&(c=n,a=1,i.forEach(r=>r.classList.remove("active")),u.classList.remove("active"),o.classList.add("active"),d(a))})})}catch(e){console.error("Failed to load categories:",e)}}u&&u.addEventListener("click",()=>{c!==null&&(c=null,a=1,m.querySelectorAll(".category-btn").forEach(t=>t.classList.remove("active")),u.classList.add("active"),d(a))});async function d(e=1){try{g=$();const t=await x({page:e,limit:g,category:c||void 0}),i=t.results;if(T=t.totalPages||Math.ceil(t.totalResults/g),!i||i.length===0){b.innerHTML="<p>No recipes found to display.</p>",v.innerHTML="";return}const o=i.map(n=>{const r=n.rating/5*100;return`
        <div class="recipe-card" data-id="${n._id}">
          <button class="heart-btn" aria-label="Add to favorites">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
          </button>
          <img class="recipe-card-image" src="${n.thumb}" alt="${n.title}" loading="lazy">
          <div class="recipe-card-details">
            <h3 class="recipe-card-title">${n.title}</h3>
            <p class="recipe-card-description">${n.description}</p>
            <div class="recipe-card-footer">
              <div class="recipe-card-rating">
                <span class="rating-value">${n.rating.toFixed(1)}</span>
                <div class="rating-stars" style="--rating: ${r}%">
                  <span>★★★★★</span>
                  <span class="stars-filled">★★★★★</span>
                </div>
              </div>
              <button class="recipe-card-button" type="button">See recipe</button>
            </div>
          </div>
        </div>`}).join("");b.innerHTML=o,j(T,e)}catch(t){console.error("An error occurred while loading recipes:",t),b.innerHTML="<p>The recipes could not be loaded. Please try again later.</p>",v.innerHTML=""}}function j(e,t){let i="";for(let n=1;n<=e;n++)i+=`<button class="pagination-btn ${n===t?"active":""}" data-page="${n}">${n}</button>`;v.innerHTML=i,v.querySelectorAll(".pagination-btn").forEach(n=>{n.addEventListener("click",()=>{const r=Number(n.dataset.page);r!==a&&(a=r,d(a))})})}window.addEventListener("resize",()=>{$()!==g&&(a=1,d(a))});B();d();const p=document.querySelector(".popular-recipe-wrapper");console.log(C());async function A(){try{p.innerHTML="<p>Loading recipes...</p>";const e=await C();if(!e||e.length===0){p.innerHTML="<p>No popular recipes found!</p>";return}const t=e.map(i=>`
    <div class="popular-recipes-card" data-id="${i._id}">
    <img class="popular-recipes-image" src="${i.preview}" alt="${i.title}" />
    <div class="popular-recipes-info">
    <h3 class="popular-recipes-title recipe-title">${i.title}</h3>
      <p class="popular-recipes-description popular-recipe-text ">${i.description}</p>
      </div>
    </div>
  `).join("");p.innerHTML=t}catch(e){console.error("Failed to fetch popular recipes:",e),p.innerHTML="<p>Sorry, we could not load the recipes at this time</p>"}}A();const H="favoriteRecipes";function E(){try{return JSON.parse(localStorage.getItem(H))||[]}catch{return[]}}function M(e){localStorage.setItem(H,JSON.stringify(e))}function N(e){const t=E();if(t.some(o=>o._id===e._id)){const o=t.filter(n=>n._id!==e._id);M(o)}else t.push(e),M(t)}function _(e){return E().some(i=>i._id===e)}const f=document.querySelector("#recipes-container"),w=document.querySelector("#pagination");let l=1,S=1,h=L();function q(e,t=250){let i;return function(...o){clearTimeout(i),i=setTimeout(()=>{e.apply(this,o)},t)}}function L(){const e=window.innerWidth;return e<768?6:e<1280?8:9}async function k(e=1){try{h=L();const t=await x({page:e,limit:h}),i=t.results;if(S=t.totalPages||Math.ceil(t.totalResults/h),!i||i.length===0){f.innerHTML="<p>No recipes found to display.</p>",w.innerHTML="";return}const o=i.map(n=>{const r=n.rating/5*100,s=_(n._id)?"active":"";return`
        <div class="recipe-card" data-id="${n._id}">
          <button class="heart-btn ${s}" aria-label="Add to favorites">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
          </button>
          <img class="recipe-card-image" src="${n.thumb}" alt="${n.title}" loading="lazy">
          <div class="recipe-card-details">
            <h3 class="recipe-card-title">${n.title}</h3>
            <p class="recipe-card-description">${n.description}</p>
            <div class="recipe-card-footer">
              <div class="recipe-card-rating">
                <span class="rating-value">${n.rating.toFixed(1)}</span>
                <div class="rating-stars" style="--rating: ${r}%">
                  <span>★★★★★</span>
                  <span class="stars-filled">★★★★★</span>
                </div>
              </div>
              <button class="recipe-card-button" type="button">See recipe</button>
            </div>
          </div>
        </div>`}).join("");f.innerHTML=o,F(S,e)}catch(t){console.error("An error occurred while loading recipes:",t),f.innerHTML="<p>The recipes could not be loaded. Please try again later.</p>",w.innerHTML=""}}w.addEventListener("click",e=>{const t=e.target.closest(".pagination-btn");if(!t||t.disabled||!t.dataset.page)return;const i=Number(t.dataset.page);i!==l&&(l=i,k(l))});f.addEventListener("click",e=>{const t=e.target.closest(".heart-btn");if(!t)return;const o=t.closest(".recipe-card").dataset.id;N({_id:o}),t.classList.toggle("active")});function F(e,t){let i="";const n="pagination-btn arrow-btn arrow-prev",r="pagination-btn arrow-btn arrow-next";if(i+=`<button class="${n}" data-page="1" ${t===1?"disabled":""}>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="11 17 6 12 11 7"></polyline><polyline points="18 17 13 12 18 7"></polyline></svg>
  </button>`,i+=`<button class="${n}" data-page="${t-1}" ${t===1?"disabled":""}>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
  </button>`,e>1){t>3&&(i+='<button class="pagination-btn page-btn" data-page="1">1</button>',i+='<button class="pagination-btn dots">...</button>');for(let s=Math.max(1,t-1);s<=Math.min(e,t+1);s++)s===1&&t>3||s===e&&t<e-1-1||(i+=`<button class="pagination-btn page-btn ${s===t?"active":""}" data-page="${s}">${s}</button>`);t<e-1-1&&(i+='<button class="pagination-btn dots">...</button>',i+=`<button class="pagination-btn page-btn" data-page="${e}">${e}</button>`)}i+=`<button class="${r}" data-page="${t+1}" ${t===e?"disabled":""}>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
  </button>`,i+=`<button class="${r}" data-page="${e}" ${t===e?"disabled":""}>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="13 17 18 12 13 7"></polyline><polyline points="6 17 11 12 6 7"></polyline></svg>
  </button>`,w.innerHTML=i}const O=q(()=>{const e=L();e!==h&&(console.log(`Resize detected. New limit: ${e}. Refetching...`),l=1,k(l))});window.addEventListener("resize",O);k();
//# sourceMappingURL=index.js.map
