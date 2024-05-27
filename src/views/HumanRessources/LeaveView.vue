<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import { CardOne, CardOneSkeleton } from '@/ui';
import { employeeService, leaveService } from '@/services/v2';
import { useHrStore } from '@/store';
import { LeavesTable, AddNewLeaveModal } from './components';
import { DeleteDocModal, EditLeaveModal, LeaveDetailsModal } from './components/modals';
import { helpers } from '@/utils';
const rhStore = useHrStore();
const isLoading = ref(false);
const leaves = ref(rhStore.leaves);


const role = localStorage.getItem('role');
const employees = ref(computed(() => rhStore.employees));

onMounted(async () => {
  await leaveService.getLeaves();
  await employeeService.getEmployees();
  

});
// watch(rhStore.leaves, (newValue) => {
//   leaves.value = newValue;
// }, { deep: true });

watch(() => rhStore.leaves.data, (newValue) => {
  leaves.value.data = newValue;
});
watch(() => rhStore.leaves.stats, (newValue) => {
  leaves.value.stats = newValue;
});




const DeleteLeave = async () => {
  isLoading.value = true;

  const formData = new FormData();
  formData.append('status', 'disapproved');
  await leaveService.deleteLeave(rhStore.ItemId).then(() => {
    isLoading.value = false;
    $('#delete-leave').modal('hide');

  });
};

</script>
<template>
  <div class="flex-grow-1 container-fluid mt-3">
    <h5 class="py-3 mb-4 fw-medium text-muted">
      Dashboard / <span class="text-dark">Congés</span>
    </h5>
    <div v-if="leaves.stats" class="row g-3">
      <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-4 col-xxl-3">
        <CardOne title="Total Demande de Congés" :count="String(leaves.stats.total)" color="bg-label-warning"
          icon="ti-plane-inflight" card-color="card-border-shadow-warning" />
      </div>
      <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-4 col-xxl-3">
        <CardOne title="Congé En Attente" :count="String(leaves.stats.pending)" color="bg-label-danger"
          icon="ti-plane-inflight" card-color="card-border-shadow-danger" />
      </div>
      <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-4 col-xxl-3">
        <CardOne title="Congé Validée" :count="String(leaves.stats.accepted)" color="bg-label-success"
          icon="ti-plane-inflight" card-color="card-border-shadow-success" />
      </div>
      <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-4 col-xxl-3">
        <CardOne title="Congés Maladie" :count="String(leaves.stats.sick)" color="bg-label-primary" icon="ti-hospital"
          card-color="card-border-shadow-primary" />
      </div>
    </div>
    <div v-else class="row g-3 mb-4">
      <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-3 col-xxl-3">
        <CardOneSkeleton />
      </div>
      <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-3 col-xxl-3">
        <CardOneSkeleton />
      </div>
      <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-3 col-xxl-3">
        <CardOneSkeleton />
      </div>
      <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-3 col-xxl-3">
        <CardOneSkeleton />
      </div>
    </div>
    <div class="row mt-4">
      <div class="col-12">
        <div class="card">
          <div class="card card-border-shadow-primary">
            <div class="card-header d-flex align-items-center">
              <div class="me-auto">
                <h5 class="fw-bold mb-1">Liste des congés</h5>
                <small class="fw-bold mb-1 text-muted">Liste des congés demandés par les employés</small>
              </div>
              <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addNewLeave" v-if="role == helpers.roles.RH">
                <i class="ti ti-square-rounded-plus-filled me-2"></i>
                Ajouter un congé
              </button>
            </div>
            <div v-if="leaves.data != null" class="card-body border-top pt-4">
              <LeavesTable :leaves="leaves.data" />
            </div>
            <div v-else class="card-body border-top pt-4 d-flex align-items-center justify-content-center"
              style="height: 650px;">
              <div class="row mt-5">
                <div class="col-12 text-center">
                  <h5>Chargement des données...</h5>
                  <div class="spinner-border text-primary mt-4" role="status">
                    <span class="visually-hidden">Loading...</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <AddNewLeaveModal v-if="employees" :employees="employees" />
    
    <DeleteDocModal id="delete-leave" :isLoading="isLoading" :method="DeleteLeave" :itemid="rhStore.ItemId"
      title="Supprimer Ce conge" message="Êtes-vous sûr de supprimer ce conge ?" />
    <LeaveDetailsModal />
    <EditLeaveModal :employees="employees" :leave="rhStore.Item"/>
  </div>
</template>

<style scoped></style>
