<script setup lang="ts">
import { computed, onMounted, onUnmounted ,ref,watch} from 'vue';
import { employeeService } from '@/services/v2/human_ressource';
import { useHrStore } from '@/store';
import { PointageTable, AddPointageModal, ImportPointageModal } from './components';
import {Validate} from './components/modals';
import { useToast } from 'vue-toastification';
const toast = useToast();
const rhStore = useHrStore();
const isLoading = ref(false);
let pointages = ref(computed(() => rhStore.pointages));
let employees = ref(computed(() =>rhStore.employees));

onMounted(async () => {
    await employeeService.getPointages();
    await employeeService.getEmployees();
});

onUnmounted(() => {
    rhStore.pointages = null;
    rhStore.employees = null;
});

const DeletePointage = async () => {
    await employeeService.deletePointage(rhStore.ItemId).then(() => {
        $('#delete-modal').modal('hide');
        toast.success('Pointage supprimé avec succès');
    }).catch((error) => {
        console.error('Error during action execution', error);
        toast.error('Erreur lors de la suppression du pointage');
    }).finally(() => {
        isLoading.value = false;
    });
};
watch((rhStore.pointages),(newVal)=>{
    pointages.value = newVal;
});
</script>
<template>
    <div class="flex-grow-1 container-fluid mt-3">
        <h5 class="py-3 mb-4 fw-medium text-muted">Dashboard / <span class="text-dark">Pointage</span> </h5>
        <div class="row mt-4">
            <div class="col-12">
                <div class="card">
                    <div class="card card-border-shadow-primary">
                        <div class="card-header d-flex align-items-center justify-content-between">
                            <div>
                                <h5 class="fw-bold mb-1">Pointage</h5>
                                <small class="fw-bold mb-1 text-muted">Liste des pointages</small>
                            </div>
                            <div>
                                <button class="btn btn-success me-2" data-bs-toggle="modal"
                                    data-bs-target="#importPointage">
                                    <i class="ti ti-download me-2"></i>
                                    Importer
                                </button>
                                <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addPointage">
                                    <i class="ti ti-clock-plus me-2"></i>
                                    Ajouter un pointage
                                </button>
                            </div>
                        </div>
                        <div v-if="pointages" class="card-body border-top pt-4">
                            <PointageTable :pointages="pointages" :custom="true" />
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
        <AddPointageModal v-if="employees" :employees="employees" source="complex" />
        <ImportPointageModal />
        <Validate id="delete-modal" :isLoading="isLoading" :method="DeletePointage" :itemid="rhStore.ItemId"
        title="Supprimer un pointage" message="Êtes-vous sûr de supprimer ce pointage" severity="danger" />
    </div>
</template>

<style scoped></style>
