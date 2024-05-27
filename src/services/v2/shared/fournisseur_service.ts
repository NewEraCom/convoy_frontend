import { api } from '@/utils';
import { useSharedStore } from '@/store/v2/shared_store';

const url = '/tier/';

const fournisseurService = {

    async getFournisseurs() {
        const sharedStore = useSharedStore();

        try {
            const res = await api().get(url + 'fournisseur' );
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
    async getFournisseurById(id:Number) {
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
  async validateTier(id: Number)  {
        try {
            const res = await api().post(url+'validate/'+id);
            if (res.status == 200) {
                const sharedStore = useSharedStore();
                sharedStore.validateTier(res.data.tier);
            }
        } catch (error) {
            return Promise.reject(error);
        }
    },
   async deleteSoustraitant () {
        try {
            const sharedStore = useSharedStore();
            const id = sharedStore.fournisseurs.ItemId;
            const response = await api().delete(url+'soft/'+id);
            if (response.status == 200) {
                sharedStore.deleteSoustraitant(id);
            }
        } catch (error) {
            return Promise.reject(error);
        }
    }

};

export default fournisseurService;