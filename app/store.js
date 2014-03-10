export default Ember.RESTAdapter.extend({
  ajaxSettings: function(url, method) {
    return {
      url: window.ENV.baseApiUrl + url,
      type: method,
      dataType: 'json'
    };
  }
});
