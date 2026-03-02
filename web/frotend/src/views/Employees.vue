<style scoped>
	#banner {
		height: 1.5rem;
		background-color: #1e2124;

	}

</style>
<template>
	<div class="wrapper">
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
</template>

<script setup>
  import {onMounted, ref} from 'vue'

  const employees = ref([])

  onMounted(async () => { 

  try{
  const res = await fetch('http://192.168.88.139:3000/employees')
  employees.value = await res.json()
  
  console.log(employees.value)

  } catch(err) {
    console.error(err.message)
  
  }
  
  })
</script>
