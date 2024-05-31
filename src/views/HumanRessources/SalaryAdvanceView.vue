<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import { SalaryAdvancesCard, SalaryAdvancesDetailsModal, SalaryAdvancesTable, AddSalaryAdvanceModal } from './components';
import { DeleteModal, CardOneSkeleton } from '@/ui';
import { employeeService, paieService } from '@/services/v2';
import { useHrStore } from '@/store';
import { formater } from '@/utils';
import {EditSalaryAdvanceModal} from './components/modals';

const rhStore = useHrStore();

let salaryAdvances = computed(() => rhStore.salaryAdvances);
const employees = ref(computed(() => rhStore.employees));



onMounted(async () => {
  await paieService.getSalarayAdvances();
  await employeeService.getEmployees();

});

// watch(() => salaryAdvances, () => {
//   data.value.salaryAdvances = salaryAdvances.value.data;
//   data.value.stats = salaryAdvances.value.stats;
// });
// watch(
//   () => rhStore.salaryAdvances,
//   (newValue) => {
//     salaryAdvances.value = newValue;
//   }
// );

</script>
<template>
  <div class="flex-grow-1 container-fluid mt-3">
    <h5 class="py-3 mb-4 fw-medium text-muted">Dashboard / <span class="text-dark">Avance sur salaire</span> </h5>
    <SalaryAdvancesCard v-if="salaryAdvances.stats"
      :item-one="['Total Avance', formater.number(salaryAdvances.stats.total), 'currency', 'ti ti-coins', 'bg-label-primary']"
      :item-two="['Total Récupéré', formater.number(parseFloat(salaryAdvances.stats.total) - parseFloat(salaryAdvances.stats.remaining)), 'currency', 'ti ti-coins', 'bg-label-success']"
      :item-three="['Total Restant', formater.number(salaryAdvances.stats.remaining), 'currency', 'ti ti-coins', 'bg-label-warning']" />
    <div v-else class="row g-3 mb-4">
      <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-4 col-xxl-4">
        <CardOneSkeleton />
      </div>
      <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-4 col-xxl-4">
        <CardOneSkeleton />
      </div>
      <div class="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-4 col-xxl-4">
        <CardOneSkeleton />
      </div>
    </div>
    <div class="row mt-2">
      <div class="col-12">
        <div class="card">
          <div class="card card-border-shadow-primary">
            <div class="card-header d-flex justify-content-between align-items-center">
              <div>
                <h5 class="fw-bold mb-1">Avance sur salaire</h5>
                <small class="fw-bold mb-1 text-muted">Liste des avances sur salaire</small>
              </div>
              <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addSalaryAdvance">
                <i class="ti ti-plus me-2"></i>
                Ajouter une avance sur salaire
              </button>
            </div>
            <div v-if="salaryAdvances.data" class="card-body border-top pt-4">
              <SalaryAdvancesTable :salaryAdvances="salaryAdvances.data" />
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
    <AddSalaryAdvanceModal v-if="employees" :employees="employees" />
    <SalaryAdvancesDetailsModal />
    <DeleteModal title="Supprimer un avance sur salaire"
      text="Voulez-vous vraiment supprimer cette avance sur salaire ?" textButton="Oui, Supprimer"
      :action="() => paieService.deleteAdvance(rhStore.ItemId)" message="Avance sur salaire supprimée avec succès" />
    <EditSalaryAdvanceModal v-if="employees" :employees="employees"/>
  </div>
</template>

<style scoped></style>
