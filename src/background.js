"use-strict"

function detectSite() {
	chrome.declarativeContent.onPageChanged.removeRules(undefined, ()  => {
		const rules = [
			{
				conditions: [
					new chrome.declarativeContent.PageStateMatcher({
						pageUrl: {
							hostEquals: "youtube.com",
							schemes: ["https"]
						}
					})
				],
				actions: [
					new chrome.declarativeContent.ShowPageAction()
				]
			}
		]
		chrome.declarativeContent.onPageChanged.addRules(rules)
	})
}

chrome.runtime.onInstalled.addListener(detectSite())

