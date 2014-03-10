import GameBaseRoute from 'appkit/routes/game/base';

export default GameBaseRoute.extend({
  renderTemplate: function() {
    var controller = this.controllerFor('game');

    this.render('game/status/waiting', { outlet: 'status' });
    this.render('game/waiting', { outlet: 'wrapper' });
    this.render('game/actions/start', { outlet: 'actions', controller: controller });
  },
});
