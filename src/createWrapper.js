import React from 'react'

const capitalize = (str) => {
  return str.slice(0, 1).toUpperCase() + str.slice(1)
}

const createDefinitions = ({ props = [], events = [] }) => ({
  attributes: props.filter(({ type }) => type),
  properties: props.filter(({ type }) => !type),
  eventHandlers: events.map(({ event }) => ({
    name: `on${capitalize(event)}`,
    event,
  })),
})

const usePropValues = (props, propDefs) => {
  return React.useMemo(() => {
    return propDefs.map(({ name }) => props[name])
  }, [propDefs, props])
}

const defined = value => value != null

const createWrapper = (manifest) => {
  const defs = createDefinitions(manifest)

  const WrapperComponent = (props) => {
    const ref = React.useRef()

    const attributes = React.useMemo(() => {
      return defs.attributes.reduce((result, { name, attr }) => {
        result[attr] = props[name]
        return result
      }, {})
    }, [props])

    React.useEffect(() => {
      defs.properties.forEach(({ name }) => {
        ref.current[name] = props[name]
      })
    }, [props])

    const eventHandlers = usePropValues(props, defs.eventHandlers)

    React.useEffect(() => {
      const refValue = ref.current
      const registered = defs.eventHandlers
        .map(({ event }, index) => {
          const handler = eventHandlers[index]
          if (handler) {
            refValue.addEventListener(event, handler)
            return [event, handler]
          }
        })
        .filter(defined)

      return () => {
        registered.forEach(([event, handler]) => {
          refValue.removeEventListener(event, handler)
        })
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, eventHandlers)

    return React.useMemo(() => {
      return React.createElement(
        manifest.tag,
        { ref, ...attributes },
        props.children,
      )
    }, [attributes, props])
  }
  WrapperComponent.displayName = manifest.componentClass
  return WrapperComponent
}

export default createWrapper
