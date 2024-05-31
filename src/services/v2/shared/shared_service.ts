import { api } from '@/utils';
import { useSharedStore } from '@/store/v2';

const url = '/event/';

const eventService = {
  async getEvent(type: any) {
    const sharedStore = useSharedStore();

    try {
      const res = await api().get(url + type);
      if (res.status == 200) {
        sharedStore.setEvents(res.data.event);
        return res;
      } else {
        sharedStore.setError();
      }
    } catch {
      sharedStore.setError();
    }
  },
  async getCaisseSiege(type = null) {
    try {
      const sharedStore = useSharedStore();

      const response = await api().get('caisse/budget/' + type);
      if (response.status == 200) {
        sharedStore.setBudgetSiege(response.data.caisses);
      }
    } catch (error) {
      return error;
    }
  },
  async addCaisseSiege(data) {
    try {
      const sharedStore = useSharedStore();

      const response = await api().post('caisse/budget-siege', data);
      if (response.status == 200) {
        sharedStore.pushBudgetSiege(response.data.caisse);
      }
    } catch (error) {
      return error;
    }
  },
  async ValidateCaisseProject(id, data) {
    try {
      const sharedStore = useSharedStore();

      const response = await api().post('caisse/validate-budget/' + id, data);
      if (response.status == 200) {
        // sharedStore.setBudgetSiege(response.data.caisses) ;
        const budget = sharedStore.budgetSiege.data.find((item) => item.id === id);
        if (budget) {
          Object.assign(budget, response.data.caisse);
        }
      }
    } catch (error) {
      return error;
    }
  },
  async deleteBudget(id) {
    try {
      const sharedStore = useSharedStore();

      const response = await api().delete('caisse/budget/' + id);
      if (response.status === 200) {
        // sharedStore.setBudgetSiege(response.data.caisses) ;
        const itemIdToDelete = id;
        const indexToDelete = sharedStore.budgetSiege.data.findIndex(
          (item: any) => item.id == itemIdToDelete
        );
        if (indexToDelete !== -1) {
          sharedStore.budgetSiege.data.splice(indexToDelete, 1);
        }
      }
    } catch (error) {
      return error;
    }
  },
  async getOperationCaisse() {
    try {
      const response = await api().get('caisse/operation');
      const sharedStore = useSharedStore();
      sharedStore.setOperationCaisse(response.data.operation);
    } catch (error) {
      return Promise.reject(error);
    }
  },
  async newCaisseOperation(data: any) {
    try {
      const response = await api().post('caisse/operation', data);
      if (response.status == 201) {
        const sharedStore = useSharedStore();
        sharedStore.pushOperationCaisse(response.data.operation);
      }
      return response.data;
    } catch (error) {
      return Promise.reject(error);
    }
  },
  async deleteCaisseOperation (){
    try {
        const sharedStore = useSharedStore();
        const id = sharedStore.selectedItem.id;
        console.log(id);
        const response = await api().delete('caisse/operation/' + id);
        const itemIdToDelete = id;
        const indexToDelete = sharedStore.operation.data.findIndex(
          (item: any) => item.id == itemIdToDelete
        );
        if (indexToDelete !== -1) {
          sharedStore.operation.data.splice(indexToDelete, 1);
        }
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
}
};

export default eventService;
