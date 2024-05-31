<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed ,watch} from 'vue';
import { CardOne, CardOneSkeleton, DeleteModal } from '@/ui';
import { CaisseTable, NewOperationModal } from './components';
import { DetailsCaisseOperation } from './components/Modals';
import { useSharedStore ,useProductionStore} from '@/store/v2';
import { eventService,projectService } from '@/services/v2';
import { formater } from '@/utils';
import { ValidateCaisse } from './components/Modals';

const SharedStore = useSharedStore();
const productionStore = useProductionStore();
const isLoading = ref(false);
const operation = ref(computed(() => SharedStore.operation));
const projects = ref(computed(() => productionStore.projectsList));



onMounted(async () => {
  await eventService.getOperationCaisse();
  await projectService.getProjectList();
});

onUnmounted(() => {
  SharedStore.clearOperation();
});

watch(
  SharedStore.operation,
  (newValue) => {
    operation.value = newValue;
  },
  { deep: true }
);

const Validate = async () => {
  // isLoading.value = true;
  // await logisticsService.validateCaisse(logisticsStore.selectedItem.id).then(() => {
  //     isLoading.value = false;
  //     $('#validate-caisse-modal').modal('hide');
  // });
  // console.log($('#validateInput').val());
};
</script>

<template>
  <div class="flex-grow-1 container-fluid mt-3">
    <h5 class="py-3 mb-4 fw-medium text-muted">
      Dashboard / <span class="text-dark">Caisse</span>
    </h5>
    <div v-if="operation.stats" class="row g-3">
      <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-3 col-xxl-3 gap-2">
        <CardOne
          title="Demande en cours"
          :count="formater.number(operation.stats.total)"
          color="bg-label-warning"
          icon="ti ti-cash"
          card-color="card-border-shadow-warning"
        />
      </div>
      <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-3 col-xxl-3 gap-2">
        <CardOne
          title="Demande en cours"
          :count="formater.number(operation.stats.requested)"
          color="bg-label-warning"
          icon="ti ti-cash"
          card-color="card-border-shadow-warning"
        />
      </div>
      <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-3 col-xxl-3 gap-2">
        <CardOne
          title="Demande en cours"
          :count="formater.number(operation.stats.delivered)"
          color="bg-label-info"
          icon="ti ti-cash"
          card-color="card-border-shadow-info"
        />
      </div>
      <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-3 col-xxl-3 gap-2">
        <CardOne
          title="Demande livrée"
          :count="formater.number(operation.stats.ongoing)"
          color="bg-label-success"
          icon="ti ti-cash"
          card-color="card-border-shadow-success"
        />
      </div>
    </div>
    <div v-else class="row">
      <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-4 col-xxl-4">
        <CardOneSkeleton />
      </div>
      <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-4 col-xxl-4">
        <CardOneSkeleton />
      </div>
      <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-4 col-xxl-4">
        <CardOneSkeleton />
      </div>
    </div>
    <div class="row mt-4">
      <div class="col-12">
        <div class="card">
          <div class="card card-border-shadow-primary">
            <div class="card-header d-flex align-items-center">
              <div class="me-auto">
                <h5 class="fw-bold mb-1">Liste des opérations de caisse</h5>
                <small class="fw-bold mb-1 text-muted">Liste des opérations de caisse</small>
              </div>
              <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#newOperation">
                <i class="ti ti-plus me-2"></i>
                Ajouter une opération
              </button>
            </div>

            <div v-if="operation.data != null" class="card-body border-top pt-4">
              <CaisseTable :caisse="operation.data" />
            </div>
            <div
              v-else
              class="card-body border-top pt-4 d-flex align-items-center justify-content-center"
              style="height: 650px"
            >
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
    <NewOperationModal :projects="projects"/>
    <DetailsCaisseOperation />
    <DeleteModal
      title="Supprimer un opération"
      text="Voulez-vous vraiment supprimer cette opération ?"
      textButton="Oui, Supprimer"
      :action="() => eventService.deleteCaisseOperation()"
    />
    <ValidateCaisse id="validate-caisse-modal" :isLoading="isLoading" :method="Validate" />
  </div>
</template>
