<script setup>
import { CardTwo } from '@/ui';
import { onMounted, ref, computed, watch } from 'vue';
import { clientService } from '@/services';
import { useFinanceStore } from '@/store/v2';
import { ClientsTable } from './components';


const financeStore = useFinanceStore();

const clients = ref(computed(() => financeStore.clientsList));
const stats = ref(computed(() => financeStore.clientsStats));
const error = ref(computed(() => financeStore.error));

onMounted(async () => {
    await clientService.getClientsList();
});

watch(error, (newValue) => {
    if (newValue) {
        //console.log('Error:', newValue);
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
                <li class="breadcrumb-item active">Clients</li>
            </ol>
        </nav>

        <div v-if="stats" class="row g-3">
            <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-4 col-xxl-4">
                <CardTwo title="Clients" :count="String(stats.total)" color="bg-label-primary" icon="ti ti-users-group"
                    card-color="card-border-shadow-primary" />
            </div>
            <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-4 col-xxl-4">
                <CardTwo title="Clients Actif" :count="String(stats.active)" color="bg-label-success"
                    icon="ti ti-users-group" card-color="card-border-shadow-success" />
            </div>
            <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-4 col-xxl-4">
                <CardTwo title="Clients Inactif" :count="String(stats.inactive)" color="bg-label-warning"
                    icon="ti ti-users-group" card-color="card-border-shadow-warning" />
            </div>
        </div>


        <div class="row g-3 mt-2">
            <div class="col-12 col-xl-12 col-md-12">
                <div class="card card-border-shadow-primary h-100">
                    <div class="card-header border-bottom d-flex justify-content-between align-items-center">
                        <div>
                            <h5 class="card-title fw-bold m-0 me-2">Clients</h5>
                            <small class="text-muted">Liste des clients</small>
                        </div>
                        <button class="btn btn-sm p-2 btn-primary">
                            <i class="ti ti-square-rounded-plus me-2"></i>
                            Nouveau client
                        </button>
                    </div>
                    <ClientsTable :clients="clients" v-if="clients" />
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

.f-13 {
    font-size: 13px;
}
</style>