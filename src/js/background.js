"use strict"

const baseURL = "youtube.com"

chrome.runtime.onInstalled.addListener( function () {
	chrome.storage.sync.set({baseURL: baseURL}, function () {
		console.log(` Plugin for ${baseURL} initialized in the background!!`)
	})
	
	let dec = chrome.declarativeContent
	let props = [{
			conditions: [new dec.PageStateMatcher({ pageUrl: {hostEquals: baseURL} }) ],
			actions: [new dec.ShowPageAction()]
	}]

	dec.onPageChanged.removeRules(undefined, function() {
		dec.onPageChanged.addRules(props)
	})

})

