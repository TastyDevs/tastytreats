/* empty css                      */(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))r(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const o of i.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&r(o)}).observe(document,{childList:!0,subtree:!0});function n(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(s){if(s.ep)return;s.ep=!0;const i=n(s);fetch(s.href,i)}})();const E="https://tasty-treats-backend.p.goit.global/api";async function G(){return await(await fetch(`${E}/categories`)).json()}async function R({category:e="",page:t=1,limit:n=6,time:r="",area:s="",ingredient:i=""}={}){const o=new URL(`${E}/recipes`);return e&&o.searchParams.append("category",e),t&&o.searchParams.append("page",t),n&&o.searchParams.append("limit",n),r&&o.searchParams.append("time",r),s&&o.searchParams.append("area",s),i&&o.searchParams.append("ingredient",i),await(await fetch(o)).json()}async function K(){return await(await fetch(`${E}/recipes/popular`)).json()}async function X(){return await(await fetch(`${E}/ingredients`)).json()}async function Z(){return await(await fetch(`${E}/areas`)).json()}const b=document.querySelector("#recipes-container"),N=document.querySelector("#pagination"),q=document.querySelector("#category-list"),y=document.querySelector(".categories-box");let u=1,U=1,m=null,A=_();function _(){const e=window.innerWidth;return e<768?6:e<1280?8:9}async function P(){try{const t=(await G()).map(r=>`
        <li>
          <button 
            class="category-btn ${r.name===m?"active":""}" 
            data-category="${r.name}">
            ${r.name}
          </button>
        </li>`).join("");q.innerHTML=t;const n=q.querySelectorAll(".category-btn");n.forEach(r=>{r.addEventListener("click",()=>{const s=r.dataset.category;s!==m&&(m=s,u=1,n.forEach(i=>i.classList.remove("active")),y.classList.remove("active"),r.classList.add("active"),T(u))})})}catch(e){console.error("Failed to load categories:",e)}}y&&y.addEventListener("click",()=>{m!==null&&(m=null,u=1,q.querySelectorAll(".category-btn").forEach(t=>t.classList.remove("active")),y.classList.add("active"),T(u))});async function T(e=1){try{A=_();const t=await R({page:e,limit:A,category:m||void 0}),n=t.results;if(U=t.totalPages||Math.ceil(t.totalResults/A),!n||n.length===0){b.innerHTML="<p>No recipes found to display.</p>",N.innerHTML="";return}const r=n.map(s=>{const i=s.rating/5*100;return`
        <div class="recipe-card" data-id="${s._id}">
          <button class="heart-btn" aria-label="Add to favorites">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
          </button>
          <img class="recipe-card-image" src="${s.thumb}" alt="${s.title}" loading="lazy">
          <div class="recipe-card-details">
            <h3 class="recipe-card-title">${s.title}</h3>
            <p class="recipe-card-description">${s.description}</p>
            <div class="recipe-card-footer">
              <div class="recipe-card-rating">
                <span class="rating-value">${s.rating.toFixed(1)}</span>
                <div class="rating-stars" style="--rating: ${i}%">
                  <span>★★★★★</span>
                  <span class="stars-filled">★★★★★</span>
                </div>
              </div>
              <button class="recipe-card-button" type="button">See recipe</button>
            </div>
          </div>
        </div>`}).join("");b.innerHTML=`<div class="recipes-list">${r}</div>`,ee(U,e),m?b.classList.add("category-selected"):b.classList.remove("category-selected")}catch(t){console.error("An error occurred while loading recipes:",t),b.innerHTML="<p>The recipes could not be loaded. Please try again later.</p>",N.innerHTML=""}}function ee(e,t){let n="";for(let s=1;s<=e;s++)n+=`<button class="pagination-btn ${s===t?"active":""}" data-page="${s}">${s}</button>`;N.innerHTML=n,N.querySelectorAll(".pagination-btn").forEach(s=>{s.addEventListener("click",()=>{const i=Number(s.dataset.page);i!==u&&(u=i,T(u))})})}window.addEventListener("resize",()=>{_()!==A&&(u=1,T(u))});y&&y.classList.add("active");P();T();const x=document.querySelector(".popular-recipe-wrapper");console.log(K());async function te(){try{x.innerHTML="<p>Loading recipes...</p>";const e=await K();if(!e||e.length===0){x.innerHTML="<p>No popular recipes found!</p>";return}const t=e.map(n=>`
    <div class="popular-recipes-card" data-id="${n._id}">
    <img class="popular-recipes-image" src="${n.preview}" alt="${n.title}" />
    <div class="popular-recipes-info">
    <h3 class="popular-recipes-title recipe-title">${n.title}</h3>
      <p class="popular-recipes-description popular-recipe-text ">${n.description}</p>
      </div>
    </div>
  `).join("");x.innerHTML=t}catch(e){console.error("Failed to fetch popular recipes:",e),x.innerHTML="<p>Sorry, we could not load the recipes at this time</p>"}}te();const l=document.querySelector(".filters");l||console.warn("[filters] .filters bulunamadı.");const d=document.getElementById("pagination-filters")||document.getElementById("pagination"),a={search:l==null?void 0:l.querySelector(".filter-input"),searchBtn:l==null?void 0:l.querySelector(".search-btn"),resetBtn:l==null?void 0:l.querySelector(".reset-filter"),dropdowns:[...(l==null?void 0:l.querySelectorAll(".custom-dropdown"))??[]],recipes:document.getElementById("recipes-flex")},f={grid:document.getElementById("recipes-container"),pagination:document.getElementById("pagination")},j=!!a.recipes,c={query:"",time:"",area:"",ingredient:"",ingredientLabel:"",page:1,limit:6,loading:!1},ne=["10 min","20 min","30 min","40 min"];function D(e){c.loading=e,!(!j||!a.recipes)&&e&&(a.recipes.innerHTML='<div class="recipes-loading">Loading...</div>')}const ie=1e4,se=(e,t=ie)=>Promise.race([e,new Promise((n,r)=>setTimeout(()=>r(new Error("REQUEST_TIMEOUT")),t))]);function re(e){const t=String(e).match(/\d+/);return t?t[0]:""}function I(e){a.dropdowns.forEach(t=>{t!==e&&t.classList.remove("open")})}function L(e){return String(e).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function oe(){return!!(c.query||c.time||c.area||c.ingredient)}function ae(){f.grid&&(f.grid.style.display="none"),f.pagination&&(f.pagination.style.display="none"),a.recipes&&(a.recipes.style.display=""),d&&(d.style.display=""),document.dispatchEvent(new CustomEvent("filters:activate"))}function ce(){a.recipes&&(a.recipes.style.display="none"),d&&(d.style.display="none"),f.grid&&(f.grid.style.display=""),f.pagination&&(f.pagination.style.display=""),document.dispatchEvent(new CustomEvent("filters:deactivate"))}function le(e,t){if(!d)return;e=Math.max(1,Number(e)||1),t=Math.min(e,Math.max(1,Number(t)||1));const n=1,r="pagination-btn arrow-btn arrow-prev",s="pagination-btn arrow-btn arrow-next";let i=`
    <button class="${r}" data-page="1" ${t===1?"disabled":""}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="11 17 6 12 11 7"></polyline><polyline points="18 17 13 12 18 7"></polyline></svg>
    </button>
    <button class="${r}" data-page="${t-1}" ${t===1?"disabled":""}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
    </button>
  `;if(e>1){t>n+2&&(i+='<button class="pagination-btn page-btn" data-page="1">1</button>',i+='<button class="pagination-btn dots" disabled>...</button>');for(let o=Math.max(1,t-n);o<=Math.min(e,t+n);o++)o===1&&t>n+2||o===e&&t<e-n-1||(i+=`<button class="pagination-btn page-btn ${o===t?"active":""}" data-page="${o}">${o}</button>`);t<e-n-1&&(i+='<button class="pagination-btn dots" disabled>...</button>',i+=`<button class="pagination-btn page-btn" data-page="${e}">${e}</button>`)}i+=`
    <button class="${s}" data-page="${t+1}" ${t===e?"disabled":""}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
    </button>
    <button class="${s}" data-page="${e}" ${t===e?"disabled":""}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="13 17 18 12 13 7"></polyline><polyline points="6 17 11 12 6 7"></polyline></svg>
    </button>
  `,d.innerHTML=e<=1?"":i}function de(e){if(!a.recipes)return;if(!(e!=null&&e.length)){a.recipes.innerHTML="";return}const t=e.map(n=>{const{_id:r,title:s="Untitled",description:i="",rating:o=0,preview:g,thumb:p}=n,v=g||p||"",M=L(s),S=L(i),z=Number(o)||0,Y=Math.max(0,Math.min(100,z/5*100));return`
      <div class="recipe-card" data-id="${r||""}">
        <button class="heart-btn" aria-label="Add to favorites">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22"
               viewBox="0 0 24 24" fill="none" stroke="currentColor"
               stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
          </svg>
        </button>

        ${v?`<img class="recipe-card-image" src="${v}" alt="${M}" loading="lazy">`:""}

        <div class="recipe-card-details">
          <h3 class="recipe-card-title">${M}</h3>
          ${S?`<p class="recipe-card-description">${S}</p>`:""}

          <div class="recipe-card-footer">
            <div class="recipe-card-rating">
              <span class="rating-value">${z.toFixed(1)}</span>
              <div class="rating-stars" style="--rating:${Y}%">
                <span>★★★★★</span>
                <span class="stars-filled">★★★★★</span>
              </div>
            </div>
            <button class="recipe-card-button" type="button">See recipe</button>
          </div>
        </div>
      </div>`}).join("");a.recipes.innerHTML=t}async function k(){try{if(!oe()){ce();return}ae(),D(!0);const{time:e,area:t,ingredient:n,page:r,limit:s}=c,i=await se(R({time:e,area:t,ingredient:n,page:r,limit:s})),o=Array.isArray(i==null?void 0:i.results)?i.results:Array.isArray(i)?i:Array.isArray(i==null?void 0:i.recipes)?i.recipes:[],g=c.query.toLowerCase(),p=g?o.filter(v=>String(v.title||"").toLowerCase().includes(g)):o;if(j){if(de(p),d){const v=Number(i==null?void 0:i.totalPages)||Number(i==null?void 0:i.pageCount)||0,M=Number(i==null?void 0:i.total)||Number(i==null?void 0:i.count)||Number(i==null?void 0:i.resultsCount)||Number(i==null?void 0:i.hits)||(Array.isArray(i==null?void 0:i.results)?i.results.length:0),S=v||Math.max(1,Math.ceil((M||p.length)/(s||6)));le(S,c.page)}!p.length&&a.recipes&&(a.recipes.innerHTML='<p class="no-results">No recipes found</p>')}document.dispatchEvent(new CustomEvent("recipes:filtered",{detail:{recipes:p,paging:{page:r,limit:s},raw:i}}))}catch(e){console.error("[filters] applyFilters error:",(e==null?void 0:e.message)||e),j&&a.recipes&&(a.recipes.innerHTML=(e==null?void 0:e.message)==="REQUEST_TIMEOUT"?'<p class="no-results">İstek zaman aşımına uğradı. Lütfen tekrar deneyin.</p>':'<p class="no-results">Bir şeyler ters gitti. Lütfen tekrar deneyin.</p>'),document.dispatchEvent(new CustomEvent("recipes:filtered",{detail:{recipes:[],error:!0,reason:(e==null?void 0:e.message)||String(e)}}))}finally{D(!1)}}async function pe(){w("time",ne.map(e=>({value:re(e),label:e})));try{const e=await Z(),t=(Array.isArray(e)?e:[]).map(n=>typeof n=="string"?n:n==null?void 0:n.name).filter(Boolean).map(n=>({value:n,label:n}));w("area",t)}catch(e){console.error("Areas yüklenemedi",e),w("area",[])}try{const e=await X(),t=(Array.isArray(e)?e:[]).filter(n=>(n==null?void 0:n._id)&&(n==null?void 0:n.name)).map(n=>({value:n._id,label:n.name}));w("ingredient",t)}catch(e){console.error("Ingredients yüklenemedi",e),w("ingredient",[])}}function w(e,t){const n=a.dropdowns.find(i=>i.dataset.type===e);if(!n)return;const r=n.querySelector(".dropdown-menu"),s=n.querySelector(".dropdown-toggle");!r||!s||(r.innerHTML=(t||[]).map(i=>`<li><button type="button" data-value="${L(i.value)}" data-label="${L(i.label)}">${L(i.label)}</button></li>`).join(""),s.addEventListener("click",()=>{const i=!n.classList.contains("open");I(),n.classList.toggle("open",i)}),r.addEventListener("click",i=>{const o=i.target.closest("button[data-value]");if(!o)return;const g=o.getAttribute("data-value")??"",p=o.getAttribute("data-label")??o.textContent.trim();e==="time"?c.time=g:e==="area"?c.area=p:e==="ingredient"&&(c.ingredient=g,c.ingredientLabel=p),s.textContent=p,n.classList.remove("open"),c.page=1,k()}))}document.addEventListener("click",e=>{const t=e.target.closest(".custom-dropdown");if(!t)return I();a.dropdowns.forEach(n=>{n!==t&&n.classList.remove("open")})});document.addEventListener("keydown",e=>{e.key==="Escape"&&I()});function ue(){if(!a.search||!a.searchBtn)return;const e=()=>{c.query=a.search.value.trim(),c.page=1,k()};a.searchBtn.addEventListener("click",e),a.search.addEventListener("keydown",t=>{t.key==="Enter"&&(t.preventDefault(),e())})}function ge(){a.resetBtn&&a.resetBtn.addEventListener("click",()=>{c.query="",c.time="",c.area="",c.ingredient="",c.ingredientLabel="",c.page=1,a.search&&(a.search.value=""),k()})}(async function(){try{a.recipes&&(a.recipes.classList.add("recipes-list"),a.recipes.style.display="none"),d&&(d.style.display="none"),await pe(),ue(),ge(),await k(),d&&d.addEventListener("click",t=>{const n=t.target.closest(".pagination-btn");if(!n||n.classList.contains("dots"))return;const r=parseInt(n.dataset.page,10);!isNaN(r)&&r!==c.page&&(c.page=r,k())}),document.addEventListener("click",t=>{const n=t.target.closest(".heart-btn");n&&n.classList.toggle("active")}),document.addEventListener("click",t=>{const n=t.target.closest(".recipe-card-button");if(n){const r=n.closest(".recipe-card"),s=r==null?void 0:r.dataset.id;s&&console.log("Recipe clicked:",s)}})}catch(t){console.error("[filters] init error:",t),a.recipes&&(a.recipes.innerHTML='<p class="no-results">Bir şeyler ters gitti. Lütfen tekrar deneyin.</p>')}})();const Q="favoriteRecipes";function W(){try{return JSON.parse(localStorage.getItem(Q))||[]}catch{return[]}}function V(e){localStorage.setItem(Q,JSON.stringify(e))}function fe(e){const t=W();if(t.some(r=>r._id===e._id)){const r=t.filter(s=>s._id!==e._id);V(r)}else t.push(e),V(t)}function me(e){return W().some(n=>n._id===e)}const C=document.querySelector("#recipes-container"),H=document.querySelector("#pagination");let h=[],$=1,J=1,B=F();function ve(e,t=250){let n;return function(...r){clearTimeout(n),n=setTimeout(()=>{e.apply(this,r)},t)}}function F(){const e=window.innerWidth;return e<768?6:e<1280?8:9}async function O(e=1){try{B=F();const t=await R({page:e,limit:B});if(h=t.results,J=t.totalPages||Math.ceil(t.totalResults/B),!h||h.length===0){C.innerHTML="<p>No recipes found to display.</p>",H.innerHTML="";return}const n=h.map(r=>{const s=r.rating/5*100,i=me(r._id)?"active":"";return`
        <div class="recipe-card" data-id="${r._id}">
          <button class="heart-btn ${i}" aria-label="Add to favorites">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
          </button>
          <img class="recipe-card-image" src="${r.thumb}" alt="${r.title}" loading="lazy">
          <div class="recipe-card-details">
            <h3 class="recipe-card-title">${r.title}</h3>
            <p class="recipe-card-description">${r.description}</p>
            <div class="recipe-card-footer">
              <div class="recipe-card-rating">
                <span class="rating-value">${r.rating.toFixed(1)}</span>
                <div class="rating-stars" style="--rating: ${s}%">
                  <span>★★★★★</span>
                  <span class="stars-filled">★★★★★</span>
                </div>
              </div>
              <button class="recipe-card-button" type="button">See recipe</button>
            </div>
          </div>
        </div>`}).join("");C.innerHTML=n,ye(J,e)}catch(t){console.error("An error occurred while loading recipes:",t),C.innerHTML="<p>The recipes could not be loaded. Please try again later.</p>",H.innerHTML=""}}H.addEventListener("click",e=>{const t=e.target.closest(".pagination-btn");if(!t||t.disabled||!t.dataset.page)return;const n=Number(t.dataset.page);n!==$&&($=n,O($))});C.addEventListener("click",e=>{const t=e.target.closest(".heart-btn");if(!t)return;console.log("Heart button clicked on deployed site!");const r=t.closest(".recipe-card").dataset.id,s=h.find(i=>i._id===r);if(!s){console.error("Recipe object NOT FOUND for ID:",r);return}console.log("Recipe found:",s.title),fe(s),console.log("About to toggle 'active' class on element:",t),t.classList.toggle("active")});function ye(e,t){let n="";const s="pagination-btn arrow-btn arrow-prev",i="pagination-btn arrow-btn arrow-next";if(n+=`<button class="${s}" data-page="1" ${t===1?"disabled":""}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="11 17 6 12 11 7"></polyline><polyline points="18 17 13 12 18 7"></polyline></svg></button>`,n+=`<button class="${s}" data-page="${t-1}" ${t===1?"disabled":""}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg></button>`,e>1){t>3&&(n+='<button class="pagination-btn page-btn" data-page="1">1</button>',n+='<button class="pagination-btn dots">...</button>');for(let o=Math.max(1,t-1);o<=Math.min(e,t+1);o++)o===1&&t>3||o===e&&t<e-1-1||(n+=`<button class="pagination-btn page-btn ${o===t?"active":""}" data-page="${o}">${o}</button>`);t<e-1-1&&(n+='<button class="pagination-btn dots">...</button>',n+=`<button class="pagination-btn page-btn" data-page="${e}">${e}</button>`)}n+=`<button class="${i}" data-page="${t+1}" ${t===e?"disabled":""}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg></button>`,n+=`<button class="${i}" data-page="${e}" ${t===e?"disabled":""}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="13 17 18 12 13 7"></polyline><polyline points="6 17 11 12 6 7"></polyline></svg></button>`,H.innerHTML=n}const be=ve(()=>{F()!==B&&($=1,O($))});window.addEventListener("resize",be);O();
//# sourceMappingURL=index.js.map
