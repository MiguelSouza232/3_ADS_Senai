import subprocess
import time
from datetime import datetime

while True:

    print("\n" + "=" * 60)
    print("           SIMULAÇÃO DE REDE INDUSTRIAL")
    print("=" * 60)

    input("\nPressione ENTER para enviar o comando...")

    print("\n[STATUS] Enviando comando para google.com ...\n")

    inicio = time.time()

    resultado = subprocess.run(
        ["ping", "-n", "1", "google.com"],
        capture_output=True,
        text=True
    )

    fim = time.time()

    tempo_total = fim - inicio

    horario = datetime.now().strftime("%H:%M:%S")

    print("-" * 60)
    print(f"Horário da execução : {horario}")
    print(f"Servidor destino    : google.com")
    print(f"Tempo total         : {tempo_total:.2f} segundos")
    print("-" * 60)

    if "TTL=" in resultado.stdout:
        print("[SUCESSO] Comunicação realizada com sucesso!")
    else:
        print("[ERRO] Falha na comunicação da rede!")

    print("\nResumo da comunicação:\n")

    linhas = resultado.stdout.splitlines()

    for linha in linhas:
        if "Resposta de" in linha or "Request timed out" in linha:
            print(">>", linha)

    print("\n" + "=" * 60)