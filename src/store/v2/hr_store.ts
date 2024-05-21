import { defineStore } from 'pinia';


export const useHrStore = defineStore('HrStore', {
    state: () => ({
        leaves: null,
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
        pushLeave(data: any) {
            this.leaves.push(data);
        },
        pushEmployee(data: any) {
            this.employees.push(data);
        },
    }
});