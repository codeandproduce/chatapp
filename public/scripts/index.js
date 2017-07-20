
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

  $('#messages').append(li);
});

socket.on('newLocationMessage', function(message){
  var li = $('<li></li>');
  var a = $('<a target="_blank">My current location</a>');

  li.text(`${message.from}: `);
  a.attr('href', message.url);
  li.append(a);
  $('#messages').append(li);
});


$('#message-form').on('submit', function(e){
  e.preventDefault();
  socket.emit('createMessage', {
    from: 'User',
    text: $('[name=message]').val()
  }, function(){
  });
});

var locationButton = jQuery('#send-location');


locationButton.on('click', function () {
  if (!navigator.geolocation) {
    return alert('Geolocation not supported by your browser.');
  }
  locationButton.attr('disabled', 'disabled').text('Sending location...');

  navigator.geolocation.getCurrentPosition(function (position) {
    locationButton.removeAttr('disabled').text('Send location');
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });

  }, function () {
    alert('Unable to fetch location.');
    locationButton.removeAttr('disabled').text('Send location');
  });
});
