import { api } from '@/utils';
import { useHrStore } from '@/store/v2';

const url = '/leaves';

const leaveService = {

    async getLeaveByRespo() {
        const hrStore = useHrStore();

        try {
            const res = await api().get(url + '/by-responsable');
            if (res.status == 200) {
                hrStore.setLeaves(res.data.leaves);
            } else {
                hrStore.setError();
            }
        } catch {
            hrStore.setError();
        }
    },
    async getLeaves () {
        try {
            const response = await api().get(url);
            if (response.status === 200) {
                const rhStore = useHrStore();
                rhStore.setLeaves(response.data.leaves);
                return response;
            }else{
                throw new Error('Get leaves failed with status: ' + response.status);
            }
        } catch (error) {
            console.error(error);
            return error;
        }
    },
    async addLeave (data: any) {
        try {
            const response = await api().post(url, data);
            if (response.status === 200) {
                const rhStore = useHrStore();
                rhStore.pushLeave(response.data.leave);
                // rhStore.leaves.data.push(response.data.conge);
                return;
            }
        }
        catch (error) {
            console.error(error);
            return error;
        }
    },
    async editLeave (data: any,id:any) {
        try {
            const response = await api().post(url+'/'+id, data);
            if (response.status === 200) {
                const rhStore = useHrStore();
                const existingItem = rhStore.leaves.data.find((t) => t.id === id);
                if (existingItem) {
                    Object.assign(existingItem, response.data.leave);
                } 

                // rhStore.leaves.data.push(response.data.conge);
                return;
            }
        }
        catch (error) {
            console.error(error);
            return error;
        }
    },
    async deleteLeave(id: any) {
        try {
          const response = await api().delete(url + '/' + id);
          if (response.status === 200) {
            const rhStore = useHrStore();
            const itemIdToDelete = id;
                const indexToDelete = rhStore.leaves.data.findIndex((item: any) => item.id == itemIdToDelete);
                if (indexToDelete !== -1) {
                    rhStore.leaves.data.splice(indexToDelete, 1);
                }
            return;
          }
          throw new Error('Delete pointage failed with status: ' + response.status);
        } catch (error) {
          console.error(error);
          return error;
        }
    },
    async validateAdmin(id, req) {
        try {
    
            const rhStore = useHrStore();
            const response = await api().post(url+'/administration_validation/' + id, req);
            if (response.status == 200) {
                console.log(response.data);
                const item = rhStore.leaves.data.find((item) => item.id === id);
                if (item) {
                    Object.assign(item, response.data.leave);
                } 
            }
        } catch (error) {
            console.log(error);
        }
    }

};

export default leaveService;