


module.exports = {
  "repository": {
  "type": "git",
  "url": "https://github.com/CJButton/media-player"
  },
  context: __dirname,
  entry: "./main.jsx",
  output: {
    path: "./",
    filename: "bundle.js"
  },
  module: {
    loaders: [
      {
        test: [/\.jsx?$/, /\.css/],
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['react', 'env']
        }
      }
    ]
  },
  resolve: {
    extensions: ["", ".js", ".jsx" ]
  },
  devtool: "source-map"
};
