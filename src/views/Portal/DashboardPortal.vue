<script setup>
import { ref, onMounted } from 'vue';
import { RequestAbsentCanva, RequestRemotlyCanva, RequestLeaveCanva } from './componenets';

const user = ref(null);


onMounted(() => {
    user.value = JSON.parse(localStorage.getItem('user'));
});
</script>

<template>
    <div class="flex-grow-2 container-md mt-3">
        <div class="row gy-4 mb-3" v-if="user">
            <div class="col-lg-12">
                <div class="card  border-none welcome-card p-0">
                    <div
                        class="card-body border-none d-flex justify-content-between border rounded align-items-center p-3 ps-5 pe-5 p-0">
                        <div
                            class="mb-0 w-100 app-academy-sm-60 d-flex flex-column justify-content-between text-center text-sm-start">
                            <div class="card-title">
                                <h4 class="text-white fw-bold mb-2">Bonjour, {{ user.employee.first_name }}</h4>
                                <p class="text-white w-sm-80 app-academy-xl-100 mb-1">
                                    {{ user.employee.poste }} chez NewEraCom
                                </p>
                                <small class="text-muted ">Date d'embauche: {{ user.employee.date_embauche }}</small>
                            </div>
                        </div>
                        <div class="w-100 app-academy-sm-40 d-flex justify-content-center justify-content-sm-end h-px-150 me-4 mb-sm-0"
                            style="font-size: 75px !important;">
                            👋
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="row mt-3">
            <div class="d-grid gap-3 col-lg-12 mx-auto">
                <router-link :to="{ name: 'PersonalInfo' }" class="btn btn-outline-primary btn-lg shadow-none"
                    type="button">
                    <div class="d-flex justify-content-between align-items-center me-auto">
                        <i class="ti ti-user me-3"></i>
                        <small>
                            <strong>informations personnelles</strong>
                        </small>
                    </div>
                    <div class="text-primary">
                        <i class="ti ti-chevron-right m-auto"></i>
                    </div>
                </router-link>
                <router-link :to="{ name: 'CurriculumVitae' }" class="btn btn-outline-primary btn-lg shadow-none"
                    type="button">
                    <div class="d-flex justify-content-between align-items-center me-auto">
                        <i class="ti ti-clipboard-text me-3"></i>
                        <small>
                            <strong>CV (Curriculum Vitae)</strong>
                        </small>
                    </div>
                    <div class="text-primary">
                        <i class="ti ti-chevron-right m-auto"></i>
                    </div>
                </router-link>
                <router-link :to="{ name: 'DocumentsPortal' }" class="btn btn-outline-primary btn-lg shadow-none"
                    type="button">
                    <div class="d-flex justify-content-between align-items-center me-auto">
                        <i class="ti ti-files me-3"></i>
                        <small>
                            <strong>Documents</strong>
                        </small>
                    </div>
                    <div class="text-primary">
                        <i class="ti ti-chevron-right m-auto"></i>
                    </div>
                </router-link>
                <router-link :to="{ name: 'ContractsPortal' }" class="btn btn-outline-primary btn-lg shadow-none"
                    type="button">
                    <div class="d-flex justify-content-between align-items-center me-auto">
                        <i class="ti ti-briefcase me-3"></i>
                        <small>
                            <strong>Contracts</strong>
                        </small>
                    </div>
                    <div class="text-primary">
                        <i class="ti ti-chevron-right m-auto"></i>
                    </div>
                </router-link>

                <router-link :to="{ name: 'SalaryAdvantage' }" class="btn btn-outline-primary btn-lg shadow-none"
                    type="button">
                    <div class="d-flex justify-content-between align-items-center me-auto">
                        <i class="ti ti-cash me-3"></i>
                        <small>
                            <strong>Salaire et avantages sociaux</strong>
                        </small>
                    </div>
                    <div class="text-primary">
                        <i class="ti ti-chevron-right m-auto"></i>
                    </div>
                </router-link>
                <router-link :to="{ name: 'WhoIsWho' }" class="btn btn-outline-primary btn-lg shadow-none"
                    type="button">
                    <div class="d-flex justify-content-between align-items-center me-auto">
                        <i class="ti ti-users-group me-3"></i>
                        <small>
                            <strong>Qui est qui</strong>
                        </small>
                    </div>
                    <div class="text-primary">
                        <i class="ti ti-chevron-right m-auto"></i>
                    </div>
                </router-link>

                <router-link :to="{ name: 'ItemsPortal' }" class="btn btn-outline-primary btn-lg shadow-none"
                    type="button">
                    <div class="d-flex justify-content-between align-items-center me-auto">
                        <i class="ti ti-components me-3"></i>
                        <small>
                            <strong>Articles de l'entreprise</strong>
                        </small>
                    </div>
                    <div class="text-primary">
                        <i class="ti ti-chevron-right m-auto"></i>
                    </div>
                </router-link>

                <router-link :to="{ name: 'LeavesListsPortal' }" class="btn btn-outline-primary btn-lg shadow-none">
                    <div class="d-flex justify-content-between align-items-center me-auto">
                        <i class="ti ti-plane-departure me-3"></i>
                        <small>
                            <strong>Liste des congés</strong>
                        </small>
                    </div>
                    <div class="text-primary">
                        <i class="ti ti-chevron-right m-auto"></i>
                    </div>
                </router-link>

                <button class="btn btn-outline-primary btn-lg shadow-none" type="button" data-bs-toggle="offcanvas"
                    data-bs-target="#requestLeave" aria-controls="requestLeave">
                    <div class="d-flex justify-content-between align-items-center me-auto">
                        <i class="ti ti-plane-inflight me-3"></i>
                        <small>
                            <strong>Demande de congé</strong>
                        </small>
                    </div>
                    <div class="text-primary">
                        <i class="ti ti-chevron-right m-auto"></i>
                    </div>
                </button>
                <button class="btn btn-outline-primary btn-lg shadow-none" type="button" data-bs-toggle="offcanvas"
                    data-bs-target="#requestAbsent" aria-controls="requestAbsent">
                    <div class="d-flex justify-content-between align-items-center me-auto">
                        <i class="ti ti-calendar-plus me-3"></i>
                        <small>
                            <strong>Demande une absence</strong>
                        </small>
                    </div>
                    <div class="text-primary">
                        <i class="ti ti-chevron-right m-auto"></i>
                    </div>
                </button>

                <button class="btn btn-outline-primary btn-lg shadow-none" type="button" data-bs-toggle="offcanvas"
                    data-bs-target="#requestRemotly" aria-controls="requestRemotly">
                    <div class="d-flex justify-content-between align-items-center me-auto">
                        <i class="ti ti-home-cog me-3"></i>
                        <small>
                            <strong>Demande de télétravail</strong>
                        </small>
                    </div>
                    <div class="text-primary">
                        <i class="ti ti-chevron-right m-auto"></i>
                    </div>
                </button>

                <div class="ms-auto me-auto">
                    <small class="text-muted mt-3 d-flex align-items-center">
                        Powered by&nbsp;<strong>NewEraCom</strong>&nbsp;&nbsp;
                        <span>&nbsp;- </span>
                        <button class="btn-link" data-bs-toggle="modal" data-bs-target="#logout-modal">Se
                            déconnecter</button>
                    </small>
                </div>
            </div>
        </div>
        <RequestAbsentCanva />
        <RequestRemotlyCanva />
        <RequestLeaveCanva />
    </div>
</template>

<style>
.welcome-card {
    background-color: #2a3042 !important;
    height: 150px !important;
}

.btn-link {
    color: rgb(61, 37, 157) !important;
    text-decoration: none;
    cursor: pointer;
    border: none;
    font-weight: 700;
}

.container-md {
    padding-right: 0rem;
    padding-left: 0rem;
    width: 100% !important;
}

.f-18 {
    font-size: 18px;
}

.bg-transparent {
    background-color: transparent !important;
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