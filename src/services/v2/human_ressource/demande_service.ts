import { api } from '@/utils';
import { useHrStore } from '@/store/v2';

const url = '/dmnd/';

const demandeService = {
  async getDemandeRh() {
    try {
      const response = await api().get(url);
      if (response.status === 200) {
        const rhStore = useHrStore();
        rhStore.setDemandeRh(response.data.demandes);
        return;
      }
      throw new Error('Get demande RH failed with status: ' + response.status);
    } catch (error) {
      console.error(error);
      return error;
    }
  },
  async addDemandeRh(data: any) {
    try {
      const response = await api().post(url, data);
      if (response.status === 200) {
        const rhStore = useHrStore();

        rhStore.pushDemande(response.data.demande);

        console.log(response.data.demande);
        return;
      }
      throw new Error('Get demande RH failed with status: ' + response.status);
    } catch (error) {
      console.error(error);
      return error;
    }
  },
  async update(id: any, data: any) {
    try {
      const response = await api().post(url + id, data);
      if (response.status === 200) {
        const rhStore = useHrStore();

        const demande = rhStore.demandeRh.data.find((item) => item.id === id);
        if (demande) {
          Object.assign(demande, response.data.demande);
        }
        console.log(response.data.demande);
        return;
      }
      throw new Error('Get demande RH failed with status: ' + response.status);
    } catch (error) {
      console.error(error);
      return error;
    }
  },
  async delete(id: any) {
    try {
      const response = await api().delete(url + id);
      if (response.status === 200) {
        const rhStore = useHrStore();

        const itemIdToDelete = id;
            const indexToDelete = rhStore.demandeRh.data.findIndex((item: any) => item.id == itemIdToDelete);
            if (indexToDelete !== -1) {
                rhStore.demandeRh.data.splice(indexToDelete, 1);
            }
        return;
      }
      throw new Error('Get demande RH failed with status: ' + response.status);
    } catch (error) {
      console.error(error);
      return error;
    }
  }
};
export default demandeService;
