const extractComponentAttributes = (parsedStencilComponents) => {
  return parsedStencilComponents.map(
    ({ displayName, htmlTag, properties, events }) => {
      const attributes = {}
      const directProps = []


      Object.keys(properties).forEach((name) => {
        const attribute = properties[name].attribute
        attribute
          ? attributes[name] = attribute
          : directProps.push(name)
      })

      const eventNames = events.map(({ name }) => name)
      
      return {
        displayName: displayName,
        htmlTag,
        attributes,
        directProps,
        events: eventNames,
      }
    },
  )
}

module.exports = extractComponentAttributes
