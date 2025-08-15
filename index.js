import"./assets/styles-BIzYtEVP.js";const E="https://tasty-treats-backend.p.goit.global/api";async function X(){return await(await fetch(`${E}/categories`)).json()}async function N({category:e="",page:t=1,limit:n=6,time:r="",area:s="",ingredient:i=""}={}){const a=new URL(`${E}/recipes`);return e&&a.searchParams.append("category",e),t&&a.searchParams.append("page",t),n&&a.searchParams.append("limit",n),r&&a.searchParams.append("time",r),s&&a.searchParams.append("area",s),i&&a.searchParams.append("ingredient",i),await(await fetch(a)).json()}async function Q(){return await(await fetch(`${E}/recipes/popular`)).json()}async function Z(){return await(await fetch(`${E}/ingredients`)).json()}async function P(){return await(await fetch(`${E}/areas`)).json()}const b=document.querySelector("#recipes-container"),B=document.querySelector("#pagination"),H=document.querySelector("#category-list"),w=document.querySelector(".categories-box");let u=1,U=1,v=null,C=j();function j(){const e=window.innerWidth;return e<768?6:e<1280?8:9}async function ee(){try{const t=(await X()).map(r=>`
        <li>
          <button 
            class="category-btn ${r.name===v?"active":""}" 
            data-category="${r.name}">
            ${r.name}
          </button>
        </li>`).join("");H.innerHTML=t;const n=H.querySelectorAll(".category-btn");n.forEach(r=>{r.addEventListener("click",()=>{const s=r.dataset.category;s!==v&&(v=s,u=1,n.forEach(i=>i.classList.remove("active")),w.classList.remove("active"),r.classList.add("active"),M(u))})})}catch(e){console.error("Failed to load categories:",e)}}w&&w.addEventListener("click",()=>{v!==null&&(v=null,u=1,H.querySelectorAll(".category-btn").forEach(t=>t.classList.remove("active")),w.classList.add("active"),M(u))});async function M(e=1){try{C=j();const t=await N({page:e,limit:C,category:v||void 0}),n=t.results;if(U=t.totalPages||Math.ceil(t.totalResults/C),!n||n.length===0){b.innerHTML="<p>No recipes found to display.</p>",B.innerHTML="";return}const r=n.map(s=>{const i=s.rating/5*100;return`
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
        </div>`}).join("");b.innerHTML=`<div class="recipes-list">${r}</div>`,te(U,e),v?b.classList.add("category-selected"):b.classList.remove("category-selected")}catch(t){console.error("An error occurred while loading recipes:",t),b.innerHTML="<p>The recipes could not be loaded. Please try again later.</p>",B.innerHTML=""}}function te(e,t){let n="";for(let s=1;s<=e;s++)n+=`<button class="pagination-btn ${s===t?"active":""}" data-page="${s}">${s}</button>`;B.innerHTML=n,B.querySelectorAll(".pagination-btn").forEach(s=>{s.addEventListener("click",()=>{const i=Number(s.dataset.page);i!==u&&(u=i,M(u))})})}window.addEventListener("resize",()=>{j()!==C&&(u=1,M(u))});w&&w.classList.add("active");ee();M();const x=document.querySelector(".popular-recipe-wrapper");console.log(Q());async function ne(){try{x.innerHTML="<p>Loading recipes...</p>";const e=await Q();if(!e||e.length===0){x.innerHTML="<p>No popular recipes found!</p>";return}const t=e.map(n=>`
    <div class="popular-recipes-card" data-id="${n._id}">
    <img class="popular-recipes-image" src="${n.preview}" alt="${n.title}" />
    <div class="popular-recipes-info">
    <h3 class="popular-recipes-title recipe-title">${n.title}</h3>
      <p class="popular-recipes-description popular-recipe-text ">${n.description}</p>
      </div>
    </div>
  `).join("");x.innerHTML=t}catch(e){console.error("Failed to fetch popular recipes:",e),x.innerHTML="<p>Sorry, we could not load the recipes at this time</p>"}}ne();const l=document.querySelector(".filters");l||console.warn("[filters] .filters bulunamadı.");const d=document.getElementById("pagination-filters")||document.getElementById("pagination"),o={search:l==null?void 0:l.querySelector(".filter-input"),searchBtn:l==null?void 0:l.querySelector(".search-btn"),resetBtn:l==null?void 0:l.querySelector(".reset-filter"),dropdowns:[...(l==null?void 0:l.querySelectorAll(".custom-dropdown"))??[]],recipes:document.getElementById("recipes-flex")},f={grid:document.getElementById("recipes-container"),pagination:document.getElementById("pagination")},q=!!o.recipes,c={query:"",time:"",area:"",ingredient:"",ingredientLabel:"",page:1,limit:6,loading:!1},ie=["10 min","20 min","30 min","40 min"];function D(e){c.loading=e,!(!q||!o.recipes)&&e&&(o.recipes.innerHTML='<div class="recipes-loading">Loading...</div>')}const se=1e4,re=(e,t=se)=>Promise.race([e,new Promise((n,r)=>setTimeout(()=>r(new Error("REQUEST_TIMEOUT")),t))]);function ae(e){const t=String(e).match(/\d+/);return t?t[0]:""}function R(e){o.dropdowns.forEach(t=>{t!==e&&t.classList.remove("open")})}function h(e){return String(e).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function oe(){return!!(c.query||c.time||c.area||c.ingredient)}function ce(){f.grid&&(f.grid.style.display="none"),f.pagination&&(f.pagination.style.display="none"),o.recipes&&(o.recipes.style.display=""),d&&(d.style.display=""),document.dispatchEvent(new CustomEvent("filters:activate"))}function le(){o.recipes&&(o.recipes.style.display="none"),d&&(d.style.display="none"),f.grid&&(f.grid.style.display=""),f.pagination&&(f.pagination.style.display=""),document.dispatchEvent(new CustomEvent("filters:deactivate"))}function de(e,t){if(!d)return;e=Math.max(1,Number(e)||1),t=Math.min(e,Math.max(1,Number(t)||1));const n=1,r="pagination-btn arrow-btn arrow-prev",s="pagination-btn arrow-btn arrow-next";let i=`
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
  `,d.innerHTML=e<=1?"":i}function pe(e){if(!o.recipes)return;if(!(e!=null&&e.length)){o.recipes.innerHTML="";return}const t=e.map(n=>{const{_id:r,title:s="Untitled",description:i="",rating:a=0,preview:g,thumb:p}=n,m=g||p||"",T=h(s),S=h(i),O=Number(a)||0,G=Math.max(0,Math.min(100,O/5*100));return`
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
          ${S?`<p class="recipe-card-description">${S}</p>`:""}

          <div class="recipe-card-footer">
            <div class="recipe-card-rating">
              <span class="rating-value">${O.toFixed(1)}</span>
              <div class="rating-stars" style="--rating:${G}%">
                <span>★★★★★</span>
                <span class="stars-filled">★★★★★</span>
              </div>
            </div>
            <button class="recipe-card-button" type="button">See recipe</button>
          </div>
        </div>
      </div>`}).join("");o.recipes.innerHTML=t}async function k(){try{if(!oe()){le();return}ce(),D(!0);const{time:e,area:t,ingredient:n,page:r,limit:s}=c,i=await re(N({time:e,area:t,ingredient:n,page:r,limit:s})),a=Array.isArray(i==null?void 0:i.results)?i.results:Array.isArray(i)?i:Array.isArray(i==null?void 0:i.recipes)?i.recipes:[],g=c.query.toLowerCase(),p=g?a.filter(m=>String(m.title||"").toLowerCase().includes(g)):a;if(q){if(pe(p),d){const m=Number(i==null?void 0:i.totalPages)||Number(i==null?void 0:i.pageCount)||0,T=Number(i==null?void 0:i.total)||Number(i==null?void 0:i.count)||Number(i==null?void 0:i.resultsCount)||Number(i==null?void 0:i.hits)||(Array.isArray(i==null?void 0:i.results)?i.results.length:0),S=m||Math.max(1,Math.ceil((T||p.length)/(s||6)));de(S,c.page)}!p.length&&o.recipes&&(o.recipes.innerHTML='<p class="no-results">No recipes found</p>')}document.dispatchEvent(new CustomEvent("recipes:filtered",{detail:{recipes:p,paging:{page:r,limit:s},raw:i}}))}catch(e){console.error("[filters] applyFilters error:",(e==null?void 0:e.message)||e),q&&o.recipes&&(o.recipes.innerHTML=(e==null?void 0:e.message)==="REQUEST_TIMEOUT"?'<p class="no-results">İstek zaman aşımına uğradı. Lütfen tekrar deneyin.</p>':'<p class="no-results">Bir şeyler ters gitti. Lütfen tekrar deneyin.</p>'),document.dispatchEvent(new CustomEvent("recipes:filtered",{detail:{recipes:[],error:!0,reason:(e==null?void 0:e.message)||String(e)}}))}finally{D(!1)}}async function ue(){y("time",ie.map(e=>({value:ae(e),label:e})));try{const e=await P(),t=(Array.isArray(e)?e:[]).map(n=>typeof n=="string"?n:n==null?void 0:n.name).filter(Boolean).map(n=>({value:n,label:n}));y("area",t)}catch(e){console.error("Areas yüklenemedi",e),y("area",[])}try{const e=await Z(),t=(Array.isArray(e)?e:[]).filter(n=>(n==null?void 0:n._id)&&(n==null?void 0:n.name)).map(n=>({value:n._id,label:n.name}));y("ingredient",t)}catch(e){console.error("Ingredients yüklenemedi",e),y("ingredient",[])}}function y(e,t){const n=o.dropdowns.find(i=>i.dataset.type===e);if(!n)return;const r=n.querySelector(".dropdown-menu"),s=n.querySelector(".dropdown-toggle");!r||!s||(r.innerHTML=(t||[]).map(i=>`<li><button type="button" data-value="${h(i.value)}" data-label="${h(i.label)}">${h(i.label)}</button></li>`).join(""),s.addEventListener("click",()=>{const i=!n.classList.contains("open");R(),n.classList.toggle("open",i)}),r.addEventListener("click",i=>{const a=i.target.closest("button[data-value]");if(!a)return;const g=a.getAttribute("data-value")??"",p=a.getAttribute("data-label")??a.textContent.trim();e==="time"?c.time=g:e==="area"?c.area=p:e==="ingredient"&&(c.ingredient=g,c.ingredientLabel=p),s.textContent=p,n.classList.remove("open"),c.page=1,k()}))}document.addEventListener("click",e=>{const t=e.target.closest(".custom-dropdown");if(!t)return R();o.dropdowns.forEach(n=>{n!==t&&n.classList.remove("open")})});document.addEventListener("keydown",e=>{e.key==="Escape"&&R()});function ge(){if(!o.search||!o.searchBtn)return;const e=()=>{c.query=o.search.value.trim(),c.page=1,k()};o.searchBtn.addEventListener("click",e),o.search.addEventListener("keydown",t=>{t.key==="Enter"&&(t.preventDefault(),e())})}function fe(){o.resetBtn&&o.resetBtn.addEventListener("click",()=>{c.query="",c.time="",c.area="",c.ingredient="",c.ingredientLabel="",c.page=1,o.search&&(o.search.value=""),k()})}(async function(){try{o.recipes&&(o.recipes.classList.add("recipes-list"),o.recipes.style.display="none"),d&&(d.style.display="none"),await ue(),ge(),fe(),await k(),d&&d.addEventListener("click",t=>{const n=t.target.closest(".pagination-btn");if(!n||n.classList.contains("dots"))return;const r=parseInt(n.dataset.page,10);!isNaN(r)&&r!==c.page&&(c.page=r,k())}),document.addEventListener("click",t=>{const n=t.target.closest(".heart-btn");n&&n.classList.toggle("active")}),document.addEventListener("click",t=>{const n=t.target.closest(".recipe-card-button");if(n){const r=n.closest(".recipe-card"),s=r==null?void 0:r.dataset.id;s&&console.log("Recipe clicked:",s)}})}catch(t){console.error("[filters] init error:",t),o.recipes&&(o.recipes.innerHTML='<p class="no-results">Bir şeyler ters gitti. Lütfen tekrar deneyin.</p>')}})();const W="favoriteRecipes";function K(){try{return JSON.parse(localStorage.getItem(W))||[]}catch{return[]}}function V(e){localStorage.setItem(W,JSON.stringify(e))}function ve(e){const t=K();if(t.some(r=>r._id===e._id)){const r=t.filter(s=>s._id!==e._id);V(r)}else t.push(e),V(t)}function me(e){return K().some(n=>n._id===e)}const _=document.querySelector("#recipes-container"),I=document.querySelector("#pagination");let $=[],L=1,J=1,A=z();function we(e){const t=e.rating/5*100,n=me(e._id)?"active":"";return`
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
              <span>★★★★★</span><span class="stars-filled">★★★★★</span>
            </div>
          </div>
          <button class="recipe-card-button" type="button">See recipe</button>
        </div>
      </div>
    </div>`}function Y(){if(!$||$.length===0)return;const e=$.map(we).join("");_.innerHTML=e}async function F(e=1){try{A=z();const t=await N({page:e,limit:A});$=t.results,J=t.totalPages||Math.ceil(t.totalResults/A),Y(),be(J,e)}catch(t){console.error("An error occurred while loading recipes:",t),_.innerHTML="<p>The recipes could not be loaded. Please try again later.</p>",I.innerHTML=""}}_.addEventListener("click",e=>{const t=e.target.closest(".heart-btn");if(!t)return;const r=t.closest(".recipe-card").dataset.id,s=$.find(i=>i._id===r);s&&(ve(s),Y())});I.addEventListener("click",e=>{const t=e.target.closest(".pagination-btn");if(!t||t.disabled||!t.dataset.page)return;const n=Number(t.dataset.page);n!==L&&(L=n,F(L))});function be(e,t){let n="";const s="pagination-btn arrow-btn arrow-prev",i="pagination-btn arrow-btn arrow-next";if(n+=`<button class="${s}" data-page="1" ${t===1?"disabled":""}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="11 17 6 12 11 7"></polyline><polyline points="18 17 13 12 18 7"></polyline></svg></button>`,n+=`<button class="${s}" data-page="${t-1}" ${t===1?"disabled":""}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg></button>`,e>1){t>3&&(n+='<button class="pagination-btn page-btn" data-page="1">1</button>',n+='<button class="pagination-btn dots">...</button>');for(let a=Math.max(1,t-1);a<=Math.min(e,t+1);a++)a===1&&t>3||a===e&&t<e-1-1||(n+=`<button class="pagination-btn page-btn ${a===t?"active":""}" data-page="${a}">${a}</button>`);t<e-1-1&&(n+='<button class="pagination-btn dots">...</button>',n+=`<button class="pagination-btn page-btn" data-page="${e}">${e}</button>`)}n+=`<button class="${i}" data-page="${t+1}" ${t===e?"disabled":""}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg></button>`,n+=`<button class="${i}" data-page="${e}" ${t===e?"disabled":""}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="13 17 18 12 13 7"></polyline><polyline points="6 17 11 12 6 7"></polyline></svg></button>`,I.innerHTML=n}const ye=he(()=>{z()!==A&&(L=1,F(L))});window.addEventListener("resize",ye);F();function he(e,t=250){let n;return function(...r){clearTimeout(n),n=setTimeout(()=>{e.apply(this,r)},t)}}function z(){const e=window.innerWidth;return e<768?6:e<1280?8:9}
//# sourceMappingURL=index.js.map
