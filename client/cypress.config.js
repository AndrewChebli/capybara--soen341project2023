const { defineConfig } = require('cypress')

module.exports = defineConfig({
  projectId: 'fwk6r9',
  e2e: {
    baseUrl: 'http://localhost:3000',
  },
})