import{f as Y,a as F,b as J,c as Z,d as P}from"./assets/tastyTreatsApi-D_6eBPKE.js";const y=document.querySelector("#recipes-container"),N=document.querySelector("#pagination"),q=document.querySelector("#category-list"),w=document.querySelector(".categories-box");let g=1,D=1,m=null,A=R();function R(){const t=window.innerWidth;return t<768?6:t<1280?8:9}async function ee(){try{const n=(await Y()).map(o=>`
        <li>
          <button 
            class="category-btn ${o.name===m?"active":""}" 
            data-category="${o.name}">
            ${o.name}
          </button>
        </li>`).join("");q.innerHTML=n;const i=q.querySelectorAll(".category-btn");i.forEach(o=>{o.addEventListener("click",()=>{const r=o.dataset.category;r!==m&&(m=r,g=1,i.forEach(s=>s.classList.remove("active")),w.classList.remove("active"),o.classList.add("active"),M(g))})})}catch(t){console.error("Failed to load categories:",t)}}w&&w.addEventListener("click",()=>{m!==null&&(m=null,g=1,q.querySelectorAll(".category-btn").forEach(n=>n.classList.remove("active")),w.classList.add("active"),M(g))});async function M(t=1){try{A=R();const n=await F({page:t,limit:A,category:m||void 0}),i=n.results;if(D=n.totalPages||Math.ceil(n.totalResults/A),!i||i.length===0){y.innerHTML="<p>No recipes found to display.</p>",N.innerHTML="";return}const o=i.map(r=>{const s=r.rating/5*100;return`
        <div class="recipe-card" data-id="${r._id}">
          <button class="heart-btn" aria-label="Add to favorites">
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
        </div>`}).join("");y.innerHTML=`<div class="recipes-list">${o}</div>`,te(D,t),m?y.classList.add("category-selected"):y.classList.remove("category-selected")}catch(n){console.error("An error occurred while loading recipes:",n),y.innerHTML="<p>The recipes could not be loaded. Please try again later.</p>",N.innerHTML=""}}function te(t,n){let i="";for(let r=1;r<=t;r++)i+=`<button class="pagination-btn ${r===n?"active":""}" data-page="${r}">${r}</button>`;N.innerHTML=i,N.querySelectorAll(".pagination-btn").forEach(r=>{r.addEventListener("click",()=>{const s=Number(r.dataset.page);s!==g&&(g=s,M(g))})})}window.addEventListener("resize",()=>{R()!==A&&(g=1,M(g))});w&&w.classList.add("active");ee();M();const x=document.querySelector(".popular-recipe-wrapper");console.log(J());async function ne(){try{x.innerHTML="<p>Loading recipes...</p>";const t=await J();if(!t||t.length===0){x.innerHTML="<p>No popular recipes found!</p>";return}const n=t.map(i=>`
    <div class="popular-recipes-card" data-id="${i._id}">
    <img class="popular-recipes-image" src="${i.preview}" alt="${i.title}" />
    <div class="popular-recipes-info">
    <h3 class="popular-recipes-title recipe-title">${i.title}</h3>
      <p class="popular-recipes-description popular-recipe-text ">${i.description}</p>
      </div>
    </div>
  `).join("");x.innerHTML=n}catch(t){console.error("Failed to fetch popular recipes:",t),x.innerHTML="<p>Sorry, we could not load the recipes at this time</p>"}}ne();const d=document.querySelector(".filters");d||console.warn("[filters] .filters bulunamadı.");const p=document.getElementById("pagination-filters")||document.getElementById("pagination"),a={search:d==null?void 0:d.querySelector(".filter-input"),searchBtn:d==null?void 0:d.querySelector(".search-btn"),resetBtn:d==null?void 0:d.querySelector(".reset-filter"),dropdowns:[...(d==null?void 0:d.querySelectorAll(".custom-dropdown"))??[]],recipes:document.getElementById("recipes-flex")},f={grid:document.getElementById("recipes-container"),pagination:document.getElementById("pagination")},I=!!a.recipes,c={query:"",time:"",area:"",ingredient:"",ingredientLabel:"",page:1,limit:6,loading:!1},ie=["10 min","20 min","30 min","40 min"];function U(t){c.loading=t,!(!I||!a.recipes)&&t&&(a.recipes.innerHTML='<div class="recipes-loading">Loading...</div>')}const se=1e4,oe=(t,n=se)=>Promise.race([t,new Promise((i,o)=>setTimeout(()=>o(new Error("REQUEST_TIMEOUT")),n))]);function re(t){const n=String(t).match(/\d+/);return n?n[0]:""}function _(t){a.dropdowns.forEach(n=>{n!==t&&n.classList.remove("open")})}function $(t){return String(t).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function ae(){return!!(c.query||c.time||c.area||c.ingredient)}function le(){f.grid&&(f.grid.style.display="none"),f.pagination&&(f.pagination.style.display="none"),a.recipes&&(a.recipes.style.display=""),p&&(p.style.display=""),document.dispatchEvent(new CustomEvent("filters:activate"))}function ce(){a.recipes&&(a.recipes.style.display="none"),p&&(p.style.display="none"),f.grid&&(f.grid.style.display=""),f.pagination&&(f.pagination.style.display=""),document.dispatchEvent(new CustomEvent("filters:deactivate"))}function de(t,n){if(!p)return;t=Math.max(1,Number(t)||1),n=Math.min(t,Math.max(1,Number(n)||1));const i=1,o="pagination-btn arrow-btn arrow-prev",r="pagination-btn arrow-btn arrow-next";let s=`
    <button class="${o}" data-page="1" ${n===1?"disabled":""}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="11 17 6 12 11 7"></polyline><polyline points="18 17 13 12 18 7"></polyline></svg>
    </button>
    <button class="${o}" data-page="${n-1}" ${n===1?"disabled":""}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
    </button>
  `;if(t>1){n>i+2&&(s+='<button class="pagination-btn page-btn" data-page="1">1</button>',s+='<button class="pagination-btn dots" disabled>...</button>');for(let l=Math.max(1,n-i);l<=Math.min(t,n+i);l++)l===1&&n>i+2||l===t&&n<t-i-1||(s+=`<button class="pagination-btn page-btn ${l===n?"active":""}" data-page="${l}">${l}</button>`);n<t-i-1&&(s+='<button class="pagination-btn dots" disabled>...</button>',s+=`<button class="pagination-btn page-btn" data-page="${t}">${t}</button>`)}s+=`
    <button class="${r}" data-page="${n+1}" ${n===t?"disabled":""}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
    </button>
    <button class="${r}" data-page="${t}" ${n===t?"disabled":""}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="13 17 18 12 13 7"></polyline><polyline points="6 17 11 12 6 7"></polyline></svg>
    </button>
  `,p.innerHTML=t<=1?"":s}function pe(t){if(!a.recipes)return;if(!(t!=null&&t.length)){a.recipes.innerHTML="";return}const n=t.map(i=>{const{_id:o,title:r="Untitled",description:s="",rating:l=0,preview:v,thumb:u}=i,b=v||u||"",T=$(r),S=$(s),O=Number(l)||0,K=Math.max(0,Math.min(100,O/5*100));return`
      <div class="recipe-card" data-id="${o||""}">
        <button class="heart-btn" aria-label="Add to favorites">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22"
               viewBox="0 0 24 24" fill="none" stroke="currentColor"
               stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
          </svg>
        </button>

        ${b?`<img class="recipe-card-image" src="${b}" alt="${T}" loading="lazy">`:""}

        <div class="recipe-card-details">
          <h3 class="recipe-card-title">${T}</h3>
          ${S?`<p class="recipe-card-description">${S}</p>`:""}

          <div class="recipe-card-footer">
            <div class="recipe-card-rating">
              <span class="rating-value">${O.toFixed(1)}</span>
              <div class="rating-stars" style="--rating:${K}%">
                <span>★★★★★</span>
                <span class="stars-filled">★★★★★</span>
              </div>
            </div>
            <button class="recipe-card-button" type="button">See recipe</button>
          </div>
        </div>
      </div>`}).join("");a.recipes.innerHTML=n}async function E(){try{if(!ae()){ce();return}le(),U(!0);const{time:t,area:n,ingredient:i,page:o,limit:r}=c,s=await oe(F({time:t,area:n,ingredient:i,page:o,limit:r})),l=Array.isArray(s==null?void 0:s.results)?s.results:Array.isArray(s)?s:Array.isArray(s==null?void 0:s.recipes)?s.recipes:[],v=c.query.toLowerCase(),u=v?l.filter(b=>String(b.title||"").toLowerCase().includes(v)):l;if(I){if(pe(u),p){const b=Number(s==null?void 0:s.totalPages)||Number(s==null?void 0:s.pageCount)||0,T=Number(s==null?void 0:s.total)||Number(s==null?void 0:s.count)||Number(s==null?void 0:s.resultsCount)||Number(s==null?void 0:s.hits)||(Array.isArray(s==null?void 0:s.results)?s.results.length:0),S=b||Math.max(1,Math.ceil((T||u.length)/(r||6)));de(S,c.page)}!u.length&&a.recipes&&(a.recipes.innerHTML='<p class="no-results">No recipes found</p>')}document.dispatchEvent(new CustomEvent("recipes:filtered",{detail:{recipes:u,paging:{page:o,limit:r},raw:s}}))}catch(t){console.error("[filters] applyFilters error:",(t==null?void 0:t.message)||t),I&&a.recipes&&(a.recipes.innerHTML=(t==null?void 0:t.message)==="REQUEST_TIMEOUT"?'<p class="no-results">İstek zaman aşımına uğradı. Lütfen tekrar deneyin.</p>':'<p class="no-results">Bir şeyler ters gitti. Lütfen tekrar deneyin.</p>'),document.dispatchEvent(new CustomEvent("recipes:filtered",{detail:{recipes:[],error:!0,reason:(t==null?void 0:t.message)||String(t)}}))}finally{U(!1)}}async function ue(){h("time",ie.map(t=>({value:re(t),label:t})));try{const t=await Z(),n=(Array.isArray(t)?t:[]).map(i=>typeof i=="string"?i:i==null?void 0:i.name).filter(Boolean).map(i=>({value:i,label:i}));h("area",n)}catch(t){console.error("Areas yüklenemedi",t),h("area",[])}try{const t=await P(),n=(Array.isArray(t)?t:[]).filter(i=>(i==null?void 0:i._id)&&(i==null?void 0:i.name)).map(i=>({value:i._id,label:i.name}));h("ingredient",n)}catch(t){console.error("Ingredients yüklenemedi",t),h("ingredient",[])}}function h(t,n){const i=a.dropdowns.find(s=>s.dataset.type===t);if(!i)return;const o=i.querySelector(".dropdown-menu"),r=i.querySelector(".dropdown-toggle");!o||!r||(o.innerHTML=(n||[]).map(s=>`<li><button type="button" data-value="${$(s.value)}" data-label="${$(s.label)}">${$(s.label)}</button></li>`).join(""),r.addEventListener("click",()=>{const s=!i.classList.contains("open");_(),i.classList.toggle("open",s)}),o.addEventListener("click",s=>{const l=s.target.closest("button[data-value]");if(!l)return;const v=l.getAttribute("data-value")??"",u=l.getAttribute("data-label")??l.textContent.trim();t==="time"?c.time=v:t==="area"?c.area=u:t==="ingredient"&&(c.ingredient=v,c.ingredientLabel=u),r.textContent=u,i.classList.remove("open"),c.page=1,E()}))}document.addEventListener("click",t=>{const n=t.target.closest(".custom-dropdown");if(!n)return _();a.dropdowns.forEach(i=>{i!==n&&i.classList.remove("open")})});document.addEventListener("keydown",t=>{t.key==="Escape"&&_()});function ge(){if(!a.search||!a.searchBtn)return;const t=()=>{c.query=a.search.value.trim(),c.page=1,E()};a.searchBtn.addEventListener("click",t),a.search.addEventListener("keydown",n=>{n.key==="Enter"&&(n.preventDefault(),t())})}function fe(){a.resetBtn&&a.resetBtn.addEventListener("click",()=>{c.query="",c.time="",c.area="",c.ingredient="",c.ingredientLabel="",c.page=1,a.search&&(a.search.value=""),E()})}(async function(){try{a.recipes&&(a.recipes.classList.add("recipes-list"),a.recipes.style.display="none"),p&&(p.style.display="none"),await ue(),ge(),fe(),await E(),p&&p.addEventListener("click",n=>{const i=n.target.closest(".pagination-btn");if(!i||i.classList.contains("dots"))return;const o=parseInt(i.dataset.page,10);!isNaN(o)&&o!==c.page&&(c.page=o,E())}),document.addEventListener("click",n=>{const i=n.target.closest(".heart-btn");i&&i.classList.toggle("active")}),document.addEventListener("click",n=>{const i=n.target.closest(".recipe-card-button");if(i){const o=i.closest(".recipe-card"),r=o==null?void 0:o.dataset.id;r&&console.log("Recipe clicked:",r)}})}catch(n){console.error("[filters] init error:",n),a.recipes&&(a.recipes.innerHTML='<p class="no-results">Bir şeyler ters gitti. Lütfen tekrar deneyin.</p>')}})();const Q="favoriteRecipes";function W(){try{return JSON.parse(localStorage.getItem(Q))||[]}catch{return[]}}function V(t){localStorage.setItem(Q,JSON.stringify(t))}function ve(t){const n=W();if(n.some(o=>o._id===t._id)){const o=n.filter(r=>r._id!==t._id);V(o)}else n.push(t),V(n)}function X(t){return W().some(i=>i._id===t)}const C=document.querySelector("#recipes-container"),H=document.querySelector("#pagination");let L=[],k=1,G=1,B=j();function me(t,n=250){let i;return function(...o){clearTimeout(i),i=setTimeout(()=>{t.apply(this,o)},n)}}function j(){const t=window.innerWidth;return t<768?6:t<1280?8:9}async function z(t=1){try{B=j();const n=await F({page:t,limit:B});if(L=n.results,G=n.totalPages||Math.ceil(n.totalResults/B),!L||L.length===0){C.innerHTML="<p>No recipes found to display.</p>",H.innerHTML="";return}const i=L.map(o=>{const r=o.rating/5*100,s=X(o._id)?"active":"";return`
        <div class="recipe-card" data-id="${o._id}">
          <button class="heart-btn ${s}" aria-label="Add to favorites">
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
                <div class="rating-stars" style="--rating: ${r}%">
                  <span>★★★★★</span>
                  <span class="stars-filled">★★★★★</span>
                </div>
              </div>
              <button class="recipe-card-button" type="button">See recipe</button>
            </div>
          </div>
        </div>`}).join("");C.innerHTML=i,be(G,t)}catch(n){console.error("An error occurred while loading recipes:",n),C.innerHTML="<p>The recipes could not be loaded. Please try again later.</p>",H.innerHTML=""}}H.addEventListener("click",t=>{const n=t.target.closest(".pagination-btn");if(!n||n.disabled||!n.dataset.page)return;const i=Number(n.dataset.page);i!==k&&(k=i,z(k))});C.addEventListener("click",t=>{const n=t.target.closest(".heart-btn");if(!n)return;const o=n.closest(".recipe-card").dataset.id,r=L.find(l=>l._id===o);if(!r)return;e,ve(r),X(o)?(n.classList.add("active"),console.log("[FINAL FIX] Recipe is now a favorite. ADDING active class.")):(n.classList.remove("active"),console.log("[FINAL FIX] Recipe is no longer a favorite. REMOVING active class."))});function be(t,n){let i="";const r="pagination-btn arrow-btn arrow-prev",s="pagination-btn arrow-btn arrow-next";if(i+=`<button class="${r}" data-page="1" ${n===1?"disabled":""}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="11 17 6 12 11 7"></polyline><polyline points="18 17 13 12 18 7"></polyline></svg></button>`,i+=`<button class="${r}" data-page="${n-1}" ${n===1?"disabled":""}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg></button>`,t>1){n>3&&(i+='<button class="pagination-btn page-btn" data-page="1">1</button>',i+='<button class="pagination-btn dots">...</button>');for(let l=Math.max(1,n-1);l<=Math.min(t,n+1);l++)l===1&&n>3||l===t&&n<t-1-1||(i+=`<button class="pagination-btn page-btn ${l===n?"active":""}" data-page="${l}">${l}</button>`);n<t-1-1&&(i+='<button class="pagination-btn dots">...</button>',i+=`<button class="pagination-btn page-btn" data-page="${t}">${t}</button>`)}i+=`<button class="${s}" data-page="${n+1}" ${n===t?"disabled":""}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg></button>`,i+=`<button class="${s}" data-page="${t}" ${n===t?"disabled":""}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="13 17 18 12 13 7"></polyline><polyline points="6 17 11 12 6 7"></polyline></svg></button>`,H.innerHTML=i}const we=me(()=>{j()!==B&&(k=1,z(k))});window.addEventListener("resize",we);z();
//# sourceMappingURL=index.js.map
