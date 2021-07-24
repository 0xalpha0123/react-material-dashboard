const HtmlWebpackPlugin = require('html-webpack-plugin');
const InlineChunkHtmlPlugin = require('react-dev-utils/InlineChunkHtmlPlugin');
const InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin');
const ModuleNotFoundPlugin = require('react-dev-utils/ModuleNotFoundPlugin');
const webpack = require('webpack');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const WatchMissingNodeModulesPlugin = require('react-dev-utils/WatchMissingNodeModulesPlugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const WorkboxWebpackPlugin = require('workbox-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('react-dev-utils/ForkTsCheckerWebpackPlugin');


module.exports = function override(config, env) {
    config.output = {
        ...config.output, 
        filename: 'js/[name].js',
        chunkFilename: 'js/[name].chk.js',
    };    
    let plugins = config.plugins
    console.log(plugins.splice(4, 1));
    plugins.push ( 
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: 'css/[name].css',
            chunkFilename: 'css/[name].chk.css',
        }))
    config.plugins = plugins;
    const imageInlineSizeLimit = 10000;
    let oneOf = config.module.rules[2].oneOf;
    oneOf.splice(7, 1);
    oneOf.splice(0, 1);
    oneOf = [
        ...oneOf,
        {
            test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
            loader: require.resolve('url-loader'),
            options: {
                limit: imageInlineSizeLimit,
                name: 'app/[name].[ext]',
            }
        },
        {
            loader: require.resolve('file-loader'),
            // Exclude `js` files to keep "css" loader working as it injects
            // its runtime that would otherwise be processed through "file" loader.
            // Also exclude `html` and `json` extensions so they get processed
            // by webpacks internal loaders.
            exclude: [/\.(js|mjs|jsx|ts|tsx)$/, /\.html$/, /\.json$/],
            options: {
                name: 'app/[name].[ext]',
            },
        },
    ];
    config.module.rules[2].oneOf = oneOf;
    return config;
}