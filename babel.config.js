module.exports = {
  presets: [
    '@vue/app',
    [
      "@babel/preset-env",
      {
        "useBuiltIns": "entry",
        "targets": {
          "node": "11.4.0",
        }
      }
    ]
  ]
}
