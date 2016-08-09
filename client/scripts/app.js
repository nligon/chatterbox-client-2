// $('body').prepend("<div class='player'><iframe width='560' height='315' src='https://www.youtube.com/embed/dQw4w9WgXcQ\"></iframe></div>");

// $('#main').append("<img src='http://netdna.walyou.netdna-cdn.com/wp-content/uploads//2013/08/Nerdy-Darth-Vader.jpg'>")

// $('#main').append("<http://vignette1.wikia.nocookie.net/empireatwar/images/4/44/1756_-_empire_insignia_logo_star_wars.png'>")

// http://vignette1.wikia.nocookie.net/empireatwar/images/4/44/1756_-_empire_insignia_logo_star_wars.png

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

  addMessage: function(oneMessage) {
    $('#chats').append('<div><br>Username: ' + oneMessage.username + '<br>Text: ' + oneMessage.text + '<br>Roomname: ' + oneMessage.roomname + '</div>');
  },

  addRoom: function() {
    $('#roomSelect').append('<div><br>Username: ' + message.username + '<br>Text: ' + message.text + '<br>Roomname: ' + message.roomname + '</div>');
  },

  handleData: function(results) {
    var filteredResults = app.filter(results);
    app.clearMessages();
    app.renderMessages(filteredResults);
  },

  filter: function(results) {
    console.log('data before cleanup:', results);
    console.log('results length:', results.length);
    // remove malicious lines
    for (var i = 0; i < results.length; i++) {
      var packet = results[i];
      console.log('packet:', packet);
      for (var key in packet) {
        console.log('key, value:', key, packet[key]);

        if (packet[key].includes("$", "{")) {
          console.log('found $!');
          // delete results.packet;
          packet[key] = "Malicious code: " + String(packet[key]);
        }

        if (app.charInString(packet[key], '$', '{', '}')) {
          console.log('found' + app.charInString(packet[key] + '!'))
          packet[key] = "Malicious code found:", app.charInString(packet[key]);
        }



      }
    }
    console.log('data after cleanup:', results);
    return results;
  },

  order: function(data) {

  }


};

app.init();
