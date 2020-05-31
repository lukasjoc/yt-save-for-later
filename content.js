"use-strict"

chrome.runtime.onMessage.addListener(getMessage)
// TODO: where to save the data

function getMessage(message, sendder, sendResponse) {
	
	if (message.add_video == "current_video") {
		
		let title = document.querySelector(".title")
		console.log(`Title of current Video: ${title.innerText}`)
		
		let duration = document.querySelector(".ytp-time-duration")
		console.log(`Duration of Video: ${duration.innerHTML}`)

		let current = document.querySelector(".ytp-time-current")
		console.log(`Current Playback: ${current.innerHTML }`)

	}	

}

