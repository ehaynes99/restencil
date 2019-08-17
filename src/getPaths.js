const fs = require('fs-extra')
const path = require('path')
const commander = require('commander')
const chalk = require('chalk')

const getPaths = () => {
  const projectRoot = process.env.PWD

  const stencilDistPath = path.join(
    projectRoot,
    'node_modules',
    commander.moduleName,
    'dist',
  )

  const generatedSourceFile = (() => {
    const { source } = JSON.parse(
      fs.readFileSync(path.join(projectRoot, 'package.json')),
    )

    if (!source) {
      console.log(chalk.red('Could not determine build path'))
      console.log(
        'package.json must include a \'source\' entry specifying the path to generate source code',
      )
      commander.outputHelp()
      process.exit(1)
    }
    return source
  })()

  return {
    projectRoot,
    stencilDistPath,
    generatedSourceFile,
  }
}

module.exports = getPaths
