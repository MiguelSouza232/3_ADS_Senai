from flask import Flask, jsonify, request
from flask_cors import CORS
import json
import os
from datetime import datetime
from collections import deque

app = Flask(__name__)
CORS(app)

# Armazenar histórico de execuções (máximo 100 registros)
execution_history = deque(maxlen=100)

# Arquivo para persistência
HISTORY_FILE = 'execution_history.json'

# Carregar histórico ao iniciar
def load_history():
    global execution_history
    if os.path.exists(HISTORY_FILE):
        try:
            with open(HISTORY_FILE, 'r', encoding='utf-8') as f:
                data = json.load(f)
                execution_history = deque(data, maxlen=100)
        except:
            execution_history = deque(maxlen=100)

# Salvar histórico
def save_history():
    with open(HISTORY_FILE, 'w', encoding='utf-8') as f:
        json.dump(list(execution_history), f, ensure_ascii=False, indent=2)

# Carregar histórico ao iniciar
load_history()

@app.route('/api/ping', methods=['POST'])
def receive_ping_data():
    """Recebe dados de ping do script Python"""
    try:
        data = request.json
        
        # Processar dados recebidos
        ping_record = {
            'timestamp': data.get('horario'),
            'server': data.get('servidor'),
            'latency': data.get('tempo_total'),
            'status': data.get('status'),
            'packet_info': data.get('info_pacote', ''),
            'full_output': data.get('output', '')
        }
        
        # Adicionar ao histórico
        execution_history.appendleft(ping_record)
        save_history()
        
        return jsonify({
            'success': True,
            'message': 'Dados recebidos com sucesso'
        }), 200
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 400

@app.route('/api/history', methods=['GET'])
def get_history():
    """Retorna o histórico de execuções"""
    try:
        # Calcular estatísticas
        latencies = [float(h['latency']) for h in execution_history if h['status'] == 'SUCESSO']
        successful = sum(1 for h in execution_history if h['status'] == 'SUCESSO')
        failed = sum(1 for h in execution_history if h['status'] == 'ERRO')
        total = successful + failed
        
        stats = {
            'total_executions': total,
            'successful': successful,
            'failed': failed,
            'success_rate': (successful / total * 100) if total > 0 else 0,
            'avg_latency': sum(latencies) / len(latencies) if latencies else 0,
            'min_latency': min(latencies) if latencies else 0,
            'max_latency': max(latencies) if latencies else 0,
            'uptime': calculate_uptime()
        }
        
        return jsonify({
            'success': True,
            'history': list(execution_history),
            'stats': stats
        }), 200
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 400

@app.route('/api/current', methods=['GET'])
def get_current():
    """Retorna dados atuais (última execução)"""
    try:
        if execution_history:
            current = execution_history[0]
            return jsonify({
                'success': True,
                'current': current
            }), 200
        else:
            return jsonify({
                'success': True,
                'current': None,
                'message': 'Nenhuma execução registrada ainda'
            }), 200
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 400

def calculate_uptime():
    """Calcula o tempo desde a primeira execução"""
    if not execution_history:
        return "00:00:00"
    
    try:
        first_exec = execution_history[-1]['timestamp']
        last_exec = execution_history[0]['timestamp']
        
        # Converter strings em datetime
        fmt = "%H:%M:%S"
        start_time = datetime.strptime(first_exec, fmt)
        end_time = datetime.strptime(last_exec, fmt)
        
        # Calcular diferença
        if end_time < start_time:
            # Passou de um dia
            from datetime import timedelta
            end_time = end_time.replace(day=end_time.day + 1)
        
        delta = end_time - start_time
        hours = int(delta.total_seconds() // 3600)
        minutes = int((delta.total_seconds() % 3600) // 60)
        seconds = int(delta.total_seconds() % 60)
        
        return f"{hours:02d}:{minutes:02d}:{seconds:02d}"
    except:
        return "00:00:00"

@app.route('/', methods=['GET'])
def index():
    """Retorna informações de status do servidor"""
    return jsonify({
        'status': 'online',
        'message': 'Servidor de monitoramento de rede industrial',
        'version': '1.0'
    }), 200

@app.route('/api/clear', methods=['POST'])
def clear_history():
    """Limpa o histórico"""
    global execution_history
    execution_history.clear()
    if os.path.exists(HISTORY_FILE):
        os.remove(HISTORY_FILE)
    return jsonify({
        'success': True,
        'message': 'Histórico limpo com sucesso'
    }), 200

if __name__ == '__main__':
    print("=" * 60)
    print("  🏭 Servidor de Monitoramento de Rede Industrial")
    print("=" * 60)
    print("\n📡 Servidor iniciado em: http://localhost:5000")
    print("📊 Dashboard disponível em: http://localhost:5000/dashboard.html")
    print("\nAPIs disponíveis:")
    print("  POST /api/ping - Receber dados do script Python")
    print("  GET /api/history - Obter histórico")
    print("  GET /api/current - Obter execução atual")
    print("  POST /api/clear - Limpar histórico")
    print("\n" + "=" * 60)
    print()
    
    app.run(debug=True, host='localhost', port=5000)
