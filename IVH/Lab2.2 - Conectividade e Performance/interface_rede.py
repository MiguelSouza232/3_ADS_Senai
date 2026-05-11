import subprocess
import time
from datetime import datetime
import customtkinter as ctk

# ==============================
# CONFIGURAÇÃO DA INTERFACE
# ==============================

ctk.set_appearance_mode("dark")
ctk.set_default_color_theme("blue")

# Janela principal
app = ctk.CTk()

app.title("Simulação de Rede Industrial")
app.geometry("750x550")

# ==============================
# TÍTULO
# ==============================

titulo = ctk.CTkLabel(
    app,
    text="SIMULAÇÃO DE REDE INDUSTRIAL",
    font=("Arial", 26, "bold")
)

titulo.pack(pady=20)

# ==============================
# ÁREA DE RESULTADOS
# ==============================

resultado_box = ctk.CTkTextbox(
    app,
    width=680,
    height=320,
    font=("Consolas", 14)
)

resultado_box.pack(pady=20)

# ==============================
# FUNÇÃO PRINCIPAL
# ==============================

def testar_rede():

    resultado_box.delete("1.0", "end")

    resultado_box.insert(
        "end",
        "[STATUS] Enviando comando para google.com...\n\n"
    )

    inicio = time.time()

    resultado = subprocess.run(
        ["ping", "-n", "1", "google.com"],
        capture_output=True,
        text=True
    )

    fim = time.time()

    tempo_total = fim - inicio

    horario = datetime.now().strftime("%H:%M:%S")

    resultado_box.insert(
        "end",
        "=" * 60 + "\n"
    )

    resultado_box.insert(
        "end",
        f"Horário da execução : {horario}\n"
    )

    resultado_box.insert(
        "end",
        "Servidor destino    : google.com\n"
    )

    resultado_box.insert(
        "end",
        f"Tempo total         : {tempo_total:.2f} segundos\n"
    )

    resultado_box.insert(
        "end",
        "=" * 60 + "\n\n"
    )

    if "TTL=" in resultado.stdout:

        resultado_box.insert(
            "end",
            "[SUCESSO] Comunicação realizada com sucesso!\n\n"
        )

    else:

        resultado_box.insert(
            "end",
            "[ERRO] Falha na comunicação da rede!\n\n"
        )

    resultado_box.insert(
        "end",
        "Resumo da comunicação:\n\n"
    )

    linhas = resultado.stdout.splitlines()

    for linha in linhas:

        if "Resposta de" in linha or "Request timed out" in linha:

            resultado_box.insert(
                "end",
                f">> {linha}\n"
            )

# ==============================
# BOTÃO
# ==============================

botao = ctk.CTkButton(
    app,
    text="TESTAR COMUNICAÇÃO",
    command=testar_rede,
    width=260,
    height=55,
    font=("Arial", 16, "bold")
)

botao.pack(pady=15)

# ==============================
# RODAPÉ
# ==============================

rodape = ctk.CTkLabel(
    app,
    text="Laboratório de Conectividade e Performance - IoT Industrial",
    font=("Arial", 12)
)

rodape.pack(pady=10)

# ==============================
# EXECUTAR INTERFACE
# ==============================

app.mainloop()