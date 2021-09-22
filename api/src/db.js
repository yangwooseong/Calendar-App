const Pool = require('pg').Pool

const pool = new Pool({
  user: 'vuno',
  password: 'perhapslove',
  database: 'calendardb',
  host: 'localhost',
  port: 5432,
})

module.exports = pool
