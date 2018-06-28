const fs = require('fs')
const path = require('path')
const glob = require('glob')
const pug = require('pug')

function getPugFiles() {
  return new Promise((resolve, reject) => {
    glob('public/**/*.pug', (err, files) =>
      err === null ? resolve(files) : reject(err))
  })
}

async function main() {
  for (let pugFile of (await getPugFiles())) {
    let dirname = path.dirname(pugFile)
    let htmlFile = path.join(
      dirname,
      path.basename(pugFile, '.pug') + '.html')
    fs.writeFileSync(htmlFile, pug.renderFile(pugFile), 'utf-8')
    console.log(`Generated ${htmlFile}`)
  }
}

if (require.main === module) {
  main()
} else {
  module.exports = main
}
