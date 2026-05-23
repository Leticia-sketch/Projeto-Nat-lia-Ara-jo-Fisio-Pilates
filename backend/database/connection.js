const mysql = require("mysql2/promise")

async function connect() {

  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "#lETICIA2009",
    database: "studio_pilates"
  })

  return connection
}

module.exports = connect