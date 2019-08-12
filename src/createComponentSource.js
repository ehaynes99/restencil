const createComponentAttributes = (componentDefinition) => {
  return componentDefinition.components.map(
    ({ className, htmlTag, properties, events }) => {
      const attributes = []
      const directProps = []

      Object.keys(properties).forEach((name) => {
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

        return { name, eventName }
      })

      return {
        displayName: className,
        htmlTag,
        attributes,
        directProps,
        eventHandlers,
      }
    },
  )
}

const createComponentSource = (componentDefinition) => {
  const components = createComponentAttributes(componentDefinition)

  return components.map((attributes) => {
    const { displayName } = attributes
    const attrJson = JSON.stringify(attributes, null, 2)
    return `export const ${displayName} = createWrapper(${attrJson})`
  })
}

module.exports = createComponentSource
