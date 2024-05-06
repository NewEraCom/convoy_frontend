<script setup>
import { ref, computed, onMounted } from 'vue';
import { helpers, formater } from '@/utils';
import { caisseService } from '@/services';
import { useProductionStore } from '@/store/v2';

const productionStore = useProductionStore();

const caisseSum = ref(computed(() => productionStore.caisseSum));
const caisseList = ref(computed(() => productionStore.caisseList));

onMounted(async () => {
    await caisseService.getCaisseByUser();
    await caisseService.getCaisseList();
});

</script>

<template>
    <div class="flex-grow-1 container-fluid mt-3">
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item">
                    <a href="javascript:void(0);">Dashboard</a>
                </li>
                <li class="breadcrumb-item active">Budget Caisse</li>
            </ol>
        </nav>

        <div class="row g-3 mt-2">
            <div class="col-12 col-xl-3 col-md-12">
                <div class="card card-border-shadow-primary">
                    <div class="card-body">
                        <div class="bg-label-primary rounded-3 text-center mb-3 pt-4">
                            <img class="img-fluid" src="@/assets/img/budget_caisse.png" alt="Card girl image"
                                width="140">
                        </div>
                        <h4 class="mb-2 pb-1">Budget de caisse</h4>
                        <p class="small">Vous avez jusqu'au cinquième jour avant la fin de chaque mois pour saisir votre
                            budget. Passé ce délai, le budget sera clôturé.</p>
                        <div class="row mb-3 g-3 mt-3">
                            <div class="col-12">
                                <div class="d-flex">
                                    <div class="avatar flex-shrink-0 me-2">
                                        <span class="avatar-initial rounded bg-label-primary"><i
                                                class="ti ti-coins ti-md"></i></span>
                                    </div>
                                    <div>
                                        <small class="mb-0 text-nowrap d-block">Votre budget demandé</small>
                                        <small class="fw-bold" v-if="caisseSum != null">{{ caisseSum }} MAD</small>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <a v-if="helpers.isLastFiveDaysOfTheMonth()" href="javascript:void(0);"
                            class="btn btn-primary w-100 waves-effect waves-light mt-3">
                            <span class="me-1">Nouveau budget</span>
                            <i class="ti ti-arrow-right"></i>
                        </a>
                        <div class="alert alert-danger" v-else>
                            Vous ne pourrez pas soumettre votre budget jusqu'à l'ouverture de la prochaine période de
                            soumission le mois suivant.
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-12 col-xl-9 col-md-12">
                <div class="card card-border-shadow-primary h-100">
                    <div class="card-header d-flex align-items-center justify-content-between">
                        <div>
                            <h5 class="card-title fw-bold m-0 me-2">Budget de caisse</h5>
                            <small class="text-muted">Details du budget de caisse</small>
                        </div>
                    </div>
                    <div class="card-body">
                        <ul class="list-unstyled mb-0">
                            <li v-for="item in caisseList" :key="item" class="d-flex mb-4 pb-1 align-items-center">
                                <div class="avatar flex-shrink-0 me-3">
                                    <span class="avatar-initial rounded bg-label-primary"><i
                                            class="ti ti-chevrons-right ti-md"></i></span>
                                </div>
                                <div class="row w-100 align-items-center">
                                    <div class="col-sm-8 col-lg-12 col-xxl-8 mb-1 mb-sm-0 mb-lg-1 mb-xxl-0">
                                        <p class="mb-0 fw-medium">
                                            {{ item.designation }}
                                        </p>
                                        <small class="mb-0">
                                            Montant : {{ formater.number(item.montant) }} MAD
                                        </small>
                                    </div>
                                    <div
                                        class="col-sm-4 col-lg-12 col-xxl-4 d-flex justify-content-sm-end justify-content-md-start justify-content-xxl-end">
                                        <div class="badge bg-label-secondary">
                                            {{ item.status }}
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
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