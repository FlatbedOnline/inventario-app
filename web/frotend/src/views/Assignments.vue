<template>
  <div>{{employees}}</div>
</template>

<script setup>
  import {ref, onMounted} from 'vue'
  
  const employees = ref([])
  
  onMounted(async () => {
  const res = await fetch('http://localhost:3000/assignments')
  employees.value = await res.json()

  console.log(employees.value)
})
</script>
