const fs = require('fs-extra')
const commander = require('commander')
const chalk = require('chalk')
const getPaths = require('./getPaths')

const loadComponentDefinition = require('./loadComponentDefinition')
const generateSource = require('./generateSource')

commander
  .version(require('../package.json').version)
  .name('restencil')
  .option('-m, --module-name <name>', 'name of the stencil node module')
  .parse(process.argv)

if (!commander.moduleName) {
  console.log(chalk.red('No module-name specified'))
  commander.outputHelp()
  process.exit(1)
}

const build = () => {
  const { generatedSourceFile, stencilDistPath } = getPaths()

  const componentDefinition = loadComponentDefinition(stencilDistPath)
  fs.outputFileSync(generatedSourceFile, generateSource(componentDefinition))

  console.log('generated source file:')
  console.log(chalk.green(generatedSourceFile))
}

const cli = () => {
  try {
    build()
    console.log('complete!')
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}

cli()
