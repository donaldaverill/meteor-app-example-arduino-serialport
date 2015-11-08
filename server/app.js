var sendToArduino = function(message) {
  serialPort.write(message);
};
var serialPort = new SerialPort.SerialPort('/dev/tty.usbmodemFA131', {
  baudrate: 9600,
  parser: SerialPort.parsers.readline('\r\n')
});
Meteor.startup(function() {
  Lights.remove({});
  Lights.insert({
    pin: 13,
    state: false
  });
});

Meteor.publish('lights', function() {
  return Lights.find();
});
var messagePub;
Meteor.publish('messages', function() {
  messagePub = this;
  return this.ready();
});

serialPort.on('open', function() {
  console.log('Port open');
});
serialPort.on('data', Meteor.bindEnvironment(function(data) {
  var parsedData = JSON.parse(data);
  if (parsedData.messageType === 'pinChange') {
    Lights.update({
      pin: parsedData.pin
    }, {
      $set: {
        state: parsedData.state
      }
    });
  } else if (parsedData.messageType === 'methodResponse') {
    parsedData.created = new Date();
    messagePub.added('messages', Random.id(), parsedData);
  }
}));
Meteor.methods({
  message: function(newDoc) {
    messagePub.added('messages', Random.id(), newDoc);
  },
  toggleLight: function(light) {
    var newState = light.state ? false : true;
    sendToArduino(new Buffer([newState]));
  },
  getLightState: function() {
    sendToArduino(new Buffer([2]));
  },
  removeMessage: function(_id) {
    messagePub.removed('messages', _id);
  }
});
