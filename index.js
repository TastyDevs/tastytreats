import"./assets/footer-C5yPIsGx.js";const V=document.querySelectorAll(".home-slides"),ve=document.querySelectorAll(".home-dot"),_=document.createElement("div");_.classList.add("home-popup");_.innerHTML=`
  <div class="home-popup-content">
    <span class="home-popup-close">&times;</span>
    <h2>ORDER NOW</h2>
    <form class="home-popup-form">
      <label for="name">Name</label>
      <input type="text" id="name" name="name"  required />
      <label for="phone">Phone number</label>
      <input type="tel" id="phone" name="phone"  required />
      <label for="email">Email</label>
      <input type="email" id="email" name="email"  required />
      <label for="comment">Comment</label>
      <textarea id="comment" name="comment" ></textarea>
      <button type="submit">Send</button>
    </form>
  </div>
`;document.body.appendChild(_);function Re(){_.style.display="flex"}function he(){_.style.display="none"}const Ie=document.querySelector(".home-hero-btn");Ie.addEventListener("click",Re);const Ne=_.querySelector(".home-popup-close");Ne.addEventListener("click",he);_.addEventListener("click",e=>{e.target===_&&he()});let y=0;function Y(e){V.forEach((t,i)=>{t.classList.toggle("active",i===e)}),ve.forEach((t,i)=>{t.classList.toggle("active",i===e)})}ve.forEach((e,t)=>{e.addEventListener("click",()=>{y=t,Y(y)})});const He=document.querySelectorAll(".home-slide-partial"),ze=document.querySelectorAll(".home-slide.small");He.forEach(e=>{e.addEventListener("click",()=>{y=(y+1)%V.length,Y(y)})});ze.forEach(e=>{e.addEventListener("click",()=>{y=(y-1+V.length)%V.length,Y(y)})});Y(y);const z="https://tasty-treats-backend.p.goit.global/api";async function Fe(){return await(await fetch(`${z}/categories`)).json()}async function $({category:e="",page:t=1,limit:i=6,time:r="",area:a="",ingredient:n=""}={}){const s=new URL(`${z}/recipes`);return e&&s.searchParams.append("category",e),t&&s.searchParams.append("page",t),i&&s.searchParams.append("limit",i),r&&s.searchParams.append("time",r),a&&s.searchParams.append("area",a),n&&s.searchParams.append("ingredient",n),await(await fetch(s)).json()}async function je(){return await(await fetch(`${z}/recipes/popular`)).json()}async function Oe(){return await(await fetch(`${z}/ingredients`)).json()}async function De(){return await(await fetch(`${z}/areas`)).json()}const Q="favoriteRecipes";function X(){const e=localStorage.getItem(Q);return e?JSON.parse(e):[]}function Ue(e){const t=X();t.some(i=>i._id===e._id)||(t.push(e),localStorage.setItem(Q,JSON.stringify(t)))}function Ve(e){let t=X();t=t.filter(i=>i._id!==e),localStorage.setItem(Q,JSON.stringify(t))}function K(e){return X().some(i=>i._id===e)}function Je(e){K(e._id)?Ve(e._id):Ue(e)}const ce=document.querySelector("#recipes-container"),M=document.querySelector("#pagination"),J=document.querySelector("#category-list"),T=document.querySelector(".categories-box");let de=[],g=1,E=1,x=null,A=Z();function We(e){const t=e.rating/5*100,i=K(e._id)?"active":"";return`
    <div class="recipe-card" data-id="${e._id}">
      <button class="heart-btn ${i}" aria-label="Add to favorites">
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
    </div>`}function Ye(e,t){if(!e||e.length===0){t.innerHTML="<p>No recipes found to display.</p>";return}const i=e.map(We).join("");t.innerHTML=i,t.querySelectorAll(".heart-btn").forEach(r=>{r.addEventListener("click",()=>{const n=r.closest(".recipe-card").dataset.id,s=e.find(c=>c._id===n);s&&(Je(s),r.classList.toggle("active"),s.isFavorite=K(n))})}),t.querySelectorAll(".recipe-card-button").forEach(r=>{r.addEventListener("click",()=>{const n=r.closest(".recipe-card").dataset.id;console.log(`Open recipe details for: ${n}`)})})}const j={first:"<<",prev:"<",next:">",last:">>"};function Ke(e,t){if(!M||(M.innerHTML="",e<=1))return;const i=document.createDocumentFragment(),r=(c,d,m=!1)=>{const h=document.createElement("button");return h.innerHTML=c,h.className=d,m&&(h.disabled=!0),h};i.appendChild(r(j.first,"pagination-btn first",t===1)),i.appendChild(r(j.prev,"pagination-btn prev",t===1));const a=new Set([1,e,t]);t>1&&a.add(t-1),t<e&&a.add(t+1);const n=Array.from(a).filter(c=>c>0&&c<=e).sort((c,d)=>c-d);let s=0;for(const c of n){if(s&&c>s+1){const m=document.createElement("span");m.textContent="...",m.className="pagination-ellipsis",i.appendChild(m)}const d=r(c,"pagination-btn number");c===t&&d.classList.add("active"),i.appendChild(d),s=c}i.appendChild(r(j.next,"pagination-btn next",t===e)),i.appendChild(r(j.last,"pagination-btn last",t===e)),M.appendChild(i)}async function F(e=1){try{A=Z();const t=x?await $({category:x,page:1,limit:1e3}):await $({page:1,limit:1e3}),i=t.totalResults||t.results.length,r=x?await $({page:e,limit:A,category:x}):await $({page:e,limit:A});E=Math.ceil(i/A),g=e>E?E:e,de=(r.results||[]).map(a=>({...a,isFavorite:K(a._id)})),Ye(de,ce),Ke(E,g)}catch(t){console.error("Error loading recipes:",t),ce.innerHTML="<p>Recipes could not be loaded.</p>",M.innerHTML=""}}async function Ge(){try{const e=await Fe();J.innerHTML=e.map(t=>`
      <li><button class="category-btn ${t.name===x?"active":""}" data-category="${t.name}">${t.name}</button></li>
    `).join("")}catch(e){console.error("Failed to load categories:",e)}}J.addEventListener("click",e=>{const t=e.target.closest(".category-btn");t&&(x=t.dataset.category,g=1,J.querySelectorAll(".category-btn").forEach(i=>i.classList.remove("active")),T&&T.classList.remove("active"),t.classList.add("active"),F(g))});T&&T.addEventListener("click",()=>{x=null,g=1,T.classList.add("active"),J.querySelectorAll(".category-btn").forEach(e=>e.classList.remove("active")),F(g)});M.addEventListener("click",e=>{const t=e.target.closest("button");if(!t)return;let i=g;switch(!0){case t.classList.contains("first"):i=1;break;case t.classList.contains("prev"):i=g-1;break;case t.classList.contains("next"):i=g+1;break;case t.classList.contains("last"):i=E;break;case t.classList.contains("number"):i=Number(t.textContent);break}i>=1&&i<=E&&(g=i,F(g))});window.addEventListener("resize",Qe(()=>{Z()!==A&&(g=1,F(g))}));Ge();F();function Qe(e,t=250){let i;return function(...r){clearTimeout(i),i=setTimeout(()=>e.apply(this,r),t)}}function Z(){const e=window.innerWidth;return e>=1440?16:e>=1280&&e<1440?9:e>=768&&e<1280?8:6}const O=document.querySelector(".popular-recipe-wrapper");async function Xe(){try{O.innerHTML="<p>Loading recipes...</p>";const e=await je();if(!e||e.length===0){O.innerHTML="<p>No popular recipes found!</p>";return}const t=e.map(i=>`
    <div class="popular-recipes-card" data-id="${i._id}">
    <img class="popular-recipes-image" src="${i.preview}" alt="${i.title}" />
    <div class="popular-recipes-info">
    <h3 class="popular-recipes-title recipe-title">${i.title}</h3>
      <p class="popular-recipes-description popular-recipe-text ">${i.description}</p>
      </div>
    </div>
  `).join("");O.innerHTML=t}catch(e){console.error("Failed to fetch popular recipes:",e),O.innerHTML="<p>Sorry, we could not load the recipes at this time</p>"}}Xe();const f=document.querySelector(".filters");f||console.warn("[filters] .filters bulunamadı.");const v=document.getElementById("pagination-filters")||document.getElementById("pagination"),l={search:f==null?void 0:f.querySelector(".filter-input"),searchBtn:f==null?void 0:f.querySelector(".search-btn"),resetBtn:f==null?void 0:f.querySelector(".reset-filter"),dropdowns:[...(f==null?void 0:f.querySelectorAll(".custom-dropdown"))??[]],recipes:document.getElementById("recipes-flex")},w={grid:document.getElementById("recipes-container"),pagination:document.getElementById("pagination")},G=!!l.recipes,o={query:"",time:"",area:"",ingredient:"",ingredientLabel:"",page:1,limit:6,loading:!1,lastItems:[],favs:new Set},be="tt:favorites",Ze=()=>{try{return new Set(JSON.parse(localStorage.getItem(be)||"[]"))}catch{return new Set}},ye=e=>{localStorage.setItem(be,JSON.stringify([...e]))},we=e=>o.favs.has(e),Pe=e=>{if(!e)return null;const t=o.favs.has(e);return t?o.favs.delete(e):o.favs.add(e),ye(o.favs),!t};o.favs=Ze();function et(){const e=[...o.favs].filter(t=>t&&t!=="null"&&t!=="undefined");e.length!==o.favs.size&&(o.favs=new Set(e),ye(o.favs))}function _e(e=document){e.querySelectorAll(".heart-btn").forEach(i=>{var n,s;const r=(s=(n=i.closest("[data-id]"))==null?void 0:n.dataset.id)==null?void 0:s.trim(),a=!!r&&we(r);i.classList.toggle("active",a)})}et();const tt=["10 min","20 min","30 min","40 min"];function pe(e){o.loading=e,!(!G||!l.recipes)&&e&&(l.recipes.innerHTML='<div class="recipes-loading">Loading...</div>')}const it=1e4,nt=(e,t=it)=>Promise.race([e,new Promise((i,r)=>setTimeout(()=>r(new Error("REQUEST_TIMEOUT")),t))]);function rt(e){const t=String(e).match(/\d+/);return t?t[0]:""}function P(e){l.dropdowns.forEach(t=>{t!==e&&t.classList.remove("open")})}function q(e){return String(e).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function xe(){const e=window.innerWidth;return e>=1440?16:e>=1280?9:e>=768?8:6}function at(){return!!(o.query||o.time||o.area||o.ingredient)}function st(){w.grid&&(w.grid.style.display="none"),w.pagination&&(w.pagination.style.display="none"),l.recipes&&(l.recipes.style.display=""),v&&(v.style.display=""),document.dispatchEvent(new CustomEvent("filters:activate"))}function ot(){l.recipes&&(l.recipes.style.display="none"),v&&(v.style.display="none"),w.grid&&(w.grid.style.display=""),w.pagination&&(w.pagination.style.display=""),document.dispatchEvent(new CustomEvent("filters:deactivate"))}function lt(e,t){if(!v)return;e=Math.max(1,Number(e)||1),t=Math.min(e,Math.max(1,Number(t)||1));const i=1,r="pagination-btn arrow-btn arrow-prev",a="pagination-btn arrow-btn arrow-next";let n=`
    <button class="${r}" data-page="1" ${t===1?"disabled":""}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="11 17 6 12 11 7"></polyline><polyline points="18 17 13 12 18 7"></polyline></svg>
    </button>
    <button class="${r}" data-page="${t-1}" ${t===1?"disabled":""}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
    </button>
  `;if(e>1){t>i+2&&(n+='<button class="pagination-btn page-btn" data-page="1">1</button>',n+='<button class="pagination-btn dots" disabled>...</button>');for(let s=Math.max(1,t-i);s<=Math.min(e,t+i);s++)s===1&&t>i+2||s===e&&t<e-i-1||(n+=`<button class="pagination-btn page-btn ${s===t?"active":""}" data-page="${s}">${s}</button>`);t<e-i-1&&(n+='<button class="pagination-btn dots" disabled>...</button>',n+=`<button class="pagination-btn page-btn" data-page="${e}">${e}</button>`)}n+=`
    <button class="${a}" data-page="${t+1}" ${t===e?"disabled":""}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
    </button>
    <button class="${a}" data-page="${e}" ${t===e?"disabled":""}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="13 17 18 12 13 7"></polyline><polyline points="6 17 11 12 6 7"></polyline></svg>
    </button>
  `,v.innerHTML=e<=1?"":n}function Le(e){if(!l.recipes)return;const t=xe(),i=Array.isArray(e)?e.slice(0,t):[];if(!i.length){l.recipes.innerHTML="";return}const r=i.map(a=>{const{_id:n,title:s="Untitled",description:c="",rating:d=0,preview:m,thumb:h}=a,k=m||h||"",se=q(s),oe=q(c),le=Number(d)||0,qe=Math.max(0,Math.min(100,le/5*100)),Be=we(n)?"active":"";return`
      <div class="recipe-card" data-id="${n||""}">
        <button class="heart-btn ${Be}" aria-label="Add to favorites">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22"
               viewBox="0 0 24 24" fill="none" stroke="currentColor"
               stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
          </svg>
        </button>

        ${k?`<img class="recipe-card-image" src="${k}" alt="${se}" loading="lazy">`:""}

        <div class="recipe-card-details">
          <h3 class="recipe-card-title">${se}</h3>
          ${oe?`<p class="recipe-card-description">${oe}</p>`:""}

          <div class="recipe-card-footer">
            <div class="recipe-card-rating">
              <span class="rating-value">${le.toFixed(1)}</span>
              <div class="rating-stars" style="--rating:${qe}%">
                <span>★★★★★</span>
                <span class="stars-filled">★★★★★</span>
              </div>
            </div>
            <button class="recipe-card-button" type="button">See recipe</button>
          </div>
        </div>
      </div>`}).join("");l.recipes.innerHTML=r,_e(l.recipes)}async function N(){try{if(!at()){ot();return}st(),pe(!0);const e=xe();o.limit=e;const{time:t,area:i,ingredient:r,page:a}=o,n=await nt($({time:t,area:i,ingredient:r,page:a,limit:e})),s=Array.isArray(n==null?void 0:n.results)?n.results:Array.isArray(n)?n:Array.isArray(n==null?void 0:n.recipes)?n.recipes:[],c=o.query.toLowerCase(),d=c?s.filter(m=>String(m.title||"").toLowerCase().includes(c)):s;if(o.lastItems=d,G){if(Le(d.slice(0,e)),v){const m=Number(n==null?void 0:n.totalPages)||Number(n==null?void 0:n.pageCount)||0,h=Number(n==null?void 0:n.total)||Number(n==null?void 0:n.count)||Number(n==null?void 0:n.resultsCount)||Number(n==null?void 0:n.hits)||(Array.isArray(n==null?void 0:n.results)?n.results.length:0),k=m||Math.max(1,Math.ceil((h||d.length)/e));lt(k,o.page)}!d.length&&l.recipes&&(l.recipes.innerHTML='<p class="no-results">No recipes found</p>')}document.dispatchEvent(new CustomEvent("recipes:filtered",{detail:{recipes:d,paging:{page:a,limit:e},raw:n}}))}catch(e){console.error("[filters] applyFilters error:",(e==null?void 0:e.message)||e),G&&l.recipes&&(l.recipes.innerHTML=(e==null?void 0:e.message)==="REQUEST_TIMEOUT"?'<p class="no-results">İstek zaman aşımına uğradı. Lütfen tekrar deneyin.</p>':'<p class="no-results">Bir şeyler ters gitti. Lütfen tekrar deneyin.</p>'),document.dispatchEvent(new CustomEvent("recipes:filtered",{detail:{recipes:[],error:!0,reason:(e==null?void 0:e.message)||String(e)}}))}finally{pe(!1)}}async function ct(){C("time",tt.map(e=>({value:rt(e),label:e})));try{const e=await De(),t=(Array.isArray(e)?e:[]).map(i=>typeof i=="string"?i:i==null?void 0:i.name).filter(Boolean).map(i=>({value:i,label:i}));C("area",t)}catch(e){console.error("Areas yüklenemedi",e),C("area",[])}try{const e=await Oe(),t=(Array.isArray(e)?e:[]).filter(i=>(i==null?void 0:i._id)&&(i==null?void 0:i.name)).map(i=>({value:i._id,label:i.name}));C("ingredient",t)}catch(e){console.error("Ingredients yüklenemedi",e),C("ingredient",[])}}function C(e,t){const i=l.dropdowns.find(n=>n.dataset.type===e);if(!i)return;const r=i.querySelector(".dropdown-menu"),a=i.querySelector(".dropdown-toggle");!r||!a||(r.innerHTML=(t||[]).map(n=>`<li><button type="button" data-value="${q(n.value)}" data-label="${q(n.label)}">${q(n.label)}</button></li>`).join(""),a.addEventListener("click",()=>{const n=!i.classList.contains("open");P(),i.classList.toggle("open",n)}),r.addEventListener("click",n=>{const s=n.target.closest("button[data-value]");if(!s)return;const c=s.getAttribute("data-value")??"",d=s.getAttribute("data-label")??s.textContent.trim();e==="time"?o.time=c:e==="area"?o.area=d:e==="ingredient"&&(o.ingredient=c,o.ingredientLabel=d),a.textContent=d,i.classList.remove("open"),o.page=1,N()}))}document.addEventListener("click",e=>{const t=e.target.closest(".custom-dropdown");if(!t)return P();l.dropdowns.forEach(i=>{i!==t&&i.classList.remove("open")})});document.addEventListener("keydown",e=>{e.key==="Escape"&&P()});function dt(){if(!l.search||!l.searchBtn)return;const e=()=>{o.query=l.search.value.trim(),o.page=1,N()};l.searchBtn.addEventListener("click",e),l.search.addEventListener("keydown",t=>{t.key==="Enter"&&(t.preventDefault(),e())})}const ke={};(l.dropdowns||[]).forEach(e=>{const t=e.dataset.type,i=e.querySelector(".dropdown-toggle");t&&i&&(ke[t]=i.getAttribute("data-default")||i.textContent.trim())});function pt(){l.resetBtn&&l.resetBtn.addEventListener("click",()=>{o.query="",o.time="",o.area="",o.ingredient="",o.ingredientLabel="",o.page=1,l.search&&(l.search.value=""),(l.dropdowns||[]).forEach(e=>{const t=e.dataset.type,i=e.querySelector(".dropdown-toggle"),r=e.querySelector(".dropdown-menu");i&&(i.textContent=ke[t]||"Select"),r==null||r.querySelectorAll(".selected").forEach(a=>a.classList.remove("selected")),e.classList.remove("open")}),N()})}(async function(){var t;try{l.recipes&&(l.recipes.classList.add("recipes-list"),l.recipes.style.display="none"),v&&(v.style.display="none"),await ct(),dt(),pt(),await N(),_e(),v&&v.addEventListener("click",i=>{const r=i.target.closest(".pagination-btn");if(!r||r.classList.contains("dots"))return;const a=parseInt(r.dataset.page,10);!isNaN(a)&&a!==o.page&&(o.page=a,N())}),document.addEventListener("click",i=>{var c;const r=i.target.closest(".heart-btn");if(!r)return;const a=r.closest("[data-id]"),n=(c=a==null?void 0:a.dataset.id)==null?void 0:c.trim();if(!n){console.warn("[favorites] data-id bulunamadı; işlem yapılmadı.");return}const s=Pe(n);s!==null&&r.classList.toggle("active",s)}),(t=document.querySelector('.nav-link[href="./favorites.html"]'))==null||t.addEventListener("click",()=>{console.log("Favorites link clicked, redirecting...")}),document.addEventListener("click",i=>{const r=i.target.closest(".recipe-card-button");if(r){const a=r.closest(".recipe-card"),n=a==null?void 0:a.dataset.id;n&&console.log("Recipe clicked:",n)}}),window.addEventListener("resize",()=>{var i;(i=o.lastItems)!=null&&i.length&&Le(o.lastItems)})}catch(i){console.error("[filters] init error:",i),l.recipes&&(l.recipes.innerHTML='<p class="no-results">Bir şeyler ters gitti. Lütfen tekrar deneyin.</p>')}})();const $e="favoriteRecipes";function Ee(){try{return JSON.parse(localStorage.getItem($e))||[]}catch{return[]}}function ue(e){localStorage.setItem($e,JSON.stringify(e))}function Se(e){const t=Ee();if(t.some(r=>r._id===e._id)){const r=t.filter(a=>a._id!==e._id);ue(r)}else t.push(e),ue(t)}function S(e){return Ee().some(i=>i._id===e)}const ee=document.querySelector("#recipes-container"),te=document.querySelector("#pagination");let B=[],R=1,me=1,U=ne();function ut(e){const t=e.rating/5*100,i=S(e._id)?"active":"";return`
    <div class="recipe-card" data-id="${e._id}">
      <button class="heart-btn ${i}" aria-label="Add to favorites">
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
    </div>`}function Ce(){if(!B||B.length===0)return;const e=B.map(ut).join("");ee.innerHTML=e}async function ie(e=1){try{U=ne();const t=await $({page:e,limit:U});B=t.results,me=t.totalPages||Math.ceil(t.totalResults/U),Ce(),mt(me,e)}catch(t){console.error("An error occurred while loading recipes:",t),ee.innerHTML="<p>The recipes could not be loaded. Please try again later.</p>",te.innerHTML=""}}ee.addEventListener("click",e=>{const t=e.target.closest(".heart-btn");if(!t)return;const r=t.closest(".recipe-card").dataset.id,a=B.find(n=>n._id===r);a&&(Se(a),Ce())});te.addEventListener("click",e=>{const t=e.target.closest(".pagination-btn");if(!t||t.disabled||!t.dataset.page)return;const i=Number(t.dataset.page);i!==R&&(R=i,ie(R))});function mt(e,t){let i="";const a="pagination-btn arrow-btn arrow-prev",n="pagination-btn arrow-btn arrow-next";if(i+=`<button class="${a}" data-page="1" ${t===1?"disabled":""}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="11 17 6 12 11 7"></polyline><polyline points="18 17 13 12 18 7"></polyline></svg></button>`,i+=`<button class="${a}" data-page="${t-1}" ${t===1?"disabled":""}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg></button>`,e>1){t>3&&(i+='<button class="pagination-btn page-btn" data-page="1">1</button>',i+='<button class="pagination-btn dots">...</button>');for(let s=Math.max(1,t-1);s<=Math.min(e,t+1);s++)s===1&&t>3||s===e&&t<e-1-1||(i+=`<button class="pagination-btn page-btn ${s===t?"active":""}" data-page="${s}">${s}</button>`);t<e-1-1&&(i+='<button class="pagination-btn dots">...</button>',i+=`<button class="pagination-btn page-btn" data-page="${e}">${e}</button>`)}i+=`<button class="${n}" data-page="${t+1}" ${t===e?"disabled":""}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg></button>`,i+=`<button class="${n}" data-page="${e}" ${t===e?"disabled":""}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="13 17 18 12 13 7"></polyline><polyline points="6 17 11 12 6 7"></polyline></svg></button>`,te.innerHTML=i}const ft=gt(()=>{ne()!==U&&(R=1,ie(R))});window.addEventListener("resize",ft);ie();function gt(e,t=250){let i;return function(...r){clearTimeout(i),i=setTimeout(()=>{e.apply(this,r)},t)}}function ne(){const e=window.innerWidth;return e>=1440?16:e>=1280&&e<1440?9:e>=768&&e<1280?8:6}const vt="https://tasty-treats-backend.p.goit.global/api";function L(e,t=document){return t.querySelector(e)}function re(e,t={}){const i=document.createElement(e);for(const[r,a]of Object.entries(t))i.setAttribute(r,a);return i}function ht(){document.body.style.overflow="hidden"}function bt(){document.body.style.overflow=""}async function yt(e){const t=await fetch(`${vt}/recipes/${e}`);if(!t.ok)throw new Error("Recipe not found");return t.json()}const wt=`
:root{
  --rm-radius:16px; --rm-shadow:0 20px 60px rgba(0,0,0,.25);
  --rm-chip-bg:#f1f1f1; --rm-chip-text:#333;
  --rm-primary:#9dc888; --rm-dark:#111; --rm-muted:#7a7a7a; --rm-border:#e9e9e9;
  --rm-scale:1;
}
.rm.hidden{display:none;}
.rm{position:fixed; inset:0; z-index:1000; display:grid; place-items:center;}
.rm__backdrop{position:absolute; inset:0; background:rgba(0,0,0,.6); backdrop-filter:blur(2px);}
.rm__card{
  position:relative; width:531px; height:905px; background:#fff; border-radius:var(--rm-radius);
  box-shadow:var(--rm-shadow); overflow:hidden; transform:scale(var(--rm-scale)); transform-origin:center center;
  display:flex; flex-direction:column; will-change:transform;
}
.rm__close{position:absolute; top:10px; right:10px; width:36px; height:36px; border:0; border-radius:50%;
  background:#eee; cursor:pointer; font-size:16px; z-index:3;}
.rm__content{padding:18px; flex:1 1 auto; min-height:0; overflow:auto;}
.rm__title{font-weight:800; font-size:20px; letter-spacing:.2px; text-transform:uppercase; margin:0 0 10px;}
.rm__media{position:relative; width:100%; height:240px; border-radius:12px; overflow:hidden; background:#111;}
.rm__media img{position:absolute; inset:0; width:100%; height:100%; object-fit:cover;}
.rm__play{position:absolute; inset:0; display:grid; place-items:center; cursor:pointer;}
.rm__play svg{width:44px; height:44px; opacity:.95;}
.rm__player{position:absolute; inset:0; background:#000;}
.rm__player iframe{width:100%; height:100%; border:0;}
.rm__player-close{position:absolute; top:8px; right:8px; width:32px; height:32px; border:0; border-radius:50%;
  background:rgba(0,0,0,.6); color:#fff; cursor:pointer; z-index:4;}
.rm__meta{display:flex; flex-wrap:wrap; gap:8px 10px; align-items:center; margin:10px 0 6px; color:var(--rm-muted); font-size:13px;}
.rm__chips{display:flex; gap:6px; flex-wrap:wrap;}
.rm__chip{background:var(--rm-chip-bg); color:var(--rm-chip-text); border-radius:999px; padding:3px 8px; font-size:11px; font-weight:600;}
.rm__rating{display:flex; align-items:center; gap:6px;}
.rm__rating .val{font-weight:700; font-size:14px;}
.rm__stars{position:relative; font-size:16px; color:#cfcfcf; line-height:1;}
.rm__stars .filled{position:absolute; left:0; top:0; white-space:nowrap; overflow:hidden; color:#ffc700; width:var(--rating,0%);}
.rm__grid{display:grid; gap:12px; grid-template-columns:1fr; margin-top:6px;}
.rm__table{border:1px solid var(--rm-border); border-radius:12px; overflow:hidden;}
.rm__row{display:grid; grid-template-columns:1fr auto; gap:10px; padding:9px 12px; border-bottom:1px solid var(--rm-border);}
.rm__row:last-child{border-bottom:0;}
.rm__ing{font-weight:600; color:#111; font-size:14px;}
.rm__measure{color:var(--rm-muted); font-size:13px;}
.rm__instructions{margin-top:10px; color:#333; line-height:1.5; font-size:14px;}
.rm__actions{display:flex; gap:10px; flex-wrap:wrap; justify-content:flex-start; margin-top:14px;}
.rm__btn{display:inline-flex; align-items:center; gap:8px; padding:10px 16px; border-radius:999px; font-weight:700; cursor:pointer; border:1px solid transparent; font-size:14px;}
.rm__btn--primary{background:var(--rm-primary); color:#fff;}
.rm__btn--ghost{background:#fff; color:#111; border-color:var(--rm-primary);}
.rm__heart{position:absolute; top:10px; left:10px; z-index:2; background:transparent; border:0; cursor:pointer;}
.rm__heart svg{stroke:#fff; fill:rgba(255,255,255,.4); transition:.2s;}
.rm__heart.active svg{fill:#ff6b6b; stroke:#ff6b6b;}
`;function _t(){const e="rm-styles-531x905";if(document.getElementById(e))return;const t=re("style",{id:e});t.textContent=wt,document.head.appendChild(t)}function xt(){let e=L("#recipe-modal");return e||(e=re("div",{id:"recipe-modal",class:"rm hidden","aria-hidden":"true",role:"dialog","aria-modal":"true"}),e.innerHTML=`
    <div class="rm__backdrop" data-close="true"></div>
    <div class="rm__card" role="document" aria-labelledby="rm-title" style="--rm-scale:1">
      <button class="rm__close" type="button" aria-label="Close" data-close="true">✕</button>
      <div id="rm-content" class="rm__content"></div>
    </div>
  `,document.body.appendChild(e),e)}function Lt(e=[]){return Array.isArray(e)?e.slice(0,6).map(t=>{const i=typeof t=="string"?t:t.name??t.title??"";return i?`<span class="rm__chip">#${i}</span>`:""}).join(""):""}function kt(e=[]){return!Array.isArray(e)||e.length===0?'<div class="rm__row"><span class="rm__ing">Ingredients</span><span class="rm__measure">—</span></div>':e.map(t=>`
    <div class="rm__row">
      <span class="rm__ing">${t.name||t.title||"-"}</span>
      <span class="rm__measure">${t.measure||t.quantity||""}</span>
    </div>
  `).join("")}function $t(e=0){const t=Math.max(0,Math.min(5,Number(e)||0));return`
    <div class="rm__rating" style="--rating:${t/5*100}%">
      <span class="val">${t.toFixed(1)}</span>
      <div class="rm__stars"><span>★★★★★</span><span class="filled">★★★★★</span></div>
    </div>
  `}function Et(){return`
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="32" cy="32" r="30" fill="white" opacity=".9"></circle>
      <polygon points="26,20 48,32 26,44" fill="#111"></polygon>
    </svg>
  `}function St(e,t){return Array.isArray(e)?e.map(r=>`<p>${String(r).trim()}</p>`).join(""):(e||t||"No instructions.").toString().trim().replace(/\n/g,"<br>")}function Ct(e=""){try{const t=new URL(e);if(t.hostname.includes("youtu.be"))return t.pathname.slice(1);if(t.searchParams.get("v"))return t.searchParams.get("v");const i=t.pathname.match(/\/embed\/([^/?#]+)/)||t.pathname.match(/\/v\/([^/?#]+)/);return i?i[1]:null}catch{return null}}function At(e){const{_id:t,title:i,thumb:r,rating:a=0,time:n,tags:s=[],ingredients:c=[],instructions:d="",description:m="",youtube:h}=e,k=S(t)?"active":"";return`
    <h3 id="rm-title" class="rm__title">${(i||"Recipe").toUpperCase()}</h3>

    <div class="rm__media">
      <img src="${r||""}" alt="${i||"Recipe image"}" loading="lazy" />
      ${h?`<div class="rm__play" data-play="yt">${Et()}</div>`:""}
      <button class="rm__heart ${k}" aria-label="Toggle favorite" data-fav="${t}">
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
        </svg>
      </button>
    </div>

    <div class="rm__meta">
      <div class="rm__chips">${Lt(s)}</div>
      ${$t(a)}
      ${n?`<span>• ${n} min</span>`:""}
    </div>

    <div class="rm__grid">
      <div class="rm__table">
        ${kt(c)}
      </div>
    </div>

    <div class="rm__instructions">
      ${St(d,m)}
    </div>

    <div class="rm__actions">
      <button class="rm__btn rm__btn--primary" data-action="toggle-fav" data-fav="${t}">
        ${S(t)?"Remove favorite":"Add to favorite"}
      </button>
      <button class="rm__btn rm__btn--ghost" data-action="rate" data-id="${t}">
        Give a rating
      </button>
    </div>
  `}function Mt(){return`
    <h3 class="rm__title">Loading…</h3>
    <div class="rm__media"></div>
    <div class="rm__meta"></div>
    <div class="rm__table" style="height:160px;"></div>
    <div class="rm__instructions" style="height:80px;"></div>
  `}let u,D,b=null,W=null;function fe(){const e=L(".rm__card",u);if(!e)return;const t=window.innerWidth,i=window.innerHeight,r=24,a=Math.min((t-r*2)/531,(i-r*2)/905,1);e.style.setProperty("--rm-scale",String(Math.max(.5,a)))}function Tt(e){_t(),u=xt(),D=L("#rm-content",u),D.innerHTML=Mt(),u.classList.remove("hidden"),u.setAttribute("aria-hidden","false"),ht(),fe(),W=()=>fe(),window.addEventListener("resize",W),window.addEventListener("keydown",Me),yt(e).then(t=>{b=t,D.innerHTML=At(t)}).catch(t=>{console.error(t),b=null,D.innerHTML=`
        <h3 class="rm__title">Error</h3>
        <p>Recipe details could not be loaded. Please try again.</p>
        <div class="rm__actions">
          <button class="rm__btn rm__btn--primary" data-close="true">Close</button>
        </div>
      `})}function Ae(){u&&(u.classList.add("hidden"),u.setAttribute("aria-hidden","true"),L("#rm-content",u).innerHTML="",b=null,bt(),window.removeEventListener("keydown",Me),W&&window.removeEventListener("resize",W))}function Me(e){e.key==="Escape"&&Ae()}document.addEventListener("click",e=>{if(u&&!u.classList.contains("hidden")){const t=e.target;if(t.closest('[data-close="true"]')||t.closest(".rm__backdrop")){Ae();return}if(t.closest("[data-fav]")&&b){Se(b);const n=b._id,s=L(".rm__heart",u);s&&s.classList.toggle("active",S(n));const c=L('[data-action="toggle-fav"]',u);c&&(c.textContent=S(n)?"Remove favorite":"Add to favorite");const d=document.querySelector(`.recipe-card[data-id="${n}"] .heart-btn`);d&&d.classList.toggle("active",S(n));return}if(t.closest('[data-action="rate"]')){alert("Rating flow coming soon ✨");return}if(t.closest('[data-play="yt"]')&&(b!=null&&b.youtube)){const n=Ct(b.youtube);if(!n)return;const s=L(".rm__media",u);if(!s||s.querySelector(".rm__player"))return;const c=re("div",{class:"rm__player"});c.innerHTML=`
        <button class="rm__player-close" aria-label="Close video">✕</button>
        <iframe
          src="https://www.youtube.com/embed/${n}?autoplay=1&rel=0&playsinline=1"
          title="YouTube video player"
          allow="autoplay; encrypted-media; picture-in-picture"
          allowfullscreen
        ></iframe>`,s.appendChild(c);return}if(t.closest(".rm__player-close")){const n=t.closest(".rm__player");n&&n.remove();return}}});document.addEventListener("click",e=>{const t=e.target.closest(".recipe-card-button");if(!t)return;const i=t.closest(".recipe-card");if(!i)return;const r=i.dataset.id;r&&Tt(r)});function H(e,t=document){return t.querySelector(e)}function Te(e,t={}){const i=document.createElement(e);for(const[r,a]of Object.entries(t))i.setAttribute(r,a);return i}const qt=`
.rmini.hidden{display:none;}
.rmini{position:fixed; inset:0; z-index:1200; display:grid; place-items:center;}
.rmini__backdrop{position:absolute; inset:0; background:rgba(0,0,0,.6); backdrop-filter:blur(1px);}
.rmini__card{
  position:relative; width:424px; height:254px; background:#fff; border-radius:14px;
  box-shadow:0 18px 50px rgba(0,0,0,.25); padding:16px 18px; display:flex; flex-direction:column; gap:10px;
}
.rmini__close{position:absolute; top:10px; right:10px; width:28px; height:28px; border:0; border-radius:50%; background:#eee; cursor:pointer;}
.rmini__title{margin:0; font-weight:800; font-size:16px;}
.rmini__rating{display:flex; align-items:center; gap:10px;}
.rmini__val{min-width:36px; font-weight:700;}
.rmini__stars{display:flex; gap:6px;}
.rmini__star{
  appearance:none; border:0; background:transparent; cursor:pointer; font-size:22px; line-height:1;
  padding:0 2px; color:#cfcfcf; transition:transform .1s ease, color .1s ease;
}
.rmini__star.is-active, .rmini__star.is-hover{ color:#ffc700; transform:translateY(-1px); }
.rmini__input{
  width:100%; height:44px; border:1px solid #e5e5e5; border-radius:999px; padding:0 14px; font-size:14px; outline:none;
}
.rmini__input:focus{border-color:#9dc888; box-shadow:0 0 0 3px rgba(157,200,136,.2);}
.rmini__btn{
  margin-top:auto; width:100%; height:48px; border-radius:999px; border:0; cursor:pointer; font-weight:700; font-size:15px;
  background:#9dc888; color:#fff;
}
@media (max-width:460px){ .rmini__card{ transform: scale(.96); width:424px; height:254px; } }
`;(function(){if(document.getElementById("rmini-styles"))return;const t=Te("style",{id:"rmini-styles"});t.textContent=qt,document.head.appendChild(t)})();function Bt(){let e=H("#rating-mini");return e||(e=Te("div",{id:"rating-mini",class:"rmini hidden","aria-hidden":"true",role:"dialog","aria-modal":"true"}),e.innerHTML=`
    <div class="rmini__backdrop" data-close="true"></div>
    <div class="rmini__card" role="document" aria-labelledby="rmini-title">
      <button class="rmini__close" type="button" aria-label="Close" data-close="true">✕</button>

      <h3 id="rmini-title" class="rmini__title">Rating</h3>

      <div class="rmini__rating">
        <div class="rmini__val" id="rmini-val">0.0</div>
        <div class="rmini__stars" role="radiogroup" aria-label="Rating">
          ${[1,2,3,4,5].map(t=>`<button type="button" class="rmini__star" data-val="${t}" aria-label="${t} star">★</button>`).join("")}
        </div>
      </div>

      <input type="email" class="rmini__input" id="rmini-email" placeholder="Enter email" autocomplete="email" />

      <button class="rmini__btn" id="rmini-send">Send</button>
    </div>
  `,document.body.appendChild(e),e)}let p,ae=null,I=0;function Rt(e){p=Bt(),ae=e,I=0,H("#rmini-val",p).textContent="0.0",p.querySelectorAll(".rmini__star").forEach(t=>t.classList.remove("is-active","is-hover")),H("#rmini-email",p).value="",p.classList.remove("hidden"),p.setAttribute("aria-hidden","false")}function ge(){p&&(p.classList.add("hidden"),p.setAttribute("aria-hidden","true"),ae=null,I=0)}document.addEventListener("click",e=>{if(!p||p.classList.contains("hidden"))return;const t=e.target;if(t.closest('[data-close="true"]')||t.closest(".rmini__backdrop")){ge();return}const i=t.closest(".rmini__star");if(i){const r=p.querySelectorAll(".rmini__star"),a=Number(i.dataset.val);I=a,r.forEach(n=>n.classList.toggle("is-active",Number(n.dataset.val)<=a)),H("#rmini-val",p).textContent=`${a.toFixed(1)}`;return}if(t.id==="rmini-send"){if(!I){alert("Please select a rating.");return}const r=H("#rmini-email",p).value.trim();if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(r)){alert("Please enter a valid email.");return}console.log("rating submit",{id:ae,rate:I,email:r}),ge()}});document.addEventListener("mouseover",e=>{if(!p||p.classList.contains("hidden"))return;const t=e.target.closest(".rmini__star");if(!t)return;const i=Number(t.dataset.val);p.querySelectorAll(".rmini__star").forEach(r=>r.classList.toggle("is-hover",Number(r.dataset.val)<=i))});document.addEventListener("mouseout",e=>{!p||p.classList.contains("hidden")||e.target.closest(".rmini__star")&&p.querySelectorAll(".rmini__star").forEach(t=>t.classList.remove("is-hover"))});document.addEventListener("click",e=>{const t=e.target.closest('[data-action="rate"]');if(!t)return;const i=t.getAttribute("data-id")||t.getAttribute("data-fav")||null;i&&(e.preventDefault(),e.stopPropagation(),Rt(i))},!0);
//# sourceMappingURL=index.js.map
