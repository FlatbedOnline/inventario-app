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

	#details{
		white-space: pre-wrap;
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
	<div class="section1">
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
			<div> ... </div>
		</div>
	
	<div v-for="n in notebook" :key="n.id" class="container">
		<div class="identifier">{{n.identifier}}</div>
		<div>{{n.model}}</div>
		<div>{{n.serial_number}}</div>
		<div v-if="n.status" class="funcionando">Funcionando</div>
		<div v-if="!n.status" class="quebrado">Quebrado</div>
		<div class="price">{{n.price}}R$</div>
		<div @click="details = n.details; console.log(details)"><a>More...</a></div>
	</div>

	<div class="container">
		<div>Total de notebooks: {{stats.not.total}} </div>	
		<div class="quebrados">Notebooks Quebrados: {{stats.not.quebrados}}</div>
		<div class="funcionando">Notebooks Funcionando: {{stats.not.funcionando}}</div>
		<div>|</div>
	<div class="price">Valor total: {{stats.not.valor}} R$</div>

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
			<div>Total de Monitores: {{stats.mon.total}} </div>	
			<div class="quebrados">Monitores quebrados: {{stats.mon.quebrados}}</div>
			<div class="funcionando">Monitores funcionando: {{stats.mon.funcionando}}</div>
			<div> | </div>
			<div id="text">Valor total: {{stats.mon.valor}} R$ </div>


		</div>
	
	</div>
		<div v-if ="button == 'televisor'" class="container">placeholder para televisores.</div>
		<div v-if ="button == 'numero'" class="container">placeholder para numeros.</div>
	</div>

	<div class="section2">
		<h1>Detalhes:</h1>
		<section>
			<div id="details">
				<p>{{details}}</p>
			</div>
		</section>
		<h1>Avaliações:</h1>
		<section>
			<div>	
				<p>Condição: Sem avaliações recentes.</p>
				<p>Departamento ideal: Sem avaliações recentes.</p>
			</div>
		</section>
	</div>
</div>
</template>


<script setup>
	import {onMounted, ref, computed} from 'vue'

	const api = import.meta.env.VITE_API_URL
	const notebook = ref([])
	const monitor = ref([])
	const televisor = ref([])
	const numero = ref([])
	const details = ref()
	
	const stats = computed(() => ({
		not: Loop(notebook.value),
		mon: Loop(monitor.value),
		tv: Loop(televisor.value)
	}))
	
	const button = ref()

	function Loop(res){

	const metadata = {
		quebrados: 0,
		funcionando: 0,
		valor: 0,
		total: 0
	}

	for (const n in res){
		metadata.valor += Number(res[n].price)
		metadata.total++
		if(res[n].status){
			metadata.funcionando++
		}else{
			metadata.quebrados++
		}

	}

	return metadata
} 

	
	function handle(data){
		
		button.value = data
		}

	onMounted(async () => {
		

    try{
  		const res = await fetch(`http://${api}:3000/notebook`)
		notebook.value = await res.json()

		const res2 = await fetch(`http://${api}:3000/monitor`)
		monitor.value = await res2.json()

		const resTelevisor = await fetch(`http://${api}:3000/televisores`)
		televisor.value = await resTelevisor.json()

		const resNumero = await fetch(`http://${api}:3000/numeros`)
		numero.value = await resNumero.json()
		

    } catch(erro){
    console.log(erro)
    }

    console.log(notebook.value[0].details)
    console.log(details.value)

	



})		

</script>
