<style scoped>
#banner{
	height: 1.5rem;
	background-color: #1e2124;
}

</style>
<template>
	<div class="wrapper">
  		<div v-for="e in employees" :key="e.id" class="container"id="banner">
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
</template>

<script setup>
  import {ref, onMounted} from 'vue'
  import dayjs from 'dayjs'
  	const employees = ref([])

	function formatDate(date){ 
		return dayjs(date).format('DD/MM/YYYY') 
		}



  
  onMounted(async () => {
  const res = await fetch('http://localhost:3000/assignments')
  employees.value = await res.json()

  console.log(employees.value)
  console.log(formatDate(employees.value[0].date_in))
})
</script>
