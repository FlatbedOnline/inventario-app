<script setup>
  import {ref, onMounted} from 'vue'
  import Nav from './components/Nav.vue'
  

</script>

<template>
<Nav/>
	<main>
  <router-view></router-view>
	</main>
</template>

<style scoped>
	main{
		display: flex;
		justify-content: center;
		width: 100vw;
		height: 100vh;
	}
</style>
