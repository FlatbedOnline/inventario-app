CREATE DATABASE inventory;

CREATE TABLE machine(
  id SERIAL PRIMARY KEY,
  machine_name VARCHAR(100),
  model VARCHAR(100),
  serial_number VARCHAR(100) UNIQUE,
  status BOOLEAN DEFAULT true,
);

CREATE TABLE employee(
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  department_id INTEGER REFERENCES department(id)
);

CREATE TABLE department(
  id SERIAL PRIMARY KEY,
  name VARCHAR(100)
);
