/* Tinky 1.84: la pagina resta sul telefono e si apre anche senza rete (scritto da prepara_pages.py) */
const C="tinky-1.84",F=["./","index.html","manifest.webmanifest","icona-180.png","icona-32.png","icona-512.png"];
self.addEventListener("install",e=>{self.skipWaiting();e.waitUntil(caches.open(C).then(c=>c.addAll(F.map(u=>new Request(u,{cache:"reload"})))));});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(n=>n.startsWith("tinky-")&&n!==C).map(n=>caches.delete(n)))).then(()=>self.clients.claim()));});
self.addEventListener("fetch",e=>{const r=e.request;if(r.method!=="GET")return;const u=new URL(r.url);
  if(u.origin!==location.origin||u.pathname.endsWith("versione.json"))return;
  e.respondWith(caches.match(r,{ignoreSearch:true}).then(x=>x||(r.mode==="navigate"?caches.match("index.html"):null)).then(x=>x||fetch(r)));});
