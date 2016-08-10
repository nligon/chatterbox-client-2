// structure: init --> fetch(ajax) --> handleMessages --> trimIDs (using ID object, adds new IDs and throws out old messages) --> filterMessagesMessages --> storeMessages --> renderMessages

$(document).ready(function() {
  $('#userSend').on('click', app.createSendMessage);
  $("#chats").prop({ scrollTop: $("#chats").prop("scrollHeight") });
});



var app = {
  storage: {},

  idStorage: {},

  room: undefined,

  addRoom: function(message) {
    $('#roomSelect').append('<div><br>Username: ' + message.username + '<br>Text: ' + message.text + '<br>Roomname: ' + message.roomname + '</div>');
  },

  appendMessage: function(message) {
    $('#chats').append('<br><div style=";padding:10px;border:1px solid black;"><br><b>' + app.filterMessages(message.username) + ': </b>' + app.filterMessages(message.text) + '<br><i><small>' + app.filterMessages(message.roomname) + ', ' + app.convertTime(message.createdAt.slice(11, 13)) + message.createdAt.slice(13, 19) + '</small></i></div>');
  },

  channels: function(channels) {
    for (var i = 0; i < channels.length; i++) {
      $('#channel-bar').append('<div class="channels">' + channels[i] + '</div>');
    }
  },

  clearMessages: function() {
    $('#chats').empty();
  },
  
  convertTime: function(hour) {
    return (Number(hour) + 5) > 12 ? String((Number(hour) + 5) - 12) : String((Number(hour) + 5));
  },

  createSendMessage: function() {
    var message = {};
    message.username = app.getUsername();
    message.text = $('#textbox')[0].value;
    message.roomname = 'lobby';
    console.log(message);
    app.send(message);
  },

  fetch: function(url = 'https://api.parse.com/1/classes/messages') {
    $.ajax({
      url: url,
      type: 'GET',
      contentType: 'application/json',
      success: function(data) {
        if (data.results.length) {
          app.handleMessages(data.results);
        }
      },
      error: function(data) {
        console.log('Error:', data);
      }
    });
  },

  filterMessages: function(message) {
    return !message ? '' : message.length < 501 ? message.replace(/</g, '&lt;').replace(/>/g, '&gt;') : message.slice(0, 501).replace(/</g, '&lt;').replace(/>/g, '&gt;') + '... (<i>message exceeded character limit.</i>)';
  },

  getUsername: function() {
    var url = document.URL;
    var index = url.indexOf('username=');
    return url.slice(index + 9).replace(/%20/g, ' ');
  },

  handleMessages: function(newMessages) {
    newMessages = app.trimMessages(newMessages);
    for (var i = 0; i < newMessages.length; i++) {
      for (var key in newMessages[i]) {
        newMessages[i][key] = app.filterMessages(newMessages[i][key]);
      }
    }
    // console.log(newMessages);
    app.storeMessages(newMessages);
    app.renderMessages(newMessages);
  },

  init: function() {
    var username = app.getUsername();

    app.fetch();
    setInterval(app.fetch, 3000);
  },

  renderMessages: function(messageArray) {
    for (var i = messageArray.length - 1; i >= 0; i--) {
      if (app.room === undefined || app.room === messageArray[i].roomname) {
        app.appendMessage(messageArray[i]);
      }
    }
  },

  renderRoom: function(roomname) {
    app.room = roomname;
    app.clearMessages();
    app.renderMessages(app.storage[roomname]);
  },

  send: function(message) {
    $.ajax({
      // This is the url you should use to communicate with the parse API server.
      url: 'https://api.parse.com/1/classes/messages',
      type: 'POST',
      data: JSON.stringify(message),
      contentType: 'application/json',
      success: function(data) {},
      error: function(data) {
        console.error('chatterbox: Failed to send message', data);
      }
    });
  },

  storeMessages: function(newMessages) {
    for (var i = newMessages.length - 1; i >= 0; i--) {
      if (app.storage[newMessages[i]['roomname']]) {
        app.storage[newMessages[i]['roomname']].push(newMessages[i]);
      } else {
        app.storage[newMessages[i]['roomname']] = [newMessages[i]];
      }
    }
  },

  trimMessages: function(newMessages) {
    for (var i = 0; i < newMessages.length; i++) {
      // if ID not found, store ID
      if (!app.idStorage[newMessages[i].objectId]) {
        app.idStorage[newMessages[i].objectId] = true;
      } else {
        // if ID found, remove all ID's from newMessages, from this on to the right
        newMessages = newMessages.slice(0, i);
      }
    }
    return newMessages;
  }

};

app.init();

