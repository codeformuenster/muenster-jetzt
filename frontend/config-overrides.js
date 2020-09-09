const {override} = require('customize-cra');
const cspHtmlWebpackPlugin = require("csp-html-webpack-plugin");

const cspConfigPolicy = {
  'default-src': "'none'",
  'base-uri': "'self'",
  'object-src': "'none'",
  'script-src': ["'self'"],
  'style-src': ["'self'"],
  'img-src': ["'self'", "https://www.bleker-it.de", "https://www.muensterhack.de"],
  'font-src': ["'self'","data:"],
  'frame-src': ["https://bike-frontend.azurewebsites.net"],
  'connect-src': ["'self'", process.env.REACT_APP_BACKEND_BASE_PATH],
};

function addCspHtmlWebpackPlugin(config) {
  if(process.env.NODE_ENV === 'production') {
    config.plugins.push(new cspHtmlWebpackPlugin(cspConfigPolicy));
  }

  return config;
}

module.exports = {
  webpack: override(addCspHtmlWebpackPlugin),
};