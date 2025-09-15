import{t as we,i as Le}from"./assets/footer-BCiyEw7c.js";const j=document.querySelectorAll(".home-slides"),oe=document.querySelectorAll(".home-dot"),y=document.createElement("div");y.classList.add("home-popup");y.innerHTML=`
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
`;document.body.appendChild(y);function ke(){y.style.display="flex"}function le(){y.style.display="none"}const $e=document.querySelector(".home-hero-btn");$e.addEventListener("click",ke);const xe=y.querySelector(".home-popup-close");xe.addEventListener("click",le);y.addEventListener("click",e=>{e.target===y&&le()});let v=0;function O(e){j.forEach((t,i)=>{t.classList.toggle("active",i===e)}),oe.forEach((t,i)=>{t.classList.toggle("active",i===e)})}oe.forEach((e,t)=>{e.addEventListener("click",()=>{v=t,O(v)})});const Ee=document.querySelectorAll(".home-slide-partial"),_e=document.querySelectorAll(".home-slide.small");Ee.forEach(e=>{e.addEventListener("click",()=>{v=(v+1)%j.length,O(v)})});_e.forEach(e=>{e.addEventListener("click",()=>{v=(v-1+j.length)%j.length,O(v)})});O(v);const N="https://tasty-treats-backend.p.goit.global/api";async function Se(){return await(await fetch(`${N}/categories`)).json()}async function L({category:e="",page:t=1,limit:i=6,time:s="",area:r="",ingredient:n=""}={}){const a=new URL(`${N}/recipes`);return e&&a.searchParams.append("category",e),t&&a.searchParams.append("page",t),i&&a.searchParams.append("limit",i),s&&a.searchParams.append("time",s),r&&a.searchParams.append("area",r),n&&a.searchParams.append("ingredient",n),await(await fetch(a)).json()}async function Ce(){return await(await fetch(`${N}/recipes/popular`)).json()}async function Ae(){return await(await fetch(`${N}/ingredients`)).json()}async function Te(){return await(await fetch(`${N}/areas`)).json()}const V="favoriteRecipes";function J(){const e=localStorage.getItem(V);return e?JSON.parse(e):[]}function Me(e){const t=J();t.some(i=>i._id===e._id)||(t.push(e),localStorage.setItem(V,JSON.stringify(t)))}function qe(e){let t=J();t=t.filter(i=>i._id!==e),localStorage.setItem(V,JSON.stringify(t))}function D(e){return J().some(i=>i._id===e)}function Ne(e){D(e._id)?qe(e._id):Me(e)}const ie=document.querySelector("#recipes-container"),E=document.querySelector("#pagination"),z=document.querySelector("#category-list"),_=document.querySelector(".categories-box");let ne=[],m=1,k=1,w=null,x=W();function Be(e){const t=e.rating/5*100,i=D(e._id)?"active":"";return`
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
    </div>`}function Fe(e,t){if(!e||e.length===0){t.innerHTML="<p>No recipes found to display.</p>";return}const i=e.map(Be).join("");t.innerHTML=i,t.querySelectorAll(".heart-btn").forEach(s=>{s.addEventListener("click",()=>{const n=s.closest(".recipe-card").dataset.id,a=e.find(c=>c._id===n);a&&(Ne(a),s.classList.toggle("active"),a.isFavorite=D(n))})}),t.querySelectorAll(".recipe-card-button").forEach(s=>{s.addEventListener("click",()=>{const n=s.closest(".recipe-card").dataset.id;console.log(`Open recipe details for: ${n}`)})})}const R={first:"<<",prev:"<",next:">",last:">>"};function Re(e,t){if(!E||(E.innerHTML="",e<=1))return;const i=document.createDocumentFragment(),s=(c,p,f=!1)=>{const h=document.createElement("button");return h.innerHTML=c,h.className=p,f&&(h.disabled=!0),h};i.appendChild(s(R.first,"pagination-btn first",t===1)),i.appendChild(s(R.prev,"pagination-btn prev",t===1));const r=new Set([1,e,t]);t>1&&r.add(t-1),t<e&&r.add(t+1);const n=Array.from(r).filter(c=>c>0&&c<=e).sort((c,p)=>c-p);let a=0;for(const c of n){if(a&&c>a+1){const f=document.createElement("span");f.textContent="...",f.className="pagination-ellipsis",i.appendChild(f)}const p=s(c,"pagination-btn number");c===t&&p.classList.add("active"),i.appendChild(p),a=c}i.appendChild(s(R.next,"pagination-btn next",t===e)),i.appendChild(s(R.last,"pagination-btn last",t===e)),E.appendChild(i)}async function B(e=1){try{x=W();const t=w?await L({category:w,page:1,limit:1e3}):await L({page:1,limit:1e3}),i=t.totalResults||t.results.length,s=w?await L({page:e,limit:x,category:w}):await L({page:e,limit:x});k=Math.ceil(i/x),m=e>k?k:e,ne=(s.results||[]).map(r=>({...r,isFavorite:D(r._id)})),Fe(ne,ie),Re(k,m)}catch(t){console.error("Error loading recipes:",t),ie.innerHTML="<p>Recipes could not be loaded.</p>",E.innerHTML=""}}async function Ie(){try{const e=await Se();z.innerHTML=e.map(t=>`
      <li><button class="category-btn ${t.name===w?"active":""}" data-category="${t.name}">${t.name}</button></li>
    `).join("")}catch(e){console.error("Failed to load categories:",e)}}z.addEventListener("click",e=>{const t=e.target.closest(".category-btn");t&&(w=t.dataset.category,m=1,z.querySelectorAll(".category-btn").forEach(i=>i.classList.remove("active")),_&&_.classList.remove("active"),t.classList.add("active"),B(m))});_&&_.addEventListener("click",()=>{w=null,m=1,_.classList.add("active"),z.querySelectorAll(".category-btn").forEach(e=>e.classList.remove("active")),B(m)});E.addEventListener("click",e=>{const t=e.target.closest("button");if(!t)return;let i=m;switch(!0){case t.classList.contains("first"):i=1;break;case t.classList.contains("prev"):i=m-1;break;case t.classList.contains("next"):i=m+1;break;case t.classList.contains("last"):i=k;break;case t.classList.contains("number"):i=Number(t.textContent);break}i>=1&&i<=k&&(m=i,B(m))});window.addEventListener("resize",He(()=>{W()!==x&&(m=1,B(m))}));Ie();B();function He(e,t=250){let i;return function(...s){clearTimeout(i),i=setTimeout(()=>e.apply(this,s),t)}}function W(){const e=window.innerWidth;return e>=1440?16:e>=1280&&e<1440?9:e>=768&&e<1280?8:6}const I=document.querySelector(".popular-recipe-wrapper");async function je(){try{I.innerHTML="<p>Loading recipes...</p>";const e=await Ce();if(!e||e.length===0){I.innerHTML="<p>No popular recipes found!</p>";return}const t=e.map(i=>`
    <div class="popular-recipes-card" data-id="${i._id}">
    <img class="popular-recipes-image" src="${i.preview}" alt="${i.title}" />
    <div class="popular-recipes-info">
    <h3 class="popular-recipes-title recipe-title">${i.title}</h3>
      <p class="popular-recipes-description popular-recipe-text ">${i.description}</p>
      </div>
    </div>
  `).join("");I.innerHTML=t}catch(e){console.error("Failed to fetch popular recipes:",e),I.innerHTML="<p>Sorry, we could not load the recipes at this time</p>"}}je();const u=document.querySelector(".filters");u||console.warn("[filters] .filters bulunamadı.");const g=document.getElementById("pagination-filters")||document.getElementById("pagination"),l={search:u==null?void 0:u.querySelector(".filter-input"),searchBtn:u==null?void 0:u.querySelector(".search-btn"),resetBtn:u==null?void 0:u.querySelector(".reset-filter"),dropdowns:[...(u==null?void 0:u.querySelectorAll(".custom-dropdown"))??[]],recipes:document.getElementById("recipes-flex")},b={grid:document.getElementById("recipes-container"),pagination:document.getElementById("pagination")},U=!!l.recipes,o={query:"",time:"",area:"",ingredient:"",ingredientLabel:"",page:1,limit:6,loading:!1,lastItems:[],favs:new Set},ce="tt:favorites",ze=()=>{try{return new Set(JSON.parse(localStorage.getItem(ce)||"[]"))}catch{return new Set}},de=e=>{localStorage.setItem(ce,JSON.stringify([...e]))},pe=e=>o.favs.has(e),Oe=e=>{if(!e)return null;const t=o.favs.has(e);return t?o.favs.delete(e):o.favs.add(e),de(o.favs),!t};o.favs=ze();function De(){const e=[...o.favs].filter(t=>t&&t!=="null"&&t!=="undefined");e.length!==o.favs.size&&(o.favs=new Set(e),de(o.favs))}function ue(e=document){e.querySelectorAll(".heart-btn").forEach(i=>{var n,a;const s=(a=(n=i.closest("[data-id]"))==null?void 0:n.dataset.id)==null?void 0:a.trim(),r=!!s&&pe(s);i.classList.toggle("active",r)})}De();const Ue=["10 min","20 min","30 min","40 min"];function se(e){o.loading=e,!(!U||!l.recipes)&&e&&(l.recipes.innerHTML='<div class="recipes-loading">Loading...</div>')}const Ve=1e4,Je=(e,t=Ve)=>Promise.race([e,new Promise((i,s)=>setTimeout(()=>s(new Error("REQUEST_TIMEOUT")),t))]);function We(e){const t=String(e).match(/\d+/);return t?t[0]:""}function Y(e){l.dropdowns.forEach(t=>{t!==e&&t.classList.remove("open")})}function S(e){return String(e).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function me(){const e=window.innerWidth;return e>=1440?16:e>=1280?9:e>=768?8:6}function Ye(){return!!(o.query||o.time||o.area||o.ingredient)}function Ke(){b.grid&&(b.grid.style.display="none"),b.pagination&&(b.pagination.style.display="none"),l.recipes&&(l.recipes.style.display=""),g&&(g.style.display=""),document.dispatchEvent(new CustomEvent("filters:activate"))}function Qe(){l.recipes&&(l.recipes.style.display="none"),g&&(g.style.display="none"),b.grid&&(b.grid.style.display=""),b.pagination&&(b.pagination.style.display=""),document.dispatchEvent(new CustomEvent("filters:deactivate"))}function Ge(e,t){if(!g)return;e=Math.max(1,Number(e)||1),t=Math.min(e,Math.max(1,Number(t)||1));const i=1,s="pagination-btn arrow-btn arrow-prev",r="pagination-btn arrow-btn arrow-next";let n=`
    <button class="${s}" data-page="1" ${t===1?"disabled":""}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="11 17 6 12 11 7"></polyline><polyline points="18 17 13 12 18 7"></polyline></svg>
    </button>
    <button class="${s}" data-page="${t-1}" ${t===1?"disabled":""}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
    </button>
  `;if(e>1){t>i+2&&(n+='<button class="pagination-btn page-btn" data-page="1">1</button>',n+='<button class="pagination-btn dots" disabled>...</button>');for(let a=Math.max(1,t-i);a<=Math.min(e,t+i);a++)a===1&&t>i+2||a===e&&t<e-i-1||(n+=`<button class="pagination-btn page-btn ${a===t?"active":""}" data-page="${a}">${a}</button>`);t<e-i-1&&(n+='<button class="pagination-btn dots" disabled>...</button>',n+=`<button class="pagination-btn page-btn" data-page="${e}">${e}</button>`)}n+=`
    <button class="${r}" data-page="${t+1}" ${t===e?"disabled":""}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
    </button>
    <button class="${r}" data-page="${e}" ${t===e?"disabled":""}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="13 17 18 12 13 7"></polyline><polyline points="6 17 11 12 6 7"></polyline></svg>
    </button>
  `,g.innerHTML=e<=1?"":n}function fe(e){if(!l.recipes)return;const t=me(),i=Array.isArray(e)?e.slice(0,t):[];if(!i.length){l.recipes.innerHTML="";return}const s=i.map(r=>{const{_id:n,title:a="Untitled",description:c="",rating:p=0,preview:f,thumb:h}=r,F=f||h||"",P=S(a),ee=S(c),te=Number(p)||0,be=Math.max(0,Math.min(100,te/5*100)),ye=pe(n)?"active":"";return`
      <div class="recipe-card" data-id="${n||""}">
        <button class="heart-btn ${ye}" aria-label="Add to favorites">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22"
               viewBox="0 0 24 24" fill="none" stroke="currentColor"
               stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
          </svg>
        </button>

        ${F?`<img class="recipe-card-image" src="${F}" alt="${P}" loading="lazy">`:""}

        <div class="recipe-card-details">
          <h3 class="recipe-card-title">${P}</h3>
          ${ee?`<p class="recipe-card-description">${ee}</p>`:""}

          <div class="recipe-card-footer">
            <div class="recipe-card-rating">
              <span class="rating-value">${te.toFixed(1)}</span>
              <div class="rating-stars" style="--rating:${be}%">
                <span>★★★★★</span>
                <span class="stars-filled">★★★★★</span>
              </div>
            </div>
            <button class="recipe-card-button" type="button">See recipe</button>
          </div>
        </div>
      </div>`}).join("");l.recipes.innerHTML=s,ue(l.recipes)}async function M(){try{if(!Ye()){Qe();return}Ke(),se(!0);const e=me();o.limit=e;const{time:t,area:i,ingredient:s,page:r}=o,n=await Je(L({time:t,area:i,ingredient:s,page:r,limit:e})),a=Array.isArray(n==null?void 0:n.results)?n.results:Array.isArray(n)?n:Array.isArray(n==null?void 0:n.recipes)?n.recipes:[],c=o.query.toLowerCase(),p=c?a.filter(f=>String(f.title||"").toLowerCase().includes(c)):a;if(o.lastItems=p,U){if(fe(p.slice(0,e)),g){const f=Number(n==null?void 0:n.totalPages)||Number(n==null?void 0:n.pageCount)||0,h=Number(n==null?void 0:n.total)||Number(n==null?void 0:n.count)||Number(n==null?void 0:n.resultsCount)||Number(n==null?void 0:n.hits)||(Array.isArray(n==null?void 0:n.results)?n.results.length:0),F=f||Math.max(1,Math.ceil((h||p.length)/e));Ge(F,o.page)}!p.length&&l.recipes&&(l.recipes.innerHTML='<p class="no-results">No recipes found</p>')}document.dispatchEvent(new CustomEvent("recipes:filtered",{detail:{recipes:p,paging:{page:r,limit:e},raw:n}}))}catch(e){console.error("[filters] applyFilters error:",(e==null?void 0:e.message)||e),U&&l.recipes&&(l.recipes.innerHTML=(e==null?void 0:e.message)==="REQUEST_TIMEOUT"?'<p class="no-results">İstek zaman aşımına uğradı. Lütfen tekrar deneyin.</p>':'<p class="no-results">Bir şeyler ters gitti. Lütfen tekrar deneyin.</p>'),document.dispatchEvent(new CustomEvent("recipes:filtered",{detail:{recipes:[],error:!0,reason:(e==null?void 0:e.message)||String(e)}}))}finally{se(!1)}}async function Xe(){$("time",Ue.map(e=>({value:We(e),label:e})));try{const e=await Te(),t=(Array.isArray(e)?e:[]).map(i=>typeof i=="string"?i:i==null?void 0:i.name).filter(Boolean).map(i=>({value:i,label:i}));$("area",t)}catch(e){console.error("Areas yüklenemedi",e),$("area",[])}try{const e=await Ae(),t=(Array.isArray(e)?e:[]).filter(i=>(i==null?void 0:i._id)&&(i==null?void 0:i.name)).map(i=>({value:i._id,label:i.name}));$("ingredient",t)}catch(e){console.error("Ingredients yüklenemedi",e),$("ingredient",[])}}function $(e,t){const i=l.dropdowns.find(n=>n.dataset.type===e);if(!i)return;const s=i.querySelector(".dropdown-menu"),r=i.querySelector(".dropdown-toggle");!s||!r||(s.innerHTML=(t||[]).map(n=>`<li><button type="button" data-value="${S(n.value)}" data-label="${S(n.label)}">${S(n.label)}</button></li>`).join(""),r.addEventListener("click",()=>{const n=!i.classList.contains("open");Y(),i.classList.toggle("open",n)}),s.addEventListener("click",n=>{const a=n.target.closest("button[data-value]");if(!a)return;const c=a.getAttribute("data-value")??"",p=a.getAttribute("data-label")??a.textContent.trim();e==="time"?o.time=c:e==="area"?o.area=p:e==="ingredient"&&(o.ingredient=c,o.ingredientLabel=p),r.textContent=p,i.classList.remove("open"),o.page=1,M()}))}document.addEventListener("click",e=>{const t=e.target.closest(".custom-dropdown");if(!t)return Y();l.dropdowns.forEach(i=>{i!==t&&i.classList.remove("open")})});document.addEventListener("keydown",e=>{e.key==="Escape"&&Y()});function Ze(){if(!l.search||!l.searchBtn)return;const e=()=>{o.query=l.search.value.trim(),o.page=1,M()};l.searchBtn.addEventListener("click",e),l.search.addEventListener("keydown",t=>{t.key==="Enter"&&(t.preventDefault(),e())})}const ge={};(l.dropdowns||[]).forEach(e=>{const t=e.dataset.type,i=e.querySelector(".dropdown-toggle");t&&i&&(ge[t]=i.getAttribute("data-default")||i.textContent.trim())});function Pe(){l.resetBtn&&l.resetBtn.addEventListener("click",()=>{o.query="",o.time="",o.area="",o.ingredient="",o.ingredientLabel="",o.page=1,l.search&&(l.search.value=""),(l.dropdowns||[]).forEach(e=>{const t=e.dataset.type,i=e.querySelector(".dropdown-toggle"),s=e.querySelector(".dropdown-menu");i&&(i.textContent=ge[t]||"Select"),s==null||s.querySelectorAll(".selected").forEach(r=>r.classList.remove("selected")),e.classList.remove("open")}),M()})}(async function(){var t;try{l.recipes&&(l.recipes.classList.add("recipes-list"),l.recipes.style.display="none"),g&&(g.style.display="none"),await Xe(),Ze(),Pe(),await M(),ue(),g&&g.addEventListener("click",i=>{const s=i.target.closest(".pagination-btn");if(!s||s.classList.contains("dots"))return;const r=parseInt(s.dataset.page,10);!isNaN(r)&&r!==o.page&&(o.page=r,M())}),document.addEventListener("click",i=>{var c;const s=i.target.closest(".heart-btn");if(!s)return;const r=s.closest("[data-id]"),n=(c=r==null?void 0:r.dataset.id)==null?void 0:c.trim();if(!n){console.warn("[favorites] data-id bulunamadı; işlem yapılmadı.");return}const a=Oe(n);a!==null&&s.classList.toggle("active",a)}),(t=document.querySelector('.nav-link[href="./favorites.html"]'))==null||t.addEventListener("click",()=>{console.log("Favorites link clicked, redirecting...")}),document.addEventListener("click",i=>{const s=i.target.closest(".recipe-card-button");if(s){const r=s.closest(".recipe-card"),n=r==null?void 0:r.dataset.id;n&&console.log("Recipe clicked:",n)}}),window.addEventListener("resize",()=>{var i;(i=o.lastItems)!=null&&i.length&&fe(o.lastItems)})}catch(i){console.error("[filters] init error:",i),l.recipes&&(l.recipes.innerHTML='<p class="no-results">Bir şeyler ters gitti. Lütfen tekrar deneyin.</p>')}})();const K=document.querySelector("#recipes-container"),Q=document.querySelector("#pagination");let C=[],A=1,re=1,H=X();function et(e){const t=e.rating/5*100,i=Le(e._id)?"active":"";return`
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
    </div>`}function ve(){if(!C||C.length===0)return;const e=C.map(et).join("");K.innerHTML=e}async function G(e=1){try{H=X();const t=await L({page:e,limit:H});C=t.results,re=t.totalPages||Math.ceil(t.totalResults/H),ve(),tt(re,e)}catch(t){console.error("An error occurred while loading recipes:",t),K.innerHTML="<p>The recipes could not be loaded. Please try again later.</p>",Q.innerHTML=""}}K.addEventListener("click",e=>{const t=e.target.closest(".heart-btn");if(!t)return;const s=t.closest(".recipe-card").dataset.id,r=C.find(n=>n._id===s);r&&(we(r),ve())});Q.addEventListener("click",e=>{const t=e.target.closest(".pagination-btn");if(!t||t.disabled||!t.dataset.page)return;const i=Number(t.dataset.page);i!==A&&(A=i,G(A))});function tt(e,t){let i="";const r="pagination-btn arrow-btn arrow-prev",n="pagination-btn arrow-btn arrow-next";if(i+=`<button class="${r}" data-page="1" ${t===1?"disabled":""}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="11 17 6 12 11 7"></polyline><polyline points="18 17 13 12 18 7"></polyline></svg></button>`,i+=`<button class="${r}" data-page="${t-1}" ${t===1?"disabled":""}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg></button>`,e>1){t>3&&(i+='<button class="pagination-btn page-btn" data-page="1">1</button>',i+='<button class="pagination-btn dots">...</button>');for(let a=Math.max(1,t-1);a<=Math.min(e,t+1);a++)a===1&&t>3||a===e&&t<e-1-1||(i+=`<button class="pagination-btn page-btn ${a===t?"active":""}" data-page="${a}">${a}</button>`);t<e-1-1&&(i+='<button class="pagination-btn dots">...</button>',i+=`<button class="pagination-btn page-btn" data-page="${e}">${e}</button>`)}i+=`<button class="${n}" data-page="${t+1}" ${t===e?"disabled":""}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg></button>`,i+=`<button class="${n}" data-page="${e}" ${t===e?"disabled":""}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="13 17 18 12 13 7"></polyline><polyline points="6 17 11 12 6 7"></polyline></svg></button>`,Q.innerHTML=i}const it=nt(()=>{X()!==H&&(A=1,G(A))});window.addEventListener("resize",it);G();function nt(e,t=250){let i;return function(...s){clearTimeout(i),i=setTimeout(()=>{e.apply(this,s)},t)}}function X(){const e=window.innerWidth;return e>=1440?16:e>=1280&&e<1440?9:e>=768&&e<1280?8:6}function q(e,t=document){return t.querySelector(e)}function he(e,t={}){const i=document.createElement(e);for(const[s,r]of Object.entries(t))i.setAttribute(s,r);return i}const st=`
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
`;(function(){if(document.getElementById("rmini-styles"))return;const t=he("style",{id:"rmini-styles"});t.textContent=st,document.head.appendChild(t)})();function rt(){let e=q("#rating-mini");return e||(e=he("div",{id:"rating-mini",class:"rmini hidden","aria-hidden":"true",role:"dialog","aria-modal":"true"}),e.innerHTML=`
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
  `,document.body.appendChild(e),e)}let d,Z=null,T=0;function at(e){d=rt(),Z=e,T=0,q("#rmini-val",d).textContent="0.0",d.querySelectorAll(".rmini__star").forEach(t=>t.classList.remove("is-active","is-hover")),q("#rmini-email",d).value="",d.classList.remove("hidden"),d.setAttribute("aria-hidden","false")}function ae(){d&&(d.classList.add("hidden"),d.setAttribute("aria-hidden","true"),Z=null,T=0)}document.addEventListener("click",e=>{if(!d||d.classList.contains("hidden"))return;const t=e.target;if(t.closest('[data-close="true"]')||t.closest(".rmini__backdrop")){ae();return}const i=t.closest(".rmini__star");if(i){const s=d.querySelectorAll(".rmini__star"),r=Number(i.dataset.val);T=r,s.forEach(n=>n.classList.toggle("is-active",Number(n.dataset.val)<=r)),q("#rmini-val",d).textContent=`${r.toFixed(1)}`;return}if(t.id==="rmini-send"){if(!T){alert("Please select a rating.");return}const s=q("#rmini-email",d).value.trim();if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s)){alert("Please enter a valid email.");return}console.log("rating submit",{id:Z,rate:T,email:s}),ae()}});document.addEventListener("mouseover",e=>{if(!d||d.classList.contains("hidden"))return;const t=e.target.closest(".rmini__star");if(!t)return;const i=Number(t.dataset.val);d.querySelectorAll(".rmini__star").forEach(s=>s.classList.toggle("is-hover",Number(s.dataset.val)<=i))});document.addEventListener("mouseout",e=>{!d||d.classList.contains("hidden")||e.target.closest(".rmini__star")&&d.querySelectorAll(".rmini__star").forEach(t=>t.classList.remove("is-hover"))});document.addEventListener("click",e=>{const t=e.target.closest('[data-action="rate"]');if(!t)return;const i=t.getAttribute("data-id")||t.getAttribute("data-fav")||null;i&&(e.preventDefault(),e.stopPropagation(),at(i))},!0);
//# sourceMappingURL=index.js.map
