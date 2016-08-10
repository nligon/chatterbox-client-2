$(document).ready(function() {
  $('#userSend').on('click', app.createSendMessage);
});

$("#chats").prop({ scrollTop: $("#chats").prop("scrollHeight") });

var app = {

  messages: {},

  myMessage: {
    username: 'Nathanael',
    text: 'Test message, as requested!',
    roomname: 'lobby'
  },

  renderMessages: function(messages) {
    for (var i = Math.min(19, messages.length - 1); i >= 0; i--) {
      app.addMessage(messages[i]);
    }
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
    $('#chats').append('<br><div style=";padding:10px;border:1px solid black;"><br><b>' + app.filter(message.username) + ': </b>' + app.filter(message.text) + '<br><i><small>' + app.filter(message.roomname) + '</small></i></div>');
  },

  addRoom: function(message) {
    $('#roomSelect').append('<div><br>Username: ' + message.username + '<br>Text: ' + message.text + '<br>Roomname: ' + message.roomname + '</div>');
  },


  handleData: function(data) {
    app.clearMessages();
    app.renderMessages(data);
  },

  filter: data => !data ? '' : data.length < 501 ? data.replace(/</g, '&lt;').replace(/>/g, '&gt;') : data.slice(0, 501).replace(/</g, '&lt;').replace(/>/g, '&gt;') + '... (<i>message exceeded character limit.</i>)',

  getUsername: function() {
    var url = document.URL;
    var index = url.indexOf('username=');
    return url.slice(index + 9).replace(/%20/g, ' ');
  },

  createSendMessage: function() {
    var message = {};
    message.username = app.getUsername();
    message.text = $('#textbox')[0].value;
    message.roomname = 'lobby';
    console.log(message);
    app.send(message);
  },

  channels: function(channels) {
    for (var i = 0; i < channels.length; i++) {
      $('#channel-bar').append('<div class="channels">' + channels[i] + '</div>');
    }
  }

};

app.init();
