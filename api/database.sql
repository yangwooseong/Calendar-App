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

CREATE TABLE plans(
  id SERIAL PRIMARY KEY,
  title VARCHAR(255),
  date VARCHAR(255),
  time INTEGER,
  created_at VARCHAR(255)
)

INSERT INTO plan1 (title, date, time) VALUES 
('test', 'today', 
(SELECT array_agg(g.i) :: VARCHAR(255) 
FROM generate_series(1,5) as g(i))
)