import { api } from '@/utils';
import { useHrStore } from '@/store/v2';

const url = '/leaves/';

const leaveService = {

    async getLeaveByRespo() {
        const hrStore = useHrStore();

        try {
            const res = await api().get(url + 'by-responsable');
            if (res.status == 200) {
                hrStore.setLeaves(res.data.leaves);
            } else {
                hrStore.setError();
            }
        } catch {
            hrStore.setError();
        }
    },

};

export default leaveService;