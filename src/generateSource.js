const path = require('path')
const fs = require('fs-extra')

const createComponentAttributes = (componentDefinition) => {
  return componentDefinition.components.map(
    ({ className, htmlTag, properties, events }) => {
      const propNames = Object.keys(properties)
      const attributes = []
      const directProps = []

      propNames.forEach((name) => {
        const attribute = properties[name].attribute
        attribute
          ? attributes.push({ name, attribute })
          : directProps.push({ name })
      })

      const eventHandlers = events.map((event) => {
        const eventName = event.name
        const name = [
          'on',
          eventName.slice(0, 1).toUpperCase(),
          eventName.slice(1),
        ].join('')
        propNames.push(name)
        return { name, eventName }
      })

      return {
        displayName: className,
        htmlTag,
        propNames,
        attributes,
        directProps,
        eventHandlers,
      }
    },
  )
}

const getWrapperContent = () => {
  const wrapperFile = path.join(__dirname, 'createWrapper.js')
  return fs
    .readFileSync(wrapperFile)
    .toString()
    .replace(/^export .*/m, '')
    .trim()
}

const generateSource = (componentDefinition) => {
  let result = getWrapperContent() + '\n\n'

  const components = createComponentAttributes(componentDefinition)
  components.forEach((attributes) => {
    const { displayName } = attributes
    const attrJson = JSON.stringify(attributes, null, 2)
    result += `export const ${displayName} = createWrapper(${attrJson})\n\n`
  })

  return result
}

module.exports = generateSource
