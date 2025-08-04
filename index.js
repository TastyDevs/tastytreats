/* empty css                      */(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const n of r.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&s(n)}).observe(document,{childList:!0,subtree:!0});function i(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(e){if(e.ep)return;e.ep=!0;const r=i(e);fetch(e.href,r)}})();const g="https://tasty-treats-backend.p.goit.global/api";async function y({category:t="",page:a=1,limit:i=6,time:s="",area:e="",ingredient:r=""}={}){const n=new URL(`${g}/recipes`);return t&&n.searchParams.append("category",t),a&&n.searchParams.append("page",a),i&&n.searchParams.append("limit",i),s&&n.searchParams.append("time",s),e&&n.searchParams.append("area",e),r&&n.searchParams.append("ingredient",r),await(await fetch(n)).json()}async function m(){return await(await fetch(`${g}/recipes/popular`)).json()}const c=document.querySelector(".popular-recipe-wrapper");console.log(m());async function v(){try{c.innerHTML="<p>Loading recipes...</p>";const t=await m();if(!t||t.length===0){c.innerHTML="<p>No popular recipes found!</p>";return}const a=t.map(i=>`
    <div class="popular-recipes-card" data-id="${i._id}">
    <img class="popular-recipes-image" src="${i.preview}" alt="${i.title}" />
    <div class="popular-recipes-info">
    <h3 class="popular-recipes-title recipe-title">${i.title}</h3>
      <p class="popular-recipes-description popular-recipe-text ">${i.description}</p>
      </div>
    </div>
  `).join("");c.innerHTML=a}catch(t){console.error("Failed to fetch popular recipes:",t),c.innerHTML="<p>Sorry, we could not load the recipes at this time</p>"}}v();const d=document.querySelector("#recipes-container"),p=document.querySelector("#pagination");let o=1,h=1,l=u();function u(){const t=window.innerWidth;return t<768?6:t<1280?8:9}async function f(t=1){try{l=u();const a=await y({page:t,limit:l}),i=a.results;if(h=a.totalPages||Math.ceil(a.totalResults/l),!i||i.length===0){d.innerHTML="<p>No recipes found to display.</p>",p.innerHTML="";return}const s=i.map(e=>{const r=e.rating/5*100;return`
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
                <div class="rating-stars" style="--rating: ${r}%">
                  <span>★★★★★</span>
                  <span class="stars-filled">★★★★★</span>
                </div>
              </div>
              <button class="recipe-card-button" type="button">See recipe</button>
            </div>
          </div>
        </div>`}).join("");d.innerHTML=s,w(h,t)}catch(a){console.error("An error occurred while loading recipes:",a),d.innerHTML="<p>The recipes could not be loaded. Please try again later.</p>",p.innerHTML=""}}function w(t,a){let i="";for(let e=1;e<=t;e++)i+=`<button class="pagination-btn ${e===a?"active":""}" data-page="${e}">${e}</button>`;p.innerHTML=i,p.querySelectorAll(".pagination-btn").forEach(e=>{e.addEventListener("click",()=>{const r=Number(e.dataset.page);r!==o&&(o=r,f(o))})})}window.addEventListener("resize",()=>{u()!==l&&(o=1,f(o))});f();
//# sourceMappingURL=index.js.map
