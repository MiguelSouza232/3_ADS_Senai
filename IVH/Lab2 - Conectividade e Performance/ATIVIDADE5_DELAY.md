# Atividade 5: O Perigo da Perda de Pacotes – Delay em Redes Instáveis

## 📋 Situação Real

A fábrica implementou com sucesso MQTT para seus sensores de temperatura e pressão. O sistema funcionava perfeitamente no escritório com Wi-Fi de alta qualidade.

**Problema:** Quando o sistema foi instalado no **chão de fábrica**, a qualidade da conexão Wi-Fi começou a piorar significativamente. As máquinas pesadas, paredes de concreto e interferência eletromagnética causaram **perda de pacotes (packet loss)** de cerca de **10%**.

**Observação Crítica:** Um dos comandos enviados via rede é o comando de **"Parar Robô de Emergência"**. Com a perda de pacotes, esse comando levou muito mais tempo para ser entregue, quase causando um acidente.

## 🎯 Tarefa do Laboratório

Simular uma **conexão com 10% de perda de pacotes** e medir como isso afeta:
1. O **tempo de resposta** de um comando simples
2. A **confiabilidade da entrega** de mensagens críticas
3. O **número de retransmissões** necessárias

## 💡 Conceito Chave: TCP Retransmission e Packet Loss

### O que é Packet Loss?

```
Cenário de Rede Instável (Chão de Fábrica):

Sem Perda:
[Pacote 1] → ✅ Chegou
[Pacote 2] → ✅ Chegou
[Pacote 3] → ✅ Chegou

Com 10% de Perda:
[Pacote 1] → ✅ Chegou
[Pacote 2] → ❌ Perdido!
[Pacote 3] → ✅ Chegou
[Pacote 4] → ✅ Chegou
[Pacote 5] → ❌ Perdido!
...

Impacto: Alguns pacotes não chegam ao destino!
```

### Mecanismo TCP: Retransmissão Automática

Quando um pacote é perdido, o TCP **tenta novamente automaticamente**:

```
Cliente                              Servidor
  |                                     |
  |--- Pacote 1 (SYN) --------->   |
  |                                |
  |<--- Pacote 1 (SYN-ACK) ----    | (Perdido na volta!)
  |                                |
  |--- Pacote 1 (SYN) --------->   | (Timeout, retenta)
  |                                |
  |<--- Pacote 1 (SYN-ACK) ----    | ✅ Chegou!
  |                                |

Resultado: Atraso extra de 1-3 segundos por perda!
```

### Impacto em Tempo Real

| Cenário | Latência | Atraso Extra | Crítico? |
|---------|----------|-------------|----------|
| Rede perfeita (0% loss) | 50ms | 0ms | ❌ Não |
| Perda leve (5% loss) | 100ms | +50ms | ⚠️ Talvez |
| **Perda moderada (10% loss)** | **500ms-2s** | **+1-2s** | 🔴 **SIM!** |
| Perda severa (20% loss) | 5-10s | +5-10s | 🔴 **CRÍTICO!** |

## 📖 Guia Prático do Laboratório

### Passo 1: Ferramentas Necessárias

Você usará **Clumsy** para simular perda de pacotes. Clumsy é um software que simula condições ruins de rede de forma controlada.

**Download:** https://jagt.github.io/clumsy/index.html

Ou use **NetLimiter** / **TMeter** como alternativas.

### Passo 2: Criar Script de Teste Simples

```python
import subprocess
import time
from datetime import datetime

while True:
    print("\n" + "=" * 60)
    print("           SIMULAÇÃO DE REDE INDUSTRIAL")
    print("=" * 60)
    
    input("\nPressione ENTER para enviar o comando...")
    
    print("\n[STATUS] Enviando comando para google.com ...\n")
    
    # Cronometrar
    inicio = time.time()
    
    # Enviar ping (simula comando)
    resultado = subprocess.run(
        ["ping", "-n", "1", "google.com"],
        capture_output=True,
        text=True
    )
    
    fim = time.time()
    tempo_total = fim - inicio
    
    horario = datetime.now().strftime("%H:%M:%S")
    
    # Exibir resultados
    print("-" * 60)
    print(f"Horário da execução : {horario}")
    print(f"Servidor destino    : google.com")
    print(f"Tempo total         : {tempo_total:.2f} segundos")
    print("-" * 60)
    
    if "TTL=" in resultado.stdout:
        print("[SUCESSO] Comunicação realizada com sucesso!")
    else:
        print("[ERRO] Falha na comunicação da rede!")
    
    # Mostrar detalhes
    print("\nResumo da comunicação:\n")
    linhas = resultado.stdout.splitlines()
    for linha in linhas:
        if "Resposta de" in linha or "Request timed out" in linha:
            print(">>", linha)
    
    print("\n" + "=" * 60)
```

### Passo 3: Configurar Clumsy

1. **Baixe e instale Clumsy**
2. **Execute como Administrador**
3. No Clumsy:
   - Selecione **"Lag"** ou **"Drop"**
   - Configure o valor:
     - **Lag:** 1000ms (1 segundo) de atraso
     - **Drop:** 10% de probabilidade de perder pacotes
   - Escolha o processo ou aplicação a afeta (ping, navegador, etc.)
   - Clique **"Start"**

### Passo 4: Executar o Teste

#### Fase 1: Sem Interferência (Baseline)
```bash
python atividade5_delay.py
```

**Teste 3 vezes e anote os tempos:**
- Execução 1: _____ segundos
- Execução 2: _____ segundos
- Execução 3: _____ segundos
- **Média:** _____ segundos (esperado: 0.05-0.1s)

