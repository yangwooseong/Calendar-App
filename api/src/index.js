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
    const { title } = req.body
    console.log(title)
    // const newPlan = await pool.query(
    //   ""
    // )
    // res.json(req.body)
    res.json(JSON.stringify({ a: 'b' }))
  } catch (err) {
    throw err
  }
})

app.listen(5000, () => {
  console.log('server is listening on port 5000')
})
