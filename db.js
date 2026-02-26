import {Pool} from 'pg'
import 'dotenv/config'

const pool = new Pool({
	user: 'postgres',
	password: process.env.PW_USER,
	host: 'localhost',
	port: 5334,
	database: 'inventory',
})


//INSERT FUNCTIONS
export async function insertNotebook(data){
	let {
		identifier,
		serial_number,
		model,
		price = null,
		status } = data

	if (!identifier || !serial_number || !model)
		throw new Error('Identifier, serial number and model are required.')
	
	if (status === undefined){
	let result = await pool.query(
		'INSERT INTO notebook (identifier, serial_number, model, price) VALUES ($1, $2, $3, $4) RETURNING *',
		[identifier, serial_number, model, price])
	
	return result.rows[0]
	}
	
	let result = await pool.query(
		'INSERT INTO notebook (identifier, serial_number, model, price, status) VALUES ($1, $2, $3, $4, $5) RETURNING *',
		[identifier, serial_number, model, price, status])
	
	return result.rows[0]
}

//INSERT MONITOR
export async function insertMonitor(data){
	let {
		identifier,
		model,
		price,
		status
	} = data

	let result = await pool.query(
		'INSERT INTO monitor (monitor_name, price, status) VALUES ($1, $2, $3) RETURNING *', [model, price, status])

	return result.rows[0]
}

//INSERT DEPARTMENT
export async function insertDepartment(name){
	let result = await pool.query(
		'INSERT INTO department (name) VALUES ($1) RETURNING *', [name])
		
	return result.rows[0]
}

//INSERT EMPLOYEE
export async function insertEmployee(name, departmentName){
	let dep = await pool.query(
		'SELECT id FROM department WHERE name = $1', [departmentName])

	if(dep.rows.length === 0)
		throw new Error(`Department ${departmentName} not found.`)
		
	let depResult = dep.rows[0].id

	let result = await pool.query(
		'INSERT INTO employee(name, department_id) VALUES ($1, $2) RETURNING *', [name, depResult])

	return result.rows[0]
}

//INSERT ASSIGNMENT
export async function insertAssignment(data) {

	let {
		date_in, //DEFAULT CURRENT_DATE
		employee, //NOT NULL
		identifier_not,
		identifier_mon
	} = data

	let employee_search = await pool.query(
		'SELECT id FROM employee WHERE name=$1', [employee])

	if (employee_search.rows.length === 0)
		throw new Error(`${employee} not found`)

	let employee_id = employee_search.rows[0].id

	if (!identifier_not && !identifier_mon) {
	throw new Error("No asset provided")
	}

	let notebook_id = null
	let monitor_id = null

	if(identifier_not){
		let asset = await pool.query(
			'SELECT id FROM notebook WHERE identifier=$1', [identifier_not])

		if (asset.rows.length === 0)
			throw new Error(`${identifier_not} not found`)
	
		notebook_id = asset.rows[0].id
		
	}

	if(identifier_mon){
		let asset = await pool.query(
			'SELECT id FROM monitor WHERE identifier=$1', [identifier_mon])

		if (asset.rows.length === 0)
			throw new Error(`${identifier_mon} not found`)

		monitor_id = asset.rows[0].id

		}

	let result = await pool.query('INSERT INTO assignment(employee_id, notebook_id, monitor_id) VALUES($1, $2, $3) RETURNING *', [employee_id, notebook_id, monitor_id])

	return result.rows[0]
}


	


		


