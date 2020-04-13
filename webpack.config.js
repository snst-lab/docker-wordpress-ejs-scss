const path = require("path");
const webpack = require("webpack");
const nodeExternals = require("webpack-node-externals");
const baseDir = "dist/js";

/**
 * ### 共通設定部分の定義
 */
const commonSetting = {
  mode: "development",
  entry: {},
  target: "node",
  externals: [
    nodeExternals(),
    {
      jquery: "$"
    }
  ],
  output: {
    path: path.resolve(__dirname, baseDir),
    publicPath: "./" + baseDir,
    filename: "[name]"
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: "ts-loader"
      },
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      }
    ]
  }
};

/**
 * ### ターゲットファイル別設定
 * commonSettingを普通に渡すと参照渡しになり、一番最後の設定しか実行されないので
 * Object.assign({},commonSetting)で commonSettingのディープコピーを作成
 */
module.exports = [
  Object.assign(Object.assign({}, commonSetting), {
    entry: {
      "polyfill.js": [
        "./src/js/Polyfill/Promise.js",
        "./src/js/Polyfill/ObjectAssign.js",
        "./src/js/Polyfill/Fetch.js",
        "./src/js/Polyfill/IntersectionObserver.js",
        "./src/js/Polyfill/ObjectFit.js",
        "./src/js/Functions.js"
      ]
    },
    plugins: [new webpack.IgnorePlugin(/vertx/)]
  }),
  Object.assign(Object.assign({}, commonSetting), {
    entry: {
      "common.js": ["./src/js/Common/Main.js"]
    },
    plugins: [
      new webpack.ProvidePlugin({
        $: "jquery"
      })
    ]
  }),
  Object.assign(Object.assign({}, commonSetting), {
    entry: {
      "form.js": "./src/js/Form/Main.js"
    },
    plugins: [
      new webpack.ProvidePlugin({
        $: "jquery"
      })
    ]
  }),
  Object.assign(Object.assign({}, commonSetting), {
    entry: {
      "slider.js": "./src/js/Slider/Main.js"
    },
    plugins: [
      new webpack.ProvidePlugin({
        $: "jquery"
      })
    ]
  })
];
