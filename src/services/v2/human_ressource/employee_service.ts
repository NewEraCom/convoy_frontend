import { api } from '@/utils';
import { useHrStore } from '@/store/v2';

const url = '/employees/';

const employeeService = {
  async getActiveEmployees() {
    const hrStore = useHrStore();

    try {
      const res = await api().get(url + 'active');
      if (res.status == 200) {
        hrStore.setEmployees(res.data);
      } else {
        hrStore.setError();
      }
    } catch {
      hrStore.setError();
    }
  },
  async getEmployees() {
    try {
      const response = await api().get(url);
      if (response.status === 200) {
        const hrStore = useHrStore();
        hrStore.setEmployees(response.data);
        return;
      }
      throw new Error('Get employees failed with status: ' + response.status);
    } catch (error) {
      console.error(error);
      return error;
    }
  },
  async deleteEmployee() {
    const id = $('#deleteId').val();
    if (id) {
      try {
        const response = await api().delete(url + id);
        if (response.status === 200) {
          const rhStore = useHrStore();
          rhStore.deleteEmployee(Number(id));
          return;
        }
        throw new Error('Delete employee failed with status: ' + response.status);
      } catch (error) {
        console.error(error);
        return error;
      }
    }
  },
  async getEmployeeById(id: number) {
    try {
      const response = await api().get(url + id);
      if (response.status === 200) {
        const rhStore = useHrStore();
        rhStore.setEmployeeId(response.data.employee);
        return;
      }
      throw new Error('Get employees failed with status: ' + response.status);
    } catch (error) {
      console.error(error);
      return error;
    }
  },

  async UpdateSalaire(id, req) {
    try {
      const response = await api().post(url + 'updateSalary/' + id, req);
      if (response.status == 200) {
        const rhStore = useHrStore();

        console.log(response.data);

        rhStore.employee = response.data.employee;
      }
    } catch (error) {
      console.log(error);
    }
  },
  async AugmentationSalaire(id, req) {
    try {
      const response = await api().post(url + 'augement-salaire/' + id, req);
      if (response.status == 200) {
        const rhStore = useHrStore();

        console.log(response.data);

        rhStore.employee = response.data.employee;
      }
    } catch (error) {
      console.log(error);
    }
  },
  async EditLeaveEmployee(id, req) {
    try {
      const response = await api().post(url + 'updateLeaveSolde/' + id, req);
      if (response.status == 200) {
        const rhStore = useHrStore();

        console.log(response.data);

        rhStore.employee = response.data.employee;
      }
    } catch (error) {
      console.log(error);
    }
  },
  async addLeave(data: any, id: any) {
    try {
      const response = await api().post(url + 'add-conge/' + id, data);
      if (response.status === 200) {
        const rhStore = useHrStore();
        rhStore.pushLeave(response.data.conge);
        // rhStore.leaves.data.push(response.data.conge);
        return;
      }
    } catch (error) {
      console.error(error);
      return error;
    }
  },
  async EditEmployee(id, req) {
    try {
      const response = await api().post(url + id, req);
      if (response.status == 200) {
        const rhStore = useHrStore();

        console.log(response.data);

        rhStore.employee = response.data.employee;

        // await getEmployeeById(id);

        // return response.data;
      }
    } catch (error) {
      console.log(error);
    }
  },
  async EditBankEmployee(id, req) {
    try {
      const response = await api().post(url + 'updateBank/' + id, req);
      if (response.status == 200) {
        const rhStore = useHrStore();

        console.log(response.data);

        rhStore.employee = response.data.employee;

        // await getEmployeeById(id);

        // return response.data;
      }
    } catch (error) {
      console.log(error);
    }
  },
  async EditCnssEmployee(id, req) {
    try {
      const response = await api().post(url + 'update-cnss/' + id, req);
      if (response.status == 200) {
        const rhStore = useHrStore();

        console.log(response.data);

        rhStore.employee = response.data.employee;

        // await getEmployeeById(id);

        // return response.data;
      }
    } catch (error) {
      console.log(error);
    }
  },
  async addPointage(data: any) {
    try {
      const response = await api().post(url + 'add-pointage', data);
      if (response.status === 201) {
        const rhStore = useHrStore();
        rhStore.addPointage(response.data.pointage);

        return response;
      }
      throw new Error('Add pointage failed with status: ' + response.status);
    } catch (error) {
      console.error(error);
      return error;
    }
  },
  async addEmpPointage(data: any) {
    try {
      const response = await api().post(url + 'add-pointage', data);
      if (response.status === 201) {
        const rhStore = useHrStore();
        rhStore.employee.pointages?.push(response.data.pointage);
        


        return response;
      }
      throw new Error('Add pointage failed with status: ' + response.status);
    } catch (error) {
      console.error(error);
      return error;
    }
  },
  async addEmployee(data: any) {
    try {
      const response = await api().post(url, data);
      if (response.status === 200) {
        const rhStore = useHrStore();
        rhStore.pushEmployee(response.data.employee);
        return;
      }
      throw new Error('Delete employee failed with status: ' + response.status);
    } catch (error) {
      console.error(error);
      return error;
    }
  },
  async UploadDocEmployee(id, req) {
    try {
      const response = await api().post(url+'upload-documents/' + id, req);
      if (response.status == 200) {
          const rhStore = useHrStore();

          console.log(response.data);

          rhStore.employee = response.data.employee;

          // await getEmployeeById(id);

          // return response.data;
      }
  } catch (error) {
      console.log(error);
  }
  },
  async DeleteDocEmployee(id) {
    try {
      const response = await api().delete(url + 'delete-document/' + id);
      if (response.status == 200) {
        const rhStore = useHrStore();

        console.log(response.data);

        rhStore.employee.documents = rhStore.employee.documents.filter((doc) => doc.id !== id);
      }
    } catch (error) {
      console.log(error);
    }
  },
  async RuptureContractEmployee(id, req) {
    try {
      const response = await api().post(url + 'repture/' + id, req);
      if (response.status == 200) {
        const rhStore = useHrStore();

        console.log(response.data);

        rhStore.employee = response.data.employee;

        // await getEmployeeById(id);

        // return response.data;
      }
    } catch (error) {
      console.log(error);
    }
  },
  async AffecterEmpProjet(id, data: any) {
    try {
      const response = await api().post(url + 'affecter-employe/' + id, data);
      if (response.status === 200) {
        const rhStore = useHrStore();
        rhStore.employee = response.data.employee;
        return;
      }
    } catch (error) {
      console.log(error);
    }
  },
  async getPointages() {
    try {
      const response = await api().get(url + 'get-pointages');
      if (response.status === 200) {
        const rhStore = useHrStore();
        console.log(response.data);
        rhStore.setPointages(response.data.pointages);
        return;
      }
      throw new Error('Get pointage failed with status: ' + response.status);
    } catch (error) {
      console.error(error);
      return error;
    }
  },
  async downloadFile() {
    try {
      const response = await api().get(url + 'pointage-file', { responseType: 'blob' });
      return response;
    } catch (error) {
      console.error(error);
      return error;
    }
  },
  async importPointage(data: any) {
    try {
      const response = await api().post(url + 'pointage-import', data);
      if (response.status === 201) {
        const rhStore = useHrStore();
        rhStore.pointages.push(response.data.pointages);
        console.log(response.data.pointages);

        return;
      }
    } catch (error) {
      console.log(error);
    }
  },
  async deletePointage(id: any) {
    try {
      const response = await api().delete(url + 'delete-pointage/' + id);
      if (response.status === 200) {
        const rhStore = useHrStore();
        const itemIdToDelete = id;
            const indexToDelete = rhStore.pointages.findIndex((item: any) => item.id == itemIdToDelete);
            if (indexToDelete !== -1) {
                rhStore.pointages.splice(indexToDelete, 1);
            }
        return;
      }
      throw new Error('Delete pointage failed with status: ' + response.status);
    } catch (error) {
      console.error(error);
      return error;
    }
  }
};

export default employeeService;

