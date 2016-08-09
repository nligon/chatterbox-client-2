// $('body').prepend("<div class='player'><iframe width='560' height='315' src='https://www.youtube.com/embed/dQw4w9WgXcQ\"></iframe></div>");

// $('#main').append("<img src='http://netdna.walyou.netdna-cdn.com/wp-content/uploads//2013/08/Nerdy-Darth-Vader.jpg'>")

var app = {
  messages: {},

  myMessage: {
    username: 'Vader',
    text: 'I am your father.',
    roomname: 'lobby'
  },


  renderMessages: function(messages) {
    for (var i = 0; i < messages.length; i++) {
      app.addMessage(messages[i]);
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

  addMessage: function(oneMessage) {
    $('#chats').html('<div><br>Username: ' + oneMessage.username + '<br>Text: ' + oneMessage.text + '<br>Roomname: ' + oneMessage.roomname + '</div>');
  },

  addRoom: function() {
    $('#roomSelect').append('<div><br>Username: ' + message.username + '<br>Text: ' + message.text + '<br>Roomname: ' + message.roomname + '</div>');
  },

  handleData: function(data) {
    // var filterData = app.filter(data);
    app.renderMessages(data);
  },

  filter: function(data) {
    for (var packet in data) {
      if () {}
    }
  },

  order: function(data) {

  }


};

app.fetch();
setInterval(app.fetch, 3000);
