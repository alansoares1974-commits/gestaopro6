// Sincronização automática (Desativada após a remoção do backend)
import { autoBackupManager } from './autoBackup';

class ExternalServerSync {
  private syncInterval: NodeJS.Timeout | null = null;
  private readonly SYNC_INTERVAL = 5 * 60 * 1000; // 5 minutos em ms

  // Iniciar sincronização automática
  startAutoSync() {
    // Desativado
    autoBackupManager.startAutoBackup();
    console.log('Sistema de sincronização desativado. Backup automático iniciado.');
  }

  // Parar sincronização
  stopAutoSync() {
    // Desativado
    autoBackupManager.stopAutoBackup();
    console.log('Sistema de sincronização desativado. Backup automático parado.');
  }

  // Realizar sincronização
  async performSync() {
    // Desativado
    console.log('Sincronização com servidor externo desativada.');
  }

  // Sincronizar movimentos de caixa
  private async syncCashMovements() {
    // Desativado
  }

  // Sincronizar pedidos marketplace
  private async syncMarketplaceOrders() {
    // Desativado
  }

  // Sincronizar usuários
  private async syncUsers() {
    // Desativado
  }

  // Mesclar dados local e servidor
  private mergeData(local: any[], server: any[]): any[] {
    const merged = [...local];
    
    for (const serverItem of server) {
      const exists = merged.find(m => m.id === serverItem.id);
      if (!exists) {
        merged.push(serverItem);
      }
    }
    
    return merged;
  }
}

export const autoSync = new ExternalServerSync();
