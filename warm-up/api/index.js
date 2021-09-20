const express = require('express')
const app = express()
const pool = require('../db/db')

app.use(express.json())

app.get('/', (req, res) => {
  console.log('hello')
  res.json()
})

app.post('/todos', async (req, res) => {
  try {
    const { description } = req.body
    console.log(pool)
    const newTodo = await pool.query(
      'INSERT INTO todo (description) VALUES ($1) RETURNING *',
      [description]
    )
    res.json(newTodo)
  } catch (err) {
    console.log(err.message)
  }
})
app.listen(5000, () => {
  console.log('server is listening on port 5000')
})
