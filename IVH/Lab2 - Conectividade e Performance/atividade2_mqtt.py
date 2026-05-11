import paho.mqtt.client as mqtt
import time
import json

broker = "broker.hivemq.com"
topico = "teste/fabrica"

client = mqtt.Client(mqtt.CallbackAPIVersion.VERSION2)

print("Conectando ao broker...")
client.connect(broker, 1883, 60)

inicio = time.time()

for i in range(100):

    dados = {
        "sensor": "temp",
        "valor": 25
    }

    client.publish(topico, json.dumps(dados))

    print(f"Mensagem {i+1} enviada")

fim = time.time()

tempo_total = fim - inicio

print("\n===== RESULTADO =====")
print(f"Tempo total: {tempo_total:.2f} segundos")
print(f"Latência média: {tempo_total/100:.4f} segundos")

client.disconnect()