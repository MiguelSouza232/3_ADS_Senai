import requests
import time

url = "https://httpbin.org/post"

dados = {
    "sensor": "temp",
    "valor": 25
}

inicio = time.time()

for i in range(100):
    resposta = requests.post(url, json=dados)
    print(f"Mensagem {i+1} enviada")

fim = time.time()

tempo_total = fim - inicio

print("\n===== RESULTADO =====")
print(f"Tempo total: {tempo_total:.2f} segundos")
print(f"Latência média: {tempo_total/100:.4f} segundos")