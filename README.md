# Meteor to Arduino using serialport

An example project showing communication between a Meteor app and an Arduino Uno connected via a serial port. This project uses the [meteor-serialport](https://github.com/HumulusMaximus/meteor-serialport) meteor package, which is [serialport](https://www.npmjs.org/package/serialport) repackaged for Meteor.

Be sure to plug in your Arduino to the serial port before starting meteor. The Arduino file for this project is included in this repository [here](/https://github.com/HumulusMaximus/meteor-arduino-serialport/tree/master/Meteor_SerialPort_LED_Toggle). Upload it to your device and change the the path to your device:
```js
var serialPort = new SerialPort.SerialPort("/yourPath", {
    baudrate: 9600,
    parser: SerialPort.parsers.readline('\r\n')
});
```
This example uses [Meteor Streams](http://arunoda.github.io/meteor-streams/).

An alternative to using the meteor-serial package is to use the serialport node package via [npm](https://atmospherejs.com/package/npm). To do so, change this:
```js
var serialPort = new SerialPort.SerialPort("/yourPath", {
    baudrate: 9600,
    parser: SerialPort.parsers.readline('\r\n')
});
```
to:
```js
var SerialPort = Meteor.require('serialport');
var serialPort = new SerialPort.SerialPort("/yourPath", {
    baudrate: 9600,
    parser: SerialPort.parsers.readline('\r\n')
});
```

