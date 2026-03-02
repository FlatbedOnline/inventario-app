<template>
  <h1>{{employees}}</h1>
</template>

<script setup>
  import {onMounted, ref} from 'vue'

  const employees = ref([])

  onMounted(async () => { 

  try{
  const res = await fetch('http://localhost:3000/employees')
  employees.value = await res.json()
  
  console.log(employees.value)

  } catch(err) {
    console.error(err.message)
  
  }
  
  })
</script>
