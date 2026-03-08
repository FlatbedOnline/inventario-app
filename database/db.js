import {Pool} from 'pg'
import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.resolve('../.env') })


const pool = new Pool({
	user: 'postgres',
	password: process.env.PW_USER,
	host: 'localhost',
	port: 5432,
	database: 'inventory'
})

/*------------------------------ INSERT COMMANDS ----------------------------*/

//INSERT NOTEBOOK
export async function insertNotebook(data){
	let {
		identifier,
		serial_number,
		model,
		price = null,
		details,
		status } = data

	if (!identifier || !serial_number || !model)
		throw new Error('Identifier, serial number and model are required.')
	
	if (status === undefined){
	let result = await pool.query(
		'INSERT INTO notebook (identifier, serial_number, model, price, details) VALUES ($1, $2, $3, $4, $5) RETURNING *',
		[identifier, serial_number, model, price, details])
	
	return result.rows[0]
	}
	
	let result = await pool.query(
		'INSERT INTO notebook (identifier, serial_number, model, price, details, status) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
		[identifier, serial_number, model, price, details, status])
	
	return result.rows[0]
}

//INSERT MONITOR
export async function insertMonitor(data){
	let {
		identifier, //NOT NULL
		model, // NOT NULL
		price,
		status// DEFAULT true
	} = data

	if(!identifier || !model)
		throw new Error('Identifier and model are required.')

  let result = null;

    result = await pool.query(
      `INSERT INTO monitor (identifier, model, price, status) 
      VALUES ($1, $2, $3, $4) RETURNING *`, 
      [identifier, model, price, status]);


	return result.rows[0]
}

//INSERT DEPARTMENT
export async function insertDepartment(name){
	let result = await pool.query(
		'INSERT INTO department (name) VALUES ($1) RETURNING *', [name])
		
	return result.rows[0]
}

//INSERT EMPLOYEE
export async function insertEmployee(data){

	let {
		identifier,
		name,
		departmentName
	} = data

	if(!identifier || !name || !departmentName)
		throw new Error('Identifier, department name or name not specified.')

	let dep = await pool.query(
		'SELECT id FROM department WHERE name = $1', [departmentName])
	

	if(dep.rows.length === 0)
		throw new Error(`Department ${departmentName} not found.`)
		
	dep = dep.rows[0].id

	let result = await pool.query(
		'INSERT INTO employee(identifier, name, department_id) VALUES ($1, $2, $3) RETURNING *', [identifier, name, dep])

	return result.rows[0]
}

//INSERT ASSIGNMENT
export async function insertAssignment(data) {

	let {
		employee_identifier, //NOT NULL
		identifier_not,
		identifier_mon,
		date_in //DEFAULT CURRENT_DATE
	} = data
	
	
	let employee_search = await pool.query(
		'SELECT id FROM employee WHERE identifier=$1', [employee_identifier])

	if (employee_search.rows.length === 0)
		throw new Error(`${employee_identifier} not found`)

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
	
	let result = null

	if(!date_in){
	result = await pool.query('INSERT INTO assignment(employee_id, notebook_id, monitor_id) VALUES($1, $2, $3) RETURNING *', [employee_id, notebook_id, monitor_id])
	
	}else {
	result = await pool.query('INSERT INTO assignment(employee_id, notebook_id, monitor_id, date_in) VALUES($1, $2, $3, $4) RETURNING *', [employee_id, notebook_id, monitor_id, date_in])
	
	}

	return result.rows[0]
}

//FINISH ASSIGNMENT
export async function finishAssignment(data){
	let {
		employee_identifier,
		date_out
	} = data
	
	if(!employee_identifier || !date_out)
		throw new Error('Neither employee or date_out can be undefined.')

	let employee_id = await pool.query('SELECT id FROM employee WHERE identifier=$1', [employee_identifier])

	if(employee_id.rows.length === 0)
		throw new Error(`${employee_identifier} not found.`)

	employee_id = employee_id.rows[0].id

	let result = await pool.query('UPDATE assignment SET date_out = $1 WHERE employee_id = $2 AND date_out IS NULL RETURNING *', [date_out, employee_id])
	
	if(result.rows.length === 0)
		throw new Error('Employee has no active assignment.')

	return result.rows[0]
}

