

var app = {
  messages: {},

  myMessage: {
    username: 'Nathanael',
    text: 'Test message, as requested!',
    roomname: 'lobby'
  },

  renderMessages: function(messages) {
    console.log(messages);
    for (var i = 0; i < messages.length; i++) {
      app.addMessage(messages[i]);
    }
  },

  charInString: function(string) {
    var chars = {};
    for (var i = 0; i < string.length; i++) {
      chars[string[i]] = true;
    }
    for (var j = 1; j < arguments.length; j++) {
      if (chars[arguments[j]]) {
        console.log(arguments[j], 'found');
        return true;
      }
    }
    return false;
  },

  init: function() {
    app.fetch();
    setInterval(app.fetch, 3000);
  },

  send: function(message) {
    $.ajax({
      // This is the url you should use to communicate with the parse API server.
      url: 'https://api.parse.com/1/classes/messages',
      type: 'POST',
      data: JSON.stringify(message),
      contentType: 'application/json',
      success: function(data) {
        console.log('chatterbox: Message sent');
        app.handleData(data.results);
        // app.fetch();
      },
      error: function(data) {
        console.error('chatterbox: Failed to send message', data);
      }
    });
  },

  fetch: function(url = 'https://api.parse.com/1/classes/messages') {
    console.log('fetching!');
    $.ajax({
      // This is the url you should use to communicate with the parse API server.
      url: url,
      type: 'GET',
      contentType: 'application/json',
      success: function(data) {
        app.messages = data.results;
        app.handleData(data.results);
      },
      error: function(data) {
        // console.error('chatterbox: Failed to fetch', data);
      }
    });

  },

  clearMessages: function() {
    $('#chats').empty();
  },

  addMessage: function(message) {

    $('#chats').append('<div><br>Username: ' + app.filter(message.username) + '<br>Text: ' + app.filter(message.text) + '<br>Roomname: ' + message.roomname + '</div>');
  },

  addRoom: function(message) {
    $('#roomSelect').append('<div><br>Username: ' + message.username + '<br>Text: ' + message.text + '<br>Roomname: ' + message.roomname + '</div>');
  },


  handleData: function(data) {
    //var filterData = app.filter(data);
    app.clearMessages();
    app.renderMessages(data);
  },

  filter: data => !data ? '' : data.length < 501 ? data.replace(/</g, '&lt;').replace(/>/g, '&gt;') : data.slice(0, 501).replace(/</g, '&lt;').replace(/>/g, '&gt;') + '... (<i>message exceeded character limit.</i>)'

};

app.init();
