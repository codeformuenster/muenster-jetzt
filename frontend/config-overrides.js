const {override} = require('customize-cra');
const cspHtmlWebpackPlugin = require("csp-html-webpack-plugin");

const cspConfigPolicy = {
  'default-src': "'none'",
  'base-uri': "'self'",
  'object-src': "'none'",
  'script-src': [],
  'style-src': ["'self'"],
  'img-src': ["'self'", "https://muenster-jetzt.de", "https://www.bleker-it.de", "https://www.muensterhack.de", "https://gobeta.de"],
  'font-src': ["'self'","data:"],
  'frame-src': ["https://bike-frontend.azurewebsites.net", "https://db-muenster.veomo.com/"],
  'connect-src': ["'self'", process.env.REACT_APP_BACKEND_BASE_PATH],
  'media-src': ["https://muenster-jetzt.de"],
};

function addCspHtmlWebpackPlugin(config) {
  if (process.env.NODE_ENV === 'production') {
    config.plugins.push(new cspHtmlWebpackPlugin(cspConfigPolicy));
  }

  return config;
}

module.exports = {
  webpack: override(addCspHtmlWebpackPlugin),
};
