const loadComponentDefinition = require('../generator/loadComponentDefinition')
const createComponentAttributes = require('../generator/createComponentAttributes')
const pathUtil = require('../generator/pathUtil')
const createReactSrc = require('../generator/createReactSrc')

const build = (args) => {
  const [stencilLibName] = args
  const stencilDistPath = pathUtil.thatProjectPath('node_modules', stencilLibName, 'dist')
  const componentDefinition = loadComponentDefinition(stencilDistPath)
  const componentAttributes = createComponentAttributes(componentDefinition)

  const reactSrc = createReactSrc(componentAttributes)
  console.log('***** reactSrc:', reactSrc)
}

module.exports = build
