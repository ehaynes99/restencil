const path = require('path')
const fs = require('fs')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const htmlWebpackPlugin = new HtmlWebpackPlugin({
  template: path.join(__dirname, 'demo/src/index.html'),
  filename: './index.html',
  chunksSortMode: 'none',
})
const projectName = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'package.json')),
).name

module.exports = {
  entry: path.join(__dirname, 'demo/src/index.js'),
  output: {
    path: path.join(__dirname, 'demo/build'),
    filename: 'demo[contentHash].js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [htmlWebpackPlugin],
  resolve: {
    extensions: ['.js'],
    alias: {
      [projectName]: path.resolve(__dirname, 'src/index'),
    },
  },
  devServer: {
    port: 3000,
  },
}
