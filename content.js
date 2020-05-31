"use-strict"

console.log("DEBUG!! Content Script is loaded...")

function get_title() {
	let title = document.querySelector("h1.title")
	console.log(`TITLE: ${title.innerText}`)
	return title.innerHTML
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

function calc_percent() {
	duration_s = to_secs(get_duration())
	current_s = to_secs(get_current())

	return Math.round((current_s * 100) / duration_s)
}

// Taken from: https://stackoverflow.com/questions/9640266/convert-hhmmss-string-to-seconds-only-in-javascript
function to_secs(str) {
    var p = str.split(':'),
        s = 0, m = 1;

    while (p.length > 0) {
        s += m * parseInt(p.pop(), 10);
        m *= 60;
    }

    return s;
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
			percent: calc_percent(),
		}
	
		send_answer(payload)
		return true
	}
}

