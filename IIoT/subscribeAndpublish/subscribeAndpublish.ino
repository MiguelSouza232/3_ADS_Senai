/****************************************
 * Bibliotecas
 ****************************************/
#include "UbidotsEsp32Mqtt.h"

/****************************************
 * Variáveis
 ****************************************/
const char *UBIDOTS_TOKEN = "BBUS-wFGegKHNmyr5J1yrp8O4Flf2r6QvzV";
const char *WIFI_SSID = "CLARO_2G851625";
const char *WIFI_PASS = "D5851625";
const char *DEVICE_LABEL = "tb";              //Utilizar nome de placa de preferencia em minusculo
const char *PUBLISH_POT = "potenciometro";
const char *SUBSCRIBE_LED = "led";
const char *PUBLISH_BTN = "btn";

const int btn=4;
const int led=13;
const int pot=34;

unsigned long ultimotempopot;
unsigned long ultimotempobtn;

/****************************************
 * Funções Auxiliares
 ****************************************/
void callback(char *topic, byte *payload, unsigned int length)
{
  Serial.print("Message arrived [");
  Serial.print(topic);
  Serial.print("] ");
  String mensagem = "";
  
  for (int i = 0; i < length; i++)
  {
    mensagem += ((char)payload[i]);
  }
  Serial.println(mensagem);

  if (mensagem == "1.0"){
    digitalWrite(led, HIGH);
  }else if (mensagem == "0.0"){
    digitalWrite(led, LOW);
  }
  
}


Ubidots ubidots(UBIDOTS_TOKEN);

void setup() {
  pinMode(led,OUTPUT);
  pinMode(btn,INPUT_PULLUP);
  Serial.begin(115200);
  ubidots.connectToWifi(WIFI_SSID, WIFI_PASS);
  ubidots.setCallback(callback);
  ubidots.setup();
  ubidots.reconnect();
  ubidots.subscribeLastValue(DEVICE_LABEL, SUBSCRIBE_LED);

}

void loop() {
  if (!ubidots.connected())
  {
    ubidots.reconnect();
  }

  if((millis() - ultimotempopot)> 5000){
    float valorpot = analogRead(pot);
    ubidots.add(PUBLISH_POT, valorpot);
    ubidots.publish(DEVICE_LABEL);
    ultimotempopot = millis();
  }

  static bool estadoToggle = false;
  static bool estadoBotaoAnterior = HIGH;

  bool estadoBotao = digitalRead(btn);

  if (estadoBotao == LOW && estadoBotaoAnterior == HIGH) {
    estadoToggle = !estadoToggle;

    ubidots.add(PUBLISH_BTN, estadoToggle ? 1 : 0);
    ubidots.publish(DEVICE_LABEL);

    Serial.println(estadoToggle ? "ON" : "OFF");

    delay(200);
  }

  estadoBotaoAnterior = estadoBotao;
  
  ubidots.loop();
}
