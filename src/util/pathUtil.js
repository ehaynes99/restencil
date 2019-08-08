const path = require('path')

const thisProject = path.dirname(__dirname)
const thatProject = process.env.PWD

const createPath = baseDir => (...relPath) => path.join(baseDir, ...relPath)

const pathUtil = {
  thisProjectPath: createPath(thisProject),
  thatProjectPath: createPath(thatProject),
}

module.exports = pathUtil
