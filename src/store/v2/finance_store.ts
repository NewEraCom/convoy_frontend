import { defineStore } from 'pinia';


export const useFinanceStore = defineStore('FinanceStore', {
    state: () => ({
        clientsList: null,
        clientsStats: null,
        cautionsList: null,
        cautionsStats: null,
        error: false
    }),
    actions: {
        setClientsList(data) {
            this.clientsList = data;
            this.clientsStats = {
                total: data.length,
                active: data.filter(item => item.is_active == 1).length,
                inactive: data.filter(item => item.is_active == 0).length,
            };
        },
        setCautionsList(data) {
            this.cautionsList = data;
            this.cautionsStats = {
                caution_provisoir_not_recover: data.filter(item => item.caution_type == 'provisoire' && item.status == 'approved').reduce((acc, item) => acc + item.amount, 0),
                caution_provisoir_recover: data.filter(item => item.caution_type == 'provisoire' && item.status == 'recovered').reduce((acc, item) => acc + item.amount, 0),
                caution_definitive_not_recover: data.filter(item => item.caution_type == 'definitive' && item.status == 'approved').reduce((acc, item) => acc + item.amount, 0),
                caution_definitive_recover: data.filter(item => item.caution_type == 'definitive' && item.status == 'recovered').reduce((acc, item) => acc + item.amount, 0),
            };
        },
        setError() {
            this.error = true;
        }
    }
});