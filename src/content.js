"use-strict"

class Content {

	getTitle() {
		let title = document.querySelector("h1.title")
		return title.innerText
	}

	getDuration() {
		let duration = document.querySelector(".ytp-time-duration")
		return duration.innerText
	}

	getCurrent() {
		let current = document.querySelector(".ytp-time-current")
		return current.innerText
	}

	getvID() {
		let location = window.location
		let s = location.search
		return s.match(/[^=]{8,}/)[0]
	}

	getChannel() {
		let channel = document.querySelector(".ytd-channel-name > yt-formatted-string")
		return channel.innerText
	}

	buildLink() {
		let h = window.location.href
		let t = this.calcCurrentS()
		return `${h}&t=${t}`
	}

	calcCurrentS() {
		return this.toSeconds(this.getCurrent())
	}

	calcDurationS() {
		return this.toSeconds(this.getDuration())
	}

	calcPercent() {
		return Math.round((this.calcCurrentS()*100)/this.calcDurationS())
	}

	toSeconds(str) {
		let p = str.split(":")
		let s = 0
		let m = 1
		while (p.length > 0) {
			s += m*parseInt(p.pop(), 10)
			m *= 60
		}
		return s
	}

}

window.addEventListener("load", () =>  {
	chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
		if (msg.from === "POPUP_HTML" && msg.why === "ADD_VIDEO") {
			const content = new Content()
			let payload = {
				vID: content.getvID(),
				channel: content.getChannel(),
				link: content.buildLink(),
				title: content.getTitle(),
				duration: content.getDuration(),
				current: content.getCurrent(),
				percent: content.calcPercent()
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
