# Meteor to Arduino using serialport

An example Meteor app showing communication with an Arduino Uno. This project uses the [meteor-package-serialport](https://github.com/fourquet/meteor-package-serialport) meteor package, which is [serialport](https://www.npmjs.org/package/serialport) repackaged for Meteor.

Be sure to plug in your Arduino to the serial port of your computer before starting meteor. The Arduino file for this project is included in this repository [here](https://github.com/donaldaverill/meteor-app-example-arduino-serialport/tree/master/Meteor_SerialPort_LED_Toggle). Upload it to your device and change the path:
```js
var serialPort = new SerialPort.SerialPort("/yourPath", {
    baudrate: 9600,
    parser: SerialPort.parsers.readline('\r\n')
});
```
Once you start meteor, you should be able to turn on and off the LED on the Arduino board from a button on the app, which should also change from red(off) to green(on).

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

This example has been updated to Meteor 1.1 and [Meteor Streams](https://atmospherejs.com/package/streams) has been removed since it has been deprecated.
