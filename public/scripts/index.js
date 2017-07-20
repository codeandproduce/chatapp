
var socket = io(); //initiating the request & storing

socket.on('connect', function(){
  console.log("connected to server");
  // socket.emit('createEmail', {
  //   to: "gmail@gmail.com",
  //   text: "hello"
  // });

  // socket.emit('createMessage', {
  //   from: 'Andrew',
  //   text: 'Hey!'
  // });


});

socket.on('disconnect', function() {
  console.log("disconnected from server; server is down");
});
// socket.on('newEmail', function(email){ //custom newEmail function.
//   // "email" is the infomation passed.
//   console.log('newEmail', email);
// });

socket.on('newMessage', function(message){
  console.log('newMessage', message);

  var li = $('<li></li>');
  li.text(`${message.from}: ${message.text}`);

  $('#messages-ol').append(li);
});


socket.emit('createMessage', {
  from: 'Frank',
  text: 'Hi'
}, function (data) {
  console.log('Got it', data);
});

$('#message-form').on('submit', function(e){
  e.preventDefault();
  socket.emit('createMessage', {
    from: 'User',
    text: $('[name=message]').val()
  }, function(){
  });
});
