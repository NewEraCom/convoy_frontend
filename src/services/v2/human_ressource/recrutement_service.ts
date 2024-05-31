import { api } from '@/utils';
import { useHrStore } from '@/store/v2';

const url = '/recrutement';

const recrutementService = {


async getRecrutement () {
    try {
        const response = await api().get(url);
        if (response.status === 200) {
            const rhStore = useHrStore();
            rhStore.setRecrutement(response.data.recrutements);
            return;
        }
        throw new Error('Get recrutement failed with status: ' + response.status);
    } catch (error) {
        console.error(error);
        return error;
    }
},
async addNewRecruitment (data: any){
    try {
        const response = await api().post(url, data);
        if (response.status == 200) {
            const rhStore = useHrStore();
            rhStore.pushRecrutement(response.data.recrutement);
        }
    } catch (error) {
        return Promise.reject(error);
    }
},
async deleteRecruitment () {
    try {
        
        const rhStore = useHrStore();
        const id = rhStore.ItemId;
        const response = await api().delete(url+'/' + id);
        if (response.status == 200) {
            
            rhStore.deleteRecruitment(id);
            
        }
    } catch (error) {
        return Promise.reject(error);
    }
}
};

export default recrutementService;