
const config = require('./config.json');
const defaultConfig = config.development;
const environment = process.env.NODE_ENV || 'development';
console.log(environment);
const environmentConfig = config[environment];
const finalConfig = Object.assign(defaultConfig, environmentConfig);
global.gConfig = finalConfig;

