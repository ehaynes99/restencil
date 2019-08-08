const loadComponentDefinition = require('../util/loadComponentDefinition')
const createComponentAttributes = require('../util/createComponentAttributes')
const pathUtil = require('../util/pathUtil')

const build = (args) => {
  const [stencilLibName] = args
  const stencilDistPath = pathUtil.thatProjectPath('node_modules', stencilLibName, 'dist')
  const componentDefinition = loadComponentDefinition(stencilDistPath)
  const componentAttributes = createComponentAttributes(componentDefinition)

  console.log('***** componentAttributes:', JSON.stringify(componentAttributes, null, 2))
}

module.exports = build
