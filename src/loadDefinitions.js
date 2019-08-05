const fs = require('fs')
const path = require('path')
const { transformFileSync } = require('@babel/core')
const requireFromString = require('require-from-string')

const babelConfig = {
  babelrc: false,
  plugins: [
    '@babel/plugin-syntax-dynamic-import',
  ],
}

const loadDefinitions = (stencilDistPath) => {
  const createPath = (relPath) => {
    return path.join(stencilDistPath, 'collection', relPath)
  }

  const manifest = JSON.parse(
    fs.readFileSync(createPath('collection-manifest.json')),
  )

  return manifest.entries.map((entryPath) => {
    const classFile = createPath(entryPath)
    const compiledClass = transformFileSync(classFile, babelConfig).code
    const classModule = requireFromString(compiledClass)
    const [className] = Object.keys(classModule)
    const StencilClass = classModule[className]

    return {
      className,
      tag: StencilClass.is,
      properties: StencilClass.properties,
      events: StencilClass.events,
    }
  })
}

module.exports = loadDefinitions
