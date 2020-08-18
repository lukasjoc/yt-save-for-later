<template>
	<div id="app">
		<div class="pure-g popup">
			<button type="button" @click="addVideo()">Add</button>
			<div v-for="(video, index) in data" :key="index">
				<div class="pure-u-1-3">
					<h3>{{video.title}}</h3>
					<span>{{video.current}}</span> /
					<span>{{video.duration}}</span>
					<span>{{video.percent}} % consumed</span>
				</div>
				<div>
					<a :href="video.link"><button type="button" class="resume">Resume</button></a>
					<button type="button" class="delete" @click="deleteVideo(video.id)">Delete</button>
				</div>
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
				});
			});
		},
		deleteVideo(id) {
			let videos = JSON.parse(localStorage.videos)
			for(let i = 0; i <= videos.length; i++) {
				if(videos[i].id === id) {
					videos.splice(i, 1)
				}
			} 
		},
	},
};
</script>


<style scoped>
/* @import url(https://unpkg.com/purecss@2.0.3/build/pure-min.css); */
.popup {
	width: 300px;
	height: 300px;
}
</style>
