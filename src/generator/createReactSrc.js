const createReactSrc = (componentAttributes) => {
  const componentLines = componentAttributes.map(({ className, ...props }) => {
    const attrJson = JSON.stringify(props, null, 2)
    return `export const ${className} = createWrapper(${attrJson})`
  })

  return [
    // 'import createWrapper from "./createWrapper"',
    'const createWrapper = () => stub',
    ...componentLines,
  ].join('\n\n') + '\n'
}

module.exports = createReactSrc
