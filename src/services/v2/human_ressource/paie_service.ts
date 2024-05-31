import { api } from '@/utils';
import { useHrStore } from '@/store/v2';

const url = '/avance';

const paieService = {
    async getSalarayAdvances(){
        try {
            const response = await api().get(url);
            if (response.status === 200) {
                const rhStore = useHrStore();
                rhStore.setSalaryAdvances(response.data.avances);
                return;
            }
            throw new Error('Get recrutement failed with status: ' + response.status);
        } catch (error) {
            console.error(error);
            return error;
        }
    },
    async addSalaryAdvance  (data: any)  {
        try {
            const response = await api().post(url, data);
            if (response.status === 200) {
                const rhStore = useHrStore();
                rhStore.pushSalaryAdvance(response.data.avance);
                return;
            }
        }
        catch (error) {
            console.error(error);
            return error;
        }
    },
    async deleteAdvance (id: any) {
        try {
            const response = await api().delete(url +'/'+id, );
            if (response.status === 200) {
                const rhStore = useHrStore();
                const itemIdToDelete = id;
            const indexToDelete = rhStore.salaryAdvances.data.findIndex((item: any) => item.id == itemIdToDelete);
            if (indexToDelete !== -1) {
                rhStore.salaryAdvances.data.splice(indexToDelete, 1);
            }
        return;
            }
        }
        catch (error) {
            console.error(error);
            return error;
        }
    },
    async updateSalaryAdvance (id: any,data:any) {
        try {
            const response = await api().post(url +'/'+id, data);
            if (response.status === 200) {
                const rhStore = useHrStore();
                const demande = rhStore.salaryAdvances.data.find((item) => item.id === id);
                if (demande) {
                Object.assign(demande, response.data.avance);
                }
            }
        }
        catch (error) {
            console.error(error);
            return error;
        }
    },
    async validateSalaryAdvance (id: any,data:any) {
        try {
            const response = await api().post(url +'/validate/'+id, data);
            if (response.status === 200) {
                const rhStore = useHrStore();
                const demande = rhStore.salaryAdvances.data.find((item) => item.id === id);
                if (demande) {
                Object.assign(demande, response.data.avance);
                }
            }
        }
        catch (error) {
            console.error(error);
            return error;
        }
    },
};
export default paieService;