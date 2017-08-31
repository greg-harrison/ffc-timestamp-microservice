const moment = require('moment')
const express = require('express')

const pug = require('pug')
const compiledTemplate = pug.compileFile('template/template.pug')

const app = express()

// Error Handling to stop broken params, we're talking beyond just invalid
app.use(function (req, res, next) {
  var err = null;
  try {
    decodeURIComponent(req.path)
  }
  catch (e) {
    err = e;
  }
  if (err) {
    console.log(err, req.url);
    return res.redirect(['https://', req.get('Host'), '/404'].join(''));
  }
  next(); //Once the error handler is done, NEXT will jump to the next function
});

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

  res.send(compiledTemplate({ payload })

  )

})

app.listen(8000)
