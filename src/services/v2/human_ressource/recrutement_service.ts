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
async addNewRecruitment (data: any, from: string | null) {
    try {
        const response = await api().post('rh/recrute/request', data);
        if (response.status == 200) {
            if (from === 'rh') {
                const rhStore = useRhStore();
                rhStore.pushRecruitment(response.data.recrutement);
            } else {
                const sharedStore = useSharedStore();
                sharedStore.pushRecruitment(response.data.recrutement);
            }
        }
    } catch (error) {
        return Promise.reject(error);
    }
};
};

export default recrutementService;