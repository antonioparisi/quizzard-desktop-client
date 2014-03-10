export default Ember.Route.extend({
  renderTemplate: function() {
    this._super();
  },

  activate: function() {
    var gameController = this.controllerFor('game');

    if (gameController.get('room.classCheckOnlinePlayers') === false) {
      this.transitionTo('game.waiting');
    }
  }
});
