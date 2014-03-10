var Router = Ember.Router.extend(); // ensure we don't share routes between all Router instances

Router.map(function() {
  this.route('index', { path: '/' });
  this.route('splash');
  this.resource('game', function() {
    this.route('waiting');
    this.route('start');
  });
});

Router.reopen({
  location: 'history'
});

export default Router;
