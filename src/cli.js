const cli = () => {
  console.log('***** __filename:', __filename)
  const commandName = process.argv[2]
  const args = process.argv.slice(3)

  try {
    const command = require(`./commands/${commandName}`)
    command(args)
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}

module.exports = cli
