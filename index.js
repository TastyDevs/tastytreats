/* empty css                      */(function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))t(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const s of r.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&t(s)}).observe(document,{childList:!0,subtree:!0});function n(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function t(e){if(e.ep)return;e.ep=!0;const r=n(e);fetch(e.href,r)}})();const o="https://tasty-treats-backend.p.goit.global/api";async function d({category:a="",page:i=1,limit:n=6,time:t="",area:e="",ingredient:r=""}={}){const s=new URL(`${o}/recipes`);return a&&s.searchParams.append("category",a),i&&s.searchParams.append("page",i),n&&s.searchParams.append("limit",n),t&&s.searchParams.append("time",t),e&&s.searchParams.append("area",e),r&&s.searchParams.append("ingredient",r),await(await fetch(s)).json()}const c=document.querySelector("#recipes-container");async function p(){try{const i=(await d({limit:50})).results;if(!i||i.length===0){c.innerHTML="<p>No recipes found to display.</p>";return}const n=i.map(t=>`
        <div class="recipe-card" data-id="${t._id}">
          <img class="recipe-card-image" src="${t.thumb}" alt="${t.title}" loading="lazy">
          <div class="recipe-card-content">
            <h3 class="recipe-card-title">${t.title}</h3>
            <p class="recipe-card-description">${t.description}</p>
            <div class="recipe-card-rating">
              <span>${t.rating.toFixed(1)}</span>
            </div>
          </div>
        </div>
      `).join("");c.innerHTML=n}catch(a){console.error("An error occurred while loading recipes:",a),c.innerHTML="<p>The recipes could not be loaded. Please try again later.</p>"}}p();
//# sourceMappingURL=index.js.map
