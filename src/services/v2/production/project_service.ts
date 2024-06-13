import { api } from '@/utils';
import { useProductionStore } from '@/store/v2';
import { authService } from '@/services';

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
    },
    async  getDataManager() {
        const productionStore = useProductionStore();
        try {
          
          const res = await api().get(url+'stats');
          
            productionStore.setDashboardData(res.data);
            return res.data;
          
        } catch (error) {
        //   authService.refreshToken();
          return Promise.reject(error);
        }
      }
};

export default projectService;