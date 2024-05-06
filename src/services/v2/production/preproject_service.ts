import { api } from '@/utils';
import { useProductionStore } from '@/store/v2';

const url = '/pre-projects/';

const preprojectService = {
    async getPreprojectList() {
        const productionStore = useProductionStore();

        try {
            const res = await api().get(url + 'index');
            if (res.status == 200) {
                productionStore.setPreProjectsList(res.data.pre_projects);
            } else {
                productionStore.setError();
            }
        } catch {
            productionStore.setError();
        }
    },

    async storePreproject(data) {
        const productionStore = useProductionStore();

        try {
            const res = await api().post(url + 'store', data);
            if (res.status == 201) {
                productionStore.pushPreProjectToList(res.data.pre_project);
            } else {
                productionStore.setError();
            }

            return res.status;
        } catch {
            productionStore.setError();
            return 500;
        }
    },

    async exportPreProjects(data) {
        try {
            const res = await api().get(`${url}export?${data}`, {
                responseType: 'blob'
            });
            return res;
        } catch {
            return 500;
        }
    },

    async importPreProjects(data) {
        const productionStore = useProductionStore();

        try {
            const res = await api().post(`${url}import`, data);
            if (res.status == 201) {
                productionStore.setPreProjectsList(res.data.pre_projects);
            } else {
                productionStore.setError();
            }

            return res.status;
        } catch {
            productionStore.setError();
            return 500;
        }
    },

    async getPreProjectById(id) {
        const productionStore = useProductionStore();

        try {
            const res = await api().get(`${url}show/${id}`);
            if (res.status == 200) {
                productionStore.setPreProject(res.data.pre_project);
            } else {
                productionStore.setError();
            }
        } catch {
            productionStore.setError();
        }
    }
};

export default preprojectService;