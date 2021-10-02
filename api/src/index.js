const express = require('express')
const cors = require('cors')
const app = express()
const pool = require('./db')

app.use(cors())
app.use(express.json())

// ROUTES

// create a plan

async function hanldeTimePeriodError(startDate, startTime, endTime) {
  let msg
  if (startTime >= endTime) {
    msg = {
      ok: false,
      msg: 'invalid time period',
    }
  } else {
    const checkDataExist = await pool.query(
      'SELECT COUNT(*) from plans \
       WHERE date = $1 and time between $2 and $3',
      [startDate, startTime, endTime]
    )
    const isDataAlreadyExist = parseInt(checkDataExist.rows[0].count, 10) > 0

    msg = isDataAlreadyExist
      ? {
          ok: false,
          msg: 'data already exists',
        }
      : {
          ok: true,
        }
  }
  return msg
}

app.post('/plans', async (req, res) => {
  try {
    const { title, date, startTime, endTime } = req.body
    let start = parseInt(startTime.slice(3, 5), 10)
    let end = parseInt(endTime.slice(3, 5), 10)
    start = startTime.startsWith('PM') ? start + 12 : start
    end = endTime.startsWith('PM') ? end + 12 : end

    const resMsg = await hanldeTimePeriodError(date, start, end)

    for (let time = start; time < end; time++) {
      await pool.query(
        'INSERT INTO plans (title, date, time ) \
         VALUES ($1, $2, $3)',
        [title, date, time]
      )
    }
    res.json({ ...resMsg })
  } catch (err) {
    throw err
  }
})

app.post('/request_plan', async (req, res) => {
  try {
    const { startDate, endDate } = req.body
    const planList = await pool.query(
      'SELECT * FROM plans \
       WHERE date between $1 and $2 \
       ORDER BY date asc',
      [startDate, endDate]
    )
    const queryResult = planList.rows

    result = {}
    queryResult.map((val) => {
      const date = val.date
      result[date] = result[date] === undefined ? [val] : [...result[date], val]
    })
    res.json(result)
  } catch (err) {
    throw err
  }
})

app.listen(5000, () => {
  console.log('server is listening on port 5000')
})
