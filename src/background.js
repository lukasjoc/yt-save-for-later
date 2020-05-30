"use-strict"


function receive_dom(content) {
	console.log(content)
}

chrome.browserAction.onClicked.addListener(function (tab) {
	return chrome.tabs.sendMessage(tab.id, {text: "report_back"}, receive_dom)
})
