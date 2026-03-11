const int pinoPot = 34;
int valorAnterior = 0;
unsigned long ultimoTempo = 0;

void setup() {
  Serial.begin(9600);
  valorAnterior = analogRead(pinoPot);
  Serial.println(valorAnterior);
  ultimoTempo = millis();
}

void loop() {
  int valorAtual = analogRead(pinoPot);
  unsigned long agora = millis();

  if (valorAtual >= valorAnterior + 10 || valorAtual <= valorAnterior - 10) {
    Serial.println(valorAtual);
    valorAnterior = valorAtual;
  }
  else if (agora - ultimoTempo >= 5000) {
    Serial.println(valorAtual);
    valorAnterior = valorAtual;
    ultimoTempo = agora;
  }
}
