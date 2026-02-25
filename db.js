import {Client} from 'pg'
import 'dotenv/config'

const client = new Client({
	user: 'postgres',
	password: process.env.PW_USER,
	host: 'localhost',
	port: 5334,
	database: 'inventory',
})

async function main(){
	await client.connect()

	async function insertNotebook(notebook_name, model, serial_number, price, status){
		let result = await client.query(
			'INSERT INTO notebook (notebook_name, model, serial_number, price, status) VALUES ($1, $2, $3, $4, $5) RETURNING *',
			[notebook_name, model, serial_number, price, status])
		return result.rows[0]
	}

	async function insertMonitor(monitor_name, price, status){
		let result = await client.query('INSERT INTO monitor (monitor_name, price, status) VALUES ($1, $2, $3) RETURNING *',
			[monitor_name, price, status]
		)
		return result.rows[0]
]
	
	async function insertDepartment(name){
		let result = await client.query(
			'INSERT INTO department (name) VALUES ($1) RETURNING *',
			[name]
		)
		return result.rows[0]
	}


	await client.end()
}

main()
