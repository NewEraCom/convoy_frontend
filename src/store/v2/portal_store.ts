import { defineStore } from 'pinia';


export const usePortalStore = defineStore('PortalStore', {
    state: () => ({
        employee: null,
    }),
    actions: {
        setEmployee(data) {
            this.employee = data;
        },
        setError() {
            this.error = true;
        }
    }
});