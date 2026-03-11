<style scoped>
	#banner {
		height: 1.5rem;
		background-color: #1e2124;

	}

</style>
<template>
  <div class="section1">
		<div class="container" id="banner"> 
				<div class="item">
					Identificador
				</div>
				<div class="item">
					Nome
				</div>
				<div class="item">
					Departamento
				</div>

		</div>
		<div class="container" v-for="e in employees">
			<div class="item">
				{{e.identifier}}
			</div>
			<div class="item">
				{{e.employee}}
			</div>
			<div class="item">
				{{e.department}}
			</div>
    </div>

	</div>
  <div class="section2">
    <h1>Placeholder</h1>
  </div>
</template>

<script setup>
  import {onMounted, ref} from 'vue'
  
  const api = import.meta.env.VITE_API_URL


  const employees = ref([])

  onMounted(async () => { 

  try{
  const res = await fetch(`http://${api}:3000/employees`)
  employees.value = await res.json()
  
  } catch(err) {
    console.error(err.message)
  
  }
  
  })
</script>
