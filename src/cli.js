const path = require('path')
const fs = require('fs-extra')
const chalk = require('chalk')

const loadComponentDefinition = require('./loadComponentDefinition')
const createComponentSource = require('./createComponentSource')

const { stencilDistPath, outDir } = require('./parseArgs')()

const build = () => {
  fs.removeSync(outDir)
  const generatedSrc = path.join(outDir, 'src')
  fs.mkdirpSync(generatedSrc)

  const wrapperTarget = path.join(generatedSrc, 'createWrapper.js')
  fs.copyFileSync(path.join(__dirname, 'createWrapper.js'), wrapperTarget)
  console.log('generated source file:')
  console.log(chalk.green(wrapperTarget))

  const componentDefinition = loadComponentDefinition(stencilDistPath)

  const componentSources = createComponentSource(componentDefinition)
  const componentsTarget = path.join(generatedSrc, 'components.js')
  fs.writeFileSync(componentsTarget, componentSources.join('\n\n'))
  console.log('generated source file:')
  console.log(chalk.green(componentsTarget))
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
