const cacheVersion='v1'
const cacheList=[
	"/offline/offline.html",
	"/offline/Inter-Regular.ttf", 
	  "/icons/jiggy-1024-x-1024.png"
]

const backendOrigins=['https://jiggybackend.onrender.com']

self.addEventListener("install", (event) => {
	  event.waitUntil((async function(){
	  	const cache= await caches.open(cacheVersion)
	  	return cache.addAll(cacheList)
	  })())
	})

self.addEventListener('fetch', (event)=>{
	const {destination}=event.request
	event.respondWith(
		fetch(event.request)
		.then(res=>{
			const response=res.clone()
			if(!res.ok){
			}
			return response
		})
		.catch((err)=>{
			//when network fails and the request is made to the backend api, return the normal fetch response. i.e error response
			const origin= urlOrigin(event.request.url)
			if(backendOrigins.includes(origin)){
				return fetch(event.request)
				.then(res=>res)
				.catch(err=>console.error(err))
			}
			// return the cached offline pages when network fails and a request is made(not to the backend API)
			return caches.match(event.request)
			.then(match=>{
				if(match!=undefined) return match;
				return caches.match("/offline/offline.html")
			})
		})
	)
})


self.addEventListener('activate', ()=>{
	caches.keys()
	.then(cacheNames=>{
		return Promise.all(cacheNames.map(item=>item!=cacheVersion?caches.delete(item):null))
	})
})
//helper functions
function urlOrigin(url){
	const urlObject= new URL(url)
	const {origin}= urlObject
	return origin
}