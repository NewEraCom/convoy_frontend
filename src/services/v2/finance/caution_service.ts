import { api } from '@/utils';
import { useFinanceStore } from '@/store/v2';

const url = 'v2/cautions/';

const cautionsService = {
    async getCautionsList() {
        const financeStore = useFinanceStore();

        try {
            const res = await api().get(url + 'index');
            if (res.status == 200) {
                financeStore.setCautionsList(res.data.cautions);
            } else {
                financeStore.setError();
            }
        } catch {
            financeStore.setError();
        }
    }
};

export default cautionsService;