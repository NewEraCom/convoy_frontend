import { defineStore } from 'pinia';


export const useProductionStore = defineStore('ProductionStore', {
    state: () => ({
        preProjectsList: null,
        preProjectsStats: null,
        projectsList: null,
        projectsStats: null,
        selectedPreProject: null,
        caisseSum: null,
        caisseList: null,
        error: false,
        purchaseOrders:{
            data:null,
            stats:null,
            chart:null
        }
    }),
    actions: {
        setPreProjectsList(data) {
            this.preProjectsList = data;
            this.preProjectsStats = {
                waiting: data.filter(item => item.status === 'pending').length,
                inProgress: data.filter(item => item.status === 'En soumission').length,
                not_delivered: data.filter(item => item.status === 'Gagné').length,
                lost: data.filter(item => item.status === 'Perdu').length
            };
        },
        setProjectsList(data) {
            this.projectsList = data;
            this.projectsStats = {
                onGoing: data.filter(item => item.status === 'on going').length,
                inProgress: data.filter(item => item.status === 'on progress').length,
                completed: data.filter(item => item.status === 'done').length,
            };
        },
        pushPreProjectToList(data) {
            this.preProjectsList.unshift(data);
            this.preProjectsStats.waiting++;
        },
        setPreProject(data) {
            this.selectedPreProject = data;
        },
        setCaisseSum(data) {
            this.caisseSum = data;
        },
        setCaisseList(data) {
            this.caisseList = data;
        },
        setError() {
            this.error = true;
        },
        setDashboardData(data: any) {
            this.projectsStats = data;
        },
        clearStats() {
            this.projectsStats = null;
        },
        setPurchaseOrders(purchases: any) {
            this.purchaseOrders.data = purchases;
            this.purchaseOrders.stats = {
                total: purchases.length,
                pending: purchases.filter((p: any) => p.status === 'pending').length,
                traited: purchases.filter((p: any) => p.status === 'traited').length,
                rejected: purchases.filter((p: any) => p.status === 'rejected').length,
                approved: purchases.filter((p: any) => p.status === 'approved').length,
                for_delivery: purchases.filter((p: any) => p.status === 'for_delivery').length,
                delivered: purchases.filter((p: any) => p.status === 'delivered').length,
                delivered_partially: purchases.filter((p: any) => p.status === 'delivered_partially').length,
                not_delivered: purchases.filter((p: any) => p.status === 'not_delivered').length,
            };
            console.log(this.purchaseOrders);
            
        },
        clearPurchaseOrders() {
            this.purchaseOrders.data = null;
            this.purchaseOrders.stats = null;
            this.purchaseOrders.chart = null;
        },
    }
});