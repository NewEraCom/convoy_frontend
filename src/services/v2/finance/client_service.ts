import { api } from '@/utils';
import { useFinanceStore } from '@/store/v2';

const url = '/clients/';

const clientService = {
    async getClientsList() {
        const financeStore = useFinanceStore();

        try {
            const res = await api().get(url + 'index');
            if (res.status == 200) {
                financeStore.setClientsList(res.data.clients);
            } else {
                financeStore.setError();
            }
        } catch {
            financeStore.setError();
        }
    }
};

export default clientService;