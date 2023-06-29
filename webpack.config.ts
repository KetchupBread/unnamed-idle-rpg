import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import AppList from './applist.json';

let extendHTMLPlugins: HtmlWebpackPlugin[] = AppList.map((app) => {
  return new HtmlWebpackPlugin({
    filename: `${app.name}/index.html`,
    title: `${app.name}`,
    chunks: [`${app.name}`],
    template: __dirname + '/src/build/common/templates/AppIndex.hbs',
    templateParameters: {
      Title: app.title,
      AppRoot: app.name
    }
  })
})

module.exports = {
  watch: true,
  mode: 'development',
  devtool: 'eval-source-map',
  entry: {
    'game': [
      '/src/build/game/index.tsx',
      '/src/build/game/scss/global.scss'
    ]

  },
  output: {
    path: __dirname + '/dist/',
    filename: '[name]/bundle.js',
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.(tsx|ts)$/,
        exclude: __dirname + '/node_modules/*',
        use: {
          loader: 'ts-loader',
        }
      },
      {
        test: /\.s[ac]ss$/i,
        exclude: __dirname + '/node_modules/*',
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|git|mp3)$/i,
        exclude: __dirname + '/node_modules/*',
        type: 'asset/resource',
        generator: {
          filename: './[name][ext]',
        },
      },
      {
        test: /\.(hbs|handlebars)$/i,
        exclude: __dirname + '/node_modules/*',
        loader: 'handlebars-loader',
      },
    ]
  },
  resolve: {
    extensions: [
      '.tsx',
      '.ts',
      '.js',
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name]/styles.css',
    }),
  ].concat(extendHTMLPlugins as []),
};
