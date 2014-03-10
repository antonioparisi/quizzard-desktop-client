export default Ember.ArrayController.extend({
  waitingRoom: Ember.A(),

  classCheckOnlinePlayers: function() {
    return this.get('waitingRoom').length > 0;
  }.property('waitingRoom.@each'),

  buttonCheckOnlinePlayers: function() {
    return this.get('waitingRoom').length > 0 ? false : 'disabled';
  }.property('waitingRoom.@each')
});
