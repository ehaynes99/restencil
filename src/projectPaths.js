const path = require('path')

const thisProject = {
  projectRoot: path.dirname(__dirname),
  src: __dirname,
}
const thatProject = (() => {
  const projectRoot = process.env.PWD
  return {
    projectRoot,
    packageJson: path.join(projectRoot, 'package.json'),
    nodeModules: path.join(projectRoot, 'node_modules'),
  }
})()
return { thisProject, thatProject }
