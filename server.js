const moment = require('moment')
const express = require('express')
const pug = require('pug')
const middleware = require('./middleware')

const compiledTemplate = pug.compileFile('template/template.pug')
const app = express()

// Error Handling to stop broken params, we're talking beyond just invalid
app.use(middleware.malformedUrl)

app.get('/:date', (req, res) => {
  let date = req.params.date
  let payload = {}

  if (!moment(date).isValid()) {
    payload.unixDate = null
    payload.humanDate = null
  } else {
    payload.unixDate = moment(date).format('X')
    payload.humanDate = moment(date).format('MMM Do, YYYY')
  }

  res.send(compiledTemplate({ payload }))
})

app.listen(8000)
