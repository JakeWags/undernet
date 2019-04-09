let presets = [["@babel/preset-env", { useBuiltIns: "entry", corejs: 3 }], "@babel/preset-react"]

let plugins = [
  "@babel/plugin-proposal-class-properties",
  "@babel/plugin-syntax-dynamic-import",
  "emotion",
]

module.exports = api => {
  const test = api.env("test")
  const dist = api.env("dist")

  if (test) {
    plugins = [
      ...plugins,
      "dynamic-import-node",
      ["babel-plugin-webpack-aliases", { config: "config/webpack.dev.js" }],
    ]
  } else if (dist) {
    presets = ["@babel/preset-env"]
    plugins = []
  }

  return { plugins, presets }
}
