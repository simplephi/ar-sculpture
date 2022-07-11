const path = require('path');
module.exports = {
    mode: "development",

    entry: "./src/index.js",
    output: {
        path: `${__dirname}/dist`,
        filename: "main.js"
    },
    resolve: {
        extensions: [".js"]
    },
    module: {
        rules: [
            {
                test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2)$/i,
                generator: {
                    filename: 'assets/[hash][ext][query]'
                },
                type: "asset"
            }
        ]
    }
};