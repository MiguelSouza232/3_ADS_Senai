void setup() {
  pinMode(23, OUTPUT);
  pinMode(22, OUTPUT);
  pinMode(32, OUTPUT);
  pinMode(33, OUTPUT);
  pinMode(25, OUTPUT);
  pinMode(26, OUTPUT);
  pinMode(27, OUTPUT);
  pinMode(14, OUTPUT);
  pinMode(12, OUTPUT);
  pinMode(13, OUTPUT);
}
void loop() {

  // ACENDE NA ORDEM DEFINIDA
  digitalWrite(23, HIGH); delay(500);
  digitalWrite(22, HIGH); delay(500);
  digitalWrite(32, HIGH); delay(500);
  digitalWrite(33, HIGH); delay(500);
  digitalWrite(25, HIGH); delay(500);
  digitalWrite(26, HIGH); delay(500);
  digitalWrite(27, HIGH); delay(500);
  digitalWrite(14, HIGH); delay(500);
  digitalWrite(12, HIGH); delay(500);
  digitalWrite(13, HIGH); delay(500);
  delay(1000); // todos acesos
  
  // APAGA NA ORDEM INVERSA
  digitalWrite(13, LOW); delay(500);
  digitalWrite(12, LOW); delay(500);
  digitalWrite(14, LOW); delay(500);
  digitalWrite(27, LOW); delay(500);
  digitalWrite(26, LOW); delay(500);
  digitalWrite(25, LOW); delay(500);
  digitalWrite(33, LOW); delay(500);
  digitalWrite(32, LOW); delay(500);
  digitalWrite(22, LOW); delay(500);
  digitalWrite(23, LOW); delay(500);
  delay(1000);
}