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


// SETUP INDEXDB



let add_btn = document.querySelector(".add")
add_btn.addEventListener("click", handle_add)

// take data from content script and save it to indexedDB
// TODO: check on add if item in
const add = (info) => {
	console.log(info)


}

// on button click communicate with content script to get current video data
// then pipe the data to named function and then to localstorage. UNIT: YSFL
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
	
		chrome.tabs.sendMessage(tabs[0].id, payload, add)
	}
}


function render_list() {
}
