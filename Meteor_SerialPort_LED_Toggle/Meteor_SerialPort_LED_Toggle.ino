const int ledPin = 13;
const int lightOff = 0x00; 
const int lightOn = 0x01; 
const int lightState = 0x02;
 
void setup()
{
  pinMode(ledPin, OUTPUT);
  Serial.begin(9600);
}
 
void loop()
{
  if (Serial.available() > 0) {
    int incomingByte = Serial.read();
    if (incomingByte == lightOff) {
        digitalWrite(ledPin, LOW);
        Serial.println("LED Off");
    } else if (incomingByte == lightOn) {
        digitalWrite(ledPin, HIGH);
        Serial.println("LED On");
    } else if (incomingByte == lightState) {
      Serial.println(digitalRead(ledPin));
    }
  }
}
