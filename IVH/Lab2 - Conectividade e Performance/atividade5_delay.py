# Aqui importamos as bibliotecas responsáveis por:

# executar comandos,
# medir tempo,
# trabalhar com datas,
# e enviar informações para o dashboard.
import subprocess
import time
from datetime import datetime
import requests
import json

# Essa é a URL do nosso servidor Flask.
SERVER_URL = "http://localhost:5000/api/ping"

print("\n" + "=" * 60)
print("  🏭 SIMULAÇÃO DE REDE INDUSTRIAL")
print("=" * 60)
print("\n⚠️  IMPORTANTE: Certifique-se de que o servidor está rodando!")
print("   Execute em outro terminal: python server.py")
print("\n" + "=" * 60)

while True:

    print("\n" + "=" * 60)
    print("           SIMULAÇÃO DE REDE INDUSTRIAL")
    print("=" * 60)

    # O sistema aguarda o operador pressionar ENTER.
    # Isso simula o envio de um comando industrial.
    input("\nPressione ENTER para enviar o comando...")

    print("\n[STATUS] Enviando comando para google.com ...\n")

    # Aqui começamos a medir o tempo.
    inicio = time.time()

    # Aqui executamos um ping para o servidor do Google.
    # Esse ping simula uma comunicação industrial.
    resultado = subprocess.run(
        ["ping", "-n", "1", "8.8.8.8"],
        capture_output=True,
        text=True
    )

    fim = time.time()

    # E aqui calculamos o tempo total da comunicação.
    tempo_total = fim - inicio

    horario = datetime.now().strftime("%H:%M:%S")

    print("-" * 60)
    print(f"Horário da execução : {horario}")
    print(f"Servidor destino    : google.com")
    print(f"Tempo total         : {tempo_total:.2f} segundos")
    print("-" * 60)

    # Determinar se foi sucesso ou erro
    if "TTL=" in resultado.stdout:
        status = "SUCESSO"
        print("[SUCESSO] Comunicação realizada com sucesso!")
    else:
        status = "ERRO"
        print("[ERRO] Falha na comunicação da rede!")

    print("\nResumo da comunicação:\n")

    linhas = resultado.stdout.splitlines()
    info_pacote = ""

    for linha in linhas:
        if "Resposta de" in linha or "Request timed out" in linha:
            print(">>", linha)
            info_pacote = linha

    print("\n" + "=" * 60)

    # Enviar dados para o servidor
    try:
        dados = {
            "horario": horario,
            "servidor": "8.8.8.8",
            "tempo_total": round(tempo_total, 2),
            "status": status,
            "info_pacote": info_pacote,
            "output": resultado.stdout
        }

        # Depois os dados são enviados para o servidor Flask, que atualiza o dashboard em tempo real.
        response = requests.post(SERVER_URL, json=dados, timeout=5)

        if response.status_code == 200:
            print("\n✅ Dados enviados para o dashboard com sucesso!")
        else:
            print(f"\n⚠️  Erro ao enviar dados: {response.status_code}")

    except requests.exceptions.ConnectionError:
        print("\n❌ Erro: Não foi possível conectar ao servidor.")
        print("   Certifique-se de que 'python server.py' está rodando em outro terminal.")
    except Exception as e:
        print(f"\n❌ Erro ao enviar dados: {str(e)}")

    print("\n" + "=" * 60)