#### Fase 2: Com Lag de 1000ms (Clumsy ativado)

1. **Abra Clumsy**
2. **Ative o Lag de 1000ms** na aba "Lag"
3. **Execute novamente o script**

**Teste 3 vezes e anote os tempos:**
- Execução 1: _____ segundos
- Execução 2: _____ segundos
- Execução 3: _____ segundos
- **Média:** _____ segundos (esperado: 1-2s)

#### Fase 3: Com 10% de Packet Loss

1. **No Clumsy, mude para a aba "Drop"**
2. **Configure "Drop Rate" para 10%**
3. **Execute novamente o script**

**Teste 5-10 vezes e anote:**
- Qual porcentagem falhou na primeira tentativa?
- Qual foi o tempo de resposta em cada tentativa?
- Quantas tentativas retransmitidas foram necessárias?

## 📊 Análise dos Resultados

### Tabela Comparativa

| Condição | Tempo Médio | Atraso Extra | Status |
|----------|-------------|------------|--------|
| Rede Normal | 50-100ms | Baseline | ✅ Ideal |
| Com Lag 1000ms | 1000-2000ms | +950-1950ms | ⚠️ Lento |
| Com 10% Loss | 500ms-5s | +450-4950ms | 🔴 Crítico |

### Perguntas Analíticas

**1. Como a perda de pacotes aumenta a latência?**

```
Cada pacote perdido força uma retransmissão:
- Timeout espera: 1-3 segundos
- Retransmissão: 1-3 segundos extra
- Múltiplas perdas = atraso exponencial

Com 10% de loss em um comando de 3 pacotes:
- Chance de pelo menos 1 perder: ~27%
- Se perder, atraso extra: 1-3 segundos
```

**2. Por que isso é perigoso em um comando de "Parar"?**

```
Cenário: Robô industrial recebe comando "PARAR" via rede

SEM PERDA:
[Comando enviado] → [50ms] → [Robô para] ✅ Seguro

COM 10% LOSS:
[Comando enviado] → [Timeout 3s] → [Retransmissão] 
→ [Mais 3s] → [Robô para] 🔴 TOO LATE!

Durante esses 6 segundos, o robô pode ter causado dano!
```

**3. Como mitigar esse problema?**

| Solução | Efetividade | Custo |
|---------|------------|-------|
| Melhorar Wi-Fi (menos interferência) | ✅✅✅ Alta | Baixo |
| Usar cabo Ethernet (sem wireless) | ✅✅✅ Muito Alta | Médio |
| Implementar QoS em MQTT (garantia) | ✅✅ Média | Baixo |
| Aumentar timeout (aceitar atraso) | ✅ Baixa | Nenhum |
| Usar múltiplas conexões redundantes | ✅✅✅ Muito Alta | Alto |

## 🔴 Cenários Críticos em Indústria 4.0

### Exemplo 1: Parada de Emergência
```
Máxima latência aceitável: 100ms (padrão industrial)
Com 10% packet loss: 500ms-2s (5-20x mais lento)
Resultado: FALHA NA SEGURANÇA 🚨
```

### Exemplo 2: Coordenação de Robôs
```
2 robôs precisam sincronizar movimentos
Máxima latência: 50ms
Com 10% loss: 1000ms+
Resultado: Colisão entre robôs 💥
```

### Exemplo 3: Controle de Qualidade
```
Câmera envia imagem de inspeção via rede
Máxima latência: 500ms
Com 10% loss: 2-5s
Resultado: Peças defeituosas passam no controle ❌
```

## 🛠️ Soluções Implementadas

### Solução 1: Usar Cabo Ethernet
```
Wireless (Wi-Fi):      10% packet loss, interferências
Cabo de Rede:          <0.1% packet loss, confiável
```

### Solução 2: Implementar Redundância
```
Cliente envia comando via 2 caminhos diferentes
- Rota 1: Wi-Fi
- Rota 2: 4G/LTE

Chance de ambas falharem: 0.1% × 0.1% = 0.001% ✅
```

### Solução 3: Usar Protocolos com Garantia
```
MQTT QoS=2: Garante entrega exata 1 vez
        (mesmo com perda de pacotes)
        
HTTP com Retry: Tenta automaticamente 3-5 vezes
```

## 🎓 Conclusão

A **perda de pacotes (packet loss) é um dos maiores inimigos** de sistemas de automação industrial em tempo real.

### Lições Aprendidas

1. **0% Loss ≠ 100% Confiabilidade**
   - Mesmo pequena perda gera retransmissões
   - Retransmissões = Atraso significativo

2. **Wireless é Arriscado**
   - Wi-Fi sofre interferência
   - Ideal para dados, ruim para controle em tempo real

3. **Protocolo Importa**
   - TCP tenta garantir entrega (com retransmissão)
   - UDP não retransmite (mais rápido, mas menos confiável)

4. **Redundância é Essencial**
   - Sempre ter plano B (backup)
   - Crítico para sistemas de segurança

### Próximos Passos
- Implementar monitoramento de packet loss
- Usar ferramentas como **Wireshark** para análise de tráfego
- Testar com carga real (múltiplas mensagens simultâneas)
- Considerar arquitetura em nuvem vs. borda (edge computing)

---

**Mensagem Final:** Em 2024, uma fábrica na Alemanha teve que parar produção por 12 horas devido a "perda ocasional de pacotes" em um sensor Wi-Fi não configurado corretamente. Essa atividade pode ter salvado seu emprego! 🎖️
