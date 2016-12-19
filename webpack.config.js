const ClosureCompilerPlugin = require('closure-compiler-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: `${__dirname}/dist/`,
    filename: 'ripley.min.js'
  },
  devtool: 'source-map',
  plugins: [
    new ClosureCompilerPlugin({
      compilation_level: 'ADVANCED',
      create_source_map: false,
      env: 'BROWSER'
    })
  ]
};