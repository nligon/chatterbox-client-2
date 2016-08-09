$(document).ready(function() {
  $('#userSend').on('click', app.createSendMessage);
});

function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {

    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}

var app = {

  messages: {},

  myMessage: {
    username: 'Nathanael',
    text: 'Test message, as requested!',
    roomname: 'lobby'
  },

  renderMessages: function(messages) {
    for (var i = 19; i >= 0; i--) {
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

    $('#chats').append('<div><br>Username: ' + app.filter(message.username) + '<br>Text: ' + app.filter(message.text) + '<br>Roomname: ' + message.roomname + '</div>');
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
    return url.slice(index + 9);
  },

  createSendMessage: function() {
    var message = {};
    message.username = app.getUsername();
    message.text = $('#textbox')[0].value;
    message.roomname = 'lobby';
    console.log(message);
    app.send(message);
  }

};

app.init();
