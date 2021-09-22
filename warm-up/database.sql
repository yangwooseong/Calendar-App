CREATE DATABASE calendar_database;

CREATE TABLE todo(
  todo_id SERIAL PRIMARY KEY,
  description VARCHAR(255)
)

CREATE TABLE plan(
  id SERIAL PRIMARY KEY,
  title VARCHAR(255),
  start_date VARCHAR(255),
  start_time VARCHAR(255),
  end_date VARCHAR(255),
  end_time VARCHAR(255),
  created_at VARCHAR(255)
)