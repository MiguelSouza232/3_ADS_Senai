# Atividade 2: MQTT – A Eficiência da Conexão Persistente

## 📋 Situação Real

A mesma fábrica descrita na **Atividade 1** identifica que o sistema HTTP é muito lento para o volume de produção. O responsável de TI propõe migrar para **MQTT (Message Queuing Telemetry Transport)**, um protocolo especificamente projetado para IoT e comunicação de alta frequência.

**Objetivo:** Demonstrar que MQTT é **drasticamente mais rápido** que HTTP para envio de múltiplas mensagens pequenas e frequentes.

## 🎯 Tarefa do Laboratório

Executar o **mesmo teste da Atividade 1** (enviar 100 mensagens com dados de sensor) usando MQTT em vez de HTTP. Medir o tempo total e **comparar os resultados**.

## 💡 Conceito Chave: Conexão Persistente vs. Reconexão

### Diferença Fundamental: HTTP vs MQTT

#### ❌ HTTP (Atividade 1)
```
Mensagem 1: Conectar → Enviar → Desconectar
Mensagem 2: Conectar → Enviar → Desconectar  
Mensagem 3: Conectar → Enviar → Desconectar
...
Mensagem 100: Conectar → Enviar → Desconectar

Total: 100 conexões estabelecidas! 🔴
```

#### ✅ MQTT (Esta Atividade)
```
Conectar ao broker (1 única vez)
Mensagem 1: Enviar
Mensagem 2: Enviar
Mensagem 3: Enviar
...
Mensagem 100: Enviar
Desconectar

Total: 1 conexão para 100 mensagens! 🟢
```

### Por Que MQTT é Mais Eficiente?

| Aspecto | HTTP | MQTT |
|--------|------|------|
| **Conexão** | Nova para cada requisição | Uma única conexão persistente |
| **Handshake TCP** | 100 vezes | 1 vez |
| **Tamanho da Mensagem** | Grande (Headers HTTP) | Pequeno (2-6 bytes de overhead) |
| **Overhead por Msg** | 300-600ms | 1-5ms |
| **Latência Total Esperada** | 30-60 segundos | 0.1-0.5 segundos |
| **Caso de Uso** | Web, APIs, Baixa frequência | IoT, Alta frequência, Banda limitada |

## 📖 Guia Prático do Laboratório

### Passo 1: Instale a Biblioteca MQTT
```bash
pip install paho-mqtt
```

### Passo 2: Escolha um Broker MQTT Público

**Opção 1:** HiveMQ (recomendado para este teste)
```
Endereço: broker.hivemq.com
Porta: 1883
```

**Opção 2:** Mosquitto
```
Endereço: test.mosquitto.org
Porta: 1883
```

### Passo 3: Estrutura do Script

O script deve:
1. **Conectar ao broker uma única vez** (ANTES do laço)
2. **Dentro do laço**, enviar 100 mensagens rápida e sucessivamente
3. **Medir o tempo total** com `time.time()`
4. **Desconectar** ao final

### Passo 4: Exemplo de Implementação

```python
import paho.mqtt.client as mqtt
import time
import json

broker = "broker.hivemq.com"
topico = "teste/fabrica"

# Criar cliente MQTT
client = mqtt.Client(mqtt.CallbackAPIVersion.VERSION2)

# Conectar ao broker UMA ÚNICA VEZ
print("Conectando ao broker...")
client.connect(broker, 1883, 60)

# Iniciar loop de rede (em background)
client.loop_start()

# Cronometrar
inicio = time.time()

# Enviar 100 mensagens
for i in range(100):
    dados = {
        "sensor": "temp",
        "valor": 25
    }
    
    # Publicar mensagem (sem reconectar!)
    client.publish(topico, json.dumps(dados))
    
    print(f"Mensagem {i+1} enviada")

# Parar
client.loop_stop()

fim = time.time()
tempo_total = fim - inicio

# Desconectar
client.disconnect()

# Resultados
print("\n===== RESULTADO =====")
print(f"Tempo total: {tempo_total:.2f} segundos")
print(f"Latência média: {tempo_total/100:.4f} segundos")
```

