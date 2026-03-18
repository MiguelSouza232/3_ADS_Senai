#include <WiFi.h>

const char* ssid = "iotsenai123";
const char* senha = "iotsenai123";

WiFiServer server(80);

int ledPin = 19;     // D19
int botaoPin = 18;  // D18

String estadoLED = "OFF";

void setup() {
  Serial.begin(115200);

  pinMode(ledPin, OUTPUT);
  pinMode(botaoPin, INPUT_PULLUP);

  WiFi.begin(ssid, senha);

  Serial.println("Conectando...");
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println("\nConectado!");
  Serial.print("IP: ");
  Serial.println(WiFi.localIP());

  server.begin();
}

void loop() {
  WiFiClient client = server.available();
  if (!client) return;

  while (!client.available()) {
    delay(1);
  }

  String request = client.readStringUntil('\r');
  client.flush();

  // Controle do LED via URL
  if (request.indexOf("/LED=ON") != -1) {
    digitalWrite(ledPin, HIGH);
    estadoLED = "ON";
  }

  if (request.indexOf("/LED=OFF") != -1) {
    digitalWrite(ledPin, LOW);
    estadoLED = "OFF";
  }

  // Leitura do botão
  String estadoBotao;
  if (digitalRead(botaoPin) == LOW) {
    estadoBotao = "PRESSIONADO";
  } else {
    estadoBotao = "SOLTO";
  }

  // HTML da página
  client.println("HTTP/1.1 200 OK");
  client.println("Content-Type: text/html");
  client.println("");

  client.println("<!DOCTYPE HTML>");
  client.println("<html>");
  client.println("<head>");
  client.println("<meta http-equiv='refresh' content='2'>");
  client.println("<style>");
  client.println("body { font-family: Arial; text-align: center; background: #f2f2f2; }");
  client.println("h1 { color: #333; }");
  client.println(".botao { padding: 15px 30px; font-size: 20px; margin: 10px; border: none; border-radius: 10px; }");
  client.println(".on { background-color: green; color: white; }");
  client.println(".off { background-color: red; color: white; }");
  client.println("</style>");
  client.println("</head>");

  client.println("<body>");
  client.println("<h1>Controle ESP8266</h1>");

  client.println("<h2>Estado do Botao: " + estadoBotao + "</h2>");
  client.println("<h2>LED: " + estadoLED + "</h2>");

  client.println("<a href=\"/LED=ON\"><button class='botao on'>LIGAR</button></a>");
  client.println("<a href=\"/LED=OFF\"><button class='botao off'>DESLIGAR</button></a>");

  client.println("</body>");
  client.println("</html>");
}
