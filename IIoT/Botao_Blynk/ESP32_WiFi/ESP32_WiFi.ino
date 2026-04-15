/* Comment this out to disable prints and save space */
#define BLYNK_PRINT Serial

#define BLYNK_TEMPLATE_ID "TMPL2GaFxF5pc"
#define BLYNK_TEMPLATE_NAME "TurmaBIot"
#define BLYNK_AUTH_TOKEN "24pgHoQi3uR3hV9iyBEo6Ai2LCWggQVx"

#include <WiFi.h>
#include <WiFiClient.h>
#include <BlynkSimpleEsp32.h>

char ssid[] = "iotsenai123";
char pass[] = "iotsenai123";

int led = 18;

bool estado = false;

void setup()
{
  Serial.begin(9600);

  pinMode(led, OUTPUT);
  digitalWrite(led, LOW); // garante desligado

  Blynk.begin(BLYNK_AUTH_TOKEN, ssid, pass);
}

void loop() {
  Blynk.run();
}

// Botão virtual (toggle)
BLYNK_WRITE(V2) {

  if (param.asInt() == 1) {

    estado = !estado;

    digitalWrite(led, estado);

    Blynk.virtualWrite(V2, estado);
  }
}
