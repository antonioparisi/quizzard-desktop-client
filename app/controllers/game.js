import QuestionTimer from 'appkit/models/question_timer';

export default Ember.Controller.extend({
  needs: ['room'],
  room: Ember.computed.alias('controllers.room'),
  // Users online
  users: [],
  // Questions container
  questions: [],
  // Questions counter
  questionStatus: 0,
  // Question timer
  timerCurrentQuestion: null,

  currentQuestion: function() {
    if (this.get('questions').length === 0) {
      return;
    }

    if (this.get('questions').length > this.get('questionStatus')) {
      // Init question timer
      this.set('timerCurrentQuestion', QuestionTimer.create());

      return this.get('questions').objectAt(this.get('questionStatus'));
    }
  }.property('questions.@each', 'questionStatus'),

  totalQuestions: function() {
    return this.get('questions').length;
  }.property('questions.@each'),

  questionTimer: function() {
    var timer = this.get('timerCurrentQuestion');

    function countDown() {
      if (timer.get('seconds') > 1) {
        timer.decrementProperty('seconds');

        setTimeout(countDown, 1000);
      } else {
        timer.set('seconds', 0);
        timer.set('timesUp', true);
      }
    }

    setTimeout(countDown, 1000);
  }.observes('timerCurrentQuestion'),

  timerFinished: function() {
    if (this.get('timerCurrentQuestion.timesUp') === true) {
      return false;
    } else {
      return 'disabled';
    }
  }.property('timerCurrentQuestion.timesUp'),

  // For human readability
  //
  questionStatusFormat: function() {
    return this.get('questionStatus') + 1;
  }.property('questionStatus'),

  actions: {
    startQuiz: function() {
      this.transitionToRoute('game.start');

      $.ajax({
        type: 'POST',
        url: '%@/%@'.fmt(window.ENV.baseApiUrl, 'quizes/start')
      });
    },

    nextQuestion: function() {
      if (this.get('questions').length > (this.get('questionStatus') + 1)) {
        this.set('questionStatus', this.get('questionStatus') + 1);
      }
    }
  }
});
