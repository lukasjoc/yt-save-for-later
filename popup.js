"use-strict"

console.log("DEBUG!! Popup Script loaded...")

// Add Button
let add_btn = document.querySelector(".add")
add_btn.addEventListener("click", handle_add)

const catch_info = (info) => {
	tray_emty = document.querySelector(".tray-emty")
	tray_emty.style.display = "none"

	video = document.querySelector(".video")
	video.style.display = "block"
	
	title = document.querySelector(".title")
	title.innerHTML = info.title

	current = document.querySelector(".current")
	current.innerHTML = info.current

	duration = document.querySelector(".duration")
	duration.innerHTML = info.duration

	current_percent = document.querySelector(".current-percent")
	current_percent.innerHTML = info.percent
}

// TODO: Communicate with contentent and return with data
function handle_add() {
	console.log("add is clicked!")
	let params = {active: true, currentWindow: true}
	chrome.tabs.query(params, communicate)
	
	function communicate(tabs) {
		let payload =  {
			from: "popup",
			why: "add_video"
		}
	
		chrome.tabs.sendMessage(tabs[0].id, payload, catch_info)
	}
}


