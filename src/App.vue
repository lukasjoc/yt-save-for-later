<template>
	<div id="app">
		<header>
			<h1>yt-save-for-later</h1>
			<div v-if="isAddable" class="header">
				<button class="ytbutton" @click="addVideo"> Add </button>
			</div>
		</header>
		<div class="card-list">
			<div class="card" v-for="(video, index) in data" :key="index">
				<div class="card-header">
					<span>{{video.channel}}</span>
					<h4>{{video.title}}</h4>
				</div>
				<div class="card-footer">
					<span>{{video.percent}} &#37; consumed</span>
					<a target="_blank" :href="video.link"><button>Resume</button></a>
					<button @click="deleteVideo(video.id)">Delete</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>

module.exports = {
	name: "App",

	created() {
		this.detectPage()
		if (localStorage.videos === null) localStorage.removeItem(videos)
		if (localStorage.videos) this.data = JSON.parse(localStorage.videos)
	},

	data: () => {
		return {
			data: [],
			origin: "POPUP_HTML",
			isAddable: false,
		};
	},

	methods: {
		detectPage() {
			const props = {
				currentWindow: true,
				active: true,
			};
			chrome.tabs.query(props, (tabs) => {
				const payload = {
					from: this.origin,
					why: "DETECT_PAGE",
				};
				chrome.tabs.sendMessage(tabs[0].id, payload, (res) => {
					if (res.hostname === "www.youtube.com" && res.pathname === "/watch") {
						this.isAddable = true
					}
				});
			});
		},

		addVideo() {
			const props = {
				currentWindow: true,
				active: true,
			};
			chrome.tabs.query(props, (tabs) => {
				const payload = {
					from: this.origin,
					why: "ADD_VIDEO",
				};
				chrome.tabs.sendMessage(tabs[0].id, payload, (res) => {
					this.data.push(res)
					localStorage.setItem("videos", JSON.stringify(this.data));
				});
			});
		},

		deleteVideo(id) {
			for(let video of this.data) {
				if(video.id === id) this.data.shift(id, 1)
			}
			localStorage.setItem("videos", JSON.stringify(this.data));
		},

	},

};
</script>

<style scoped>

html, body {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
	outline: none;
}

.card,
header {
	padding: 1rem;
}

header {
	display: flex;
	flex-flow: row nowrap;
	justify-content: space-between;
	align-items: center;
}

#app,
.card,
.card-list {
	display: flex;
	flex-flow: column nowrap;
}

#app {
	width: 300px;
}

.card-list,
.card-header,
.card-footer {
	width: 100%;
}

.card {
	width: 80%;
	background-color: #f9f9f9;
	border-radius: 3px;
	box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
	transition: all 0.3s cubic-bezier(.25,.8,.25,1);
	margin-bottom: 1rem;
}

.card-list {
	height: 100%;
	justify-content: center;
	align-items: center;
}
</style>

