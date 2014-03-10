import pusher from 'appkit/pusher';
import GameBaseRoute from 'appkit/routes/game/base';

export default GameBaseRoute.extend({
  setupController: function(controller) {
    // Waiting Room
    var waitingRoom = pusher().subscribe('waitingRoom');
    waitingRoom.bind('join', function(data) {
      controller.get('room.waitingRoom').pushObject(data.message);
    });

    // Quiz
    var quiz = pusher().subscribe('quiz');
    quiz.bind('start', function(data) {
      var questions = Ember.A();
      JSON.parse(data.message.questions).map(function(q) {
        questions.pushObject(q);
      });
      controller.set('questions', questions);
    });
  }
});
