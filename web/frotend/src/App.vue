<script setup>
  import {ref, onMounted} from 'vue'
  import Nav from './components/Nav.vue'
  

</script>

<template>
<Nav/>
	<main>
    <div class="wrapper">
  <router-view></router-view>
    </div>
	</main>
</template>

<style scoped>
	main{
    display: flex;
    justify-content: center;
    max-width: 1800px;
	}
</style>
