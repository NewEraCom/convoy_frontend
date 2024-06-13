import { api } from '@/utils';
import { useProductionStore } from '@/store/v2';
import { authService } from '@/services';

const url = 'purchase/';

const purchaseService = {

async getPurchaseOrdersByProjectManager (type: string) {
    try {
      const response = await api().get(url+'get-by-project-manager/' + type);
      const productionStore = useProductionStore();
      productionStore.setPurchaseOrders(response.data.purchases);
    } catch (error) {
      return Promise.reject(error);
    }
  }
};
export default purchaseService;