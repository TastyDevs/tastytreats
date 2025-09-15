(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))o(n);new MutationObserver(n=>{for(const i of n)if(i.type==="childList")for(const s of i.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&o(s)}).observe(document,{childList:!0,subtree:!0});function r(n){const i={};return n.integrity&&(i.integrity=n.integrity),n.referrerPolicy&&(i.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?i.credentials="include":n.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function o(n){if(n.ep)return;n.ep=!0;const i=r(n);fetch(n.href,i)}})();const M=document.getElementById("menu-icon"),y=document.getElementById("nav-menu"),C=document.getElementById("nav-close-btn"),p=document.getElementById("desktop-toggle"),u=document.getElementById("mobile-toggle");function k(e){e?(document.body.setAttribute("data-theme","dark"),localStorage.setItem("theme","dark")):(document.body.removeAttribute("data-theme"),localStorage.setItem("theme","light"))}window.addEventListener("DOMContentLoaded",()=>{localStorage.getItem("theme")==="dark"&&(document.body.setAttribute("data-theme","dark"),p==null||p.classList.add("active"),u==null||u.classList.add("active"))});M.addEventListener("click",()=>{y.classList.add("active")});C.addEventListener("click",()=>{y.classList.remove("active")});p&&p.addEventListener("click",()=>{p.classList.toggle("active"),k(document.body.getAttribute("data-theme")!=="dark")});u&&u.addEventListener("click",()=>{u.classList.toggle("active"),k(document.body.getAttribute("data-theme")!=="dark")});window.addEventListener("resize",()=>{window.innerWidth>768&&y.classList.remove("active")});const E="favoriteRecipes";function S(){try{return JSON.parse(localStorage.getItem(E))||[]}catch{return[]}}function w(e){localStorage.setItem(E,JSON.stringify(e))}function H(e){const t=S();if(t.some(o=>o._id===e._id)){const o=t.filter(n=>n._id!==e._id);w(o)}else t.push(e),w(t)}function g(e){return S().some(r=>r._id===e)}const R="https://tasty-treats-backend.p.goit.global/api";function m(e,t=document){return t.querySelector(e)}function b(e,t={}){const r=document.createElement(e);for(const[o,n]of Object.entries(t))r.setAttribute(o,n);return r}function T(){document.body.style.overflow="hidden"}function O(){document.body.style.overflow=""}async function q(e){const t=await fetch(`${R}/recipes/${e}`);if(!t.ok)throw new Error("Recipe not found");return t.json()}const P=`
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
`;function j(){const e="rm-styles-531x905";if(document.getElementById(e))return;const t=b("style",{id:e});t.textContent=P,document.head.appendChild(t)}function F(){let e=m("#recipe-modal");return e||(e=b("div",{id:"recipe-modal",class:"rm hidden","aria-hidden":"true",role:"dialog","aria-modal":"true"}),e.innerHTML=`
    <div class="rm__backdrop" data-close="true"></div>
    <div class="rm__card" role="document" aria-labelledby="rm-title" style="--rm-scale:1">
      <button class="rm__close" type="button" aria-label="Close" data-close="true">✕</button>
      <div id="rm-content" class="rm__content"></div>
    </div>
  `,document.body.appendChild(e),e)}function N(e=[]){return Array.isArray(e)?e.slice(0,6).map(t=>{const r=typeof t=="string"?t:t.name??t.title??"";return r?`<span class="rm__chip">#${r}</span>`:""}).join(""):""}function W(e=[]){return!Array.isArray(e)||e.length===0?'<div class="rm__row"><span class="rm__ing">Ingredients</span><span class="rm__measure">—</span></div>':e.map(t=>`
    <div class="rm__row">
      <span class="rm__ing">${t.name||t.title||"-"}</span>
      <span class="rm__measure">${t.measure||t.quantity||""}</span>
    </div>
  `).join("")}function Y(e=0){const t=Math.max(0,Math.min(5,Number(e)||0));return`
    <div class="rm__rating" style="--rating:${t/5*100}%">
      <span class="val">${t.toFixed(1)}</span>
      <div class="rm__stars"><span>★★★★★</span><span class="filled">★★★★★</span></div>
    </div>
  `}function J(){return`
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="32" cy="32" r="30" fill="white" opacity=".9"></circle>
      <polygon points="26,20 48,32 26,44" fill="#111"></polygon>
    </svg>
  `}function K(e,t){return Array.isArray(e)?e.map(o=>`<p>${String(o).trim()}</p>`).join(""):(e||t||"No instructions.").toString().trim().replace(/\n/g,"<br>")}function U(e=""){try{const t=new URL(e);if(t.hostname.includes("youtu.be"))return t.pathname.slice(1);if(t.searchParams.get("v"))return t.searchParams.get("v");const r=t.pathname.match(/\/embed\/([^/?#]+)/)||t.pathname.match(/\/v\/([^/?#]+)/);return r?r[1]:null}catch{return null}}function D(e){const{_id:t,title:r,thumb:o,rating:n=0,time:i,tags:s=[],ingredients:c=[],instructions:_="",description:I="",youtube:B}=e,z=g(t)?"active":"";return`
    <h3 id="rm-title" class="rm__title">${(r||"Recipe").toUpperCase()}</h3>

    <div class="rm__media">
      <img src="${o||""}" alt="${r||"Recipe image"}" loading="lazy" />
      ${B?`<div class="rm__play" data-play="yt">${J()}</div>`:""}
      <button class="rm__heart ${z}" aria-label="Toggle favorite" data-fav="${t}">
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
        </svg>
      </button>
    </div>

    <div class="rm__meta">
      <div class="rm__chips">${N(s)}</div>
      ${Y(n)}
      ${i?`<span>• ${i} min</span>`:""}
    </div>

    <div class="rm__grid">
      <div class="rm__table">
        ${W(c)}
      </div>
    </div>

    <div class="rm__instructions">
      ${K(_,I)}
    </div>

    <div class="rm__actions">
      <button class="rm__btn rm__btn--primary" data-action="toggle-fav" data-fav="${t}">
        ${g(t)?"Remove favorite":"Add to favorite"}
      </button>
      <button class="rm__btn rm__btn--ghost" data-action="rate" data-id="${t}">
        Give a rating
      </button>
    </div>
  `}function G(){return`
    <h3 class="rm__title">Loading…</h3>
    <div class="rm__media"></div>
    <div class="rm__meta"></div>
    <div class="rm__table" style="height:160px;"></div>
    <div class="rm__instructions" style="height:80px;"></div>
  `}let a,v,d=null,h=null;function L(){const e=m(".rm__card",a);if(!e)return;const t=window.innerWidth,r=window.innerHeight,o=24,n=Math.min((t-o*2)/531,(r-o*2)/905,1);e.style.setProperty("--rm-scale",String(Math.max(.5,n)))}function V(e){j(),a=F(),v=m("#rm-content",a),v.innerHTML=G(),a.classList.remove("hidden"),a.setAttribute("aria-hidden","false"),T(),L(),h=()=>L(),window.addEventListener("resize",h),window.addEventListener("keydown",A),q(e).then(t=>{d=t,v.innerHTML=D(t)}).catch(t=>{console.error(t),d=null,v.innerHTML=`
        <h3 class="rm__title">Error</h3>
        <p>Recipe details could not be loaded. Please try again.</p>
        <div class="rm__actions">
          <button class="rm__btn rm__btn--primary" data-close="true">Close</button>
        </div>
      `})}function $(){a&&(a.classList.add("hidden"),a.setAttribute("aria-hidden","true"),m("#rm-content",a).innerHTML="",d=null,O(),window.removeEventListener("keydown",A),h&&window.removeEventListener("resize",h))}function A(e){e.key==="Escape"&&$()}document.addEventListener("click",e=>{if(a&&!a.classList.contains("hidden")){const t=e.target;if(t.closest('[data-close="true"]')||t.closest(".rm__backdrop")){$();return}if(t.closest("[data-fav]")&&d){H(d);const i=d._id,s=m(".rm__heart",a);s&&s.classList.toggle("active",g(i));const c=m('[data-action="toggle-fav"]',a);c&&(c.textContent=g(i)?"Remove favorite":"Add to favorite");const _=document.querySelector(`.recipe-card[data-id="${i}"] .heart-btn`);_&&_.classList.toggle("active",g(i));return}if(t.closest('[data-action="rate"]')){alert("Rating flow coming soon ✨");return}if(t.closest('[data-play="yt"]')&&(d!=null&&d.youtube)){const i=U(d.youtube);if(!i)return;const s=m(".rm__media",a);if(!s||s.querySelector(".rm__player"))return;const c=b("div",{class:"rm__player"});c.innerHTML=`
        <button class="rm__player-close" aria-label="Close video">✕</button>
        <iframe
          src="https://www.youtube.com/embed/${i}?autoplay=1&rel=0&playsinline=1"
          title="YouTube video player"
          allow="autoplay; encrypted-media; picture-in-picture"
          allowfullscreen
        ></iframe>`,s.appendChild(c);return}if(t.closest(".rm__player-close")){const i=t.closest(".rm__player");i&&i.remove();return}}});document.addEventListener("click",e=>{const t=e.target.closest(".recipe-card-button");if(!t)return;const r=t.closest(".recipe-card");if(!r)return;const o=r.dataset.id;o&&V(o)});const Q=document.getElementById("team-btn"),f=document.getElementById("team-modal"),X=document.getElementById("modal-close");let l=0;function x(e){document.querySelectorAll(".slide").forEach((r,o)=>{r.classList.remove("active"),o===e&&r.classList.add("active")})}Q.addEventListener("click",()=>{l=0,x(l),f.style.display="flex"});X.addEventListener("click",()=>{f.style.display="none"});window.addEventListener("keydown",e=>{e.key==="Escape"&&(f.style.display="none")});f.addEventListener("click",e=>{e.target===f&&(f.style.display="none")});document.querySelector(".prev-slide").addEventListener("click",()=>{const e=document.querySelectorAll(".slide");l=(l-1+e.length)%e.length,x(l)});document.querySelector(".next-slide").addEventListener("click",()=>{const e=document.querySelectorAll(".slide");l=(l+1)%e.length,x(l)});export{g as i,H as t};
//# sourceMappingURL=footer-BCiyEw7c.js.map
