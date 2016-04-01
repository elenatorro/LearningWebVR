module.exports = {
  context: __dirname,
  entry: './exercises/simple_scene/script',
  output: {
    filename: 'bundle.js',
    path: './exercises/simple_scene/'
  },
  module: {
    loaders: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['es2015']
        }
      }
    ]
  },
  resolve: {
    extensions: ['', '.js']
  }
}
