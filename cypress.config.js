const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://ro.gnjoy.com/",
    setupNodeEvents(on, config) {
      // node event listeners
    },
  },
});
