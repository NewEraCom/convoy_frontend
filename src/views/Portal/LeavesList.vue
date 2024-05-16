<script setup>
import { ref, onMounted } from 'vue';

const env = import.meta.env.VITE_UPLOADS_URL;

const contrat = ref(null);
const user = ref(null);

onMounted(() => {
    user.value = JSON.parse(localStorage.getItem('user'));
    contrat.value = env + 'uploads/contrats/' + user.value.employee.contrat;
});

</script>

<template>
    <div class="flex-grow-2 container-md mt-3 mb-5">

        <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item">
                    <router-link :to="{ name: 'DashboardPortal' }">Dashboard</router-link>
                </li>
                <li class="breadcrumb-item active">Liste des congés</li>
            </ol>
        </nav>

        <div class="row mt-3">
            <div class="card p-0">
                <div class="card-body">
                    <div class="col-12">
                        <div class="table-responsive text-nowrap">
                            <table class="table">
                                <thead class="border-bottom table-light">
                                    <tr>
                                        <th class="fw-bold">Date de demande</th>
                                        <th class="fw-bold text-center">Debut</th>
                                        <th class="fw-bold text-center">Fin</th>
                                        <th class="fw-bold text-center">Durée</th>
                                        <th class="fw-bold text-center">Type</th>
                                        <th class="fw-bold text-center">Statut</th>
                                    </tr>
                                </thead>
                                <tbody v-if="user && user.employee.leaves.length > 0">
                                    <tr v-for="item in user.employee.leaves" :key="item">
                                        <td> <small>2020-11-02 </small></td>
                                        <td class="text-center"> <small> 2020-11-02</small> </td>
                                        <td class="text-center"> <small> 2020-11-02</small> </td>
                                        <td class="text-center"> <small> 2 Jours</small> </td>
                                        <td class="text-center"> <small> Congé</small> </td>
                                        <td class="text-center">
                                            <span class="badge bg-success bg-sm">
                                                Validé </span>
                                        </td>
                                    </tr>
                                </tbody>
                                <tbody v-else>
                                    <tr>
                                        <td colspan="6" class="text-center">
                                            <small class="text-muted">Rien ici pour l'instant !</small>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
.container-md {
    padding-right: 0rem;
    padding-left: 0rem;
    width: 100% !important;
}

@media (max-width: 768px) {
    .container-md {
        padding-right: 0rem !important;
        padding-left: 0rem !important;
    }
}

@media (max-width: 992px) and (min-width: 768px) {
    .container-md {
        padding-right: 1rem !important;
        padding-left: 1rem !important;
    }
}

@media (max-width: 1200px) and (min-width: 992px) {
    .container-md {
        padding-right: 14rem !important;
        padding-left: 14rem !important;
    }
}

@media (max-width: 1458px) and (min-width: 1200px) {
    .container-md {
        padding-right: 18rem !important;
        padding-left: 18rem !important;
    }
}

@media (min-width: 1458px) {
    .container-md {
        padding-right: 20rem !important;
        padding-left: 20rem !important;
    }
}
</style>