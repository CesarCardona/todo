const HtmlWebpack = require('html-webpack-plugin'); // Carga el paquete de webpack
const MiniCssExtract = require('mini-css-extract-plugin'); // Carga el paquete que extrae el css hacia dist
const CopyPlugin = require('copy-webpack-plugin'); // Carga el plugin que permite copiar archivos o carpetas al dist
const CssMinimizer = require('css-minimizer-webpack-plugin'); // Carga el plugin que minimiza el css
const Terser = require('terser-webpack-plugin'); // Carga el plugin que minimiza el js

module.exports = {
    mode: 'production',

    output: {
        clean: true,
        filename: 'main.[contenthash].js'
    },

    module: {
        rules: [
            {
                // test: /\.html$/i,
                // loader: 'html-loader',
                // options: {
                //     attributes: false,
                // },
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
            },
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                loader: "babel-loader",
                options: {
                    presets: ['@babel/preset-env']
                }
                }
            }
        ]
    },
    optimization: {
        minimize: true,
        minimizer: [
            new CssMinimizer(),
            new Terser(),
        ]
    },
    plugins: [
        new HtmlWebpack({
            template: './src/index.html',
            filename: './index.html',
            title: 'Webpack Build'
        }),
        new MiniCssExtract({
            // filename: '[name][fullhash].css' // Producción
            filename: '[name].[fullhash].css'
        }),
        new CopyPlugin({
            patterns: [
              { from: 'src/assets', to: 'assets/' },
            ]
        })   
    ]
}