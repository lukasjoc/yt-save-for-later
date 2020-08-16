<template>
	<div id="app">
	<h1>{{message}}</h1>
	</div>
</template>

<script>
import Vue from "vue"
export default Vue.extend({
	name: "App",
	data: () => {
		return {
			message: "I'm a chrome extension" // as string
		}
	}
})
</script>

<style lang="css" scoped>
* {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
}
</style


