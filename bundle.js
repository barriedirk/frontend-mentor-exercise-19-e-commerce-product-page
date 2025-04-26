(()=>{var c=t=>document.querySelector(t);var y=t=>t.getState().cart.reduce((e,a)=>(e+=a.quantity,e),0)??0;var E=async()=>{let t=await fetch("./data.json",{method:"GET",headers:{"Content-Type":"application/json"}});if(!t.ok)throw new Error("Failed to fetch data");let n=t.json();return await new Promise(e=>setTimeout(e,1e3)),n};var v=4,x=({slides:t,$mainImage:n,$galleryThumbnails:e,galleryId:a})=>{let l=new AbortController,i=t.length>v?v:t.length,r=t.slice(0,i),s=r.findIndex(u=>u.default),o=s===1?0:s,d=()=>{e.querySelectorAll("button.product__thumbnail").forEach(m=>{m.classList.remove("active")})},g=()=>{n.src=r[o].src,n.alt=r[o].alt},p=u=>{o=u,d(),e.querySelector(`button:nth-child(${o+1})`).classList.add("active"),g()};return c(`${a} .product__gallery-btn--next`).addEventListener("click",u=>{u.preventDefault(),o=(o+1)%i,p(o)},{signal:l.signal}),c(`${a}  .product__gallery-btn--prev`).addEventListener("click",u=>{u.preventDefault(),o=(o-1+i)%i,p(o)},{signal:l.signal}),e.innerText="",r.forEach((u,m)=>{let _=document.createElement("button"),b=document.createElement("img");_.className="product__thumbnail",_.setAttribute("aria-label",`Select Thumbnail ${m+1}`),_.addEventListener("click",h=>{h.preventDefault(),p(m)},{signal:l.signal}),b.src=u.src,b.alt=u.alt,_.appendChild(b),e.appendChild(_)}),p(o),l};var L=()=>{c(".header__nav-show-menu").addEventListener("click",function(n){n.preventDefault();let e=this.getAttribute("aria-expanded")==="true",a=e?"false":"true",l=e?"Close toggle menu":"Open toggle menu";this.setAttribute("aria-expanded",a),this.setAttribute("aria-label",l)})};var $=t=>{let n,e=[],a=()=>Object.freeze(n),l=r=>{n=t(n,r),e.forEach(s=>s())},i=r=>(e.push(r),()=>{e=e.filter(s=>s!==r)});return l({type:"@@INIT"}),{getState:a,dispatch:l,subscribe:i}},T={cart:[]},C=Object.freeze({CLEAR_CART:"CLEAR_CART",ADD_TO_CART:"ADD_TO_CART",REMOVE_FROM_CART:"REMOVE_FROM_CART"}),k=(t=T,n)=>{switch(n.type){case C.CLEAR_CART:return structuredClone(T);case C.ADD_TO_CART:{let{quantity:e,product:{id:a,stock:l}}=n.payload,i=structuredClone(t),r=i.cart.findIndex(({product:o})=>o.id===a);if(r===-1)return{...i,cart:[...i.cart,n.payload]};let s=i.cart[r].quantity+e;return i.cart[r].quantity=s>l?l:s,i}case C.REMOVE_FROM_CART:{let e=structuredClone(t);return{...e,cart:e.cart.filter(({product:a})=>a.id!==n.payload.id)}}default:return t}},w=(t,{product:n,quantity:e})=>{t.dispatch({type:C.ADD_TO_CART,payload:{product:n,quantity:e}})},A=(t,n)=>{t.dispatch({type:C.REMOVE_FROM_CART,payload:{id:n}})},D=t=>{t.dispatch({type:C.CLEAR_CART})};var R=({company:t,title:n,description:e,price:a})=>{c("#product__company").textContent=t,c("#product__title").textContent=n,c("#product__description").textContent=e,c("#product__price-sale").textContent=`$${a.sale.toFixed(2)}`,c("#product__price-discount").textContent=`${a.discount}%`,c("#product__price-original").textContent=`$${a.original.toFixed(2)}`},I=({stock:t,product:n,store:e})=>{let a=0,l=c("#product__quantity-value"),i=c("#product__quantity-btn--decrease"),r=c("#product__quantity-btn--increase"),s=c("#product__checkout-btn"),o=d=>{l.textContent=d,s.disabled=d===0};if(o(0),t===0){i.disabled=!0,r.disabled=!0,s.disabled=!0,alert("No stock available");return}i.addEventListener("click",d=>{d.preventDefault(),d.stopPropagation(),a===1&&(i.disabled=!0),r.disabled=!1,a--,o(a)}),r.addEventListener("click",d=>{d.preventDefault(),d.stopPropagation(),a===t-1&&(r.disabled=!0),i.disabled=!1,a++,o(a)}),s.addEventListener("click",d=>{d.preventDefault(),d.stopPropagation(),a>0?w(e,{product:n,quantity:a}):A(e,n.id)}),i.disabled=!0},M=({store:t,$badge:n})=>{let e=y(t);n.innerHTML=e>0?e:""};var z=()=>{let t=document.createElement("p");return t.className="cart-panel__content--empty",t.textContent="Your cart is empty.",t},P=()=>{let t=document.createElement("ul");return t.id="cart-panel__items",t.className="cart-panel__items",t},F=({store:t,abortListener:n})=>{let e=document.createElement("button");return e.id="cart-panel__btn-checkout",e.className="cart-panel__btn-checkout",e.textContent="Checkout",e.addEventListener("click",a=>{a.stopPropagation(),alert("You clicked checkout button"),D(t)},{signal:n.signal}),e},V=({store:t,abortListener:n,id:e,title:a,original:l,thumbnail:i,alt:r,quantity:s})=>{let o=l*s,d=document.createElement("li");d.className="cart-panel__item";let g=document.createElement("img");g.src=i,g.alt=r,g.className="cart-panel__item--image",d.appendChild(g);let p=document.createElement("span");p.className="cart-panel__item--description";let u=document.createElement("span");u.className="cart-panel__item--title",u.textContent=a;let m=document.createElement("span");m.className="cart-panel__item--details",m.textContent=`$${l.toFixed(2)} x ${s}`;let _=document.createElement("span");_.className="cart-panel__item--total",_.textContent=`$${o.toFixed(2)}`,p.appendChild(u),p.appendChild(m),p.appendChild(_),d.appendChild(p);let b=document.createElement("span");b.className="cart-panel__item--action";let h=document.createElement("button");h.className="cart-panel__item--action-remove";let f=document.createElement("img");return f.src="./images/icon-delete.svg",f.alt="Icon delete",h.addEventListener("click",q=>{q.stopPropagation(),A(t,e)},{signal:n.signal}),h.appendChild(f),b.appendChild(h),d.appendChild(b),d},H=({store:t,abortListener:n,$cartPanel:e})=>{let a=e.querySelector(".cart-panel__content"),l=t.getState().cart,i=y(t);if(a.innerHTML="",i===0){a.appendChild(z());return}let r=P();l.map(o=>{let{quantity:d}=o,{title:g,images:p,price:u,id:m}=o.product,{original:_}=u,{thumbnail:b,alt:h}=p.find(f=>f.default);return V({store:t,abortListener:n,id:m,title:g,original:_,thumbnail:b,alt:h,quantity:d})}).forEach(o=>{r.appendChild(o)}),a.appendChild(r),a.appendChild(F({store:t,abortListener:n}))},N=({isExpanded:t,$cartButton:n,$cartPanel:e})=>{let a=t?"false":"true",l=t?"Close cart panel":"Open cart panel";n.setAttribute("aria-expanded",a),n.setAttribute("aria-label",l),e.style.display=t?"none":"flex"},S=({store:t,$cartButton:n,$cartPanel:e})=>{let a=new AbortController,l=!1,i=()=>{a.abort(),a=new AbortController,l&&H({store:t,abortListener:a,$cartPanel:e})};n.addEventListener("click",function(r){r.preventDefault();let s=this.getAttribute("aria-expanded")==="true";N({isExpanded:s,$cartButton:n,$cartPanel:e}),l=!s,i()}),t.subscribe(()=>i()),document.addEventListener("click",r=>{if(!l)return;let s=e.contains(r.target),o=n.contains(r.target);!s&&!o&&N({isExpanded:!0,$cartButton:n,$cartPanel:e})})};var j=()=>`
<div class="product__gallery-main" id="lightbox__gallery-main">
    <img
      id="lightbox__main-image"
      class="product__gallery-image pointer"
      src=""
      alt=""
      aria-live="polite"
    />

    <button
      type="button"
      class="product__gallery-btn product__gallery-btn--prev"
      aria-label="Previous image"
    >
      <img
        src="./images/icon-previous.svg"
        alt="Previous Slide Icon"
        width="8"
        height="16"
      />
    </button>

    <button
      type="button"
      class="product__gallery-btn product__gallery-btn--next"
      aria-label="Next image"
    >
      <img
        src="./images/icon-next.svg"
        alt="Next Slide Icon"
        width="8"
        height="16"
      />
    </button>
  </div>

  <div
    id="lightbox__gallery-thumbnails"
    class="product__gallery-thumbnails"
    role="group"
    aria-label="Product image thumbnails"
  >
  </div>
  `,Q=({images:t,$content:n})=>(n.innerHTML=j(),x({slides:t,$mainImage:c("#lightbox__main-image"),$galleryThumbnails:c("#lightbox__gallery-thumbnails"),galleryId:"#lightbox__gallery-main"})),O=({$dialog:t,$content:n})=>{let e;return t.showModal||$dialogPolyfill.registerDialog(dialog),n.innerHTML="",t.querySelector(".lightbox__close").addEventListener("click",a=>{a.preventDefault(),e.abort(),t.close()}),({images:a})=>{a.length<1||(e=Q({images:a,$content:n}),t.showModal())}};(async()=>{let t=$(k),n=window.matchMedia("(min-width: 700px)");L();let e=await E(),{company:a,title:l,description:i,price:r,images:s,stock:o}=e,d=O({$dialog:c("#lightbox"),$content:c("#lightbox__gallery-main")});R({company:a,title:l,description:i,price:r}),I({stock:o,product:e,store:t}),t.subscribe(()=>M({store:t,$badge:c("#cart-button__badge")})),x({slides:s,$mainImage:c("#product__main-image"),$galleryThumbnails:c("#product__gallery-thumbnails"),galleryId:"#product__gallery-main"}),c("#product__main-image").addEventListener("dblclick",g=>{g.preventDefault(),n.matches&&d({images:s})}),S({store:t,$cartButton:c("#cart-button--toggle"),$cartPanel:c("#cart-panel")})})();})();
