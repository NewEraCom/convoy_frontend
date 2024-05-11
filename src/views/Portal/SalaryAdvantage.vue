<script setup>
import { ref, onMounted } from 'vue';
import { formater } from '@/utils';
const user = ref(null);

onMounted(() => {
    user.value = JSON.parse(localStorage.getItem('user'));
});
</script>

<template>
    <div class="flex-grow-2 container-md mt-3 mb-5">
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item">
                    <router-link :to="{ name: 'DashboardPortal' }">Dashboard</router-link>
                </li>
                <li class="breadcrumb-item active">Salaires et avantages</li>
            </ol>
        </nav>
        <div class="row" v-if="user">
            <div class="col-12">
                <div class="card border shadow-none">
                    <div class="card-body d-flex align-items-center">
                        <div class="hearder-border ms-auto me-auto d-flex flex-column justify-content-center">
                            <small>{{ formater.number(user.employee.salary) }} MAD</small>
                            <small>Salaire par mois</small>
                            <small class="mt-4">{{ user.employee.working_hours_per_week }} heures</small>
                            <small>par semaine</small>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-12 mt-4">
                <div class="card shadow-none border">
                    <div class="card-body">
                        <div class="row">
                            <div class="col-12">
                                <h6 class="text-primary">Temps de travail du jour</h6>
                                <span>{{ user.employee.working_hours ? user.employee.working_hours + ' heures' : 'N/A'
                                    }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-12 mt-4">
                <div class="card shadow-none border">
                    <div class="card-body">
                        <div class="row">
                            <div class="col-12">
                                <h6 class="text-primary">Solde congé</h6>
                                <span>{{ user.employee.solde_conge ? user.employee.solde_conge + ' Jours' : 'N/A'
                                    }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-12 mt-4">
                <div class="card shadow-none border">
                    <div class="card-body">
                        <div class="row">
                            <div class="col-12">
                                <h6 class="text-primary">Prime de transport</h6>
                                <span>{{ formater.number(user.employee.prime_transport) }} <small>MAD</small> </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-12 mt-4">
                <div class="card shadow-none border">
                    <div class="card-body">
                        <div class="row">
                            <div class="col-12">
                                <h6 class="text-primary">Bonus de performance</h6>
                                <span>{{ formater.number(user.employee.bonus) }} <small>MAD</small></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-12 mt-4">
                <div class="card shadow-none border">
                    <div class="card-body">
                        <div class="row">
                            <div class="col-12">
                                <h6 class="text-primary">CNSS éligible</h6>
                                <span>{{ user.employee.cnss ? 'Oui' : 'Non' }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<style>
.btn-link {
    color: rgb(166, 0, 0);
    text-decoration: none;
    cursor: pointer;
    border: none;
    font-weight: 700;

}

.hearder-border {
    border: 15px solid #2a3042;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.5rem;
    font-weight: 700;
    color: #121829;
    width: 200px;
    height: 200px;

}

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

.welcome-card {
    background-color: #2a3042 !important;
}

.off-canva-width {
    width: 550px !important;
}
</style>