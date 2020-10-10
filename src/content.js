"use-strict"

const getTitle = () => document.querySelector("h1.title").innerText

const getDuration = () => document.querySelector(".ytp-time-duration").innerText

const getCurrent = () => document.querySelector(".ytp-time-current").innerText

const getvID = () => window.location.search.match(/[^=]{8,}/)[0]

const getChannel = () => document.querySelector(".ytd-channel-name > yt-formatted-string").innerText

const buildLink = () => `${window.location.href}&t=${calcCurrentS}`

const calcCurrentS = () =>  toSeconds(getCurrent())

const calcDurationS = () => toSeconds(getDuration())

const calcPercent = () => Math.round((calcCurrentS() * 100) / calcDurationS())

const toSeconds = (str) => {
	let p = str.split(":")
	let s = 0
	let m = 1
	while (p.length > 0) {
		s += m * parseInt(p.pop(), 10)
		m *= 60
	}
	return s
}

window.addEventListener("load", () => {
	chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
		if (msg.from === "POPUP_HTML" && msg.why === "ADD_VIDEO") {
			let payload = {
				vID: getvID(),
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
})
