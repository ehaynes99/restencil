import React from 'react'

const createWrapper = (definition) => {
  const eventMapping = definition.events.reduce((result, eventName) => {
    const propName = [
      'on',
      eventName.slice(0, 1).toUpperCase(),
      eventName.slice(1),
    ].join('')
    result[eventName] = propName
    return result
  }, {})

  const getAttributeName = (() => {
    const nonAttributeNames = new Set(
      ...Object.keys(eventMapping),
      ...definition.directProps,
    )

    const attributeMapping = definition.attributes.reduce(
      (result, { name, attribute }) => {
        result[name] = attribute
        return result
      },
      { className: 'class' },
    )

    return (propName) => {
      if (!nonAttributeNames.has(propName)) {
        return attributeMapping[propName] || propName
      }
    }
  })()

  const WrapperComponent = React.forwardRef((props, forwardedRef) => {
    const elementRef = React.useRef()

    const ref = React.useCallback(
      (newElement) => {
        const oldElement = elementRef.current

        if (newElement !== oldElement) {
          elementRef.current = newElement

          if (oldElement && newElement) {
            // TODO - check if this ever changes...
            console.warn(
              '!!!!!!!!!!! element updated from:',
              oldElement,
              'to:',
              newElement,
            )
          }
        }

        if (forwardedRef) {
          typeof forwardedRef === 'function'
            ? forwardedRef(oldElement)
            : (forwardedRef.current = oldElement)
        }
      },
      [forwardedRef],
    )

    const attributes = React.useMemo(() => {
      return Object.keys(props).reduce((result, propName) => {
        const attributeName = getAttributeName(propName)
        if (attributeName) {
          const value = props[propName]
          if (typeof value !== 'object' && !Array.isArray(value)) {
            result[attributeName] = value
          }
        }
        return result
      }, {})
    }, [props])

    React.useEffect(() => {
      const element = elementRef.current
      if (element) {
        const handlers = definition.events.reduce((result, eventName) => {
          result[eventName] = props[eventMapping[eventName]]
          return result
        }, {})
        Object.entries(handlers).forEach(([eventName, handler]) => {
          element.addEventListener(eventName, handler)
        })
        return () => {
          Object.entries(handlers).forEach(([eventName, handler]) => {
            element.removeEventListener(eventName, handler)
          })
        }
      }
    }, [props])

    React.useEffect(() => {
      const element = elementRef.current
      if (element) {
        definition.directProps.forEach((propName) => {
          element[propName] = props[propName]
        })
      }
    }, [props])

    return React.createElement(
      definition.htmlTag,
      { ref, ...attributes },
      props.children,
    )
  })
  WrapperComponent.displayName = definition.displayName

  return WrapperComponent
}

export default createWrapper
