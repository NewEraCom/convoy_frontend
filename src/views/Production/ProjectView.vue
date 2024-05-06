<script setup>
import { CardTwo } from '@/ui';
import { onMounted, ref, computed, watch } from 'vue';
import { projectService } from '@/services';
import { useProductionStore } from '@/store/v2';
import { ProjectTable } from './components';

const productionStore = useProductionStore();

const projects = ref(computed(() => productionStore.projectsList));
const stats = ref(computed(() => productionStore.projectsStats));
const error = ref(computed(() => productionStore.error));

onMounted(async () => {
    await projectService.getProjectList();
});

watch(error, (newValue) => {
    if (newValue) {
        console.log('Error:', newValue);
        // redirect to error page
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
                <li class="breadcrumb-item active">Projets</li>
            </ol>
        </nav>
        <div v-if="stats" class="row g-3">
            <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-4 col-xxl-4">
                <CardTwo title="Projets" :count="String(stats.onGoing)" color="bg-label-warning" icon="ti ti-box"
                    card-color="card-border-shadow-warning" />
            </div>
            <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-4 col-xxl-4">
                <CardTwo title="Projets en cours" :count="String(stats.inProgress)" color="bg-label-info"
                    icon="ti ti-box" card-color="card-border-shadow-info" />
            </div>
            <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-4 col-xxl-4">
                <CardTwo title="Projets terminés" :count="String(stats.completed)" color="bg-label-success"
                    icon="ti ti-box" card-color="card-border-shadow-success" />
            </div>
        </div>

        <div class="row g-3 mt-2">
            <div class="col-12 col-xl-12 col-md-12">
                <div class="card card-border-shadow-primary h-100">
                    <div class="card-header border-bottom d-flex justify-content-between align-items-center">
                        <div>
                            <h5 class="card-title fw-bold m-0 me-2">Projets</h5>
                            <small class="text-muted">Liste des projets</small>
                        </div>
                        <div>
                            <button class="btn btn-sm p-2 btn-warning ms-2">
                                <i class="ti ti-file-spreadsheet me-2"></i>
                                Exporter
                            </button>
                        </div>
                    </div>
                    <ProjectTable :projects="projects" v-if="projects" />
                </div>
            </div>
        </div>
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