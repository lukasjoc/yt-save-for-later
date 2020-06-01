"use-strict"

// What to store and how?
// Using the IndexedDB.. the data structure is designed around objects and could look
// like ths. that way a search for data mutation or deletion is easy with id search. Id is always unique
// ytsfl_db = {
// 	1 ...
//
// 	{
// 		"video_id": "VIDEO_ID",
// 		"title": "SOME_TITLE",
// 		"channel": "SOME_CHANNEL_NAME",
// 		"duration": 7:28,
// 		"current": 3:14,
// 		"percent": 50,
// 		"link": https://youtube.com/?v=[VIDEO_ID]&t=[current_s],
// 	},
//
// 	... N
// }
//

///////////////////

window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
window.IDBTransaction = window.IDBTransaction ||  window.webkitIDBTransaction || window.msIDBTransaction;
window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange

let db

// est. cursor from databse (open the database)
let req = window.indexedDB.open("ysfl_db")
req.onsuccess = function(event) {
	db = event.target.result
	console.log(`SUCCESS: ${db}`)
}

req.onerror = function(event) {
   console.log("ERR:")
}

// create a new object store
req.onupgradeneeded = function (event) {
	let db = event.target.result
	let store = db.createObjectStore("videos", {keyPath : "id"})
}

// add to the object store
const handle_answer = function (video) {	
	let req = db.transaction(["videos"], "readwrite")
	.objectStore("videos")
	.add(video)

	req.onsuccess = function(event) {
		console.log(`added ${video}`)
	}

	req.onerror = function() {
 		console.log("Unable to add data\r\n already exists in your database! ")
	}
}

////////

let add_btn = document.querySelector(".add")
add_btn.addEventListener("click", handle_add)

// on button click communicate with content script to get current video data
function handle_add() {	
	const params = {
		active: true,
		currentWindow: true
	}

	chrome.tabs.query(params, communicate)
	function communicate(tabs) {
		let payload =  {
			from: "popup",
			why: "add_video"
		}
	
		chrome.tabs.sendMessage(tabs[0].id, payload, handle_answer)
	}
}

