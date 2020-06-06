const HtmlWebPackPlugin = require("html-webpack-plugin");
const webpack = require('webpack')
const path = require('path');

module.exports = {
    module: {
        rules: [
        {
            test: /\.(s[ac]ss|css)$/i,
            use: [
            // Creates `style` nodes from JS strings
            'style-loader',
            // Translates CSS into CommonJS
            'css-loader',
            // Compiles Sass to CSS
            'sass-loader',
            ],
        },
        {
            test: /\.(png|svg|jpg|gif|glb|hdr|zip)$/,
            use: [{
                loader: 'file-loader'
            }]
        },
        {
            test: /\.(js|jsx|jsm)$/,
            exclude: /node_modules/,
            use: {
                loader: "babel-loader"
            }
        },
        {
            test: /\.html$/,
            use: [
                {
                    loader: "html-loader",
                }
            ]
        }, 
        ],
    },
    plugins: [
        new HtmlWebPackPlugin({
            hash: true,
            template: './src/index.html',
            filename: './index.html',
            favicon: './src/assets/img/favicon.svg'
        }),
    ]
};
