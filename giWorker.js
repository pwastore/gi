//Install
self.addEventListener("install", e => {
	e.waitUntil(
	  caches.open("static").then(cache => {
		return cache.addAll(['./','style.css']);
	  })
	);
});

//Fetch
self.addEventListener("fetch", e => {
	console.info(`intercepting fetch Request for: ${e.request.url}`);
	e.respondWith(
		caches.match(e.request).then(res => {
			return res || fetch(e.request);
		})
	);
    
});

//Error
self.addEventListener("error", function(e) {
  console.error(e.filename, e.lineno, e.colno, e.message);
});