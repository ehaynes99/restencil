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
        className,
        htmlTag,
        attributes,
        directProps,
        eventHandlers,
      }
    },
  )
}

const createComponentSource = (componentDefinition) => {
  const attributes = createComponentAttributes(componentDefinition)

  return attributes.map(({ className, ...props }) => {
    const attrJson = JSON.stringify(props, null, 2)
    return `export const ${className} = createWrapper(${attrJson})`
  })
}

module.exports = createComponentSource
