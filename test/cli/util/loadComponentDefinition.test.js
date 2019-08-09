const loadComponentDefinition = require('generator/loadComponentDefinition')
const path = require('path')

const stencilDistPath = path.join(
  __dirname,
  '..',
  '..',
  'mock-stencil-lib',
  'dist',
)

it('loads the component list', () => {
  const definition = loadComponentDefinition(stencilDistPath)
  expect(definition).toEqual({
    components: [
      {
        className: 'First',
        htmlTag: 'test-first',
        properties: {
          firstFoo: { attribute: 'first-foo' },
          firstBar: {},
          firstGoo: { attribute: 'first-goo' },
          firstCar: {},
        },
        events: [
          { name: 'fooChange' },
          { name: 'barUpdate' },
        ],
      },
      {
        className: 'FirstSub',
        htmlTag: 'test-first-sub',
        properties: {},
        events: [
          { name: 'somethingHappen' },
          { name: 'bigChange' },
        ],
      },
      {
        className: 'Second',
        htmlTag: 'test-second',
        properties: {
          secondFoo: { attribute: 'second-foo' },
          secondBar: {},
          secondGoo: { attribute: 'second-goo' },
          secondCar: {},
        },
        events: [],
      },
    ],
  })
})
