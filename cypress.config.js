const { defineConfig } = require("cypress");

module.exports = defineConfig({
  component: {
    setupNodeEvents(on, config) {},
    specPattern: "src/**/*.spec.js",
  
  },

  e2e: {
    baseUrl:"http://localhost:8081",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
