module.exports = {
    configureWebpack: {
        externals: {
            vue: 'Vue'
        }
    },
    filenameHashing: false,
    outputDir: '../src/assetbundles/cp/dist',
    devServer: {
        https: false,
        public: 'http://localhost:8080/',
        headers: { 'Access-Control-Allow-Origin': '*' },
        disableHostCheck: true,
    },
};
