// Put your development configuration here.
//
// This is useful when using a separate API 
// endpoint in development than in production.
//
// window.ENV.public_key = '123456'
window.ENV.apiHostname = 'localhost';
window.ENV.apiPort = '3002';
window.ENV.baseApiUrl = 'http://' + window.ENV.apiHostname + ':' + window.ENV.apiPort;
