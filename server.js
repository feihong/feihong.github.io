const fs = require('fs').promises
const path = require('path')
const express = require('express')
const pug = require('pug')

const app = express()
app.use(express.static('public'))

// Map the URL to the actual file path of the .pug template. Return null if the
// file doesn't exist.
async function getActualPath(url) {
  // Try the specific .pug file
  let result = path.join('public', url) + '.pug'
  if (await fileExists(result)) {
    return result
  }
  // Pug file doesn't exist, try index.pug under directory
  result = path.join('public', url, 'index.pug')
  if (await fileExists(result)) {
    return result
  }
  return null
}

// Return true if the file at the given path exists; false otherwise.
async function fileExists(filePath) {
  try {
    let stat = await fs.stat(filePath)
    return true
  } catch (err) {
    if (err.code === 'ENOENT') {
      return false
    } else {
      throw err
    }
  }
}

app.get('/:path(*)', async (req, res) => {
  let path_ = await getActualPath(req.params.path)
  console.log(path_);

  if (path_ !== null) {
    try {
      let html = pug.renderFile(path_)
      res.send(html)
    } catch (err) {
      res.status(500).send(`Unexpected error: <pre>${err.message}</pre>`)
    }
  } else {
    res.status(404).send('File not found')
  }
})

const listener = app.listen(process.env.PORT || 8000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
