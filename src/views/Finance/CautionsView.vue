<script setup>

import { onMounted, ref, computed, watch } from 'vue';
import { cautionsService } from '@/services';
import { useFinanceStore } from '@/store/v2';
import { formater } from '@/utils';
import { CautionsTable } from './components';


const financeStore = useFinanceStore();

const cautions = ref(computed(() => financeStore.cautionsList));
const stats = ref(computed(() => financeStore.cautionsStats));
const error = ref(computed(() => financeStore.error));

onMounted(async () => {
    await cautionsService.getCautionsList();
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
                <li class="breadcrumb-item active">Cautions</li>
            </ol>
        </nav>
        <div v-if="stats" class="row g-3">
            <div class="col-xl-12 col-lg-12 col-12">
                <div class="card card-border-shadow-primary h-100">
                    <div class="card-body">
                        <div class="row gy-3">
                            <div class="col-md-3 col-6">
                                <div class="d-flex align-items-center">
                                    <div class="badge rounded-pill bg-label-primary me-3 p-2"><i
                                            class="ti ti-coins ti-sm"></i></div>
                                    <div class="card-info">
                                        <h5 class="mb-0 fw-bold">{{ formater.number(stats.caution_provisoir_not_recover)
                                            }} MAD</h5>
                                        <small>Caution provisoire demandée</small>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-3 col-6">
                                <div class="d-flex align-items-center">
                                    <div class="badge rounded-pill bg-label-info me-3 p-2"><i
                                            class="ti ti-coins ti-sm"></i></div>
                                    <div class="card-info">
                                        <h5 class="mb-0 fw-bold">{{ formater.number(stats.caution_provisoir_recover) }}
                                            MAD
                                        </h5>
                                        <small>Cautin provisoire non recupérée</small>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-3 col-6">
                                <div class="d-flex align-items-center">
                                    <div class="badge rounded-pill bg-label-danger me-3 p-2"><i
                                            class="ti ti-coins ti-sm"></i></div>
                                    <div class="card-info">
                                        <h5 class="mb-0 fw-bold">{{
            formater.number(stats.caution_definitive_not_recover) }}
                                            MAD
                                        </h5>
                                        <small>Caution définitive demandée</small>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-3 col-6">
                                <div class="d-flex align-items-center">
                                    <div class="badge rounded-pill bg-label-success me-3 p-2"><i
                                            class="ti ti-coins ti-sm"></i></div>
                                    <div class="card-info">
                                        <h5 class="mb-0 fw-bold">{{ formater.number(stats.caution_definitive_recover) }}
                                            MAD
                                        </h5>
                                        <small>Cautin définitive non recupérée</small>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="row g-3 mt-2">
            <div class="col-12 col-xl-12 col-md-12">
                <div class="card card-border-shadow-primary h-100">
                    <div class="card-header border-bottom d-flex justify-content-between align-items-center">
                        <div>
                            <h5 class="card-title fw-bold m-0 me-2">Caution</h5>
                            <small class="text-muted">Liste des cautions</small>
                        </div>
                    </div>
                    <CautionsTable :cautions="cautions" v-if="cautions" />
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