const fs = require('fs')
const path = require('path')

const parseClassFile = (stencilClassPath) => {
  const classModule = require(stencilClassPath)
  const className = Object.keys(classModule)[0]
  const StencilClass = classModule[className]

  return {
    className,
    htmlTag: StencilClass.is,
    properties: StencilClass.properties || {},
    events: StencilClass.events || [],
  }
}

const loadComponentDefinition = (stencilDistPath) => {
  const createPath = (relPath) => {
    return path.join(stencilDistPath, 'collection', relPath)
  }

  const stencilClassPaths = JSON.parse(
    fs.readFileSync(createPath('collection-manifest.json')),
  ).entries.map(createPath)

  return {
    components: stencilClassPaths.map(parseClassFile),
  }
}

module.exports = loadComponentDefinition
