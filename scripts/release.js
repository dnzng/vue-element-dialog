const execa = require('execa')
const run = (bin, args) =>
  execa(bin, args, { stdio: 'inherit' })
const step = (msg) => console.log(msg)

async function main() {
  step('Buiding package...')
  await run('yarn', ['build'])

  step('Publish package...')
  await run('yarn', ['publish', '--access', 'public'])

  step('Push tag to Github...')
  await run('git', ['push' '--tags'])

  step('Done')
}

main().catch(e => console.error(e))
