const Pool = require('pg').Pool

const pool = new Pool({
  user: 'vuno',
  password: 'perhapslove',
  database: 'calendar_database',
  host: 'localhost',
  port: 5432,
})

module.exports = pool
