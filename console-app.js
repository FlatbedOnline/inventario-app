import * as db from './db.js'
import fs from 'fs/promises';
import { select, Separator, input } from '@inquirer/prompts';


async function showLogo() {
    try {
        const logo = await fs.readFile('./logo.txt', 'utf8');
        console.log(logo);
    } catch (err) {
        console.error('Erro ao ler logo:', err);
    }
}
await showLogo();

const menu = await select({
	message: 'Welcome to the Inove Inventario manager! - choose an option',
	choices: [
		{
			name: 'Assignments',
			value: 'assignments',
			description: 'Manage assignments',
		},
		{
			name: 'Employees',
			value: 'employee',
			description: 'Manage employees.'
		},
    {
      name: 'Departments',
      value: 'department',
      description: 'Manage departments'
    },
		{
			name: 'Assets',
			value: 'assets',
			description: 'Manage computers and monitors.',
		},
		new Separator(),
	],
});

//Assignment handle
if (menu == 'assignments'){
	const menu_assignment = await select({
		message: 'Choose an option',
		choices: [{
			name: 'Show all assignments',
			value: 'showAll'
		},
		{
			name: 'Delete assignments',
			value: 'deleteAssign',
		},
		{
			name: 'Create a new assignment',
			value: 'insertAssignment'
		},
		{
			name: 'Finish an assignment',
			value: 'finishAssignment'
		}, new Separator() ]
	})
	
	switch(menu_assignment) {

		case 'showAll':
			console.log(await db.showAll())
			break;
		case 'deleteAssign':
	
			break;
		case 'insertAssignment':

			break;
		case 'finishAssignment':

			break; }

	
}


//Employee handle
if(menu == 'employee'){
		const menu_employee = await select({
		message: 'Choose an option',
		choices: [
      { 
        name: 'Search employees',
        value: 'searchEmployee'
      },
      {
			  name: 'Show all employees',
        value: 'showAllEmployees'
      },
      {
			  name: 'Register an employee',
			  value: 'insertEmployee',
			  description: 'Delete a specific assignment'
      },
      {
			  name: 'Delete an employee',
			  value: 'deleteEmployee'
      },
		new Separator() ]
	})
	
	switch(menu_employee) {

		case 'showAllEmployees':

			console.log(await db.showAllEmployees())
			break;

		case 'searchEmployee':

      let name = await input({message: `Enter employee's name: `,});
      console.log(await db.searchEmployee({ name }))
    
			break;

		case 'insertEmployee':

      let data = {} 

      data.identifier = await input({message:`Enter employee's identifier: `});
      data.name = await input({message:`Enter employee's name: `});
      data.departmentName = await input({message:`Enter departmentName: `});

      await db.insertEmployee(data);

			break;

		case 'deleteEmployee':
      
      let identifier = await input({message: `Insert employee's identifier: `});
      
      await db.deleteEmployee({identifier})

			break; 
  }

}

if(menu == 'department'){
  
  const menu_department = await select({
    message: 'Choose an option:',
    choices:[
      {
        name: 'Create department',
        value: 'insertDepartment'
      },
      {
        name: 'Show departments',
        value: 'showDepartments'
      }
      
    ]
  })

  switch (menu_department) {
    case 'insertDepartment':

      let answer = await input({message: `Insert the department's name: `});

      console.log(await db.insertDepartment(answer));
      break;

    case 'showDepartments':

      console.log(await db.showDepartments());
      break;
  }

}

//assets handle
if(menu == 'assets'){
	const menu_employee = await select({
	message: 'Choose an option',
	choices: [{
		name: 'Manage notebooks',
		value: 'notebooks',
		description: 'Insert, update and delete notebooks.'
	},
	{
		name: 'Manage monitors',
		value: 'monitors',
		description: 'Insert, update and delete monitors.'
	},
	new Separator() ]
	})

	//Notebooks handle
	if(menu_employee == 'notebooks'){
		const menu_notebooks = await select({
			message: 'Choose an option',
			choices: [{
				name: 'Show all notebooks',
				value: 'showAllNotebooks'
			},
			{
				name: 'Register a notebook',
				value: 'insertNotebook'
			},
			{
				name: 'Delete a notebook',
				value: 'deleteNotebook'
			}, new Separator() ]
		})

		switch(menu_notebooks){

			case 'showAllNotebooks':
				console.log(await db.showAllNotebooks())
				break;
			case 'insertNotebook':

				break;
			case 'deleteNotebook':

				break;}
	}

	//Monitor handle
	if(menu_employee == 'monitors'){
		const menu_monitors = await select({
			message: 'Choose an option',
			choices: [{
				name: 'Show all monitors',
				value: 'showAllMonitors'
			},
			{
				name: 'Register a monitor',
				value: 'insertMonitor'
			},
			{
				name: 'Delete a monitor',
				value: 'deleteMonitor'
			}, new Separator() ]
		})

		switch(menu_monitors){

			case 'showAllMonitors':
				console.log(await db.showAllMonitors())
				break;
			case 'insertMonitor':

				break;
			case 'deleteMonitor':

				break;}

	}

}

	



	



