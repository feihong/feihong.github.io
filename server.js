const fs = require('fs').promises
const path = require('path')
const express = require('express')
const pug = require('pug')

const app = express()
app.use(express.static('public'))

app.get('/:path(*)', async (req, res) => {
  let path_ = path.join('public', req.params.path)
  try {
    let stat = await fs.stat(path_)
    if (stat.isDirectory()) {
      path_ = path.join(path_, 'index.pug')
    }
    let html = pug.renderFile(path_)
    res.send(html)
  } catch (err) {
    if (err.code === 'ENOENT') {
      res.status(404).send('File not found')
    } else {
      res.status(500).send(`Unexpected error: ${err.message}`)
    }
  }
})

const listener = app.listen(process.env.PORT || 8000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
