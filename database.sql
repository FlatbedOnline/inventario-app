CREATE DATABASE inventory;
\c inventory

CREATE TABLE notebook(
	id SERIAL PRIMARY KEY,
	identifier VARCHAR(10) NOT NULL,
	serial_number VARCHAR(100) UNIQUE NOT NULL,
	model VARCHAR(50) NOT NULL,
	price NUMERIC(10, 2),
	status BOOLEAN DEFAULT true --true: está ativo / false: está inativo.
);



CREATE TABLE monitor(
	id SERIAL PRIMARY KEY,
	identifier VARCHAR(10) NOT NULL,
	model VARCHAR(50) NOT NULL,
	price NUMERIC(10, 2),
	status BOOLEAN DEFAULT true
);

----------------------------------------------------------------------

CREATE TABLE department(
	id SERIAL PRIMARY KEY,
	name VARCHAR(100) UNIQUE NOT NULL
);

CREATE TABLE employee(
	id SERIAL PRIMARY KEY,
	identifier VARCHAR(10) NOT NULL,
	name VARCHAR(100) NOT NULL,
	department_id INTEGER REFERENCES department(id)
);

CREATE TABLE assignment(
	id SERIAL PRIMARY KEY,
	date_in DATE DEFAULT CURRENT_DATE, --Data do empréstimo
	date_out DATE, --Data da devolução
	employee_id INTEGER REFERENCES employee(id) NOT NULL,
	notebook_id INTEGER REFERENCES notebook(id),
	monitor_id INTEGER REFERENCES monitor(id),
	CHECK(notebook_id IS NOT NULL OR monitor_id IS NOT NULL)
);

CREATE UNIQUE INDEX unique_notebook_active
ON assignment (notebook_id)
WHERE date_out IS NULL;

CREATE UNIQUE INDEX unique_monitor_active
ON assignment (monitor_id)
WHERE date_out IS NULL;
