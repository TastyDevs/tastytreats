import{f as G,a as _,b as J,c as X,d as Z}from"./assets/tastyTreatsApi-D_6eBPKE.js";const y=document.querySelector("#recipes-container"),B=document.querySelector("#pagination"),q=document.querySelector("#category-list"),b=document.querySelector(".categories-box");let u=1,O=1,v=null,x=R();function R(){const e=window.innerWidth;return e<768?6:e<1280?8:9}async function P(){try{const t=(await G()).map(r=>`
        <li>
          <button 
            class="category-btn ${r.name===v?"active":""}" 
            data-category="${r.name}">
            ${r.name}
          </button>
        </li>`).join("");q.innerHTML=t;const n=q.querySelectorAll(".category-btn");n.forEach(r=>{r.addEventListener("click",()=>{const s=r.dataset.category;s!==v&&(v=s,u=1,n.forEach(i=>i.classList.remove("active")),b.classList.remove("active"),r.classList.add("active"),M(u))})})}catch(e){console.error("Failed to load categories:",e)}}b&&b.addEventListener("click",()=>{v!==null&&(v=null,u=1,q.querySelectorAll(".category-btn").forEach(t=>t.classList.remove("active")),b.classList.add("active"),M(u))});async function M(e=1){try{x=R();const t=await _({page:e,limit:x,category:v||void 0}),n=t.results;if(O=t.totalPages||Math.ceil(t.totalResults/x),!n||n.length===0){y.innerHTML="<p>No recipes found to display.</p>",B.innerHTML="";return}const r=n.map(s=>{const i=s.rating/5*100;return`
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
        </div>`}).join("");y.innerHTML=`<div class="recipes-list">${r}</div>`,ee(O,e),v?y.classList.add("category-selected"):y.classList.remove("category-selected")}catch(t){console.error("An error occurred while loading recipes:",t),y.innerHTML="<p>The recipes could not be loaded. Please try again later.</p>",B.innerHTML=""}}function ee(e,t){let n="";for(let s=1;s<=e;s++)n+=`<button class="pagination-btn ${s===t?"active":""}" data-page="${s}">${s}</button>`;B.innerHTML=n,B.querySelectorAll(".pagination-btn").forEach(s=>{s.addEventListener("click",()=>{const i=Number(s.dataset.page);i!==u&&(u=i,M(u))})})}window.addEventListener("resize",()=>{R()!==x&&(u=1,M(u))});b&&b.classList.add("active");P();M();const S=document.querySelector(".popular-recipe-wrapper");console.log(J());async function te(){try{S.innerHTML="<p>Loading recipes...</p>";const e=await J();if(!e||e.length===0){S.innerHTML="<p>No popular recipes found!</p>";return}const t=e.map(n=>`
    <div class="popular-recipes-card" data-id="${n._id}">
    <img class="popular-recipes-image" src="${n.preview}" alt="${n.title}" />
    <div class="popular-recipes-info">
    <h3 class="popular-recipes-title recipe-title">${n.title}</h3>
      <p class="popular-recipes-description popular-recipe-text ">${n.description}</p>
      </div>
    </div>
  `).join("");S.innerHTML=t}catch(e){console.error("Failed to fetch popular recipes:",e),S.innerHTML="<p>Sorry, we could not load the recipes at this time</p>"}}te();const c=document.querySelector(".filters");c||console.warn("[filters] .filters bulunamadı.");const d=document.getElementById("pagination-filters")||document.getElementById("pagination"),o={search:c==null?void 0:c.querySelector(".filter-input"),searchBtn:c==null?void 0:c.querySelector(".search-btn"),resetBtn:c==null?void 0:c.querySelector(".reset-filter"),dropdowns:[...(c==null?void 0:c.querySelectorAll(".custom-dropdown"))??[]],recipes:document.getElementById("recipes-flex")},g={grid:document.getElementById("recipes-container"),pagination:document.getElementById("pagination")},N=!!o.recipes,l={query:"",time:"",area:"",ingredient:"",ingredientLabel:"",page:1,limit:6,loading:!1},ne=["10 min","20 min","30 min","40 min"];function D(e){l.loading=e,!(!N||!o.recipes)&&e&&(o.recipes.innerHTML='<div class="recipes-loading">Loading...</div>')}const ie=1e4,se=(e,t=ie)=>Promise.race([e,new Promise((n,r)=>setTimeout(()=>r(new Error("REQUEST_TIMEOUT")),t))]);function re(e){const t=String(e).match(/\d+/);return t?t[0]:""}function j(e){o.dropdowns.forEach(t=>{t!==e&&t.classList.remove("open")})}function L(e){return String(e).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function oe(){return!!(l.query||l.time||l.area||l.ingredient)}function ae(){g.grid&&(g.grid.style.display="none"),g.pagination&&(g.pagination.style.display="none"),o.recipes&&(o.recipes.style.display=""),d&&(d.style.display=""),document.dispatchEvent(new CustomEvent("filters:activate"))}function le(){o.recipes&&(o.recipes.style.display="none"),d&&(d.style.display="none"),g.grid&&(g.grid.style.display=""),g.pagination&&(g.pagination.style.display=""),document.dispatchEvent(new CustomEvent("filters:deactivate"))}function ce(e,t){if(!d)return;e=Math.max(1,Number(e)||1),t=Math.min(e,Math.max(1,Number(t)||1));const n=1,r="pagination-btn arrow-btn arrow-prev",s="pagination-btn arrow-btn arrow-next";let i=`
    <button class="${r}" data-page="1" ${t===1?"disabled":""}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="11 17 6 12 11 7"></polyline><polyline points="18 17 13 12 18 7"></polyline></svg>
    </button>
    <button class="${r}" data-page="${t-1}" ${t===1?"disabled":""}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
    </button>
  `;if(e>1){t>n+2&&(i+='<button class="pagination-btn page-btn" data-page="1">1</button>',i+='<button class="pagination-btn dots" disabled>...</button>');for(let a=Math.max(1,t-n);a<=Math.min(e,t+n);a++)a===1&&t>n+2||a===e&&t<e-n-1||(i+=`<button class="pagination-btn page-btn ${a===t?"active":""}" data-page="${a}">${a}</button>`);t<e-n-1&&(i+='<button class="pagination-btn dots" disabled>...</button>',i+=`<button class="pagination-btn page-btn" data-page="${e}">${e}</button>`)}i+=`
    <button class="${s}" data-page="${t+1}" ${t===e?"disabled":""}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
    </button>
    <button class="${s}" data-page="${e}" ${t===e?"disabled":""}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="13 17 18 12 13 7"></polyline><polyline points="6 17 11 12 6 7"></polyline></svg>
    </button>
  `,d.innerHTML=e<=1?"":i}function de(e){if(!o.recipes)return;if(!(e!=null&&e.length)){o.recipes.innerHTML="";return}const t=e.map(n=>{const{_id:r,title:s="Untitled",description:i="",rating:a=0,preview:f,thumb:p}=n,m=f||p||"",T=L(s),E=L(i),z=Number(a)||0,Y=Math.max(0,Math.min(100,z/5*100));return`
      <div class="recipe-card" data-id="${r||""}">
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
          ${E?`<p class="recipe-card-description">${E}</p>`:""}

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
      </div>`}).join("");o.recipes.innerHTML=t}async function k(){try{if(!oe()){le();return}ae(),D(!0);const{time:e,area:t,ingredient:n,page:r,limit:s}=l,i=await se(_({time:e,area:t,ingredient:n,page:r,limit:s})),a=Array.isArray(i==null?void 0:i.results)?i.results:Array.isArray(i)?i:Array.isArray(i==null?void 0:i.recipes)?i.recipes:[],f=l.query.toLowerCase(),p=f?a.filter(m=>String(m.title||"").toLowerCase().includes(f)):a;if(N){if(de(p),d){const m=Number(i==null?void 0:i.totalPages)||Number(i==null?void 0:i.pageCount)||0,T=Number(i==null?void 0:i.total)||Number(i==null?void 0:i.count)||Number(i==null?void 0:i.resultsCount)||Number(i==null?void 0:i.hits)||(Array.isArray(i==null?void 0:i.results)?i.results.length:0),E=m||Math.max(1,Math.ceil((T||p.length)/(s||6)));ce(E,l.page)}!p.length&&o.recipes&&(o.recipes.innerHTML='<p class="no-results">No recipes found</p>')}document.dispatchEvent(new CustomEvent("recipes:filtered",{detail:{recipes:p,paging:{page:r,limit:s},raw:i}}))}catch(e){console.error("[filters] applyFilters error:",(e==null?void 0:e.message)||e),N&&o.recipes&&(o.recipes.innerHTML=(e==null?void 0:e.message)==="REQUEST_TIMEOUT"?'<p class="no-results">İstek zaman aşımına uğradı. Lütfen tekrar deneyin.</p>':'<p class="no-results">Bir şeyler ters gitti. Lütfen tekrar deneyin.</p>'),document.dispatchEvent(new CustomEvent("recipes:filtered",{detail:{recipes:[],error:!0,reason:(e==null?void 0:e.message)||String(e)}}))}finally{D(!1)}}async function pe(){w("time",ne.map(e=>({value:re(e),label:e})));try{const e=await X(),t=(Array.isArray(e)?e:[]).map(n=>typeof n=="string"?n:n==null?void 0:n.name).filter(Boolean).map(n=>({value:n,label:n}));w("area",t)}catch(e){console.error("Areas yüklenemedi",e),w("area",[])}try{const e=await Z(),t=(Array.isArray(e)?e:[]).filter(n=>(n==null?void 0:n._id)&&(n==null?void 0:n.name)).map(n=>({value:n._id,label:n.name}));w("ingredient",t)}catch(e){console.error("Ingredients yüklenemedi",e),w("ingredient",[])}}function w(e,t){const n=o.dropdowns.find(i=>i.dataset.type===e);if(!n)return;const r=n.querySelector(".dropdown-menu"),s=n.querySelector(".dropdown-toggle");!r||!s||(r.innerHTML=(t||[]).map(i=>`<li><button type="button" data-value="${L(i.value)}" data-label="${L(i.label)}">${L(i.label)}</button></li>`).join(""),s.addEventListener("click",()=>{const i=!n.classList.contains("open");j(),n.classList.toggle("open",i)}),r.addEventListener("click",i=>{const a=i.target.closest("button[data-value]");if(!a)return;const f=a.getAttribute("data-value")??"",p=a.getAttribute("data-label")??a.textContent.trim();e==="time"?l.time=f:e==="area"?l.area=p:e==="ingredient"&&(l.ingredient=f,l.ingredientLabel=p),s.textContent=p,n.classList.remove("open"),l.page=1,k()}))}document.addEventListener("click",e=>{const t=e.target.closest(".custom-dropdown");if(!t)return j();o.dropdowns.forEach(n=>{n!==t&&n.classList.remove("open")})});document.addEventListener("keydown",e=>{e.key==="Escape"&&j()});function ue(){if(!o.search||!o.searchBtn)return;const e=()=>{l.query=o.search.value.trim(),l.page=1,k()};o.searchBtn.addEventListener("click",e),o.search.addEventListener("keydown",t=>{t.key==="Enter"&&(t.preventDefault(),e())})}function ge(){o.resetBtn&&o.resetBtn.addEventListener("click",()=>{l.query="",l.time="",l.area="",l.ingredient="",l.ingredientLabel="",l.page=1,o.search&&(o.search.value=""),k()})}(async function(){try{o.recipes&&(o.recipes.classList.add("recipes-list"),o.recipes.style.display="none"),d&&(d.style.display="none"),await pe(),ue(),ge(),await k(),d&&d.addEventListener("click",t=>{const n=t.target.closest(".pagination-btn");if(!n||n.classList.contains("dots"))return;const r=parseInt(n.dataset.page,10);!isNaN(r)&&r!==l.page&&(l.page=r,k())}),document.addEventListener("click",t=>{const n=t.target.closest(".heart-btn");n&&n.classList.toggle("active")}),document.addEventListener("click",t=>{const n=t.target.closest(".recipe-card-button");if(n){const r=n.closest(".recipe-card"),s=r==null?void 0:r.dataset.id;s&&console.log("Recipe clicked:",s)}})}catch(t){console.error("[filters] init error:",t),o.recipes&&(o.recipes.innerHTML='<p class="no-results">Bir şeyler ters gitti. Lütfen tekrar deneyin.</p>')}})();const Q="favoriteRecipes";function W(){try{return JSON.parse(localStorage.getItem(Q))||[]}catch{return[]}}function U(e){localStorage.setItem(Q,JSON.stringify(e))}function fe(e){const t=W();if(t.some(r=>r._id===e._id)){const r=t.filter(s=>s._id!==e._id);U(r)}else t.push(e),U(t)}function ve(e){return W().some(n=>n._id===e)}const C=document.querySelector("#recipes-container"),H=document.querySelector("#pagination");let h=[],$=1,V=1,A=F();function K(e){const t=e.rating/5*100,n=ve(e._id)?"active":"";return`
    <div class="recipe-card" data-id="${e._id}">
      <button class="heart-btn ${n}" aria-label="Add to favorites">
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
            <div class="rating-stars" style="--rating: ${t}%">
              <span>★★★★★</span>
              <span class="stars-filled">★★★★★</span>
            </div>
          </div>
          <button class="recipe-card-button" type="button">See recipe</button>
        </div>
      </div>
    </div>`}async function I(e=1){try{A=F();const t=await _({page:e,limit:A});if(h=t.results,V=t.totalPages||Math.ceil(t.totalResults/A),!h||h.length===0){C.innerHTML="<p>No recipes found to display.</p>",H.innerHTML="";return}const n=h.map(r=>K(r)).join("");C.innerHTML=n,me(V,e)}catch(t){console.error("An error occurred while loading recipes:",t),C.innerHTML="<p>The recipes could not be loaded. Please try again later.</p>",H.innerHTML=""}}C.addEventListener("click",e=>{const t=e.target.closest(".heart-btn");if(!t)return;const n=t.closest(".recipe-card"),r=n.dataset.id,s=h.find(a=>a._id===r);if(!s)return;fe(s);const i=K(s);n.outerHTML=i});H.addEventListener("click",e=>{const t=e.target.closest(".pagination-btn");if(!t||t.disabled||!t.dataset.page)return;const n=Number(t.dataset.page);n!==$&&($=n,I($))});function me(e,t){let n="";const s="pagination-btn arrow-btn arrow-prev",i="pagination-btn arrow-btn arrow-next";if(n+=`<button class="${s}" data-page="1" ${t===1?"disabled":""}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="11 17 6 12 11 7"></polyline><polyline points="18 17 13 12 18 7"></polyline></svg></button>`,n+=`<button class="${s}" data-page="${t-1}" ${t===1?"disabled":""}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg></button>`,e>1){t>3&&(n+='<button class="pagination-btn page-btn" data-page="1">1</button>',n+='<button class="pagination-btn dots">...</button>');for(let a=Math.max(1,t-1);a<=Math.min(e,t+1);a++)a===1&&t>3||a===e&&t<e-1-1||(n+=`<button class="pagination-btn page-btn ${a===t?"active":""}" data-page="${a}">${a}</button>`);t<e-1-1&&(n+='<button class="pagination-btn dots">...</button>',n+=`<button class="pagination-btn page-btn" data-page="${e}">${e}</button>`)}n+=`<button class="${i}" data-page="${t+1}" ${t===e?"disabled":""}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg></button>`,n+=`<button class="${i}" data-page="${e}" ${t===e?"disabled":""}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="13 17 18 12 13 7"></polyline><polyline points="6 17 11 12 6 7"></polyline></svg></button>`,H.innerHTML=n}const be=ye(()=>{F()!==A&&($=1,I($))});window.addEventListener("resize",be);I();function ye(e,t=250){let n;return function(...r){clearTimeout(n),n=setTimeout(()=>{e.apply(this,r)},t)}}function F(){const e=window.innerWidth;return e<768?6:e<1280?8:9}
//# sourceMappingURL=index.js.map
