var server = io.connect('http://localhost:8080');

// Chatter connection
server.on('connect', function(data){
  $("#status").html('Connected to chat');
  nickname = "<b>" + prompt("What's your nickname ?") + "</b>";
  server.emit('join', nickname);

  appendChatter(nickname);
  appendMessage(nickname + ' has joined !');
});

// Messages events
server.on('messages', function(data){
  appendMessage(data)
});

// Form submit(emit message)
$("#chat-form").submit(function(e){
  e.preventDefault();
  var message = $("#chat-input").val();
  server.emit('messages', message);
  $("#chat-input").val("");
});

// Append Functions
function appendChatter(nickname) {
  var new_chatter = document.createElement('li');
  new_chatter.innerHTML = nickname;
  $("#chatters").append(new_chatter);
}

function appendMessage(message) {
  var new_message = document.createElement('span');
  new_message.innerHTML = message + '<br/>';
  $("#chat-console").append(new_message);
}
