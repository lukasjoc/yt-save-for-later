"use-strict"

function get_title() {
	let title = document.querySelector("h1.title")
	return title.innerText
}

function get_duration() {
	let duration = document.querySelector(".ytp-time-duration")
	return duration.innerText
}

function get_current() {
	let current = document.querySelector(".ytp-time-current")
	return current.innerText
}

function get_id() {
	let location = window.location
	let s = location.search
	return s.match(/[^=]{8,}/)[0]
}

function get_channel() {
	let channel = document.querySelector(".ytd-channel-name")
	return channel.innerText
}

function build_link() {
	let href = window.location.href
	let timestamp_s = calc_current_s()
	let link = `${href}&t=${timestamp_s}`
	return link
}

function calc_current_s() {
	return to_secs(get_current()) 
}

function calc_duration_s() {
	return to_secs(get_duration())
}

function calc_percent() {
	return Math.round((calc_current_s() * 100) / calc_duration_s())
}

function to_secs(str) {
	let p = str.split(":")
	let s = 0
	let m = 1
	while (p.length > 0) {
  	s += m * parseInt(p.pop(), 10)
    m *= 60
  }
	return s
}

chrome.runtime.onMessage.addListener( (message, sender, send_response) => {
	if ( (message.from !== "popup") || (message.why !== "add_video") ) {
		throw "Source device is not accepted"
		return
	}
	let payload = {
		id: get_id(),
		channel: get_channel(),
		link: build_link(),
		title: get_title(),
		duration: get_duration(),
		current: get_current(),
		percent: calc_percent()
	}
	send_response(payload)
})