//INSERT INSPECTION
export async function insertInspection(data){
	let {
		inspector, 
		condition, //NOT NULL (number between 1 in 10)
		suitable, //NOT NULL (between 1 and 3)
		details, 
		notebook_identifier} = data

	if(!notebook_identifier || !inspector || condition == 0 || suitable == 0)
		throw new Error('notebook identifier, inspector, condition and suitable cannot be null')

	let notebook_id = await pool.query(
		`SELECT id FROM notebook WHERE identifier = $1`,
	[notebook_identifier])

	if(notebook_id.rows.length === 0)
		throw new Error(`${notebook_identifier} not found`)

	notebook_id = notebook_id.rows[0].id

	condition = Number(data.condition)
	suitable = Number(data.suitable)
	
	let result = await pool.query(`
		INSERT INTO inspection
		(inspector, condition, suitable, details, notebook_id)
		VALUES($1, $2, $3, $4, $5)
		RETURNING *`,
		[inspector, condition, suitable, details, notebook_id]
	)
	
	return result.rows[0]

}

//INSERT NUMBER
export async function insertNumero(data){
	let {
		phone_number,
		identifier,
		owner,
		price,
		status } = data

	if(!phone_number || !owner || !identifier)
		throw new Error('phone number, owner and identifier cannot be undefined')
	
	let result = await pool.query(
		`INSERT INTO televisor(phone_number, identifier, owner, price, status)
		 VALUES($1, $2, $3, $4, $5) RETURNING *`, [phone_number, identifier, owner, price ?? null, status ?? true])
	
	
	return result.rows[0]
}

//INSERT TELEVISOR
export async function insertTelevisor(data){
	let {
		identifier, model, price, status
	} = data

	if(!identifier || !model)
		throw new Error('identifier or model cannot be undefined')
	
	let result = await pool.query(
		`INSERT INTO televisor(identifier, model, price, status)
		 VALUES($1, $2, $3, $4) RETURNING *`,
		[identifier, model, price ?? null, status ?? true])

	return result.rows[0]
}

/*------------------------------- SELECT COMMANDS ------------------------------*/

//Show all assignments
export async function showAll(){
	let result = await pool.query(
    `SELECT a.id, e.identifier AS employee_identifier, e.name AS employee, d.name AS department, n.identifier AS notebook, m.identifier AS monitor, a.date_in, a.date_out 
    FROM assignment a 
    JOIN employee e ON a.employee_id = e.id 
    JOIN department d ON e.department_id = d.id LEFT 
    JOIN notebook n ON a.notebook_id = n.id 
    LEFT JOIN monitor m ON a.monitor_id = m.id;`)

	return result.rows
}

export async function searchAssignment(data){
  let { name } = data
  
  if(!name)
    throw new Error('Name cannot be undefined.');

  let result = await pool.query(
    `SELECT a.id, e.identifier AS employee_identifier, e.name AS employee, d.name AS department, n.identifier AS notebook, m.identifier AS monitor, a.date_in, a.date_out
    FROM assignment a 
    JOIN employee e ON a.employee_id = e.id
    JOIN department d ON e.department_id = d.id 
    LEFT JOIN notebook n ON a.notebook_id = n.id 
    LEFT JOIN monitor m ON a.monitor_id = m.id
    WHERE e.name ILIKE $1;`,
    [`%${name}%`])

  return result.rows
}

//Search employee
export async function searchEmployee(data) {
  let { name } = data
  
  if(!name)
    throw new Error(`Name cannot be undefined.`)
  
  let result = await pool.query(
    `SELECT e.identifier, e.name AS employee, d.name AS department 
    FROM employee e 
    JOIN department d ON e.department_id = d.id 
    WHERE e.name ILIKE $1`, 
    [`%${name}%`])

  if(result.rows.length === 0)
    throw new Error(`No matches for ${name} found.`)
  
  return result.rows
}

