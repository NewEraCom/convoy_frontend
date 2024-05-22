import { api } from '@/utils';
import { useSharedStore } from '@/store/v2/shared_store';

const url = '/event/';

const eventService = {

    async getEvent(type: any) {
        const sharedStore = useSharedStore();

        try {
            const res = await api().get(url + type );
            if (res.status == 200) {
                sharedStore.setEvents(res.data.event);
                return res ;
            } else {
                sharedStore.setError();
            }
        } catch {
            sharedStore.setError();
        }
    },

};

export default eventService;