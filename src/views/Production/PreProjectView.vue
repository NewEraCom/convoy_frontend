<script setup>
import { CardTwo, CardTwoSkeleton } from '@/ui';
import { onMounted, ref, computed, watch } from 'vue';
import { preProjectService } from '@/services';
import { useProductionStore } from '@/store/v2';
import { PreProjectTable, NewPreProjectModal, ExportPreProjectModal, ImportPreProjectModal } from './components';

const productionStore = useProductionStore();

const preProjects = ref(computed(() => productionStore.preProjectsList));
const stats = ref(computed(() => productionStore.preProjectsStats));
const error = ref(computed(() => productionStore.error));

onMounted(async () => {
    await preProjectService.getPreprojectList();
});

watch(error, (newValue) => {
    if (newValue) {
        console.log('Error:', newValue);
    }
});

watch(preProjects, (newValue) => {
    if (newValue) {
        preProjects.value = newValue;
    }
});
</script>

<template>
    <div class="flex-grow-1 container-fluid mt-3">
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item">
                    <a href="javascript:void(0);">Dashboard</a>
                </li>
                <li class="breadcrumb-item active">Avant Projets</li>
            </ol>
        </nav>

        <div v-if="stats" class="row g-3">
            <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-3 col-xxl-3">
                <CardTwo title="Avant projet en attente" :count="String(stats.waiting)" color="bg-label-warning"
                    icon="ti ti-bolt" card-color="card-border-shadow-warning" />
            </div>
            <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-3 col-xxl-3">
                <CardTwo title="Avant projet en soumission" :count="String(stats.inProgress)" color="bg-label-info"
                    icon="ti ti-bolt" card-color="card-border-shadow-info" />
            </div>
            <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-3 col-xxl-3">
                <CardTwo title="Avant projet gagné" :count="String(stats.completed)" color="bg-label-success"
                    icon="ti ti-briefcase" card-color="card-border-shadow-success" />
            </div>
            <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-3 col-xxl-3">
                <CardTwo title="Avant projet pérdu" :count="String(stats.lost)" color="bg-label-danger"
                    icon="ti ti-coins" card-color="card-border-shadow-danger" />
            </div>
        </div>
        <div v-else class="row g-3">
            <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-3 col-xxl-3">
                <CardTwoSkeleton />
            </div>
            <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-3 col-xxl-3">
                <CardTwoSkeleton />
            </div>
            <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-3 col-xxl-3">
                <CardTwoSkeleton />
            </div>
            <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-3 col-xxl-3">
                <CardTwoSkeleton />
            </div>
        </div>

        <div class="row g-3 mt-2">
            <div class="col-12 col-xl-12 col-md-12">
                <div class="card card-border-shadow-primary h-100">
                    <div class="card-header border-bottom d-flex justify-content-between align-items-center">
                        <div>
                            <h5 class="card-title fw-bold m-0 me-2">Avant projets</h5>
                            <small class="text-muted">Liste des avant projets</small>
                        </div>
                        <div>
                            <button class="btn btn-sm p-2 btn-primary" data-bs-target="#new-avantprojet"
                                data-bs-toggle="modal">
                                <i class="ti ti-square-rounded-plus me-2"></i>
                                Nouveau avant projet
                            </button>
                            <button class="btn btn-sm p-2 btn-success ms-2" data-bs-target="#import-avantprojet"
                                data-bs-toggle="modal">
                                <i class="ti ti-table-import me-2"></i>
                                Importer
                            </button>
                            <button class="btn btn-sm p-2 btn-warning ms-2" data-bs-target="#export-avantprojet"
                                data-bs-toggle="modal">
                                <i class="ti ti-file-export me-2"></i>
                                Exporter
                            </button>
                        </div>
                    </div>
                    <PreProjectTable :preproject="preProjects" v-if="preProjects" />
                </div>
            </div>
        </div>

        <NewPreProjectModal />
        <ExportPreProjectModal />
        <ImportPreProjectModal />
    </div>
</template>

<style>
.w-80 {
    width: 80px;
}

.w-160 {
    width: 160px;
}

.w-180 {
    width: 180px;
}
</style>