### Passo 5: Executar
```bash
python atividade2_mqtt.py
```

## 📊 Análise Comparativa

### Comparação de Resultados

| Métrica | HTTP (Atividade 1) | MQTT (Atividade 2) | Melhoria |
|---------|-------------------|-------------------|----------|
| Tempo Total | ~45 segundos | ~0.5 segundos | **90x mais rápido!** 🚀 |
| Latência/Msg | ~0.45s | ~0.005s | **90x mais rápido!** |
| Conexões | 100 | 1 | **Redução de 99%** |
| Handshakes TCP | 100 | 1 | **Redução de 99%** |

### Interpretação dos Resultados

**Pergunta 1:** Por que MQTT foi tão mais rápido?

**Resposta:**
- ✅ **Uma única conexão:** Não precisa fazer handshake 100 vezes
- ✅ **Overhead mínimo:** MQTT tem apenas 2-6 bytes de overhead por mensagem
- ✅ **Otimizado para IoT:** Projetado exatamente para este caso de uso
- ✅ **Publish-Subscribe:** Não precisa de resposta confirmada (fire-and-forget)

**Pergunta 2:** Qual é o preço dessa velocidade?

**Resposta:**
- Não há garantia de entrega (pode perder mensagens)
- Para garantir entrega, usa QoS=1 ou QoS=2 (um pouco mais lento, mas ainda 10x melhor que HTTP)

**Pergunta 3:** Por que as grandes empresas usam MQTT?

**Resposta:**
```
Exemplo Real: Fábrica com 1000 sensores enviando dados a cada 100ms

HTTP Sequential:
  1000 sensores × 0.45s = 450 segundos de atraso! 😱
  
MQTT:
  1000 sensores × 0.005s = 5 segundos de atraso ✅
  
Diferença: 450 segundos vs 5 segundos! (90x mais eficiente)
```

## 🔍 Modelo de Comunicação

### MQTT Publish-Subscribe

```
        ┌─────────────┐
        │   Broker    │ (Servidor Central)
        │  MQTT       │
        └─────────────┘
         ↑ ↑ ↑ ↑ ↑ ↑
         │ │ │ │ │ │
    Sensor1 Sensor2 Sensor3 ... Dashboard Monitor AlertSystem
       
Benefício: Cada sensor envia uma vez, múltiplos consumidores recebem!
```

### HTTP Request-Response

```
Sensor1 → API → Database
Sensor2 → API → Database  
Sensor3 → API → Database

Problema: Cada sensor precisa conectar individualmente!
```

## 🎓 Variações Avançadas

### Teste com QoS (Quality of Service)

```python
# QoS 0: Máxima velocidade, sem garantia (será bem rápido)
client.publish(topico, json.dumps(dados), qos=0)

# QoS 1: Garante entrega mínima 1 vez (um pouco mais lento)
client.publish(topico, json.dumps(dados), qos=1)

# QoS 2: Garante entrega exata 1 vez (mais lento, mas confiável)
client.publish(topico, json.dumps(dados), qos=2)
```

Refaça o teste com QoS=1 e observe a diferença de tempo!

## 🎓 Conclusão

**HTTP é melhor para:**
- Requisições esporádicas
- Dados complexos (arquivos, vídeos)
- Quando precisa de resposta confirmada

**MQTT é melhor para:**
- IoT e sensores
- Alta frequência de mensagens
- Banda limitada
- Ambientes com latência crítica

**Resultado Prático:**
Uma simples mudança de protocolo reduziu o tempo de **45 segundos para 0.5 segundos** — uma **melhoria de 90x**!

Na **próxima atividade**, veremos o impacto de perda de pacotes nessas comunicações. 🔄
