const path = require('path');
const webpack = require('webpack');

module.exports = {
    mode: 'production',
    entry: ["./src/index.js"],
    output: { 
        path: __dirname + "/static/js",
        filename: 'bundle.js'
    },
    module: {   
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules\/(?!bullets-js)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                ['@babel/preset-env', { 
                  "targets": {
                    "node": "current"
                  }
                }],
                "@babel/preset-react"
              ]
            }
          }
        }
      ]
    }
}