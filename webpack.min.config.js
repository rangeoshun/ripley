const ClosureCompilerPlugin = require('closure-compiler-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: `${__dirname}/dist/`,
    filename: 'ripley.min.js'
  },
  loaders: [
    {
      test: /\.js$/,
      loader: 'babel-loader',
      query: {
        presets: ['es2015']
      }
    }
  ],
  plugins: [
    new ClosureCompilerPlugin({
      compilation_level: 'SIMPLE',
      create_source_map: false,
      env: 'BROWSER'
    })
  ]
};