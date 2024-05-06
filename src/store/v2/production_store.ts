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
        error: false
    }),
    actions: {
        setPreProjectsList(data) {
            this.preProjectsList = data;
            this.preProjectsStats = {
                waiting: data.filter(item => item.status === 'pending').length,
                inProgress: data.filter(item => item.status === 'En soumission').length,
                completed: data.filter(item => item.status === 'Gagné').length,
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
        }
    }
});