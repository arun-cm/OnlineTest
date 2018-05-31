module.exports = {
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            use: [{
                loader: 'babel-loader'
            }]
        }]
    }
,
    devServer: {
        proxy: {
            '/api/*': 'http://localhost:8081/'
        }
    }
}