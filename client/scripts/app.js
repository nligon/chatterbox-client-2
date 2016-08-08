// YOUR CODE HERE:

// var message = {
//   username: 'Mel Brooks',
//   text: 'It\'s good to be the king',
//   roomname: 'lobby'
// };

var app = {
  init: function() {},

  send: function(message) {
    $.ajax({
      // This is the url you should use to communicate with the parse API server.
      url: 'https://api.parse.com/1/classes/messages',
      type: 'POST',
      data: JSON.stringify(message),
      contentType: 'application/json',
      success: function(data) {
        console.log('chatterbox: Message sent');
        app.fetch();
      },
      error: function(data) {
        console.error('chatterbox: Failed to send message', data);
      }
    });
  },
  fetch: function(data) {
    $.ajax({
      // This is the url you should use to communicate with the parse API server.
      url: 'https://api.parse.com/1/classes/messages',
      type: 'GET',
      data: { key: 'value' },
      contentType: 'application/json',
      success: function(data) {
        console.log({data: data});
      },
      error: function(data) {
        console.error('chatterbox: Failed to fetch', data);
      }
    });
  },
  clearMessages: function() {
    $('#chats').empty();
  },
  addMessage: function(message) {
    $('#chats').append('<div><br>Username: ' + message.username + '<br>Text: ' + message.text + '<br>Roomname: ' + message.roomname + '</div>');
  },
  addRoom: function() {
    $('#roomSelect').append('<div><br>Username: ' + message.username + '<br>Text: ' + message.text + '<br>Roomname: ' + message.roomname + '</div>');
  }

};
