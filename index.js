/* empty css                      */(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))s(i);new MutationObserver(i=>{for(const r of i)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&s(a)}).observe(document,{childList:!0,subtree:!0});function n(i){const r={};return i.integrity&&(r.integrity=i.integrity),i.referrerPolicy&&(r.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?r.credentials="include":i.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(i){if(i.ep)return;i.ep=!0;const r=n(i);fetch(i.href,r)}})();const H="https://tasty-treats-backend.p.goit.global/api";async function K(){return await(await fetch(`${H}/categories`)).json()}async function N({category:e="",page:t=1,limit:n=6,time:s="",area:i="",ingredient:r=""}={}){const a=new URL(`${H}/recipes`);return e&&a.searchParams.append("category",e),t&&a.searchParams.append("page",t),n&&a.searchParams.append("limit",n),s&&a.searchParams.append("time",s),i&&a.searchParams.append("area",i),r&&a.searchParams.append("ingredient",r),await(await fetch(a)).json()}async function z(){return await(await fetch(`${H}/recipes/popular`)).json()}const A=document.querySelector("#recipes-container"),k=document.querySelector("#pagination"),M=document.querySelector("#category-list"),b=document.querySelector(".categories-box");let p=1,j=1,g=null,L=q();function q(){const e=window.innerWidth;return e<768?6:e<1280?8:9}async function Q(){try{const t=(await K()).map(s=>`
        <li>
          <button 
            class="category-btn ${s.name===g?"active":""}" 
            data-category="${s.name}">
            ${s.name}
          </button>
        </li>`).join("");M.innerHTML=t;const n=M.querySelectorAll(".category-btn");n.forEach(s=>{s.addEventListener("click",()=>{const i=s.dataset.category;i!==g&&(g=i,p=1,n.forEach(r=>r.classList.remove("active")),b.classList.remove("active"),s.classList.add("active"),y(p))})})}catch(e){console.error("Failed to load categories:",e)}}b&&b.addEventListener("click",()=>{g!==null&&(g=null,p=1,M.querySelectorAll(".category-btn").forEach(t=>t.classList.remove("active")),b.classList.add("active"),y(p))});async function y(e=1){try{L=q();const t=await N({page:e,limit:L,category:g||void 0}),n=t.results;if(j=t.totalPages||Math.ceil(t.totalResults/L),!n||n.length===0){A.innerHTML="<p>No recipes found to display.</p>",k.innerHTML="";return}const s=n.map(i=>{const r=i.rating/5*100;return`
        <div class="recipe-card" data-id="${i._id}">
          <button class="heart-btn" aria-label="Add to favorites">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
          </button>
          <img class="recipe-card-image" src="${i.thumb}" alt="${i.title}" loading="lazy">
          <div class="recipe-card-details">
            <h3 class="recipe-card-title">${i.title}</h3>
            <p class="recipe-card-description">${i.description}</p>
            <div class="recipe-card-footer">
              <div class="recipe-card-rating">
                <span class="rating-value">${i.rating.toFixed(1)}</span>
                <div class="rating-stars" style="--rating: ${r}%">
                  <span>★★★★★</span>
                  <span class="stars-filled">★★★★★</span>
                </div>
              </div>
              <button class="recipe-card-button" type="button">See recipe</button>
            </div>
          </div>
        </div>`}).join("");A.innerHTML=s,W(j,e)}catch(t){console.error("An error occurred while loading recipes:",t),A.innerHTML="<p>The recipes could not be loaded. Please try again later.</p>",k.innerHTML=""}}function W(e,t){let n="";for(let i=1;i<=e;i++)n+=`<button class="pagination-btn ${i===t?"active":""}" data-page="${i}">${i}</button>`;k.innerHTML=n,k.querySelectorAll(".pagination-btn").forEach(i=>{i.addEventListener("click",()=>{const r=Number(i.dataset.page);r!==p&&(p=r,y(p))})})}window.addEventListener("resize",()=>{q()!==L&&(p=1,y(p))});Q();y();const w=document.querySelector(".popular-recipe-wrapper");console.log(z());async function Y(){try{w.innerHTML="<p>Loading recipes...</p>";const e=await z();if(!e||e.length===0){w.innerHTML="<p>No popular recipes found!</p>";return}const t=e.map(n=>`
    <div class="popular-recipes-card" data-id="${n._id}">
    <img class="popular-recipes-image" src="${n.preview}" alt="${n.title}" />
    <div class="popular-recipes-info">
    <h3 class="popular-recipes-title recipe-title">${n.title}</h3>
      <p class="popular-recipes-description popular-recipe-text ">${n.description}</p>
      </div>
    </div>
  `).join("");w.innerHTML=t}catch(e){console.error("Failed to fetch popular recipes:",e),w.innerHTML="<p>Sorry, we could not load the recipes at this time</p>"}}Y();let U,P,D;async function G(){const e=["../api/tastyTreatsApi.js"];for(const t of e)try{({fetchFilteredRecipes:U,fetchAreas:P,fetchIngredients:D}=await import(t)),console.log("[filters] API loaded from",t);return}catch{}throw new Error("API module not found. Check tastyTreatsApi.js path.")}const l=document.querySelector(".filters");l||console.warn("[filters] .filters bulunamadı.");const o={search:l==null?void 0:l.querySelector(".filter-input"),searchBtn:l==null?void 0:l.querySelector(".search-btn"),resetBtn:l==null?void 0:l.querySelector(".reset-filter"),dropdowns:[...(l==null?void 0:l.querySelectorAll(".custom-dropdown"))??[]],recipes:document.getElementById("recipes-flex")},C=!!o.recipes,c={query:"",time:"",area:"",ingredient:"",ingredientLabel:"",page:1,limit:6,loading:!1},X=["10 min","20 min","30 min","40 min"];function F(e){c.loading=e,!(!C||!o.recipes)&&e&&(o.recipes.innerHTML='<div class="recipes-loading">Loading...</div>')}function Z(e){const t=String(e).match(/\d+/);return t?t[0]:""}function x(e){o.dropdowns.forEach(t=>{t!==e&&t.classList.remove("open")})}async function ee(){m("time",X.map(e=>({value:Z(e),label:e})));try{const e=await P(),t=(Array.isArray(e)?e:[]).map(n=>typeof n=="string"?n:n==null?void 0:n.name).filter(Boolean).map(n=>({value:n,label:n}));m("area",t)}catch(e){console.error("Areas yüklenemedi",e),m("area",[])}try{const e=await D(),t=(Array.isArray(e)?e:[]).filter(n=>(n==null?void 0:n._id)&&(n==null?void 0:n.name)).map(n=>({value:n._id,label:n.name}));m("ingredient",t)}catch(e){console.error("Ingredients yüklenemedi",e),m("ingredient",[])}}function m(e,t){const n=o.dropdowns.find(r=>r.dataset.type===e);if(!n)return;const s=n.querySelector(".dropdown-menu"),i=n.querySelector(".dropdown-toggle");!s||!i||(s.innerHTML=(t||[]).map(r=>`<li><button type="button" data-value="${f(r.value)}" data-label="${f(r.label)}">${f(r.label)}</button></li>`).join(""),i.addEventListener("click",()=>{const r=!n.classList.contains("open");x(),n.classList.toggle("open",r)}),s.addEventListener("click",r=>{const a=r.target.closest("button[data-value]");if(!a)return;const u=a.getAttribute("data-value")??"",d=a.getAttribute("data-label")??a.textContent.trim();e==="time"?c.time=u:e==="area"?c.area=d:e==="ingredient"&&(c.ingredient=u,c.ingredientLabel=d),i.textContent=d,n.classList.remove("open"),c.page=1,S()}))}document.addEventListener("click",e=>{const t=e.target.closest(".custom-dropdown");if(!t)return x();o.dropdowns.forEach(n=>{n!==t&&n.classList.remove("open")})});document.addEventListener("keydown",e=>{e.key==="Escape"&&x()});function te(){if(!o.search||!o.searchBtn)return;const e=()=>{c.query=o.search.value.trim(),c.page=1,S()};o.searchBtn.addEventListener("click",e),o.search.addEventListener("keydown",t=>{t.key==="Enter"&&(t.preventDefault(),e())})}function ne(){o.resetBtn&&o.resetBtn.addEventListener("click",()=>{c.query="",c.time="",c.area="",c.ingredient="",c.ingredientLabel="",c.page=1,o.search&&(o.search.value=""),S()})}const ie=1e4,re=(e,t=ie)=>Promise.race([e,new Promise((n,s)=>setTimeout(()=>s(new Error("REQUEST_TIMEOUT")),t))]);async function S(){try{F(!0);const{time:e,area:t,ingredient:n,page:s,limit:i}=c,r=await re(U({time:e,area:t,ingredient:n,page:s,limit:i})),a=Array.isArray(r==null?void 0:r.results)?r.results:Array.isArray(r)?r:Array.isArray(r==null?void 0:r.recipes)?r.recipes:[],u=c.query.toLowerCase(),d=u?a.filter(v=>String(v.title||"").toLowerCase().includes(u)):a;C&&(se(d),!d.length&&o.recipes&&(o.recipes.innerHTML='<p class="no-results">No recipes found</p>')),document.dispatchEvent(new CustomEvent("recipes:filtered",{detail:{recipes:d,paging:{page:s,limit:i},raw:r}}))}catch(e){console.error("[filters] applyFilters error:",(e==null?void 0:e.message)||e),C&&o.recipes&&(o.recipes.innerHTML=(e==null?void 0:e.message)==="REQUEST_TIMEOUT"?'<p class="no-results">İstek zaman aşımına uğradı. Lütfen tekrar deneyin.</p>':'<p class="no-results">Bir şeyler ters gitti. Lütfen tekrar deneyin.</p>'),document.dispatchEvent(new CustomEvent("recipes:filtered",{detail:{recipes:[],error:!0,reason:(e==null?void 0:e.message)||String(e)}}))}finally{F(!1)}}function se(e){if(!o.recipes)return;if(!(e!=null&&e.length)){o.recipes.innerHTML="";return}const t=e.map(n=>{const{_id:s,title:i="Untitled",time:r="",rating:a="",preview:u,thumb:d,description:v=""}=n,R=u||d||"";return`
      <article class="recipe-card" data-id="${s||""}">
        <div class="recipe-thumb">
          ${R?`<img src="${R}" alt="${f(i)}" loading="lazy">`:""}
        </div>
        <div class="recipe-body">
          <h3 class="recipe-title">${f(i)}</h3>
          <div class="recipe-meta">
            ${r?`<span class="badge time">${r} min</span>`:""}
            ${a?`<span class="badge rating">★ ${a}</span>`:""}
          </div>
          ${v?`<p class="recipe-desc">${f(v)}</p>`:""}
        </div>
      </article>`}).join("");o.recipes.innerHTML=t}function f(e){return String(e).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}(async function(){try{await G(),await ee(),te(),ne(),await S()}catch(t){console.error("[filters] init error:",t),o.recipes&&(o.recipes.innerHTML='<p class="no-results">Bir şeyler ters gitti. Lütfen tekrar deneyin.</p>')}})();const V="favoriteRecipes";function J(){try{return JSON.parse(localStorage.getItem(V))||[]}catch{return[]}}function O(e){localStorage.setItem(V,JSON.stringify(e))}function ae(e){const t=J();if(t.some(s=>s._id===e._id)){const s=t.filter(i=>i._id!==e._id);O(s)}else t.push(e),O(t)}function oe(e){return J().some(n=>n._id===e)}const $=document.querySelector("#recipes-container"),E=document.querySelector("#pagination");let h=1,I=1,T=B();function ce(e,t=250){let n;return function(...s){clearTimeout(n),n=setTimeout(()=>{e.apply(this,s)},t)}}function B(){const e=window.innerWidth;return e<768?6:e<1280?8:9}async function _(e=1){try{T=B();const t=await N({page:e,limit:T}),n=t.results;if(I=t.totalPages||Math.ceil(t.totalResults/T),!n||n.length===0){$.innerHTML="<p>No recipes found to display.</p>",E.innerHTML="";return}const s=n.map(i=>{const r=i.rating/5*100,a=oe(i._id)?"active":"";return`
        <div class="recipe-card" data-id="${i._id}">
          <button class="heart-btn ${a}" aria-label="Add to favorites">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
          </button>
          <img class="recipe-card-image" src="${i.thumb}" alt="${i.title}" loading="lazy">
          <div class="recipe-card-details">
            <h3 class="recipe-card-title">${i.title}</h3>
            <p class="recipe-card-description">${i.description}</p>
            <div class="recipe-card-footer">
              <div class="recipe-card-rating">
                <span class="rating-value">${i.rating.toFixed(1)}</span>
                <div class="rating-stars" style="--rating: ${r}%">
                  <span>★★★★★</span>
                  <span class="stars-filled">★★★★★</span>
                </div>
              </div>
              <button class="recipe-card-button" type="button">See recipe</button>
            </div>
          </div>
        </div>`}).join("");$.innerHTML=s,le(I,e)}catch(t){console.error("An error occurred while loading recipes:",t),$.innerHTML="<p>The recipes could not be loaded. Please try again later.</p>",E.innerHTML=""}}E.addEventListener("click",e=>{const t=e.target.closest(".pagination-btn");if(!t||t.disabled||!t.dataset.page)return;const n=Number(t.dataset.page);n!==h&&(h=n,_(h))});$.addEventListener("click",e=>{const t=e.target.closest(".heart-btn");if(!t)return;const s=t.closest(".recipe-card").dataset.id;ae({_id:s}),t.classList.toggle("active")});function le(e,t){let n="";const i="pagination-btn arrow-btn arrow-prev",r="pagination-btn arrow-btn arrow-next";if(n+=`<button class="${i}" data-page="1" ${t===1?"disabled":""}>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="11 17 6 12 11 7"></polyline><polyline points="18 17 13 12 18 7"></polyline></svg>
  </button>`,n+=`<button class="${i}" data-page="${t-1}" ${t===1?"disabled":""}>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
  </button>`,e>1){t>3&&(n+='<button class="pagination-btn page-btn" data-page="1">1</button>',n+='<button class="pagination-btn dots">...</button>');for(let a=Math.max(1,t-1);a<=Math.min(e,t+1);a++)a===1&&t>3||a===e&&t<e-1-1||(n+=`<button class="pagination-btn page-btn ${a===t?"active":""}" data-page="${a}">${a}</button>`);t<e-1-1&&(n+='<button class="pagination-btn dots">...</button>',n+=`<button class="pagination-btn page-btn" data-page="${e}">${e}</button>`)}n+=`<button class="${r}" data-page="${t+1}" ${t===e?"disabled":""}>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
  </button>`,n+=`<button class="${r}" data-page="${e}" ${t===e?"disabled":""}>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="13 17 18 12 13 7"></polyline><polyline points="6 17 11 12 6 7"></polyline></svg>
  </button>`,E.innerHTML=n}const de=ce(()=>{const e=B();e!==T&&(console.log(`Resize detected. New limit: ${e}. Refetching...`),h=1,_(h))});window.addEventListener("resize",de);_();
//# sourceMappingURL=index.js.map
