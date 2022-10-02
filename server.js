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
  res.send("<Body background="https://github.com/Raam043/Pipeline/blob/master/Sai.jpg?raw=true">
        <br>
        <br>
</Body>
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Ramesh NB</title>
  <style>
    body {
      color: #ffffff;
      background-color: #0188cc;
      font-family: Arial, sans-serif;
      font-size: 14px;
    }
    
    h1 {
      font-size: 500%;
      font-weight: normal;
      margin-bottom: 0;
    }
    
    h2 {
      font-size: 200%;
      font-weight: normal;
      margin-bottom: 0;
    }
  </style>
</head>
<body>
  <div align="center">
    <h1><strong>Ramesh NB</strong></h1>
    <h2>Welcome to Saikrishna's html World</h2>
  <p>Call Mr. Ramesh N for enquiries <a href="tel:9902163099"style="color:#0AFFFF"><strong>9902163099</strong></a>.</p>
	  
	  
	  
   <a href="https://github.com/Raam043/Pipeline/blob/master/SaiKrishna.jpg?raw=true"> <img src="https://github.com/Raam043/Pipeline/blob/master/SaiKrishna.jpg?raw=true" alt="Sai Image" style="width:300px;height:400px;" /> </a>
								
<a href="https://github.com/Raam043/Pipeline/blob/master/Sai2.jpeg?raw=true"> <img src="https://github.com/Raam043/Pipeline/blob/master/Sai2.jpeg?raw=true" alt="Sai" style="width:300px;height:400px;" /> </a>
								
<a href="https://github.com/Raam043/Pipeline/blob/master/Sai3.jpeg?raw=true"> <img src="https://github.com/Raam043/Pipeline/blob/master/Sai3.jpeg?raw=true" alt="Image" style="width:300px;height:400px;" /> </a>
							
<a href="https://github.com/Raam043/Pipeline/blob/master/Sai5.jpeg?raw=true"> <img src="https://github.com/Raam043/Pipeline/blob/master/Sai5.jpeg?raw=true" alt="Image" style="width:300px;height:400px;" /> </a>
								
<a href="https://github.com/Raam043/Pipeline/blob/master/Sai6.jpeg?raw=true"> <img src="https://github.com/Raam043/Pipeline/blob/master/Sai6.jpeg?raw=true" alt="Image" style="width:300px;height:400px;" /> </a>
								
  </div>
</body>
</html>")
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
