// Put your production configuration here.
//
// This is useful when using a separate API
// endpoint in development than in production.
//
// window.ENV.public_key = '123456'
window.ENV.apiHostname = 'quizzard-api.herokuapp.com';
window.ENV.apiPort = '80';
window.ENV.baseApiUrl = 'http://' + window.ENV.apiHostname + ':' + window.ENV.apiPort;
