import App from 'appkit/app';

export default Ember.Route.extend({
  enter: function() {
    Ember.run.later(this, function () {
      $('.loading .row').fadeOut('normal', function() {
        this.transitionTo('game.waiting');
      }.bind(this));
    }, 1500);
  }
});
