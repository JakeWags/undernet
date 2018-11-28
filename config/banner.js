const path = require("path")
const pkg = require(path.resolve(__dirname, "../package.json"))
const year = new Date().getFullYear()

module.exports = (
`/*!
  * @license MIT (https://github.com/geotrev/undernet/blob/master/LICENSE)
  * Undernet v${pkg.version} (${pkg.homepage})
  * Copyright 2017-${year} ${pkg.author}
  */`
)