const express = require('express')
const morgan = require('morgan')
const mysql = require('mysql2')

const app = express()

app.use(morgan(":method :url :status :res[content-length] - :response-time ms"))

// https://gist.githubusercontent.com/meech-ward/1723b2df87eae8bb6382828fba649d64/raw/ee52637cc953df669d95bb4ab68ac2ad1a96cd9f/lotr.sql
const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
})

function getRandomInt(max) {
  return 1 + Math.floor(Math.random() * (max-1))
}

async function getCharacter(id) {
  const [characters] = await pool.promise().query("SELECT * FROM characters WHERE id = ?", [
    id,
  ])
  return characters[0]
}
async function randomId() {
  const [rows] = await pool.promise().query(
    "SELECT COUNT(*) as totalCharacters FROM characters"
  )
  const { totalCharacters } = rows[0]
  const randomId = getRandomInt(totalCharacters)
  return randomId
}

app.get("/test", (req, res) => {
  res.send("<h1>It's working 🤗</h1>")
})

app.get("/", async (req, res) => {
  try {
    const id = await randomId()
    const character = await getCharacter(id)
    res.send(character)
  } catch (error) {
    res.send(error)
  }
})

app.get("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id) || await randomId()
    const character = await getCharacter(id)
    res.send(character)
  } catch (error) {
    res.send(error)
  }
})

const port = process.env.PORT || 8080
app.listen(port, () => console.log(`Listening on port ${port}`))