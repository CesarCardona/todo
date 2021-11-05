const HtmlWebpack = require('html-webpack-plugin'); // Esto carga el paquete de webpack
const MiniCssExtract = require('mini-css-extract-plugin'); // Esto carga el paquete que extrae el css hacia dist
const CopyPlugin = require("copy-webpack-plugin"); // Esto carga el plugin que permite copiar archivos o carpetas al dist

module.exports = {
    mode: 'development',

    output: {
        clean: true
    },

    module: {
        rules: [
            {
                test: /\.html$/,
                use: [
                    {
                        loader: 'html-loader',
                        options: {
                            minimize: false,
                            sources: false
                        }
                    }
                ]
            },
            {
                test: /\.css$/, 
                exclude: /styles.css$/,
                use: ['style-loader','css-loader']
            },
            {
                test: /styles.css$/,
                use: [MiniCssExtract.loader, 'css-loader']
            },
            {
                test: /\.(png|jpe?g|gif)$/,
                loader: 'file-loader'
            }
        ]
    },
    optimization: {},
    plugins: [
        new HtmlWebpack({
            template: './src/index.html',
            filename: './index.html',
            title: 'Webpack Build'
        }),
        new MiniCssExtract({
            // filename: '[name][fullhash].css' // Producción
            filename: '[name].css'
        }),
        new CopyPlugin({
            patterns: [
              { from: 'src/assets', to: 'assets/' },
            ]
        })   
    ]
}