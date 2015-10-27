let config = {api: {}};

let production = false;

if (production) {
  config.api.url = '//sos-dev.nolteundlauth.de';
} else{
  config.api.url = '//sos-dev.nolteundlauth.de';
}

module.exports = config;
