import React from 'react'

const createWrapper = (definition) => {
  const WrapperComponent = React.forwardRef((props, forwardedRef) => {
    const ref = React.useRef()
    const setRef = React.useCallback(
      (value) => {
        ref.current = value
        if (forwardedRef) {
          forwardedRef.current = value
        }
      },
      [forwardedRef],
    )
    const attributeProps = React.useMemo(() => {
      return definition.attributes.reduce((result, { name, attribute }) => {
        result[attribute] = props[name]
        return result
      }, {})
    }, [props])

    // definition is constant, so loop is ok
    definition.directProps.forEach(({ name }) => {
      const propValue = props[name]
      // eslint-disable-next-line react-hooks/rules-of-hooks
      React.useEffect(() => {
        ref.current[name] = propValue
      }, [name, propValue])
    })

    React.useEffect(() => {
      const refValue = ref.current
      const registeredHandlers = definition.eventHandlers.map(
        ({ name, eventName }) => {
          const handler = (...args) => {
            if (props[name]) {
              props[name](...args)
            }
          }
          refValue.addEventListener(eventName, handler)
          return [eventName, handler]
        },
      )
      return () => {
        registeredHandlers.forEach(([eventName, handler]) => {
          refValue.removeEventListener(eventName, handler)
        })
      }
    }, [props, ref])

    return React.useMemo(() => {
      return React.createElement(
        definition.htmlTag,
        { ref: setRef, ...attributeProps },
        props.children,
      )
    }, [attributeProps, props.children, setRef])
  })
  WrapperComponent.displayName = definition.displayName
  return WrapperComponent
}

export default createWrapper
