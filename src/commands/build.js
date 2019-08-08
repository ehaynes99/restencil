const loadDefinitions = require('../util/loadDefinitions')
const { thatProjectPath } = require('../util/pathUtil')

const build = (args) => {
  const [stencilLibName] = args
  const stencilDistPath = thatProjectPath('node_modules', stencilLibName, 'dist')
  const componentDefs = loadDefinitions(stencilDistPath)
  console.log('***** componentDefs:', JSON.stringify(componentDefs, null, 2))
}

module.exports = build
