module.exports = function (env) {
    const webpack = require('webpack');
    const HtmlWebpackPlugin = require('html-webpack-plugin');
    const ExtractTextPlugin = require("extract-text-webpack-plugin");
    var CopyWebpackPlugin = require('copy-webpack-plugin');
    // var ProvidePlugin = require('webpack/lib/ProvidePlugin');
    var CleanWebpackPlugin = require('clean-webpack-plugin');
    var ReloadPlugin = require('reload-html-webpack-plugin');
    const path = require("path");
    const glob = require('glob');
    const PurifyCSSPlugin = require('purifycss-webpack');
    // import config from './config';
    var serverLocation = "";
    const isProd = env === 'prod' || env === 'test'; //true or false
    switch (env) {
        case "prod":
            serverLocation = "/prod";
            break;
        case "test":
            serverLocation = "/";
            break;
        case "uat":
            serverLocation = "/uat/";
            break;
        default:
            serverLocation = "";
    }
    const cssDev = [
        'style-loader',
        'css-loader',
        'resolve-url-loader',
        'sass-loader'];
    const cssProd = ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: ['css-loader', 'sass-loader'],
        publicPath: '/dist'
    });
    // const cssConfig = isProd ? cssProd : cssDev;
    const cssConfig = cssDev;
    return {
        entry: {
            app: ["babel-polyfill", "./src/js/app.js"]
            // , test:'mocha-loader!\./tests/test.js'
        },
        output: {
            path: path.resolve(__dirname, "dist"),
            publicPath: serverLocation,
            filename: '[name].bundle.js'
        },
        module: {
            rules: [
                {
                    test: /\.scss$/,
                    use: cssConfig
                },
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    loader:"babel-loader",
                    options: {
                        presets: ['react', 'es2015', 'stage-0', 'react-hmre'],
                        plugins: ['react-html-attrs', 'transform-class-properties', 'transform-decorators-legacy']
                    }
                },
                {
                    test: /\.(jpe?g|png|gif|svg)$/i,
                    use: 'file-loader'
                },
                {test: /\.(woff|woff2?)$/, use: 'url-loader?name=fonts/[name].[ext]'},
                {test: /\.(ttf|eot)$/, use: 'file-loader?name=fonts/[name].[ext]'}
            ]
        },
        devServer: {
            contentBase: path.join(__dirname, "dist"),
            compress: true,
            hot: true,
            inline: true,
            port: 2002,
            publicPath: serverLocation,
            historyApiFallback: true,
            // watchContentBase: true,
            stats: 'errors-only'
        },
        plugins: [
            new HtmlWebpackPlugin({
                title: 'Index page',
                filename:'index.html',
                serverLocation:serverLocation,
                hash: true,
                chunks: ['app'],
                cache:false,
                template: './src/templates/index.html'
            }),
            new HtmlWebpackPlugin({
                title: 'Home page',
                filename:'home.html',
                serverLocation:serverLocation,
                hash: true,
                chunks: ['app'],
                cache:false,
                template: './src/templates/home.html'
            }),
            new HtmlWebpackPlugin({
                title: 'Navigation page',
                filename:'navigation.html',
                serverLocation:serverLocation,
                hash: true,
                cache:false,
                template: './src/templates/navigation.html'
            })
            ,new webpack.DefinePlugin({
                ENV: JSON.stringify(env)
            }),
            new CopyWebpackPlugin([
                {from: 'src/bower_components', to: 'bower_components'},
                {from: 'src/libraries/w3.js', to: 'libraries'},
                {from: 'src/images', to: 'images'}
            ]),
            new webpack.HotModuleReplacementPlugin(),
            // new webpack.NamedModulesPlugin(),
            new ReloadPlugin()
        ],

    }
    // return require(`./webpack.${env}.js`)
};


