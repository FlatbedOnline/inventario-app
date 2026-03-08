import express from "express";
import cors from 'cors';
import * as db from '../database/db.js';
import dotenv from 'dotenv'


const app = express();
app.use(express.json());

app.use(cors({
	origin: `http://${process.env.ADDRESS_USER}:5173`
}));

app.get('/employees', async (req, res) => {
  try {
    const employees = await db.showAllEmployees()
    res.json(employees)
  } catch(err) {
    res.status(500).json({error: err.message})
  }

})

app.get('/assignments', async(req, res) => {

try{
  const assigments = await db.showAll()
  res.json(assigments)
} catch(err) {
  res.status(500).json({error: err.message})
}

})

app.get('/notebook', async(req, res) => {

	try{
		const notebook = await db.showAllNotebooks()
		res.json(notebook)
	} catch(err) {
		res.status(500).json({error: err.message})
	}


})

app.get('/monitor', async(req, res) => {

	try{
		const monitor = await db.showAllMonitors()
		res.json(monitor)
	}catch (err) {
		res.status(500).json({error: err.message})
	}
})

app.get('/televisores', async(req, res) => {

	try{
		const televisor = await db.showTelevisors()
		res.json(televisor)
	} catch (err) {
		res.status(500).json({error: err.message})
	}
})

app.get('/numeros', async(req, res) => {
	
	try{
		const numero = await db.showNumeros()
		res.json(numero)
	}catch(err) {
		res.status(500).json({error: err.message})
	}

})

app.get('/inspection', async(req, res) => {
  try{
    const inspect = await db.showInspections()
    res.json(inspect)
  }catch(err) {
    res.status(500).json({error: err.message})
  }

})



app.listen(3000, '0.0.0.0', () => console.log(`Server running on http://${process.env.ADDRESS_USER}:3000`))
