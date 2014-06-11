if (Meteor.isClient) {
    var notifications = new Meteor.Stream('arduino-notifications');

    notifications.on('message', function(message, time) {
        if (message == '0' || message == '1') {
            Session.set('lightState', Number(message));
        } else {
            var m = moment();
            var completeMessage = message + ' @ ' + m.format('h:mm:ss a');
            $('#messages').prepend('<div>' + completeMessage + '</div>');
        }
    });
    notifications.on('lightState', function(lightState) {
        Session.set('lightState', lightState);
    });
    var toggleLight = function() {
        if (Session.get('lightState') === 0) {
            Session.set('lightState', 1);
        } else {
            Session.set('lightState', 0);
        }
        notifications.emit('toggleLight', Session.get('lightState'));
    };
    Template.body.lightStateClass = function() {
        if (Session.get('lightState')) {
            return 'success';
        }
        return 'danger';
    };
    Template.body.events({
        'click #clearMessages': function() {
            $('#messages').html('');
        },
        'click #toggleLight': function() {
            toggleLight();
        }
    });
    Template.body.created = function() {
        notifications.emit('getlightState');
    };
}

if (Meteor.isServer) {
    var notifications = new Meteor.Stream('arduino-notifications');
    notifications.permissions.read(function(userId, eventName) {
        return true;
    });
    notifications.permissions.write(function(userId, eventName) {
        return true;
    });
    var serialPort = new SerialPort.SerialPort("/dev/tty.usbserial-AD026BEG", {
        baudrate: 9600,
        parser: SerialPort.parsers.readline('\r\n')
    });
    var sendToArduino = function(message) {
        serialPort.write(message);
    };
    serialPort.on('open', function() {
        console.log('Port open');
    });
    serialPort.on('data', function(data) {
        console.log('Receiving data');
        notifications.emit('message', data, Date.now());
    });
    notifications.on('toggleLight', function(lightState) {
        console.log('Toggle Light');
        sendToArduino(new Buffer([lightState]));
        notifications.emit('lightState', lightState);
    });
    notifications.on('getlightState', function() {
        console.log('Get Light State');
        sendToArduino(new Buffer([2]));
    });
}
