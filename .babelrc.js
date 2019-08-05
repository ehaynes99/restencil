const { NODE_ENV } = process.env

module.exports = {
  presets: [
    [
      '@babel/env',
      {
        targets: { browsers: ['ie >= 11'] },
        exclude: ['transform-async-to-generator', 'transform-regenerator'],
        modules: false,
        loose: true,
      },
    ],
    '@babel/react',
  ],
  plugins: [
    '@babel/proposal-object-rest-spread',
    '@babel/proposal-class-properties',
    '@babel/plugin-proposal-export-namespace-from',
    NODE_ENV === 'test' && '@babel/transform-modules-commonjs',
  ].filter(Boolean),
}
