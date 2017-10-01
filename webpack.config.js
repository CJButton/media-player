


module.exports = {
  context: __dirname,
  entry: "./main.jsx",
  output: {
    path: "./",
    filename: "bundle.js"
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
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
