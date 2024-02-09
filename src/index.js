const express = require('express')
const PORT = 8080
const routerQuiz = require('./routes/quiz.route')
const db = require('./db/index')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.json())

//Routes
app.use('/quiz', routerQuiz)


app.listen(PORT, ()=> {
  console.log("Server run on port ", PORT)
  db.connect()
})