// const createLouer = async (data: any) => {
//     try {
//         const response = await api().post('/logistics/louer', data);
//         if (response.status == 201) {
//             const logisticsStore = useLogisticsStore();
//             logisticsStore.pushLouer(response.data.louer);
//         }
//     } catch (error) {
//         return Promise.reject(error);
//     }
// };
// const getLouer = async () => {
//     try {
//         const response = await api().get('/logistics/louer');
//         const logisticsStore = useLogisticsStore();
//         logisticsStore.setLouer(response.data.louer);
//     } catch (error) {
//         return Promise.reject(error);
//     }
// };

import { api } from '@/utils';
import { useLogisticsStore } from '@/store/v2/logistics_store';

const url = '/louer/';

const louerService = {
    async getLouer() {
        const logisticsSrore = useLogisticsStore();

        try {
            const res = await api().get(url);
            if (res.status === 200) {
                console.log(res.data.louer)
                logisticsSrore.setLouer(res.data.louer);
               
            } 
            return res 
        } catch(error) {
            Promise.reject(error);
        }
    },
    async createLouer(data:any) {
        const logisticsSrore = useLogisticsStore();

        try {
            const res = await api().post(url,data);
            if (res.status == 201) {
                logisticsSrore.pushLouer(res.data.louer);
            } 
            return res 
        } catch(error) {
            Promise.reject(error);
        }
    },
    async createPaiement(data:any) {
        const logisticsSrore = useLogisticsStore();

        try {
            const res = await api().post(url+'paiement',data);
            if (res.status == 201) {
                logisticsSrore.pushLouer(res.data.louer);
            } 
            return res 
        } catch(error) {
            Promise.reject(error);
        }
    },
    async deleteRent () {
        try {
            const logisticsSrore = useLogisticsStore();
            const id = logisticsSrore.louer.ItemId;
            const response = await api().delete(url+id);
            if (response.status == 200) {
                logisticsSrore.deleteRent(id);
            }
        } catch (error) {
            return Promise.reject(error);
        }
    },
    async deletePaiement () {
        try {
            const logisticsSrore = useLogisticsStore();
            const id = logisticsSrore.louer.ItemId;
            const response = await api().delete(url+'paiement/'+id);
            if (response.status == 200) {
                logisticsSrore.deleteRent(id);
            }
        } catch (error) {
            return Promise.reject(error);
        }
    },
    async ActiveLouer(id: Number)  {
        try {
            const res = await api().put(url+'change-status/'+id);
            if (res.status == 200) {
                const logisticsSrore = useLogisticsStore();
                logisticsSrore.validateLouer(res.data.louer);
            }
        } catch (error) {
            return Promise.reject(error);
        }
    },
    async updateLouer(data, id) {
        const logisticsSrore = useLogisticsStore();       
        try {
            const res = await api().post(url + id, data);
            logisticsSrore.updatedLouer(res.data.louer); 
             return
        } catch (error) {
            throw error;
        }
    },
    async getLouerById(id) {
        const logisticsSrore = useLogisticsStore();       
        try {
            const res = await api().get(url + id);
            logisticsSrore.setSelectedItem(res.data.louer); 
             return
        } catch (error) {
            throw error;
        }
    }
};

export default louerService;