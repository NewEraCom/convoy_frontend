import { api } from '@/utils';
import { useProductionStore } from '@/store/v2';

const url = 'projects/';

const projectService = {
    async getProjectList() {
        const productionStore = useProductionStore();

        try {
            const res = await api().get(url + 'index');
            if (res.status == 200) {
                productionStore.setProjectsList(res.data.projects);
            } else {
                productionStore.setError();
            }
        } catch {
            productionStore.setError();
        }
    }
};

export default projectService;