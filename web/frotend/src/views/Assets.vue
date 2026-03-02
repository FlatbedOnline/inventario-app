<style scoped>
	.ContentSelection{
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 2rem;
		width: 100%;
		background-color: black;
		block-size: 3rem;
	}

	nav button{
		color: white;
		block-size: 2.5rem;

	}
	nav button:hover{
		background-color: green;
	}

	.identifier{
		color: #FFFFFF;
	}

	.price{
		color: green;
	}

	.quebrados{
		color: red;
	}

	.funcionando{
		color: #8CE03A;
	}
</style>

<template>
	<div class="wrapper">
	<nav class="ContentSelection"> 
		<button @click="handle('notebook')">Notebooks</button> 
		<button @click="handle('monitor')">Monitores</button>
		<button @click="handle('televisor')">Televisores</button>
		<button @click="handle('numero')">Números de Telefone</button>
	</nav>

	<div v-if="button=='notebook'">

		<div class="container">
			<div>Identificador</div>
			<div>Modelo</div>
			<div>Serial Number</div>
			<div>Status</div>
			<div>Preço unitário</div>
		</div>
	
	<div v-for="n in notebook" :key="n.id" class="container">
		<div class="identifier"> {{n.identifier}} </div>
		<div> {{n.model}} </div>
		<div> {{n.serial_number}} </div>
		<div v-if="n.status" class="funcionando">Funcionando</div>
		<div v-if="!n.status" class="quebrado">Quebrado</div>
		<div class="price">{{n.price}}R$</div>
	</div>

	<div class="container">
		<div>Total de notebooks: {{totalnotebook}} </div>	
		<div class="quebrados">Notebooks Quebrados: {{notebooksquebrados}}</div>
		<div class="funcionando">Notebooks Funcionando: {{notebooksfuncionando}}</div>
		<div>|</div>
	<div class="price">Valor total: {{result}} R$</div>

	</div>

	</div>
		<div v-if="button =='monitor'">

		<div class="container">
			<div>Identificador</div>
			<div>Modelo</div>
			<div>Serial Number</div>
			<div>Status</div>
			<div>Preço unitário</div>
		</div>
		<div v-for="n in monitor" :key="n.id" class="container">
			<div>{{n.identifier}}</div>
			<div>{{n.model}}</div>
			<div>{{n.serial_number}}</div>
			<div>{{n.status}}</div>
			<div>{{n.price}}R$</div>
		</div>
		
		<div class="container" id="price">
			<div>Total de Monitores: {{totalmonitor}} </div>	
			<div class="quebrados">Monitores quebrados: {{monitoresquebrados}}</div>
			<div class="funcionando">Monitores funcionando: {{monitoresfuncionando}}</div>
			<div> | </div>
			<div id="text">Valor total: {{result2}} R$ </div>


		</div>
	
	</div>
		<div v-if ="button == 'televisor'" class="container"> placeholder para televisores. </div>
		<div v-if ="button == 'numero'" class="container"> placeholder para numeros. </div>
	</div>
</template>


<script setup>
	import {onMounted, ref} from 'vue'
	import dotenv from 'dotenv'

	const notebook = ref([])
	const monitor = ref([])
	const result = ref(0)
	const result2 = ref(0)
	const totalnotebook = ref(0)
	const totalmonitor = ref(0)

	const notebooksquebrados = ref(0)
	const notebooksfuncionando = ref(0)

	const monitoresquebrados = ref(0)
	const monitoresfuncionando = ref(0)
	
	const button = ref()
	
	function handle(data){
		
		button.value = data
		}

	onMounted(async () => {
		
		console.log("teste")
		console.log("debug", process.env.ADDRESS_USER)

		const res = await fetch(`http://${process.env.ADDRESS_USER}/notebook`)
		notebook.value = await res.json()
		console.log(notebook.value)

		const res2 = await fetch(`http://${process.env.ADRESS_USER}/monitor`)
		monitor.value = await res2.json()
		console.log(monitor.value)

		
		for(const n in notebook.value){
				result.value += parseFloat(Number(notebook.value[n].price))
				totalnotebook.value++
				
				if(notebook.value[n].status){
					notebooksfuncionando.value++
					}

				if(!notebook.value[n].status){
					notebooksquebrados.value++
					}
		}

		for(const n in monitor.value){
				result2.value += parseFloat(Number(notebook.value[n].price))	
				totalmonitor.value++			
			
				if(monitor.value[n].status){
					monitoresfuncionando.value++
					}

				if(!monitor.value[n].status){
					monitoresquebrados.value++
					}
		}

	})



</script>
