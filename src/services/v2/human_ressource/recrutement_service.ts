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
}
};

export default recrutementService;