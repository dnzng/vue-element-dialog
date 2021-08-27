module.exports = {
  productionSourceMap: false,
  configureWebpack: {
    output: {
      // https://cli.vuejs.org/guide/build-targets.html#vue-vs-js-ts-entry-files
      libraryExport: 'default',
    },
  },
}
