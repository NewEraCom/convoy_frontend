import { api } from '@/utils';
import { useSharedStore } from '@/store/v2/shared_store';

const url = '/tier/';

const SousTraitantService = {

    async getSoustraitants() {
        const sharedStore = useSharedStore();

        try {
            const res = await api().get(url + 'sous-traitant' );
            if (res.status == 200) {
                sharedStore.setFournisseurs(res.data.soustraitant);
                return res ;
            } else {
                sharedStore.setError();
            }
        } catch {
            sharedStore.setError();
        }
    },
 
  async createTier(data: any)  {
        try {
            const res = await api().post(url , data);
            if (res.status == 201) {
                const sharedStore = useSharedStore();
                sharedStore.pushFournisseur(res.data.tier);
            }
        } catch (error) {
            return Promise.reject(error);
        }
    },
    async getSousTraitantById(id:Number) {
        
        
        const sharedStore = useSharedStore();

        try {
            const res = await api().get(url+id);
            if (res.status == 200) {
                sharedStore.setFournisseurs(res.data.tier);
                return res ;
            } else {
                sharedStore.setError();
            }
        } catch {
            sharedStore.setError();
        }
    },

    async updateTier(data, id) {
        const sharedStore = useSharedStore();
        try {
            const res = await api().post(url + id, data);
            const tier = res.data.tier[0]; // Extract the first tier object from the response array
            sharedStore.updatedTier(tier); // Pass the tier object to the updatedTier method
             console.log(tier);
             return tier;
        } catch (error) {
            sharedStore.setError();
            console.error(error);
            throw error;
        }
    }
};

export default SousTraitantService;