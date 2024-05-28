const path = require('path');
const nodeExternals = require('webpack-node-externals');

const serverConfig = {
  entry: './server/index.ts',

  target: 'node',

  externals: [nodeExternals()],

  output: {
    path: path.resolve('server-build'),
    filename: 'server.js',
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
        options: {
          allowTsInNodeModules: true,
          configFile: 'server.tsconfig.json'
        },
      },
      {
        test: /\.css$/i,
        use: ['css-loader'],
      },
      {
        test: /\.(jpg|jpeg|png|svg|gif)$/,
        use: [{
          loader: 'file-loader',
          options: {
              name: '[md5:hash:hex].[ext]',
              publicPath: '/server-build/img',
              outputPath: 'img',
          }
      }]
      }
    ]
  },

  devtool: 'source-map',

  resolve: {
    extensions: [ '.tsx', '.ts', '.js', '.css', '.svg', '.png' ],
  },
};

module.exports = [serverConfig];
