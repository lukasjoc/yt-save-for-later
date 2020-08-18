"use-strict"

function time_parse(str) {
	let time_props = {
		p: str.split(':'),
		s: 0,
		m: 1
	}
	while (time_props.p.length > 0) {
		time_props.s += time_props.m * parseInt(time_props.p.pop(), 10)
		time_props.m *= 60
	}
	return time_props.s
}

const	id = window.location.search.match(/[^=]{8,}/)[0];

const title = document.querySelector("h1.title").innerText;

const channel = document.querySelector(".ytd-channel-name").innerText;

const duration = document.querySelector(".ytp-time-duration").innerText;

const current = document.querySelector(".ytp-time-current").innerText;

const link = `${window.locaton.href}&t=${current}`;

const percent = Math.round((time_parse(current)* 100) / time_parse(duration));

chrome.runtime.onMessage.addListener(communicate)
function communicate(msg, sender, send_answer) {
	if ( (msg.from !== "popup") || (msg.why !== "add_video") ) return false
	let payload = {
		id: id,
		title: title,
		channel: channel,
		duration: duration,
		current: current,
		link: link,
		percent: percent
	}
	send_answer(payload)
	return true
}
