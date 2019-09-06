const { NODE_ENV } = process.env

module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: { esmodules: true },
        exclude: ['transform-async-to-generator', 'transform-regenerator'],
        modules: false,
        loose: true,
      },
    ],
    '@babel/react',
  ],
  plugins: [
    '@babel/proposal-object-rest-spread',
    NODE_ENV === 'test' && '@babel/transform-modules-commonjs',
  ].filter(Boolean),
}
