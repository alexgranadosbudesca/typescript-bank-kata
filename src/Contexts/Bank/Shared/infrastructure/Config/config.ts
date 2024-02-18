var convict = require('convict');

convict.addFormat(require('convict-format-with-validator').ipaddress);

var config = convict({
  env: {
    doc: 'The application environment.',
    format: ['production', 'development', 'test'],
    default: 'development',
    env: 'NODE_ENV'
  },
  mongo: {
    url: {
      doc: 'The Mongo connection URL',
      format: String,
      env: 'MONGO_URL',
      default: 'mongodb://localhost:27017/app'
    }
  },
});

var env = config.get('env');
config.loadFile( __dirname + '/' + env + '.json');

config.validate({allowed: 'strict'});

export default config;