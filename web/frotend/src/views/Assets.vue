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
	.section2{
		white-space: pre-wrap;
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
      <div>Inspeções</div>
			<div> ... </div>
		</div>
	
	<div v-for="n in notebook" :key="n.id" class="container">
		<div class="identifier">{{n.identifier}}</div>
		<div>{{n.model}}</div>
		<div>{{n.serial_number}}</div>
		<div v-if="n.status" class="funcionando">Funcionando</div>
		<div v-if="!n.status" class="quebrado">Quebrado</div>
		<div class="price">{{n.price}}R$</div>
		<div @click="detalhes = 'inspection'; validator = search(n.id)"><a>Inspeções</a></div>
		<div @click="details = n.details; detalhes = 'details'"><a>More...</a></div>
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


    <div v-if="detalhes==='details'" class="section2">
		  <h1>Detalhes:</h1>
		  <section>
			  <div>
				  <p>{{details}}</p>
			  </div>
		  </section>
    </div>

    <div v-if="detalhes==='inspection'" class="section2">
      <div>
        <h1>Inspeções</h1>
        <section>
          <p>{{formatDate(validator.date_inspection)}} - {{validator.inspector}}</p>
          <p>Estrutura: {{validator.condition}} - Recomendação: {{validator.suitable}}</p>
          <p>{{validator.details}}</p>
        </section>
      </div>
    </div>




</template>


<script setup>
	import {onMounted, ref, computed, reactive} from 'vue'
  import dayjs from 'dayjs'

	const api = import.meta.env.VITE_API_URL

	const notebook = ref([]), monitor = ref([]), televisor = ref([]), numero = ref([]) //Asset itens.
  const inspect = ref([])
	
  const details = ref()
  const detalhes = ref()

  const validator = ref()

  const inspection = reactive([])
	
	const stats = computed(() => ({
		not: Loop(notebook.value),
		mon: Loop(monitor.value),
		tv: Loop(televisor.value)
	}))
	
	const button = ref()

  function search(notebook){

    let result = inspection.find(i => i.notebook_id == notebook)
    
    console.log(result)
   return result
  }

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

	function formatDate(date){ 
		return dayjs(date).format('DD/MM/YYYY') 
		}


	
	function handle(data){
		
		button.value = data
		}

	onMounted(async () => {
		
    try{
  	
    ;[notebook.value, monitor.value, televisor.value, numero.value] = await Promise.all([

      fetch(`http://${api}:3000/notebook`).then((res) => res.json()),
      fetch(`http://${api}:3000/monitor`).then((res) => res.json()),
      fetch(`http://${api}:3000/televisores`).then((res) => res.json()),
      fetch(`http://${api}:3000/numeros`).then((res) => res.json()),
      
      
      //I know I'm not handling http errors but this code is so frickin' clean that I don't want to extend its lines @-@ 
      //TO DO: Create error handling in these fetches if necessary. 
    ])

    const res = await fetch(`http://${api}:3000/inspection`).then((res) => res.json())
    inspection.push(...res)

    } catch(err){
        
        console.log(err)
    }

    console.log(inspection)
    console.log(notebook.value)

})		

</script>
