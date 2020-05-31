"use-strict"

console.log("DEBUG!! Content Script is loaded...")

function get_title() {
	let title = document.querySelector(".title")
	console.log(`TITLE: ${title.innerText}`)
	return title.innerText
}

function get_duration() {
	let duration = document.querySelector(".ytp-time-duration")
	console.log(`DURATION: ${duration.innerHTML}`)
	return duration.innerHTML
}

function get_current() {
	let current = document.querySelector(".ytp-time-current")
	console.log(`CURRENT: ${current.innerHTML}`)
	return current.innerHTML
}

function calc_persant() {
	// TODO: implement ME
	return String(0)
}

// Start communicating with popup
chrome.runtime.onMessage.addListener(communicate)
function communicate(msg, sender, send_answer) {
	console.log(msg)

	if ((msg.from === "popup") && (msg.why === "add_video") ) {
		console.log("IN THE CHECK DONE!!")
		var payload = {
			title: get_title(),
			duration: get_duration(),
			current: get_current(),
			persant: calc_persant(),
		}
	
		send_answer(payload)
		return true
	}
}

