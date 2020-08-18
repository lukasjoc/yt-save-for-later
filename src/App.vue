<template>
	<div id="app">
		<div v-for="(i, index) in data" :key="index">
			{{i}}
		</div>
	</div>
</template>

<script>
module.exports = {
	name: "App",
	data: () => {
		return {
			msg: "Hello World. Shit this works : )",
			data: [
				{"test1": 1},
				{"test2": 2},
				{"test3": 3},
				{"test4": 4}
			]
		}
	}
}
</script>

<style lang="css" scoped>
* {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
}
</style


