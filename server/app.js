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
Meteor.publish('messages', function() {
  return Messages.find();
});

Meteor.methods({
  toggleLight: function(light) {
    var newState = light.state ? false : true;
    sendToArduino(new Buffer([newState]));
  },
  getLightState: function() {
    sendToArduino(new Buffer([2]));
  },
  message: function(newDoc) {
    Messages.insert(newDoc);
  },
  clearMessages: function() {
    Messages.remove({});
  }
});

var sendToArduino = function(message) {
  serialPort.write(message);
};
var serialPort = new SerialPort.SerialPort('/dev/tty.usbmodemfd121', {
  baudrate: 9600,
  parser: SerialPort.parsers.readline('\r\n')
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
    Messages.insert(parsedData);
  }
}));
