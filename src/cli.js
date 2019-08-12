const path = require('path')
const fs = require('fs-extra')

const loadComponentDefinition = require('./loadComponentDefinition')
const createComponentSource = require('./createComponentSource')

const { stencilDistPath, outDir } = require('./parseArgs')()

const build = () => {
  fs.remove(outDir)
  const generatedSrc = path.join(outDir, 'src')
  fs.mkdirpSync(generatedSrc)
  const componentDefinition = loadComponentDefinition(stencilDistPath)

  const componentSources = createComponentSource(componentDefinition)
  fs.writeFileSync(
    path.join(generatedSrc, 'components.js'),
    componentSources.join('\n\n'),
  )
  fs.copyFileSync(
    path.join(__dirname, 'createWrapper.js'),
    path.join(generatedSrc, 'createWrapper.js'),
  )
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
