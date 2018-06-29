const childProcess = require('child_process')
const build = require('./build')
const ghpages = require('gh-pages')
require('dotenv').config()

async function main() {
  await build()

  switch (process.argv[2]) {
    case 'branch':
      publishBranch()
      break
    case 'server':
      publishServer()
      break
  }
}

function publishBranch() {
  let branch = 'master'
  ghpages.publish('public', {branch}, err => {
    if (err) {
      console.log(`Publish to branch ${branch} failed: ${err}`)
    } else {
      console.log(`Published to branch ${branch}`)
    }
  })
}

function publishServer() {
  let sourceDir = 'public/'
  let cmd = [
    'rsync -avz --delete',
    sourceDir,
    process.env.SERVER_DEPLOY_PATH,
  ].join(' ')
  console.log(cmd)
  try {
    childProcess.execSync(cmd, {encoding: 'utf-8'})
    console.log(`Published ${sourceDir} to ${process.env.SERVER_DEPLOY_PATH}`)
  } catch (err) {
    console.log(err.stderr)
  }
}

main()
