import { defineStore } from 'pinia';


export const useHrStore = defineStore('HrStore', {
    state: () => ({
        leaves: {
            data:null,
            stats:null
        },
        leavesStats: null,
        employees: null,
        employee: null,
        error: false,
        employeeExpire: null,
        stats:null,
        demandeRh: {
            data: null,
            stats: null,
        },
        ItemId:null,
        pointages: null,
        interns: {
            data: null,
            stats: null,
        },
        Item:null,
        intern: null,
        attachement:null,
        recrutement: {
            data: null,
            stats: null,
        },

    }),
    actions: {
        clearStats() {
            this.stats = null;
        },
        clearDemandeRh() {
            this.demandeRh = {
                data: null,
                stats: null,
            };
        },
        setDemandeRh(data: any) {
            this.demandeRh.data = data;
            this.demandeRh.stats = {
                total: data.length,
                pending: data.filter((e: any) => e.status === 'pending').length,
                done: data.filter((e: any) => e.status === 'done').length,
                delivered: data.filter((e: any) => e.status === 'delivered').length,
            };
        },
        setLeaves(data) {
            this.leaves.data = data;
            this.leaves.stats = {
                total: data.length,
                accepted: data.filter((e: any) => e.status === 'approved').length,
                pending: data.filter((e: any) => e.status === 'pending').length,
                sick: data.filter((e: any) => e.type === 'maladie').length,
            };
            console.log(this.leaves);
            
        },
        resetLeaves() {
            this.leaves = null;
            this.leavesStats = null;
        },
        setEmployees(data) {
            this.employees = data.employee;
            this.stats = {
                total: data.employee.filter((e: any) => e.status == 'active').length,
                cdi: data.employee.filter((e: any) => e.status == 'active' && e.type_contrat == 'CDI').length,
                cdd: data.employee.filter((e: any) => e.status == 'active' && e.type_contrat == 'CDD').length,
                chantier: data.employee.filter((e: any) => e.status == 'active' && e.type_contrat === 'Chantier').length,
                commercial: data.employee.filter((e: any) => e.status == 'active' && e.type_contrat === 'COMMERCIALE').length,
                male: data.employee.filter((e: any) => e.status == 'active' && e.sexe === 'Homme').length,
                female: data.employee.filter((e: any) => e.status == 'active' && e.sexe === 'Femme').length,
                salaryMass: data.employee.reduce((accumulator: number, currentEmployee: any) => {
                    if (currentEmployee.status === '1') {
                        return accumulator + Number(currentEmployee.salary);
                    } else {
                        return accumulator;
                    }
                }, 0),
                employee_per_month: data.employee_per_month || 0,
                mass_salariale_per_month: data.mass_salarial || 0
            };
            const currentDate = new Date();
            const currentYear = currentDate.getFullYear();
            const currentMonth = currentDate.getMonth() + 1; // getMonth() returns 0-11, adding 1 adjusts to 1-12 format

            this.employeeExpire = data.employee.filter((e: any) => {
                const contractEndDate = new Date(e.date_fin_contrat);
                const contractEndYear = contractEndDate.getFullYear();
                const contractEndMonth = contractEndDate.getMonth() + 1; // Adjust month format to 1-12

                return e.status === '1' && contractEndYear === currentYear && contractEndMonth === currentMonth;
            });
        },
        clearEmployees() {
            this.employees = null;
        },
        deleteEmployee(id: number) {
            const itemIdToDelete = id;
            const indexToDelete = this.employees.findIndex((item) => item.id == itemIdToDelete);
            if (indexToDelete !== -1) {
                this.employees.splice(indexToDelete, 1);
            } else {
                console.log('Item not found in array.');
            }
        },
        setEmployeeId(data: any) {
            this.employee = data;
        },
        setError() {
            this.error = true;
        },
        clearEmployee() {
            this.employee = null;
        },
        setItemId(id: number) {
            this.ItemId = id;
        },
        setItem(id: number) {
            this.Item = id;
        },
        clearItem(){
            this.Item = null;
        },
        pushLeave(data: any) {
            this.leaves.data?.unshift(data);
            this.leaves.stats = {
                total: this.leaves.data.length,
                accepted: this.leaves.data.filter((e: any) => e.status === 'approved').length,
                pending: this.leaves.data.filter((e: any) => e.status === 'pending').length,
                sick: this.leaves.data.filter((e: any) => e.type === 'maladie').length,
            };
        },
        pushEmployee(data: any) {
            this.employees.push(data);
        },
        setPointages(data: any) {
            this.pointages = data;
        },
        addPointage(pointage: any) {
            this.pointages?.push(pointage);
            console.log(this.pointages);
            
        },
        setInterns(data: any) {
            this.interns.data = data;
            this.interns.stats = {
                total: data.length,
                actif: data.filter((e: any) => e.status === 'approved').length,
                inactif: data.filter((e: any) => e.status === 'pending').length,
                potentialHiring: data.filter((e: any) => e.potentiel == '1').length,
            };
            console.log(this.interns);
            
        },
        pushIntern(data: any) {
            this.interns.data?.push(data);
            this.interns.stats = {
                total: this.interns.data.length,
                actif: this.interns.data.filter((e: any) => e.status === 'approved').length,
                inactif: this.interns.data.filter((e: any) => e.status === 'pending').length,
                potentialHiring: this.interns.data.filter((e: any) => e.potentiel == '1').length,
            };
        },
        setAttachement(data: any) {
            this.attachement = data;
        },
        setRecrutement(data: any) {
            this.recrutement.data = data;
            this.recrutement.stats = {
                total: data.length,
                pending: data.filter((e: any) => e.status === 'pending').length,
                accepted: data.filter((e: any) => e.status === 'approved').length,
            };
        },
    }
});