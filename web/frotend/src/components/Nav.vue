<script setup>

</script>

<template>
  <nav>
	<img src="/logo.png" id="logo">
	
	<div class="links"> 
    <router-link to="/">Empréstimos</router-link>
    <router-link to="/employees">Funcionários</router-link>
    <router-link to="/assets">Assets</router-link>
    	</div>
  </nav>
</template>

<style scoped>
nav{
  display: flex;
  align-items: center;
  min-height: 3rem;
  background-color: #7289DA;
  font-size: 1.5rem;
  box-shadow: inset 0 0 10px rgba(0,0,0,0.5);
}

nav img{
	width: 130px;
	max-height: 4rem;
	margin-left: 1rem;
}

.links{
	display: flex;
	flex: 1;
	justify-content: space-evenly;
  	font-size: clamp(18px, 2vw, 22px);
}

</style>
