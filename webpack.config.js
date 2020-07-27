const path = require('path');
module.exports = {
    entry: './index.ts',
    context: __dirname,
    target: 'node',
    node: {
        __dirname: true,
        __filename: true
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    },
    output: {
        filename: 'index.js',
        path: __dirname
    },
    mode: 'development'
};