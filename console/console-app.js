import * as db from '../database/db.js'
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
      let id = await input({message: `Insert assignment's id`});

      console.log(await db.deleteAssign({ id }))
			break;

		case 'insertAssignment':

      let data = {}

      data.employee_identifier = await input({message: `Insert employee's identifier: `});
      
      let choice = await select({
        message: `Do you want to assign a notebook?`,
        choices: [
          {name: 'yes', value: true},
          {name: 'no', value: false}
        ]
      });

      if(choice)
        data.identifier_not = await input({message: `Insert notebook's identifier: `});

      choice = await select({
        message: `Do you want to assign a monitor?`,
        choices: [
          {name: 'yes', value: true},
          {name:'no', value: false}
        ]
      });

      if(choice)
        data.identifier_mon = await input({message: `Insert monito's identifier: `});

      choice = await select({
        message:`Do you want to assign a date_in different from today?`,
        choices: [
          {name: 'yes', value: true},
          {name: 'no', value: false}
        ]
      });

      if(choice)
        data.date_in = await input({message: `Insert a date_in`})

      console.log(await db.insertAssignment(data))
			break;

		case 'finishAssignment':
      let data2 = {}

      data2.employee_identifier = await input({message:`Insert employee's identifier: `});
      data2.date_out = await input({message: `Insert date_out: `});

      console.log(await db.finishAssignment(data2));
			break; 
  }
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

      console.log(await db.insertEmployee(data));

			break;

		case 'deleteEmployee':
      
      let identifier = await input({message: `Insert employee's identifier: `});
      
      console.log(await db.deleteEmployee({identifier}));

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
	const menu_assets = await select({
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
	if(menu_assets == 'notebooks'){
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
        let data = {}

        data.identifier = await input({message: `Insert notebook's identifier: `});
        data.serial_number = await input({message: `Insert notebook's serial number: `});
        data.model = await input({message: `Insert notebook's model: `})

        let choice = await select({message: 'Do you have a price?', choices: [{name: 'yes', value: 'yes'},{name: 'no', value: 'no'}] });

        if(choice == 'yes')
          data.price = parseFloat(await input({message: `Insert price: `}));

        choice = await select({message: 'Select the status', choices: [{name: 'active', value: 'yes'}, {name: 'broke', value: 'no'}] })
        
        if(choice == 'no')
          data.status = false

        console.log(await db.insertNotebook(data));

				break;

			case 'deleteNotebook':
        let identifier = await input({message: `Insert notebook's identifier: `});
        console.log(await db.deleteNotebook({ identifier }))

				break;
    }
	}

	//Monitor handle
	if(menu_assets == 'monitors'){
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
        let data = {}

        data.identifier = await input({message: `Insert identifier: `});
        data.model = await input ({message: `Insert model: `});

        let choice = await select({
          message: `Do you have a price?`,
          choices: [
            {name: 'yes', value: true},
            {name: 'no', value: false}
          ] });

        if(choice)
          data.price = await parseFloat( await input({message: `Insert Monitor's price: `}) );

        choice = await select({ 
          message: `Insert the status: `,
          choices: [
            {name: 'active', value: true}, 
            {name: 'broke', value:false}
          ] });

        if(!choice)
          data.status = false;

        console.log(await db.insertMonitor(data));

				break;

			case 'deleteMonitor':
        let identifier = await input({message: `Insert the Monitor's identifier: `})

        console.log(await db.deleteMonitor({ identifier }))


				break;}

	}

}

	



	



