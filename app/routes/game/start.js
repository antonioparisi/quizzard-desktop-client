import GameBaseRoute from 'appkit/routes/game/base';

export default GameBaseRoute.extend({
  renderTemplate: function() {
    var controller = this.controllerFor('game');

    this.render('game/status/started', { outlet: 'status' });
    this.render('game/start', { outlet: 'wrapper', controller: controller });
    this.render('game/actions/next_question', { outlet: 'actions', controller: controller });
  }
});
