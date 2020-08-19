<template>
	<div id="app">
		<div class="popup pure-g">
			<button class="pure-button button-xsmall" type="button" @click="addVideo">Add</button>
			<div v-if="data" v-for="(video, index) in data" :key="index">
				<div class="pure-u-1-3">
					<h3>{{video.title}}</h3>
					<span>{{video.current}}</span> /
					<span>{{video.duration}}</span>
					<span>{{video.percent}} % consumed</span>
				</div>
				<div>
					<a target="_blank" :href="video.link"><button type="button" class="pure-button button-xsmall">Resume</button></a>
					<button type="button" class="button-error pure-button button-xsmall" @click="deleteVideo(video.id)">Delete</button>
				</div>
			</div>
			<div v-else>
				Add new video by clicking the Add button
			</div>
		</div>
	</div>
</template>

<script>
module.exports = {
	name: "App",
	created() {
		if(localStorage.videos) {
			this.data = JSON.parse(localStorage.videos)
		}
	},
	data: () => {
		return {
			data: [],
		};
	},

	methods: {
		// TODO: check if update is neccessary
		addVideo() {
			const props = {
				currentWindow: true,
				active: true,
			}
			chrome.tabs.query(props, (tabs) => {
				const payload = {
					from: "popup",
					why: "add_video",
				}
			chrome.tabs.sendMessage(tabs[0].id, payload, (res) => {
					this.data.push(res)
					localStorage.setItem("videos", JSON.stringify(this.data))
					console.log(this.data);
				})
			})
		},
		deleteVideo(id) {
 			let videos = JSON.parse(localStorage.videos)
			for(i = 0; i <= videos.length; i++) {
				if(videos[i].id === id) {
					videos.splice(i, 1)
				}
			}
			this.data = videos
			localStorage.setItem("videos", JSON.parse(this.data))
 		} 
	},
};
</script>

<style scoped>
.popup {
	width: 300px;
	height: 300px;
}
</style>
