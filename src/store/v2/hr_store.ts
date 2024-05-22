import { defineStore } from 'pinia';


export const useHrStore = defineStore('HrStore', {
    state: () => ({
        leaves: null,
        leavesStats: null,
        employees: [],
        error: false
    }),
    actions: {
        setLeaves(data) {
            this.leaves = data;
            this.leavesStats = {
                pending: data.filter(item => item.status === 'pending').length ?? 0,
                approved: data.filter(item => item.status === 'approved').length ?? 0,
                rejected: data.filter(item => item.status === 'rejected').length ?? 0,
                total: data.length ?? 0
            };
        },
        resetLeaves() {
            this.leaves = null;
            this.leavesStats = null;
        },
        setEmployees(data) {
            this.employees = data;
            console.log(this.employees)
        },
        setError() {
            this.error = true;
        }
    }
});