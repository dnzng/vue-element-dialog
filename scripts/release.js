const execa = require('execa')
const run = (bin, args, opts = {}) =>
  execa(bin, args, { stdio: 'inherit', ...opts })

async function main() {
  await run('yarn', ['build'])
  await run('yarn', ['publish', '--access', 'public'])
  await run('git', ['push' '--tags'])
}

main().catch(e => console.error(e))
