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
  lastQuestion: false,

  currentQuestion: function() {
    if (this.get('questions').length === 0) {
      return;
    }

    if (this.get('questions').length > this.get('questionStatus')) {
      // Init question timer for current question
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

  quizFinished: function() {
    if (this.get('lastQuestion') === true) {
      return true;
    }else {
      return false;
    }
  }.property('lastQuestion'),

  // For human readability
  //
  questionStatusFormat: function() {
    return this.get('questionStatus') + 1;
  }.property('questionStatus'),

  actions: {
    fakeUserJoin: function() {
      $.ajax({
        type: 'GET',
        url: '%@/%@'.fmt(window.ENV.baseApiUrl, 'users/join')
      });
    },

    startQuiz: function() {
      this.transitionToRoute('game.start');

      $.ajax({
        type: 'POST',
        url: '%@/%@'.fmt(window.ENV.baseApiUrl, 'quizes/start')
      });
    },

    nextQuestion: function() {
      var totalQuestions = this.get('questions').length;

      if (totalQuestions > (this.get('questionStatus') + 1)) {
        $.ajax({
          type: 'POST',
          url: '%@/%@'.fmt(window.ENV.baseApiUrl, 'quizes/next_question')
        });
        this.set('questionStatus', this.get('questionStatus') + 1);
      }

      if (totalQuestions >= this.get('questionStatus')) {
        this.set('lastQuestion', true);
      }
    },

    showWinner: function() {
      $.ajax({
        type: 'GET',
        url: '%@/%@'.fmt(window.ENV.baseApiUrl, 'quizes/rank')
      });
    }
  }
});
