// YOUR CODE HERE:

var w1 = function() {
  (setTimeout(function() {
    console.log('console meow');
    return 'return meow';
  }).bind(this), 1000);
};

var catSay = function() {
  console.log('console meow');
  return 'meow';
};

var app = {
  messages: {},
  // myMessage: {
  //   username: 'Mel Brooks',
  //   text: 'It\'s good to be the king',
  //   roomname: 'lobby'
  // },



  renderMessages: function() {
    app.fetch();
    if (app.messages !== undefined) {
      console.log(app.messages);
      for (var key in app.messages) {
        console.log(app.messages[key]);
        app.addMessage(app.messages[key]);
      }
      return "Messages looped and run through addMessage.";

    } else {
      return "Messages not ready yet.";
    }
  },

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
    console.log('fetching!');
    $.ajax({
      // This is the url you should use to communicate with the parse API server.
      url: 'https://api.parse.com/1/classes/messages',
      type: 'GET',
      data: { key: 'value' },
      contentType: 'application/json',
      success: function(data) {
        // console.log({ data: data });
        app.messages = data.results;
        // console.log('messages from fetch:', app.messages);
      },
      error: function(data) {
        // console.error('chatterbox: Failed to fetch', data);
      }
    });

  },

  clearMessages: function() {
    $('#chats').empty();
  },
  addMessage: function(oneMessage) {
    $('#chats').append('<div><br>Username: ' + oneMessage.username + '<br>Text: ' + oneMessage.text + '<br>Roomname: ' + oneMessage.roomname + '</div>');
  },
  addRoom: function() {
    $('#roomSelect').append('<div><br>Username: ' + message.username + '<br>Text: ' + message.text + '<br>Roomname: ' + message.roomname + '</div>');
  }

};
