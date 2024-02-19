import convict from 'convict';

convict.addFormat(require('convict-format-with-validator').ipaddress);

const config = convict({
  env: {
    doc: 'The application environment.',
    format: ['prod', 'dev', 'test'],
    default: 'dev',
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

const env = config.get('env');
config.loadFile( __dirname + '/' + env + '.json');

config.validate({allowed: 'strict'});

export default config;
