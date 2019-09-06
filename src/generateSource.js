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

const generateSource = (componentsAttributes) => {
  let result = getWrapperContent() + '\n\n'

  componentsAttributes.forEach((attributes) => {
    const { displayName } = attributes
    const attrJson = JSON.stringify(attributes, null, 2)
    result += `export const ${displayName} = createWrapper(${attrJson})\n\n`
  })

  return result
}

module.exports = generateSource
