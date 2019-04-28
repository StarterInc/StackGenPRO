var webpack = require('webpack');
var path = require('path');

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');

var TARGET_DIR = path.resolve(__dirname, 'target');
var APP_DIR = path.resolve(__dirname, 'src/');

var config = {

	entry: path.resolve(__dirname, 'src', 'app.js'),
   output: {
      path: path.resolve(__dirname, 'output'),
      filename: 'bundle.js'
   },
   resolve: {
      extensions: ['.js', '.jsx']
   },
    
	module: {
	    rules: [
	      {
	        test: /\.(js|jsx)$/,
	        exclude:/node_modules/,
	        use: {
	          loader: "babel-loader"
	        }
	      },
	      {
	        test: /\.scss$/,
	        use: [
	          {
	            loader: 'style-loader'
	          },
	          {
	            loader: 'css-loader'
	          },
	          {
	            loader: 'sass-loader'
	          }
	        ]
	      },
	      {
	        test: /\.css$/,
	        use:  [  'style-loader', MiniCssExtractPlugin.loader, 'css-loader']
	      }
	    ]
	  },
  plugins: [ 
    new MiniCssExtractPlugin({
      filename: "style.css"
    }),
    new HtmlWebpackPlugin({
      inject: false,
      hash: true,
      template: './src/index.html',
      filename: './src/index.html'
    })
  ]
};

module.exports = config;