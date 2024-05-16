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
                <li class="breadcrumb-item active">Contrats</li>
            </ol>
        </nav>

        <div class="row mt-3">
            <div class="col-12 text-center" v-if="user && user.employee.contrat == null">
                <div class="card shadow-none border">
                    <div class="card-body">
                        <img src="@/assets/img/no_pre_project.png" height="350px" alt="">
                        <p class="mt-4">Rien ici pour l'instant !</p>
                        <p class="text-muted fw-normal">Quand vous obtenez un nouveau contrat, vous le trouverez ici.
                        </p>
                    </div>
                </div>
            </div>
            <div class="col-12" v-else>
                <iframe :src="contrat" width="100%" height="1200vh" style="border: none;">
                </iframe>
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