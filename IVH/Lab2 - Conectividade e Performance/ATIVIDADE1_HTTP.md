# Atividade 1: HTTP na Fábrica – O "Custo" da Requisição

## 📋 Situação Real

Um desenvolvedor implementa um sistema de monitoramento em uma fábrica que envia dados de sensores (temperatura, pressão, quantidade de peças) ao banco de dados central através de uma **API REST (HTTP)**. A cada peça produzida, uma requisição HTTP é enviada para registrar o evento.

**Problema Identificado:** O tempo de resposta está aumentando conforme o volume de produção cresce. O desenvolvedor começa a suspeitar que algo está errado com a latência.

## 🎯 Tarefa do Laboratório

Executar um script que envia **100 mensagens consecutivas via HTTP** para um endpoint de teste e observar o **tempo total de execução**. Comparar este resultado com outras tecnologias para entender o impacto de latência.

## 💡 Conceito Chave: Handshake TCP e Overhead de Conexão

### O que acontece a cada requisição HTTP?

```
Cliente                          Servidor
  |                                |
  |--- SYN (Aperto de mão 1) ----->|  \
  |<-- SYN-ACK (Aperto de mão 2)---|   | TCP Handshake
  |--- ACK (Aperto de mão 3) ----->|  /
  |                                |
  |--- Enviar Requisição HTTP ----->|
  |<--- Receber Resposta ----------|
  |                                |
  |--- FIN (Fechar conexão) ------->|  \
  |<-- ACK -------------------------|   | TCP Teardown
  |                                |  /
```

**Cada requisição HTTP precisa:**
1. Fazer um **Handshake TCP** de 3 etapas (SYN, SYN-ACK, ACK)
2. Enviar os dados
3. Receber a resposta
4. Fechar a conexão

Este overhead é multiplicado por **100 vezes** no nosso teste!

## 📖 Guia Prático do Laboratório

### Passo 1: Prepare o Ambiente
```bash
pip install requests
```

### Passo 2: Estrutura do Script
O script deve:
- Usar um **laço for de 1 a 100**
- Dentro do laço, enviar uma requisição POST via `requests.post()`
- Enviar um JSON com dados de sensor: `{"sensor": "temp", "valor": 25}`
- Usar um endpoint de teste público (ex: `https://httpbin.org/post`)
- Medir o tempo com `time.time()` antes e depois do laço

### Passo 3: Exemplo de Implementação
```python
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
```

### Passo 4: Executar e Observar
```bash
python atividade1_http.py
```

## 📊 Análise dos Resultados

### Perguntas para Refletir

1. **Quantos segundos levou o teste completo?**
   - Esperado: **30 a 60 segundos** (dependendo da internet e servidor)
   - Cada requisição leva em torno de 300-600ms

2. **Qual foi a latência média por peça?**
   - Divida o tempo total por 100
   - Exemplo: Se total = 45 segundos → 45 / 100 = **0.45 segundos por peça**

3. **Por que é tão lento?**
   - ✗ Cada requisição estabelece uma nova conexão TCP
   - ✗ Cada conexão precisa fazer handshake
   - ✗ Cada requisição é independente
   - ✗ O servidor está processando sequencialmente

### Cálculo de Impacto em Produção

Se uma fábrica produz **100 peças por segundo**:

- **Com HTTP Sequencial:** 0.45s × 100 peças = **45 segundos de atraso** no registro
- **Implicação:** O sistema de rastreamento fica 45 segundos atrasado! ⚠️

## 🔍 Problemas Identificados

| Problema | Impacto | Solução |
|----------|---------|---------|
| Reconexão a cada requisição | Overhead de Handshake 3x | Usar HTTP Keep-Alive ou MQTT |
| Latência acumulada | Sistema fica atrasado | Conexão persistente |
| Consumo de banda | Múltiplas negociações | Protocolo mais leve |
| Escalabilidade limitada | Impossível para alta produção | Arquitetura diferente |

## 🎓 Conclusão

O HTTP é excelente para requisições **esporádicas e de alto valor**, mas é **péssimo para comunicação de alta frequência** como IoT industrial.

**Na próxima atividade (MQTT)**, veremos como uma conexão persistente pode reduzir esse tempo em **até 10 vezes**!
