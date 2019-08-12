const path = require('path')
const commander = require('commander')

const parseArgs = () => {
  commander
    .version(require('../package.json').version)
    .name('restencil')
    .option('-m, --module-name <name>', 'name of the stencil node module')
    .option('-o, --out-dir <dir>', 'target dir for build', 'dist')

  commander.parse(process.argv)

  const projectPath = process.env.PWD

  const stencilDistPath = path.join(
    projectPath,
    'node_modules',
    commander.moduleName,
    'dist',
  )

  const outDir = path.resolve(projectPath, commander.outDir)

  return {
    stencilDistPath,
    outDir,
  }
}

module.exports = parseArgs
