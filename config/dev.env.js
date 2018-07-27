'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  ENV_CONFIG: '"dev"',
  // API_HOST: '"http://192.168.4.62:8080"'
  // API_HOST: '"https://www.icmao.com"'
  API_HOST: '"http://d5.cto3.shovesoft.com"'
})
