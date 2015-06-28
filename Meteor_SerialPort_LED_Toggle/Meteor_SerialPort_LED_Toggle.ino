const int ledPin = 13;
const int lightOff = 0x00;
const int lightOn = 0x01;
const int lightState = 0x02;

void setup()
{
  pinMode(ledPin, OUTPUT);
  Serial.begin(9600);
}

void printHeader(int pin) {
        Serial.print("\n{");
        Serial.print("\n\"pin\": ");
        Serial.print(pin);
        Serial.print(",");
        Serial.print("\n\"state\":");
        Serial.print(digitalRead(pin));
        Serial.print(",");
}

void printFooter () {
  Serial.println("\n}");
}

void loop()
{
  if (Serial.available() > 0) {
    int incomingByte = Serial.read();
    if (incomingByte == lightOff) {
        digitalWrite(ledPin, LOW);
        printHeader(ledPin);
        Serial.print("\n\"messageType\":\"pinChange\"");
    } else if (incomingByte == lightOn) {
        digitalWrite(ledPin, HIGH);
        printHeader(ledPin);
        Serial.print("\n\"messageType\":\"pinChange\"");
    } else if (incomingByte == lightState) {
        printHeader(ledPin);
        Serial.print("\n\"messageType\":\"methodResponse\"");
      }
      printFooter();
  }
}
