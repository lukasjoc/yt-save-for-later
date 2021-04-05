<template>
  <div id="app">
    <b-navbar
      :mobile-burger="false"
      fixed-top
      transparent
    >
      <template #brand>
        <b-navbar-item>
          yt-save-for-later
        </b-navbar-item>
        <b-navbar-item v-if="isAddable">
          <b-button
            size="is-small"
            rounded
            @click="addVideo"
          >
            Add Current Video
          </b-button>
        </b-navbar-item>
      </template>
    </b-navbar>


    <div
      v-if="data && data.length > 0"
      class="columns"
    >
      <div
        v-for="(video, index) in data"
        :key="index"
        class="column card"
      >
        <div class="card-content">
          <div class="content">
            <strong>{{ video.title }} </strong>
            <br>
            <span> by {{ video.index }}{{ video.channel }}</span>
            <span>{{ video.percent }} &#37; consumed</span>
          </div>

          <b-button
            tag="a"
            target="blank"
            class="content"
            size="is-small"
            rounded
            :href="video.link"
            @click="addVideo"
          >
            Resume
          </b-button>

          <b-button
            class="contnet"
            size="is-small"
            rounded
            @click="deleteVideo(video.vID)"
          >
            Delete
          </b-button>
        </div>
      </div>
    </div>
    <div
      v-else
      class="message"
    >
      <div class="message-body">
        <strong>Space seems to be emty ;(<strong> <br>
          Visit a Video and click the
          "Add Current Video" Button to  add a new
          video
        </strong></strong>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "App",

  data() {
    return {
      data: [],
      origin: "POPUP_HTML",
      isAddable: false,
    };
  },

  created() {
    this.detectPage();
    if (localStorage.videos === null) localStorage.removeItem("videos");
    if (localStorage.videos) this.data = JSON.parse(localStorage.videos);
  },

  methods: {

    // save to localStorage. normally used after this.data was mutated in some way
    // eg. update, insert, delete
    save() {
      localStorage.setItem("videos", JSON.stringify(this.data));
    },

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
          if (res.hostname === "www.youtube.com" && res.pathname === "/watch" ) {
            this.isAddable = true;
          }
        });

      });
    },

    addVideo() {
      console.log("added");
      const props = {
        currentWindow: true,
        active: true,
      };

      chrome.tabs.query(props, (tabs) => {
        const payload = {
          from: this.origin,
          why: "ADD_VIDEO",
        };

        chrome.tabs.sendMessage(tabs[0].id, payload, (_) => {
          if (this.hasVideo(_.vID)) {
            this.updateKeepIdx(_);
            this.save();
            return;
          }
          this.data.push(_);
          this.save();
          return;
        });
      });
    },

    // if video exists return true else false
    hasVideo(vidID) {
      if (this.data.length <= 0) return false;
      for (let i = 0; i < this.data.length; i++) {
        if (this.data[i].vID === vidID) return true;
      }
    },

    // update data on specific index
    updateKeepIdx(video) {
      for (let i = 0; i < this.data.length; i++) {
        if (this.data[i].vID === video.vID)
          this.$set(this.data, i, video);
      }
    },

    // delete specific element
    deleteVideo(vidID) {
      if (this.data.length <= 0) this.data.splice(0, 1);
      for (let i = 0; i < this.data.length; i++) {
        if (this.data[i].vID === vidID) this.data.splice(i, 1);
      }
      this.save();
    },
  },
};
</script>

<style scoped>
#app {
  height: 375px;
  width: 300px;
}
</style>