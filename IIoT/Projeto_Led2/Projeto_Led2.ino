void setup() {
  Serial.begin(9600);
}

void loop() {
  int pot = analogRead(4);
  int brilho = pot / 16;

  analogWrite(23, brilho);

  delay(10);
}
