const express = require('express')
const cors = require('cors')
const app = express()
const pool = require('./db')

app.use(cors())
app.use(express.json())

// ROUTES

// create a plan

app.post('/plans', async (req, res) => {
  try {
    const { title, startDate, startTime, endDate, endTime } = req.body
    console.log(req.body)
    const newPlan = await pool.query(
      'INSERT INTO plan (title, start_date, start_time, end_date, end_time) \
      VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [title, startDate, startTime, endDate, endTime]
    )
    res.json(newPlan)
  } catch (err) {
    throw err
  }
})

app.listen(5000, () => {
  console.log('server is listening on port 5000')
})
