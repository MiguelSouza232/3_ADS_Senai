/* Comment this out to disable prints and save space */
#define BLYNK_PRINT Serial

/* Fill in information from Blynk Device Info here */
//#define BLYNK_TEMPLATE_ID           "TMPxxxxxx"
//#define BLYNK_TEMPLATE_NAME         "Device"
//#define BLYNK_AUTH_TOKEN            "YourAuthToken"

#define BLYNK_TEMPLATE_ID "TMPL2GaFxF5pc"
#define BLYNK_TEMPLATE_NAME "TurmaBIot"
#define BLYNK_AUTH_TOKEN "24pgHoQi3uR3hV9iyBEo6Ai2LCWggQVx"

#include <WiFi.h>
#include <WiFiClient.h>
#include <BlynkSimpleEsp32.h>

// Your WiFi credentials.
// Set password to "" for open networks.
char ssid[] = "iotsenai123";
char pass[] = "iotsenai123";

#define BUTTON_PIN 18

bool ledState = false;
bool lastButtonState = HIGH;

void setup()
{
  // Debug console
  Serial.begin(115200);

  pinMode(BUTTON_PIN, INPUT_PULLUP);

  Blynk.begin(BLYNK_AUTH_TOKEN, ssid, pass);
}

void loop()
{
  Blynk.run();
  
  bool currentButtonState = digitalRead(BUTTON_PIN);

  // Detecta quando o botão foi pressionado
  if (lastButtonState == HIGH && currentButtonState == LOW) {
    ledState = !ledState; // alterna estado

    // Atualiza LED virtual no Blynk
    Blynk.virtualWrite(V10, ledState);

    delay(200); // debounce simples
  }

  lastButtonState = currentButtonState;
}
