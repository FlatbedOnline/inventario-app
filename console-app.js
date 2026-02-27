import * as db from './db.js'

let first_data = await db.showAllMonitors()

console.log(first_data)
