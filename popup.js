"use-strict"

console.log("DEBUG!! Popup Script loaded...")

// Add Button
let add_btn = document.querySelector(".add")
add_btn.addEventListener("click", handle_add)

const my_info = (info) => {
	console.log(info)
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

		chrome.tabs.sendMessage(tabs[0].id, payload,  my_info)
	}
}


