const express = require('express')
const cors = require('cors')
const app = express()
const pool = require('./db')

app.use(cors())
app.use(express.json())

// ROUTES

// create a plan

function hanldeError(startTime, endTime) {
  let start = parseInt(startTime.slice(3, 5), 10)
  let end = parseInt(endTime.slice(3, 5), 10)
  start = startTime.startsWith('PM') ? start + 12 : start
  end = endTime.startsWith('PM') ? end + 12 : end

  if (start > end) {
    return {
      ok: false,
      msg: 'invalid time period',
    }
  } else {
    return {
      ok: true,
    }
  }
}

app.post('/plans', async (req, res) => {
  try {
    const { title, startDate, startTime, endDate, endTime } = req.body
    console.log(req.body)

    const resMsg = hanldeError(startTime, endTime)

    const newPlan = await pool.query(
      'INSERT INTO plan (title, start_date, start_time, end_date, end_time) \
      VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [title, startDate, startTime, endDate, endTime]
    )
    res.json({ ...resMsg, newPlan })
  } catch (err) {
    throw err
  }
})

app.listen(5000, () => {
  console.log('server is listening on port 5000')
})
