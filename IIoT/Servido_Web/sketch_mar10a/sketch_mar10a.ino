#include <WiFi.h>

char ssid[] = "iotsenai123";
char senha[] = "iotsenai123 ";
WiFiServer server(80);

void setup() {
  Serial.begin(115200);
  delay(10);
  conectawifi(ssid, senha);
  server.begin();
  Serial.println("WEB Server Inicializado");
}

void loop() {
  WiFiClient client = server.available();
  if (!client) {
    return;
  }

  Serial.println("Cliente conectado!");

  // Aguarda dados chegarem
  unsigned long timeout = millis();
  while (client.available() == 0) {
    if (millis() - timeout > 3000) {
      Serial.println("Timeout! Cliente demorou demais.");
      client.stop();
      return;
    }
  }

  // Lê e descarta a requisição HTTP do navegador
  while (client.available()) {
    String linha = client.readStringUntil('\n');
    Serial.println(linha);
    if (linha == "\r") break; // Linha vazia = fim do cabeçalho
  }

  // Envia a resposta HTML
  client.println("HTTP/1.1 200 OK");
  client.println("Content-Type: text/html");
  client.println("Connection: close");
  client.println(); // Linha em branco obrigatória antes do HTML
  client.println("<!DOCTYPE HTML>");
  client.println("<html>");
  client.println("<h1>Controlando remotamente o ESP32</h1>");
  client.println("<h2>Ola Mundo</h2>");
  client.println("</html>");

  delay(10);
  client.stop(); // Encerra a conexão
  Serial.println("Cliente desconectado.");
}

void conectawifi(char SSID[], char senha[]) {
  Serial.print("Conectando a rede: ");
  Serial.println(SSID);
  WiFi.begin(SSID, senha);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println(" ");
  Serial.println("Wifi Conectado");
  Serial.print("IP: ");
  Serial.println(WiFi.localIP());
}
