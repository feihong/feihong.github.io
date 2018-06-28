const build = require('./build')
const ghpages = require('gh-pages')

async function main() {
  build()
  let branch = 'master'
  ghpages.publish('public', {branch}, err => {
    if (err) {
      console.log(`Publish to branch ${branch} failed: ${err}`)
    } else {
      console.log(`Published to branch ${branch}`)
    }
  })
}

main()
