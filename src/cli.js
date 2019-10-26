const { spawn } = require('child_process')
const fs = require('fs-extra')
const commander = require('commander')
const chalk = require('chalk')
const getPaths = require('./getPaths')

const readStencilClasses = require('./readStencilClasses')
const generateSource = require('./generateSource')
const extractComponentAttributes = require('./extractComponentAttributes')

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

  const parsedStencilComponents = readStencilClasses(stencilDistPath)

  const componentDefinitions = extractComponentAttributes(
    parsedStencilComponents,
  )
  fs.outputFileSync(generatedSourceFile, generateSource(componentDefinitions))

  console.log('generated source file:')
  console.log(chalk.green(generatedSourceFile))
  return new Promise((resolve) => {
    const shell = spawn('microbundle', ['--jsx', 'React.createElement'], {
      stdio: 'inherit',
    })

    shell.on('error', data => console.error(data.toString()))
    shell.on('exit', resolve)
  })
}

const cli = async () => {
  try {
    process.exit(await build())
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}

cli()
