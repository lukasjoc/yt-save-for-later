"use-strict"

function getTitle() {
	let title = document.querySelector("h1.title")
	return title.innerText
}

function getDuration() {
	let duration = document.querySelector(".ytp-time-duration")
	return duration.innerText
}

function getCurrent() {
	let current = document.querySelector(".ytp-time-current")
	return current.innerText
}

function getvID() {
	let location = window.location
	let s = location.search
	return s.match(/[^=]{8,}/)[0]
}

function getChannel() {
	let channel = document.querySelector(".ytd-channel-name")
	return channel.innerText
}

function buildLink() {
	let h = window.location.href
	let t = calcCurrentS()
	return `${h}&t=${t}`
}

function calcCurrentS() {
	return toSeconds(getCurrent())
}

function calcDurationS() {
	return toSeconds(getDuration())
}

function calcPercent() {
	return Math.round((calcCurrentS()*100)/calcDurationS())
}

function toSeconds(str) {
	let p = str.split(":")
	let s = 0
	let m = 1
	while (p.length > 0) {
		s += m*parseInt(p.pop(), 10)
		m *= 60
	}
	return s
}

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
	if (msg.from === "POPUP_HTML" && msg.why === "ADD_VIDEO") {
		let payload = {
			id: getvID(),
			channel: getChannel(),
			link: buildLink(),
			title: getTitle(),
			duration: getDuration(),
			current: getCurrent(),
			percent: calcPercent()
		}
		sendResponse(payload)
		return true

	} else if (msg.from === "POPUP_HTML" && msg.why === "DETECT_PAGE") {
		let win = window.location
		let payload = {
			hostname: win.hostname,
			pathname: win.pathname
		}
		sendResponse(payload)
		return true
	}
})


