/*eslint-disable*/

const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const autoprefixer = require('autoprefixer');
const postcssUrl = require('postcss-url');
const postcssImports = require('postcss-import');
const maximumInlineSize = 10;

const postcssPlugins = function (loader) {
    return [
        postcssImports({
            resolve: (url, context) => {
                return new Promise((resolve, reject) => {
                    let hadTilde = false;
                    if (url && url.startsWith('~')) {
                        url = url.substr(1);
                        hadTilde = true;
                    }
                    loader.resolve(context, (hadTilde ? '' : './') + url, (err, result) => {
                        if (err) {
                            if (hadTilde) {
                                reject(err);
                                return;
                            }
                            loader.resolve(context, url, (err, result) => {
                                if (err) {
                                    reject(err);
                                }
                                else {
                                    resolve(result);
                                }
                            });
                        }
                        else {
                            resolve(result);
                        }
                    });
                });
            },
            load: (filename) => {
                return new Promise((resolve, reject) => {
                    loader.fs.readFile(filename, (err, data) => {
                        if (err) {
                            reject(err);
                            return;
                        }
                        const content = data.toString();
                        resolve(content);
                    });
                });
            }
        }),
        postcssUrl({
            filter: ({ url }) => url.startsWith('~'),
            url: ({ url }) => {
                const fullPath = path.join(projectRoot, 'node_modules', url.substr(1));
                return path.relative(loader.context, fullPath).replace(/\\/g, '/');
            }
        }),
        postcssUrl([
            {
                // Only convert root relative URLs, which CSS-Loader won't process into require().
                filter: ({ url }) => url.startsWith('/') && !url.startsWith('//'),
                url: ({ url }) => {
                    if (deployUrl.match(/:\/\//) || deployUrl.startsWith('/')) {
                        // If deployUrl is absolute or root relative, ignore baseHref & use deployUrl as is.
                        return `${deployUrl.replace(/\/$/, '')}${url}`;
                    }
                    else if (baseHref.match(/:\/\//)) {
                        // If baseHref contains a scheme, include it as is.
                        return baseHref.replace(/\/$/, '') +
                            `/${deployUrl}/${url}`.replace(/\/\/+/g, '/');
                    }
                    else {
                        // Join together base-href, deploy-url and the original URL.
                        // Also dedupe multiple slashes into single ones.
                        return `/${baseHref}/${deployUrl}/${url}`.replace(/\/\/+/g, '/');
                    }
                }
            },
            {
                // TODO: inline .cur if not supporting IE (use browserslist to check)
                filter: (asset) => {
                    return maximumInlineSize > 0 && !asset.hash && !asset.absolutePath.endsWith('.cur');
                },
                url: 'inline',
                // NOTE: maxSize is in KB
                maxSize: maximumInlineSize,
                fallback: 'rebase',
            },
            { url: 'rebase' },
        ]),
        autoprefixer({ grid: true }),
    ];
};

module.exports = {
    entry: [
        // path.resolve(__dirname, 'assets/js/app.js'),
        path.resolve(__dirname, 'resources/js/index.ts'),
        path.resolve(__dirname, 'resources/scss/main.scss')
    ],
    output: {
        path: path.resolve(__dirname, 'src/assetbundles/cp/dist'),
        filename: "js/[name].js",
    },
    mode: 'production',
    optimization: {
        minimize: true,
        splitChunks: {
            chunks: 'all',
            name: 'vendor',
        }
    },
    module: {
        rules: [
            {
                test: /\.(svg|cur)$/,
                loader: "file-loader",
                options: {
                    name: "[name].[ext]",
                    limit: 10000
                }
            },
            // {
            //     test: /\.(jpg|png|webp|gif|otf|ttf|woff|woff2|ani)$/,
            //     loader: "url-loader",
            //     options: {
            //         name: "[name].[ext]",
            //         limit: 10000
            //     }
            // },
            { test: /\.(png|woff|woff2|eot|ttf|svg)$/, loader: 'url-loader?limit=100000' },
            {
                test: /\.css$/,
                use: [
                    { loader: "style-loader" },
                    { loader: "css-loader" }
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    "style-loader",
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    {
                        loader: "postcss-loader",
                        options: {
                            ident: "embedded",
                            plugins: [
                                postcssPlugins,
                                require('postcss-slope-calc')()
                            ]
                        }
                    },
                    "sass-loader"
                ]
            },
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: [
                    /node_modules/,
                    /scss/,
                    path.resolve(__dirname, 'assets/scss/app.scss')
                ]
            }
            //,
            // {
            //     test: /\.(js|jsx)$/,
            //     exclude: [
            //         /node_modules/,
            //         path.resolve(__dirname, 'assets/scss/app.scss')
            //         // path.resolve(__dirname, 'assets/scss/ie.scss')
            //     ],
            //     use: {
            //         loader: "babel-loader",
            //         options: {
            //             cacheDirectory: true,
            //             presets: [
            //                 [
            //                     '@babel/preset-env',
            //                     {
            //                         modules: false,
            //                         targets: {
            //                             browsers: ['> 2%'],
            //                             uglify: true
            //                         },
            //                         useBuiltIns: 'usage'
            //                     }
            //                 ]
            //             ],
            //             plugins: ['@babel/plugin-transform-async-to-generator']
            //         }
            //     }
            // }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: '../css/[name].css',
        }),
        new CopyWebpackPlugin([
            {
                context: 'assets',
                from: "img/**/*",
                to: ""
            }
        ])
    ],
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        }
    },
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'src/assetbundles/cp/dist/js/')
    }
};