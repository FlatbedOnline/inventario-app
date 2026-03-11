<style scoped>
#banner{
	height: 1.5rem;
	background-color: #1e2124;
}

</style>
<template>
	<div class="section1">
  		<div class="container"id="banner">
			<div class="identifier">
				<p>Identificador</p>
			</div>
			<div class="name">
				Nome
			</div>
			<div class="department">
				Departamento
			</div>
			<div class="notebook">
				Notebook
			</div>
			<div class="monitor">
				Monitor
			</div>
			<div class="date_in">
				Aquisição
			</div>
			<div class="date_out">
				Devolução
			</div>

		</div>
		
    <div v-for="e in employees" :key="e.id" class="container">
			
      <div class="identifier">
			{{e.employee_identifier}}
			</div>
			
      <div class="name">
				{{e.employee}}
			</div>
			
      <div class="department">
				{{e.department}}
			</div>
			
      <div class="notebook">
				<p v-if="e.notebook"> {{e.notebook}} </p>
				<p v-else> Sem aquisição </p>
			</div>
			
      <div class="monitor">
				<p v-if="e.monitor"> {{e.monitor}} </p>
				<p v-else> Sem aquisição </p>
			</div>
			
      <div class="date_in">
				{{formatDate(e.date_in)}}
			</div>
			
      <div class="date_out">
				<p v-if="e.date_out">
				{{formatDate(e.date_out)}}
				</p>
				<p v-else> Presente </p>
			</div>
    

		</div>

  </div> 

  <div class="section2">
        <h1>Placeholder</h1> 
  </div>

</template>

<script setup>
  import {ref, onMounted} from 'vue'
  import dayjs from 'dayjs'
	const api = import.meta.env.VITE_API_URL
  
  const employees = ref([])

	function formatDate(date){ 
		return dayjs(date).format('DD/MM/YYYY') 
		}



  
  onMounted(async () => {
  const res = await fetch(`http://${api}:3000/assignments`)
  employees.value = await res.json()

})
</script>
