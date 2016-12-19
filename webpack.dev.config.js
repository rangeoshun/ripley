module.exports = {
  entry: './src/index.js',
  output: {
    path: `${__dirname}/dist/`,
    filename: 'ripley.dev.js'
  },
  loaders: [
    {
      test: /\.js$/,
      loader: 'babel-loader',
      query: {
        presets: ['es2015']
      }
    }
  ]
};