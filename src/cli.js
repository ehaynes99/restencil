const args = require('commander')
const path = require('path')
const loadComponentDefinition = require('./loadComponentDefinition')
const createComponentSource = require('./createComponentSource')

args
  .version(require('../package.json').version)
  .name('restencil')
  .option('-m, --module-name <name>', 'name of the stencil node module')
  .option('-o, --output-dir', 'dist dir', 'dist')

args.parse(process.argv)

const stencilDistPath = path.join(
  process.env.PWD,
  'node_modules',
  args.moduleName,
  'dist',
)

const build = () => {
  const componentDefinition = loadComponentDefinition(stencilDistPath)

  const componentSources = createComponentSource(componentDefinition)
  console.log('***** componentSources:', componentSources)
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
