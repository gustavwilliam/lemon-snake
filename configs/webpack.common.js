const path = require(`path`);
const CopyPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: {
        app: `./src/index.ts`,
    },
    output: {
        path: path.resolve(__dirname, `../dist`),
        filename: `[name].js`,
        clean: true,
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: `ts-loader`,
                include: [path.resolve(__dirname, `../src`)],
                options: {
                    configFile: `../configs/tsconfig.json`,
                    transpileOnly: true,
                },
            },
            {
                test: /\.(png|jpg|gif)$/, 
                loader: `file-loader`,
                options: {
                    esModule: false,
                },
            },
        ]
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                {
                    from: `./public/**/*`,
                    to: `[name][ext]`,
                    globOptions: {
                        ignore: [`**/*.html`]
                    }
                }
            ]
        }),
        new HtmlWebpackPlugin({
            title: `Typescript Tetris`,
            template: `./public/index.html`,
            filename: `index.html`,
        })
    ],
    resolve: {
        extensions: [`.ts`, `.tsx`, `.js`]
    }
}
