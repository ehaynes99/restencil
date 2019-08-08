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
        // const name =
        //   'on' + eventName.slice(0, 1).toUpperCase() + eventName.slice(1)
        const name = [
          'on',
          eventName.slice(0, 1).toUpperCase(),
          eventName.slice(1),
        ].join()

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

module.exports = createComponentAttributes
