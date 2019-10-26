const fs = require('fs')
const path = require('path')
require('@babel/register')({
  ignore: [],
  babelrc: false,
  plugins: [
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-transform-modules-commonjs',
  ],
})

const parseClassFile = (stencilClassPath) => {
  const classModule = require(stencilClassPath)
  const displayName = Object.keys(classModule)[0]
  const StencilClass = classModule[displayName]

  return {
    displayName,
    htmlTag: StencilClass.is,
    properties: StencilClass.properties || {},
    events: StencilClass.events || [],
  }
}

const readStencilClasses = (stencilDistPath) => {
  const createPath = (relPath) => {
    return path.join(stencilDistPath, 'collection', relPath)
  }

  const stencilClassPaths = JSON.parse(
    fs.readFileSync(createPath('collection-manifest.json')),
  ).entries.map(createPath)

  return stencilClassPaths.map(parseClassFile)
}

module.exports = readStencilClasses