//Show all employees
export async function showAllEmployees(){
	let result = await pool.query(
    `SELECT e.identifier, e.name AS employee, d.name AS department 
    FROM employee e 
    JOIN department d ON e.department_id = d.id`)

	return result.rows
}

//Search computers 
export async function searchComputers(data){
  let {identifier, model} = data

  if(!identifier && !model)
    throw new Error('Name and identifier cannot be undefined.')

  if(identifier && model)
    throw new Error('You cannot use both.') //To Do: criar método de consulta binaria
  
  let result = null

  if (identifier && !model)
    result = await pool.query('SELECT * FROM notebook WHERE identifier = $1', [identifier]);
  
  if (model && !identifier)
    result = await pool.query('SELECT * FROM notebook WHERE model ILIKE $1', [`%${model}%`]);

  return result.rows
}

//Show all computers
export async function showAllNotebooks(){
	let result = await pool.query('SELECT * FROM notebook')

	return result.rows
}

//Search monitors 
export async function searchMonitors(data){
    let {identifier, model} = data

  if(!identifier && !model)
    throw new Error('Name and identifier cannot be undefined.')

  if(identifier && model)
    throw new Error('You cannot use both.') //To Do: criar método de consulta binaria
  
  let result = null

  if (identifier && !model)
    result = await pool.query('SELECT * FROM monitor WHERE identifier = $1', [identifier]);
  
  if (model && !identifier)
    result = await pool.query('SELECT * FROM monitor WHERE model ILIKE $1', [`%${model}%`]);

  return result.rows
}

//Show all monitors
export async function showAllMonitors(){
	let result = await pool.query('SELECT * FROM monitor')
  
  return result.rows
}
//Show all departments
export async function showDepartments() {

  	let result = await pool.query('SELECT * FROM department')

	return result.rows
}

//Show all Televisors
export async function showTelevisors(){
	let result = await pool.query('SELECT * FROM televisor')

	return result.rows
}

//Show all phone numbers
export async function showNumeros(){
	let result = await pool.query('SELECT * FROM numero')

	return result.rows
}

//Show all inspections
export async function showInspections(){
  let result = await pool.query('SELECT * FROM inspection')

  return result.rows
}

/*--------------------------DELETE COMMANDS--------------------------*/

//You SHOULDN'T be able to delete stuff without the id or identifier. Never allow delete commands without these. 

//Delete employee
export async function deleteEmployee(data){
	let { identifier } = data
	
	if(!name)
		throw new Error(`${identifier} can not be undefined.`)

	let result = await pool.query('DELETE FROM employee WHERE identifier = $1 RETURNING *', [identifier])

	return result.rows[0]
}

//Delete notebook
export async function deleteNotebook(data){
	let { identifier } = data
	
	if(!identifier)
		throw new Error(`${identifier} can not be undefined.`)

	let result = await pool.query('DELETE FROM notebook WHERE identifier = $1 RETURNING *', [identifier])

	return result.rows[0]
}

//Delete monitor
export async function deleteMonitor(data){
	let { identifier } = data

	if(!identifier)
		throw new Error(`${identifier} can not be undefined.`)
	
	let result = await pool.query('DELETE FROM monitor WHERE identifier = $1 RETURNING *', [identifier])

	return result.rows[0]
}

//Delete assignment
export async function deleteAssign(data){
	let { id } = data

	if (!id)
		throw new Error(`${id} can not be undefined.`)

	let result = await pool.query('DELETE FROM assignment WHERE id=$1 RETURNING *', [id])

	return result.rows[0]
}

export async function deleteTelevisor(data){
  let {identifier} = data

  if(!identifier)
    throw new Error('Identifier cannot be undefined')

  let result = await pool.query('DELETE FROM televisor WHERE identifier=$1 RETURNING *', [identifier])

  return result.rows[0]
}

export async function deleteNumber(data){
  let {identifier} = data

  if(!identifier)
    throw new Error('Identifier cannot be undefined')

  let result = await pool.query(
    'DELETE FROM numero WHERE identifier=$1 RETURNING *', [identifier]
  )

  return result.rows[0]
}
