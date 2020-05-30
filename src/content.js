"use-strict"

// get dom content from backgroud communicatons
chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
	if (msg.text === "report_back") {
		sendResponse(document.all[0].outerHTML)
	}
})

function get_current_time() {
	current_time = document.querySelector(".ytp-time-current")
	return current_time.innerHTML
}

function get_video_duration() {
	duration = document.querySelector(".ytp-time-duration")
	return current_time.innerHTML
}

function truncate_str(str) {
	return (str.length >= 64) ? `${str.substr(0, target_lenght-1)}... ` : str
}

function get_video_title() {
	title = document.querySelector(".title")
	return truncate_str(title.innerText)
}

console.log("READ FROM DOM CONTENT:")
console.log("CURRENT TIME: --> ", get_current_time())
console.log("VIDEO DURATION: --> ", get_video_duration())
console.log("VIDEO TITLE: --> ", get_video_title())

// 
// // Video Current Time
// let current = document.querySelector(".current")
// current.innerHTML = get_current_time()
// 
// // Video Duration
// let duration = document.querySelector(".duration")
// duration.innerHTML = get_video_duration()
// 
// // Video Title
// let title = document.querySelector(".title")
// title.innerHTML = get_video_title()
// 
// 
// 
