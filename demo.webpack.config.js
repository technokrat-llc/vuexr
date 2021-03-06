const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    main: './demo/src/main.ts',
    worker: './src/worker.js'
  },
  resolve:  {
    extensions: ['.ts', '.js', '.json', '.png']
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, './demo/dist'),
  },
  node: {
    fs: 'empty'
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.join(__dirname, './demo/dist'),
    compress: true,
    port: 9000,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      // this will apply to both plain `.js` files
      // AND `<script>` blocks in `.vue` files
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components|vendor)/,
        use: {
          loader: 'babel-loader',
        }
      },
      // this will apply to both plain `.css` files
      // AND `<style>` blocks in `.vue` files
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              esModule: false,
            },
          },
        ],
      }
    ]
  },
  plugins: [
    //new CleanWebpackPlugin(),
    new VueLoaderPlugin(),
    new CopyPlugin([
      { from: './vendor/opencv_js.wasm', to: './opencv_js.wasm' },
    ]),
  ]
};
