const path = require('path')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
    watch: true,
    entry: {
        content: './src/main.js',
        popup: './src/popup.js'
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist/content')
    },
    plugins: [
        new UglifyJsPlugin({
            uglifyOptions: {
                compress: {},
                mangle: {}
            }
        })
    ]
}
