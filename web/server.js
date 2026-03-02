import express from "express";
import cors from 'cors';
import * as db from '../database/db.js';

const app = express();
app.use(express.json());

app.use(cors({
  origin: 'http://localhost:5173'
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




app.listen(3000, () => console.log('Server running on http://localhost:3000'))
