import { api } from '@/utils';
import { useProductionStore } from '@/store/v2';

const url = '/caisse/';

const caisseService = {

    async getCaisseList() {
        const productionStore = useProductionStore();

        try {
            const res = await api().get(url + 'list');
            if (res.status == 200) {
                productionStore.setCaisseList(res.data.caisse);
            } else {
                productionStore.setError();
            }
        } catch {
            productionStore.setError();
        }
    },

    async getCaisseByUser() {
        const productionStore = useProductionStore();

        try {
            const res = await api().get(url + 'by-user');
            if (res.status == 200) {
                productionStore.setCaisseSum(res.data.caisse);
            } else {
                productionStore.setError();
            }
        } catch {
            productionStore.setError();
        }
    },
};

export default caisseService;