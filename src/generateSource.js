const path = require('path')
const fs = require('fs-extra')

const getWrapperContent = () => {
  const wrapperFile = path.join(__dirname, 'createWrapper.js')
  return fs
    .readFileSync(wrapperFile)
    .toString()
    .replace(/^export .*/m, '')
    .trim()
}

const generateSource = (componentDefinitions) => {
  let result = getWrapperContent() + '\n\n'

  componentDefinitions.forEach((definition) => {
    const { displayName } = definition
    const attrJson = JSON.stringify(definition, null, 2)
    result += `export const ${displayName} = createWrapper(${attrJson})\n\n`
  })

  return result
}

module.exports = generateSource
