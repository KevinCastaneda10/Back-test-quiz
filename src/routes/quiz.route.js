const express = require('express')


const { Router } = express
const Question = require('../db/quiz.model')
const Result = require('../db/result.model')


const router = new Router()


router.get('/', async (req, res) => {
  let resp = await Question.find()
  if (resp && resp.length <= 0) {
    await Question.create({
      category: 'Literatura',
      questions: [
        {

          question: "¿Qué selección ha ganado más Copas Mundiales de Fútbol?",
          options: [
            { 1: "Alemania", correct: false },
            { 2: "Brasil", correct: true },
            { 3: "Francia", correct: false },
            { 4: "Argentina", correct: false }
          ]
        },
        {

          question: "¿Cuántos anillos hay en la bandera olímpica?",
          options: [
            { 1: "Cuatro", correct: false },
            { 2: "Seis", correct: false },
            { 3: "Cinco", correct: true },
            { 4: "Tres", correct: false }
          ]
        },
        {

          question: "¿Quién pintó 'La última cena'?",
          options: [
            { 1: "Leonardo DaVinci", correct: true },
            { 2: "Miguel Angel", correct: false },
            { 3: "JRafael Sanzio", correct: false },
            { 4: "Vicent Van Gogh", correct: false }
          ]
        },
        {

          question: "¿Quién pintó la 'Capilla Sixtina'?",
          options: [
            { 1: "Salvador Dalí", correct: false },
            { 2: "Rafael", correct: false },
            { 3: "Leonardo DaVinci", correct: false },
            { 4: "Miguel Angel", correct: true }
          ]
        },
        {

          question: "¿Quién inventó la bombilla?",
          options: [
            { 1: "Nicola Tesla", correct: false },
            { 2: "Thomas Alva Edison", correct: true },
            { 3: "Henry Ford", correct: false },
            { 4: "Benjamin Franklin", correct: false }
          ]
        },
        {
          question: "¿En qué año llegó Cristóbal Colón a América?",
          options: [
            { 1: "1492", correct: true },
            { 2: "1429", correct: false },
            { 3: "1592", correct: false },
            { 4: "1472", correct: false }
          ]
        },
        {
          question: "¿Cuál era el nombre de pila de Che Guevara?",
          options: [
            { 1: "Sergio", correct: false },
            { 2: "Alfonso", correct: false },
            { 3: "Ernesto", correct: true },
            { 4: "Edward", correct: false }
          ]
        },
        {
          question: "¿Quién fue el último faraón de Egipto?",
          options: [
            { 1: "Tutankamón", correct: false },
            { 2: "Ramsés III", correct: true },
            { 3: "Keops", correct: false },
            { 4: "Cleopatra", correct: false }
          ]
        },
        {
          question: "¿Dónde se encuentra la Sagrada Familia?",
          options: [
            { 1: "París", correct: false },
            { 2: "Milán", correct: false },
            { 3: "Madrid", correct: false },
            { 4: "Barcelona", correct: true }
          ]
        },
        {
          question: "¿Cuál es el océano más grande del mundo?",
          options: [
            { 1: "Océano Atlántico", correct: false },
            { 2: "Océano Pacífico", correct: true },
            { 3: "Océano Índico", correct: false },
            { 4: "Océano Ártico", correct: false }
          ]
        },
      ]
    })
    let respAfterCreated = await Question.find()
    res.send({ msg: "Data Found", data: respAfterCreated })
  } else {
    res.send({ msg: "Data Found", data: resp })
  }
})

router.post('/addResponse', async (req, res)=>{
  let resp = req.body
  let questionDb = await Question.findOne()
  let respCorrect = []
  questionDb?.questions.forEach((el, ind) => {
    el.options.forEach(element => {
       if(element.correct) respCorrect.push(element) 
    });

  })

    let success=[]
    let errors=[]

  let arrCorrect = respCorrect.map((el, ind)=> {
    return Object.keys(el)[0]
  })

  arrCorrect.forEach((el, ind) => {
    if(el == Object.values(resp)[ind]){
      success.push(true)
    }else{
      errors.push(false)
    }
  })
  await Result.create({
    end:true,
    success: success.length,
    errors:errors.length,
    porcent:(success.length*100)/10

  })
  res.send({
    msg: 'Encuesta Almacenda',
    numEncuesta: Math.random()
  })
})

router.get('/getResults', async (req, res)=>{
  let results = await Result.find()
  let lastResult = results[results.length - 1]
  if(results){
    res.send({
      msg : 'Data Found',
      data: lastResult
    })
  }
})

module.exports = router;