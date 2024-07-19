import psutil
import time
import matplotlib.pyplot as plt

# Função para coletar uso da CPU
def get_cpu_usage():
    return psutil.cpu_percent(interval=1)

# Lista para armazenar o uso da CPU
cpu_usage = []

# Tempo de execução (em segundos)
run_time = 60

print("Monitorando uso da CPU...")
for i in range(run_time):
    usage = get_cpu_usage()
    cpu_usage.append(usage)
    time.sleep(1)

# Plotando os dados
plt.plot(cpu_usage)
plt.title('Uso da CPU durante a execução')
plt.xlabel('Tempo (s)')
plt.ylabel('Uso da CPU (%)')

# Definindo os limites do eixo x para garantir que a origem esteja no início
plt.xlim([0, run_time])

# Salvando o gráfico como imagem
plt.savefig('cpu_usage.png')

# Mostrar o gráfico (opcional)
plt.show()
