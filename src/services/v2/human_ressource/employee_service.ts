import { api } from '@/utils';
import { useHrStore } from '@/store/v2';

const url = '/employees/';

const employeeService = {
    async getEmployees() {
        const hrStore = useHrStore();

        try {
            const res = await api().get(url + 'get');
            if (res.status == 200) {
                hrStore.setEmployees(res.data.employees);
            } else {
                hrStore.setError();
            }
        } catch {
            hrStore.setError();
        }
    }
};

export default employeeService;