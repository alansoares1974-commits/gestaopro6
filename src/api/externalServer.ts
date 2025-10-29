// Cliente para servidor HTTP externo
const EXTERNAL_SERVER_BASE = 'http://72.60.246.250:9091';
const AUDIO_PATH = `${EXTERNAL_SERVER_BASE}/audios`;
const DATABASE_PATH = `${EXTERNAL_SERVER_BASE}/bancoexterno`;

export interface AudioFile {
  name: string;
  url: string;
}

export interface BackupData {
  timestamp: string;
  data: any;
}

class ExternalServerClient {
  // Áudios disponíveis no servidor
  private audioFiles = [
    'novo_pedido.mp3',
    'estoque_baixo.mp3',
    'pedido_concluido.mp3',
    'alerta_geral.mp3'
  ];

  // Buscar áudio do servidor (sem HEAD para evitar bloqueio mixed-content/CORS)
  async getAudio(audioName: string): Promise<string> {
    // Retorna diretamente a URL do servidor
    return `${AUDIO_PATH}/${audioName}`;
  }

  // Lista todos os áudios disponíveis
  getAvailableAudios(): AudioFile[] {
    return this.audioFiles.map(name => ({
      name: name.replace('.mp3', ''),
      url: `${AUDIO_PATH}/${name}`
    }));
  }

  // Salvar dados no banco externo
  async saveToExternalDatabase(entityName: string, data: any): Promise<any> {
    try {
      const response = await fetch(`${DATABASE_PATH}/${entityName}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });
      
      if (!response.ok) {
        throw new Error(`Erro ao salvar no banco externo: ${response.statusText}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Erro ao salvar no banco externo:', error);
      throw error;
    }
  }

  // Buscar todos os dados do banco externo
  async getAll<T>(entityName: string): Promise<T[]> {
    try {
      const response = await fetch(`${DATABASE_PATH}/${entityName}`);
      
      if (!response.ok) {
        throw new Error(`Erro ao buscar todos os dados de ${entityName}: ${response.statusText}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error(`Erro ao buscar ${entityName} do banco externo:`, error);
      // Lançar o erro para que o react-query possa lidar com ele
      throw error;
    }
  }

  // Atualizar dados no banco externo
  async updateInExternalDatabase(entityName: string, id: string, data: any): Promise<any> {
    try {
      const response = await fetch(`${DATABASE_PATH}/${entityName}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });
      
      if (!response.ok) {
        throw new Error(`Erro ao atualizar no banco externo: ${response.statusText}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Erro ao atualizar no banco externo:', error);
      throw error;
    }
  }

  // Deletar do banco externo
  async deleteFromExternalDatabase(entityName: string, id: string): Promise<void> {
    try {
      const response = await fetch(`${DATABASE_PATH}/${entityName}/${id}`, {
        method: 'DELETE'
      });
      
      if (!response.ok) {
        throw new Error(`Erro ao deletar do banco externo: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Erro ao deletar do banco externo:', error);
      throw error;
    }
  }

  // Criar backup no servidor
  async createBackup(): Promise<void> {
    const timestamp = new Date().toISOString().split('T')[0];
    const backupData = {
      timestamp,
      users: localStorage.getItem('app_users'),
      cash_movements: localStorage.getItem('cash_movements'),
      marketplace_orders: localStorage.getItem('marketplace_orders'),
      products_meta: localStorage.getItem('products_meta'),
      settings: {
        alert_mode: localStorage.getItem('alert_mode'),
        marketplace_mode: localStorage.getItem('marketplace_mode'),
      }
    };

    try {
      const response = await fetch(`${DATABASE_PATH}/backups/${timestamp}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(backupData)
      });

      if (!response.ok) {
        throw new Error('Erro ao criar backup no servidor');
      }

      console.log('Backup criado com sucesso:', timestamp);
    } catch (error) {
      console.error('Erro ao criar backup:', error);
      throw error;
    }
  }

  // Sincronizar dados não sincronizados
  async syncPendingData(): Promise<void> {
    // Esta função não é mais necessária, pois removemos o fallback para localStorage
    // e o react-query lida com a sincronização de estado.
    return;
  }
}

export const externalServer = new ExternalServerClient();
