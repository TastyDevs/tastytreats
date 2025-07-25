/* empty css                      */(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const i of t.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&s(i)}).observe(document,{childList:!0,subtree:!0});function n(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function s(e){if(e.ep)return;e.ep=!0;const t=n(e);fetch(e.href,t)}})();const f="https://tasty-treats-backend.p.goit.global/api";async function g({category:a="",page:r=1,limit:n=6,time:s="",area:e="",ingredient:t=""}={}){const i=new URL(`${f}/recipes`);return a&&i.searchParams.append("category",a),r&&i.searchParams.append("page",r),n&&i.searchParams.append("limit",n),s&&i.searchParams.append("time",s),e&&i.searchParams.append("area",e),t&&i.searchParams.append("ingredient",t),await(await fetch(i)).json()}const l=document.querySelector("#recipes-container"),c=document.querySelector("#pagination");let o=1,p=1;const u=9;async function d(a=1){try{const r=await g({page:a,limit:u}),n=r.results;if(p=r.totalPages||Math.ceil(r.totalResults/u),!n||n.length===0){l.innerHTML="<p>No recipes found to display.</p>",c.innerHTML="";return}const s=n.map(e=>`
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
        </div>
      `).join("");l.innerHTML=s,m(p,a)}catch(r){console.error("An error occurred while loading recipes:",r),l.innerHTML="<p>The recipes could not be loaded. Please try again later.</p>",c.innerHTML=""}}function m(a,r){let n="";for(let e=1;e<=a;e++)n+=`<button class="pagination-btn ${e===r?"active":""}" data-page="${e}">${e}</button>`;c.innerHTML=n,c.querySelectorAll(".pagination-btn").forEach(e=>{e.addEventListener("click",()=>{const t=Number(e.dataset.page);t!==o&&(o=t,d(o))})})}d();window.addEventListener("resize",()=>{d(o)});
//# sourceMappingURL=index.js.map
