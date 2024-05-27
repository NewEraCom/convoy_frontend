import { api } from '@/utils';
import { useHrStore } from '@/store/v2';

const url = '/intern';

const internsService = {
  async getInterns() {
    try {
      const response = await api().get(url);
      if (response.status === 200) {
        const rhStore = useHrStore();
        rhStore.setInterns(response.data.interns);
        return;
      }
      throw new Error('Get interns failed with status: ' + response.status);
    } catch (error) {
      console.error(error);
      return error;
    }
  },
  async deleteIntern(id) {
    try {
      const response = await api().delete(url + '/' + id);
      if (response.status == 200) {
        const rhStore = useHrStore();
        const itemIdToDelete = id;
        const indexToDelete = rhStore.interns.data.findIndex(
          (item: any) => item.id == itemIdToDelete
        );
        if (indexToDelete !== -1) {
          rhStore.interns.data.splice(indexToDelete, 1);
        }
        console.log(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  },
  async addInterns(data: any) {
    try {
      const response = await api().post(url, data);
      if (response.status === 200) {
        const rhStore = useHrStore();
        rhStore.pushIntern(response.data.intern);
        return;
      }
      throw new Error('Insert Intern failed with status: ' + response.status);
    } catch (error) {
      console.error(error);
      return error;
    }
  },
  async potentielIntern(id, req) {
    try {
      const response = await api().post(url + '/potentiel/' + id, req);
      if (response.status == 200) {
        console.log(response.data);
        const rhStore = useHrStore();
        if (response.status === 200) {
          const stg = rhStore.interns.data.find((item) => item.id === id);
          if (stg) {
            Object.assign(stg, response.data.intern);
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  },
  async getInternById (id) {
    try {
        const response = await api().get(url+'/' + id);
        if (response.status === 200) {
            const rhStore = useHrStore();
            rhStore.intern = response.data.intern;
            return;
        }
        throw new Error('Get workers failed with status: ' + response.status);
    } catch (error) {
        console.error(error);
        return error;
    }
},
async updateAttachement (id: number, data: any) {
    try {
        const response = await api().post(url+'/update-attachement/' + id, data);
        if (response.status === 200) {
            const rhStore = useHrStore();
            rhStore.intern = response.data.intern;

            return;
        }
        throw new Error('Adding Doc failed with status: ' + response.status);
    } catch (error) {
        console.error(error);
        return error;
    }
},
async  UploadDocIntern(req) {
    try {


        const response = await api().post(url+'/upload-doc', req);
        if (response.status == 200) {
            const rhStore = useHrStore();

            console.log(response.data);

            rhStore.intern = response.data.intern;

        }
    } catch (error) {
        console.log(error);
    }
},
async  updateIntern(id, req) {
    try {


        const response = await api().post(url+'/' + id, req);
        if (response.status == 200) {
            const rhStore = useHrStore();

            rhStore.intern = response.data.intern;
            
        }
    } catch (error) {
        console.log(error);
    }
}
};
export default internsService;
