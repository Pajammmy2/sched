const CACHE='sched-v10';
const ASSETS=['./','./index.html','./manifest.json','./icon.png','./sounds/fn-chest.mp3','./sounds/fn-elim.mp3','./sounds/fn-shield.mp3','./sounds/fn-victory.mp3','./sounds/d1-engram.mp3','./sounds/d1-exotic.mp3','./sounds/d-rare.mp3','./sounds/d-legendary.mp3','./sounds/d-exotic.mp3','./sounds/d-prime.mp3'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)));self.skipWaiting();});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))));self.clients.claim();});
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET'||!e.request.url.startsWith(self.location.origin))return;
  e.respondWith(fetch(e.request,{cache:'no-store'}).then(r=>{const cp=r.clone();caches.open(CACHE).then(c=>c.put(e.request,cp));return r;}).catch(()=>caches.match(e.request)));
});
self.addEventListener('notificationclick',e=>{e.notification.close();e.waitUntil(clients.matchAll({type:'window'}).then(ws=>ws.length?ws[0].focus():clients.openWindow('./')));});
