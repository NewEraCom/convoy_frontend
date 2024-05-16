import { api } from '@/utils';
import { usePortalStore } from '@/store';

const url = '/portal/';

const portalService = {

    async getCurrentEmployee() {
        const portalStore = usePortalStore();
        try {
            const res = await api().get(url + 'current-employee');
            if (res.status == 200) {
                portalStore.setEmployee(res.data);
            } else {
                portalStore.setError();
            }
        } catch {
            return Promise.reject();
        }
    },

    async updateAddress(request: any,) {

        try {
            const portalStore = usePortalStore();
            const res = await api().post(url + 'update-address/', request);
            if (res.status == 200) {
                portalStore.setEmployee(res.data);
            } else {
                return res.status;
            }
        } catch {
            return Promise.reject();
        }
    },

    async updatePersonalInfo($request: any) {
        try {
            const portalStore = usePortalStore();
            const res = await api().post(url + 'update-personal-info', $request);
            if (res.status == 200) {
                portalStore.setEmployee(res.data);
            } else {
                return res.status;
            }
        } catch {
            return Promise.reject();
        }
    },

    async updateContactInfo($request: any) {
        try {
            const portalStore = usePortalStore();
            const res = await api().post(url + 'update-contact-info', $request);
            if (res.status == 200) {
                portalStore.setEmployee(res.data);
            } else {
                return res.status;
            }
        } catch {
            return Promise.reject();
        }
    }
};

export default portalService;