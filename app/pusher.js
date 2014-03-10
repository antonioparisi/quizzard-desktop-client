export default function() {
  // Enable pusher logging - don't include this in production
  Pusher.log = function(message) {
    if (window.console && window.console.log) {
      window.console.log(message);
    }
  };

  return new Pusher('df14386e576e4822f681');
}
