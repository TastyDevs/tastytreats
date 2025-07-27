/* empty css                      */(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const i of e)if(i.type==="childList")for(const a of i.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&s(a)}).observe(document,{childList:!0,subtree:!0});function r(e){const i={};return e.integrity&&(i.integrity=e.integrity),e.referrerPolicy&&(i.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?i.credentials="include":e.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function s(e){if(e.ep)return;e.ep=!0;const i=r(e);fetch(e.href,i)}})();const m="https://tasty-treats-backend.p.goit.global/api";async function y({category:t="",page:n=1,limit:r=6,time:s="",area:e="",ingredient:i=""}={}){const a=new URL(`${m}/recipes`);return t&&a.searchParams.append("category",t),n&&a.searchParams.append("page",n),r&&a.searchParams.append("limit",r),s&&a.searchParams.append("time",s),e&&a.searchParams.append("area",e),i&&a.searchParams.append("ingredient",i),await(await fetch(a)).json()}async function g(){return await(await fetch(`${m}/recipes/popular`)).json()}const c=document.querySelector(".popular-recipe-wrapper");console.log(g());async function L(){try{c.innerHTML="<p>Loading recipes...</p>";const t=await g();if(!t||t.length===0){c.innerHTML="<p>No popular recipes found!</p>";return}const n=t.map(r=>`
    <div class="popular-recipes-card" data-id="${r._id}">
    <img class="popular-recipes-image" src="${r.preview}" alt="${r.title}" />
    <div class="popular-recipes-info">
    <h3 class="popular-recipes-title recipe-title">${r.title}</h3>
      <p class="popular-recipes-description popular-recipe-text ">${r.description}</p>
      </div>
    </div>
  `).join("");c.innerHTML=n}catch(t){console.error("Failed to fetch popular recipes:",t),c.innerHTML="<p>Sorry, we could not load the recipes at this time</p>"}}L();const d=document.querySelector("#recipes-container"),l=document.querySelector("#pagination");let o=1,h=1,p=u();function u(){const t=window.innerWidth;return t<768?6:t<1280?8:9}async function f(t=1){try{p=u();const n=await y({page:t,limit:p}),r=n.results;if(h=n.totalPages||Math.ceil(n.totalResults/p),!r||r.length===0){d.innerHTML="<p>No recipes found to display.</p>",l.innerHTML="";return}const s=r.map(e=>`
        <div class="recipe-card" data-id="${e._id}">
          <img class="recipe-card-image" src="${e.thumb}" alt="${e.title}" loading="lazy">
          <div class="recipe-card-content">
            <h3 class="recipe-card-title">${e.title}</h3>
            <p class="recipe-card-description">${e.description}</p>
            <div class="recipe-card-rating">
              <span>${e.rating.toFixed(1)}</span>
            </div>
            <button class="recipe-card-button" type="button">See recipe</button>
          </div>
        </div>`).join("");d.innerHTML=s,w(h,t)}catch(n){console.error("An error occurred while loading recipes:",n),d.innerHTML="<p>The recipes could not be loaded. Please try again later.</p>",l.innerHTML=""}}function w(t,n){let r="";for(let e=1;e<=t;e++)r+=`<button class="pagination-btn ${e===n?"active":""}" data-page="${e}">${e}</button>`;l.innerHTML=r,l.querySelectorAll(".pagination-btn").forEach(e=>{e.addEventListener("click",()=>{const i=Number(e.dataset.page);i!==o&&(o=i,f(o))})})}window.addEventListener("resize",()=>{u()!==p&&(o=1,f(o))});f();
//# sourceMappingURL=index.js.map
