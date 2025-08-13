import{f as K,a as q,b as V,c as Y,d as X}from"./assets/tastyTreatsApi-D_6eBPKE.js";const w=document.querySelector("#recipes-container"),C=document.querySelector("#pagination"),R=document.querySelector("#category-list"),y=document.querySelector(".categories-box");let u=1,U=1,v=null,x=F();function F(){const e=window.innerWidth;return e<768?6:e<1280?8:9}async function Z(){try{const t=(await K()).map(s=>`
        <li>
          <button 
            class="category-btn ${s.name===v?"active":""}" 
            data-category="${s.name}">
            ${s.name}
          </button>
        </li>`).join("");R.innerHTML=t;const n=R.querySelectorAll(".category-btn");n.forEach(s=>{s.addEventListener("click",()=>{const o=s.dataset.category;o!==v&&(v=o,u=1,n.forEach(i=>i.classList.remove("active")),y.classList.remove("active"),s.classList.add("active"),E(u))})})}catch(e){console.error("Failed to load categories:",e)}}y&&y.addEventListener("click",()=>{v!==null&&(v=null,u=1,R.querySelectorAll(".category-btn").forEach(t=>t.classList.remove("active")),y.classList.add("active"),E(u))});async function E(e=1){try{x=F();const t=await q({page:e,limit:x,category:v||void 0}),n=t.results;if(U=t.totalPages||Math.ceil(t.totalResults/x),!n||n.length===0){w.innerHTML="<p>No recipes found to display.</p>",C.innerHTML="";return}const s=n.map(o=>{const i=o.rating/5*100;return`
        <div class="recipe-card" data-id="${o._id}">
          <button class="heart-btn" aria-label="Add to favorites">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
          </button>
          <img class="recipe-card-image" src="${o.thumb}" alt="${o.title}" loading="lazy">
          <div class="recipe-card-details">
            <h3 class="recipe-card-title">${o.title}</h3>
            <p class="recipe-card-description">${o.description}</p>
            <div class="recipe-card-footer">
              <div class="recipe-card-rating">
                <span class="rating-value">${o.rating.toFixed(1)}</span>
                <div class="rating-stars" style="--rating: ${i}%">
                  <span>★★★★★</span>
                  <span class="stars-filled">★★★★★</span>
                </div>
              </div>
              <button class="recipe-card-button" type="button">See recipe</button>
            </div>
          </div>
        </div>`}).join("");w.innerHTML=`<div class="recipes-list">${s}</div>`,P(U,e),v?w.classList.add("category-selected"):w.classList.remove("category-selected")}catch(t){console.error("An error occurred while loading recipes:",t),w.innerHTML="<p>The recipes could not be loaded. Please try again later.</p>",C.innerHTML=""}}function P(e,t){let n="";for(let o=1;o<=e;o++)n+=`<button class="pagination-btn ${o===t?"active":""}" data-page="${o}">${o}</button>`;C.innerHTML=n,C.querySelectorAll(".pagination-btn").forEach(o=>{o.addEventListener("click",()=>{const i=Number(o.dataset.page);i!==u&&(u=i,E(u))})})}window.addEventListener("resize",()=>{F()!==x&&(u=1,E(u))});y&&y.classList.add("active");Z();E();const S=document.querySelector(".popular-recipe-wrapper");console.log(V());async function ee(){try{S.innerHTML="<p>Loading recipes...</p>";const e=await V();if(!e||e.length===0){S.innerHTML="<p>No popular recipes found!</p>";return}const t=e.map(n=>`
    <div class="popular-recipes-card" data-id="${n._id}">
    <img class="popular-recipes-image" src="${n.preview}" alt="${n.title}" />
    <div class="popular-recipes-info">
    <h3 class="popular-recipes-title recipe-title">${n.title}</h3>
      <p class="popular-recipes-description popular-recipe-text ">${n.description}</p>
      </div>
    </div>
  `).join("");S.innerHTML=t}catch(e){console.error("Failed to fetch popular recipes:",e),S.innerHTML="<p>Sorry, we could not load the recipes at this time</p>"}}ee();const c=document.querySelector(".filters");c||console.warn("[filters] .filters bulunamadı.");const d=document.getElementById("pagination-filters")||document.getElementById("pagination"),r={search:c==null?void 0:c.querySelector(".filter-input"),searchBtn:c==null?void 0:c.querySelector(".search-btn"),resetBtn:c==null?void 0:c.querySelector(".reset-filter"),dropdowns:[...(c==null?void 0:c.querySelectorAll(".custom-dropdown"))??[]],recipes:document.getElementById("recipes-flex")},g={grid:document.getElementById("recipes-container"),pagination:document.getElementById("pagination")},N=!!r.recipes,l={query:"",time:"",area:"",ingredient:"",ingredientLabel:"",page:1,limit:6,loading:!1},te=["10 min","20 min","30 min","40 min"];function O(e){l.loading=e,!(!N||!r.recipes)&&e&&(r.recipes.innerHTML='<div class="recipes-loading">Loading...</div>')}const ne=1e4,ie=(e,t=ne)=>Promise.race([e,new Promise((n,s)=>setTimeout(()=>s(new Error("REQUEST_TIMEOUT")),t))]);function se(e){const t=String(e).match(/\d+/);return t?t[0]:""}function _(e){r.dropdowns.forEach(t=>{t!==e&&t.classList.remove("open")})}function L(e){return String(e).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function oe(){return!!(l.query||l.time||l.area||l.ingredient)}function re(){g.grid&&(g.grid.style.display="none"),g.pagination&&(g.pagination.style.display="none"),r.recipes&&(r.recipes.style.display=""),d&&(d.style.display=""),document.dispatchEvent(new CustomEvent("filters:activate"))}function ae(){r.recipes&&(r.recipes.style.display="none"),d&&(d.style.display="none"),g.grid&&(g.grid.style.display=""),g.pagination&&(g.pagination.style.display=""),document.dispatchEvent(new CustomEvent("filters:deactivate"))}function le(e,t){if(!d)return;e=Math.max(1,Number(e)||1),t=Math.min(e,Math.max(1,Number(t)||1));const n=1,s="pagination-btn arrow-btn arrow-prev",o="pagination-btn arrow-btn arrow-next";let i=`
    <button class="${s}" data-page="1" ${t===1?"disabled":""}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="11 17 6 12 11 7"></polyline><polyline points="18 17 13 12 18 7"></polyline></svg>
    </button>
    <button class="${s}" data-page="${t-1}" ${t===1?"disabled":""}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
    </button>
  `;if(e>1){t>n+2&&(i+='<button class="pagination-btn page-btn" data-page="1">1</button>',i+='<button class="pagination-btn dots" disabled>...</button>');for(let a=Math.max(1,t-n);a<=Math.min(e,t+n);a++)a===1&&t>n+2||a===e&&t<e-n-1||(i+=`<button class="pagination-btn page-btn ${a===t?"active":""}" data-page="${a}">${a}</button>`);t<e-n-1&&(i+='<button class="pagination-btn dots" disabled>...</button>',i+=`<button class="pagination-btn page-btn" data-page="${e}">${e}</button>`)}i+=`
    <button class="${o}" data-page="${t+1}" ${t===e?"disabled":""}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
    </button>
    <button class="${o}" data-page="${e}" ${t===e?"disabled":""}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="13 17 18 12 13 7"></polyline><polyline points="6 17 11 12 6 7"></polyline></svg>
    </button>
  `,d.innerHTML=e<=1?"":i}function ce(e){if(!r.recipes)return;if(!(e!=null&&e.length)){r.recipes.innerHTML="";return}const t=e.map(n=>{const{_id:s,title:o="Untitled",description:i="",rating:a=0,preview:f,thumb:p}=n,m=f||p||"",T=L(o),M=L(i),D=Number(a)||0,W=Math.max(0,Math.min(100,D/5*100));return`
      <div class="recipe-card" data-id="${s||""}">
        <button class="heart-btn" aria-label="Add to favorites">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22"
               viewBox="0 0 24 24" fill="none" stroke="currentColor"
               stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
          </svg>
        </button>

        ${m?`<img class="recipe-card-image" src="${m}" alt="${T}" loading="lazy">`:""}

        <div class="recipe-card-details">
          <h3 class="recipe-card-title">${T}</h3>
          ${M?`<p class="recipe-card-description">${M}</p>`:""}

          <div class="recipe-card-footer">
            <div class="recipe-card-rating">
              <span class="rating-value">${D.toFixed(1)}</span>
              <div class="rating-stars" style="--rating:${W}%">
                <span>★★★★★</span>
                <span class="stars-filled">★★★★★</span>
              </div>
            </div>
            <button class="recipe-card-button" type="button">See recipe</button>
          </div>
        </div>
      </div>`}).join("");r.recipes.innerHTML=t}async function k(){try{if(!oe()){ae();return}re(),O(!0);const{time:e,area:t,ingredient:n,page:s,limit:o}=l,i=await ie(q({time:e,area:t,ingredient:n,page:s,limit:o})),a=Array.isArray(i==null?void 0:i.results)?i.results:Array.isArray(i)?i:Array.isArray(i==null?void 0:i.recipes)?i.recipes:[],f=l.query.toLowerCase(),p=f?a.filter(m=>String(m.title||"").toLowerCase().includes(f)):a;if(N){if(ce(p),d){const m=Number(i==null?void 0:i.totalPages)||Number(i==null?void 0:i.pageCount)||0,T=Number(i==null?void 0:i.total)||Number(i==null?void 0:i.count)||Number(i==null?void 0:i.resultsCount)||Number(i==null?void 0:i.hits)||(Array.isArray(i==null?void 0:i.results)?i.results.length:0),M=m||Math.max(1,Math.ceil((T||p.length)/(o||6)));le(M,l.page)}!p.length&&r.recipes&&(r.recipes.innerHTML='<p class="no-results">No recipes found</p>')}document.dispatchEvent(new CustomEvent("recipes:filtered",{detail:{recipes:p,paging:{page:s,limit:o},raw:i}}))}catch(e){console.error("[filters] applyFilters error:",(e==null?void 0:e.message)||e),N&&r.recipes&&(r.recipes.innerHTML=(e==null?void 0:e.message)==="REQUEST_TIMEOUT"?'<p class="no-results">İstek zaman aşımına uğradı. Lütfen tekrar deneyin.</p>':'<p class="no-results">Bir şeyler ters gitti. Lütfen tekrar deneyin.</p>'),document.dispatchEvent(new CustomEvent("recipes:filtered",{detail:{recipes:[],error:!0,reason:(e==null?void 0:e.message)||String(e)}}))}finally{O(!1)}}async function de(){h("time",te.map(e=>({value:se(e),label:e})));try{const e=await Y(),t=(Array.isArray(e)?e:[]).map(n=>typeof n=="string"?n:n==null?void 0:n.name).filter(Boolean).map(n=>({value:n,label:n}));h("area",t)}catch(e){console.error("Areas yüklenemedi",e),h("area",[])}try{const e=await X(),t=(Array.isArray(e)?e:[]).filter(n=>(n==null?void 0:n._id)&&(n==null?void 0:n.name)).map(n=>({value:n._id,label:n.name}));h("ingredient",t)}catch(e){console.error("Ingredients yüklenemedi",e),h("ingredient",[])}}function h(e,t){const n=r.dropdowns.find(i=>i.dataset.type===e);if(!n)return;const s=n.querySelector(".dropdown-menu"),o=n.querySelector(".dropdown-toggle");!s||!o||(s.innerHTML=(t||[]).map(i=>`<li><button type="button" data-value="${L(i.value)}" data-label="${L(i.label)}">${L(i.label)}</button></li>`).join(""),o.addEventListener("click",()=>{const i=!n.classList.contains("open");_(),n.classList.toggle("open",i)}),s.addEventListener("click",i=>{const a=i.target.closest("button[data-value]");if(!a)return;const f=a.getAttribute("data-value")??"",p=a.getAttribute("data-label")??a.textContent.trim();e==="time"?l.time=f:e==="area"?l.area=p:e==="ingredient"&&(l.ingredient=f,l.ingredientLabel=p),o.textContent=p,n.classList.remove("open"),l.page=1,k()}))}document.addEventListener("click",e=>{const t=e.target.closest(".custom-dropdown");if(!t)return _();r.dropdowns.forEach(n=>{n!==t&&n.classList.remove("open")})});document.addEventListener("keydown",e=>{e.key==="Escape"&&_()});function pe(){if(!r.search||!r.searchBtn)return;const e=()=>{l.query=r.search.value.trim(),l.page=1,k()};r.searchBtn.addEventListener("click",e),r.search.addEventListener("keydown",t=>{t.key==="Enter"&&(t.preventDefault(),e())})}function ue(){r.resetBtn&&r.resetBtn.addEventListener("click",()=>{l.query="",l.time="",l.area="",l.ingredient="",l.ingredientLabel="",l.page=1,r.search&&(r.search.value=""),k()})}(async function(){try{r.recipes&&(r.recipes.classList.add("recipes-list"),r.recipes.style.display="none"),d&&(d.style.display="none"),await de(),pe(),ue(),await k(),d&&d.addEventListener("click",t=>{const n=t.target.closest(".pagination-btn");if(!n||n.classList.contains("dots"))return;const s=parseInt(n.dataset.page,10);!isNaN(s)&&s!==l.page&&(l.page=s,k())}),document.addEventListener("click",t=>{const n=t.target.closest(".heart-btn");n&&n.classList.toggle("active")}),document.addEventListener("click",t=>{const n=t.target.closest(".recipe-card-button");if(n){const s=n.closest(".recipe-card"),o=s==null?void 0:s.dataset.id;o&&console.log("Recipe clicked:",o)}})}catch(t){console.error("[filters] init error:",t),r.recipes&&(r.recipes.innerHTML='<p class="no-results">Bir şeyler ters gitti. Lütfen tekrar deneyin.</p>')}})();const J="favoriteRecipes";function Q(){try{return JSON.parse(localStorage.getItem(J))||[]}catch{return[]}}function z(e){localStorage.setItem(J,JSON.stringify(e))}function ge(e){const t=Q();if(t.some(s=>s._id===e._id)){const s=t.filter(o=>o._id!==e._id);z(s)}else t.push(e),z(t)}function fe(e){return Q().some(n=>n._id===e)}const A=document.querySelector("#recipes-container"),H=document.querySelector("#pagination");let b=[],$=1,G=1,B=I();function ve(e,t=250){let n;return function(...s){clearTimeout(n),n=setTimeout(()=>{e.apply(this,s)},t)}}function I(){const e=window.innerWidth;return e<768?6:e<1280?8:9}async function j(e=1){try{B=I();const t=await q({page:e,limit:B});if(b=t.results,G=t.totalPages||Math.ceil(t.totalResults/B),!b||b.length===0){A.innerHTML="<p>No recipes found to display.</p>",H.innerHTML="";return}const n=b.map(s=>{const o=s.rating/5*100,i=fe(s._id)?"active":"";return`
        <div class="recipe-card" data-id="${s._id}">
          <button class="heart-btn ${i}" aria-label="Add to favorites">
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
                <div class="rating-stars" style="--rating: ${o}%">
                  <span>★★★★★</span>
                  <span class="stars-filled">★★★★★</span>
                </div>
              </div>
              <button class="recipe-card-button" type="button">See recipe</button>
            </div>
          </div>
        </div>`}).join("");A.innerHTML=n,me(G,e)}catch(t){console.error("An error occurred while loading recipes:",t),A.innerHTML="<p>The recipes could not be loaded. Please try again later.</p>",H.innerHTML=""}}H.addEventListener("click",e=>{const t=e.target.closest(".pagination-btn");if(!t||t.disabled||!t.dataset.page)return;const n=Number(t.dataset.page);n!==$&&($=n,j($))});A.addEventListener("click",e=>{const t=e.target.closest(".heart-btn");if(!t)return;console.log("[DEBUG] Heart button was clicked.");const s=t.closest(".recipe-card").dataset.id;console.log(`[DEBUG] Found Recipe ID: ${s}`),console.log("[DEBUG] Searching for recipe in this array:",b);const o=b.find(i=>i._id===s);if(!o){console.error("[DEBUG] FATAL ERROR: Recipe object was NOT FOUND in currentRecipes array.");return}console.log("[DEBUG] Recipe found successfully:",o),console.log("[DEBUG] localStorage (before toggle):",localStorage.getItem("favoriteRecipes")),ge(o),console.log("[DEBUG] localStorage (after toggle):",localStorage.getItem("favoriteRecipes")),console.log("[DEBUG] Attempting to toggle class on element:",t),requestAnimationFrame(()=>{t.classList.toggle("active"),console.log("[DEBUG] Toggled class via requestAnimationFrame. Final classes:",t.className)})});function me(e,t){let n="";const o="pagination-btn arrow-btn arrow-prev",i="pagination-btn arrow-btn arrow-next";if(n+=`<button class="${o}" data-page="1" ${t===1?"disabled":""}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="11 17 6 12 11 7"></polyline><polyline points="18 17 13 12 18 7"></polyline></svg></button>`,n+=`<button class="${o}" data-page="${t-1}" ${t===1?"disabled":""}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg></button>`,e>1){t>3&&(n+='<button class="pagination-btn page-btn" data-page="1">1</button>',n+='<button class="pagination-btn dots">...</button>');for(let a=Math.max(1,t-1);a<=Math.min(e,t+1);a++)a===1&&t>3||a===e&&t<e-1-1||(n+=`<button class="pagination-btn page-btn ${a===t?"active":""}" data-page="${a}">${a}</button>`);t<e-1-1&&(n+='<button class="pagination-btn dots">...</button>',n+=`<button class="pagination-btn page-btn" data-page="${e}">${e}</button>`)}n+=`<button class="${i}" data-page="${t+1}" ${t===e?"disabled":""}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg></button>`,n+=`<button class="${i}" data-page="${e}" ${t===e?"disabled":""}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="13 17 18 12 13 7"></polyline><polyline points="6 17 11 12 6 7"></polyline></svg></button>`,H.innerHTML=n}const be=ve(()=>{I()!==B&&($=1,j($))});window.addEventListener("resize",be);j();
//# sourceMappingURL=index.js.map
