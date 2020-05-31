"use-strict"

chrome.browserAction.onClicked.addListener(add_video);

function add_video(t) {
	let  actions =  {
  	add_video: "current_video"
	}

	chrome.tabs.sendMessage(t.id, actions)
}
