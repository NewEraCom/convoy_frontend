<script setup>
import { ref, onMounted, computed } from 'vue';
import { formater, helpers } from '@/utils';
import { PersonalInfoCanva, AddressCanva, CoordonneesInfoCanva } from './componenets';
import { usePortalStore } from '@/store';
import { portalService } from '@/services';

const portalStore = usePortalStore();

const employee = ref(computed(() => portalStore.employee));

onMounted(async () => {
    await portalService.getCurrentEmployee();
});



</script>

<template>
    <div class="flex-grow-2 container-md mt-3 mb-5" v-if="employee">
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item">
                    <router-link :to="{ name: 'DashboardPortal' }">Dashboard</router-link>
                </li>
                <li class="breadcrumb-item active">Informations personnelles</li>
            </ol>
        </nav>
        <!--         <div style="height: 800px;">
            <whereby-embed style="height: 800px;"
                room="https://neweracom.whereby.com/a23cc19c-e9a0-45c3-9360-81ffe8a51986?roomKey=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtZWV0aW5nSWQiOiI4NjE4MjczNyIsInJvb21SZWZlcmVuY2UiOnsicm9vbU5hbWUiOiIvYTIzY2MxOWMtZTlhMC00NWMzLTkzNjAtODFmZmU4YTUxOTg2Iiwib3JnYW5pemF0aW9uSWQiOiIyMzM0MjkifSwiaXNzIjoiaHR0cHM6Ly9hY2NvdW50cy5zcnYud2hlcmVieS5jb20iLCJpYXQiOjE3MTU3MDkyMDMsInJvb21LZXlUeXBlIjoibWVldGluZ0hvc3QifQ.2Th5dlxLGlaWDspBEe8tRhmkm69SZ1UGLDtp1jysiPw" />
        </div> -->

        <div class="row gy-4 mb-4" v-if="employee">
            <div class="col-12 d-flex align-items-center">
                <h6 class="m-0">Informations personnelles</h6>
                <button class="btn btn-outline-primary btn-sm ms-auto" type="button" data-bs-toggle="offcanvas"
                    data-bs-target="#personalInfo" aria-controls="offcanvasEnd">
                    <i class="ti ti-pencil me-2"></i>
                    Modifier
                </button>
                <PersonalInfoCanva :employee="employee" />
            </div>
            <div class="col-12 mt-4">
                <div class="card shadow-none border">
                    <div class="card-body">
                        <div class="row">
                            <div class="col-12 d-flex justify-content-between align-items-center">
                                <div>
                                    <h6 class="text-primary">Compte bancaire</h6>
                                    <span>RIB : {{ formater.formatRIB(String(employee.rib)) }}</span>
                                </div>
                                <div>
                                    <img :src="helpers.bankName(employee.bank_name)[0]" height="92px" width="100px"
                                        style="object-fit: contain" />
                                </div>
                            </div>
                        </div>
                        <hr>
                        <div class="row">
                            <div class="col-12 d-flex justify-content-between align-items-center">
                                <div>
                                    <h6 class="text-primary">Matricule CNSS</h6>
                                    <span>{{ employee.cnss ?? 'N/A' }}</span>
                                </div>
                                <div>
                                    <img src="@/assets/img/brands/logo_cnss.jpeg" height="92px" width="90px"
                                        style="object-fit: contain" />
                                </div>
                            </div>
                        </div>
                        <hr>
                        <div class=" row">
                            <div class="col-12">
                                <h6 class="text-primary">Etat Civil</h6>
                                <span>{{ employee.situation_familiale ?? 'N/A' }}</span>
                            </div>
                        </div>
                        <hr>
                        <div class="row">
                            <div class="col-12">
                                <h6 class="text-primary">Numéro CIN</h6>
                                <span>{{ employee.cin ?? 'N/A' }}</span>
                            </div>
                        </div>
                        <hr>
                        <div class="row">
                            <div class="col-12">
                                <h6 class="text-primary">Date de naissance</h6>
                                <span>{{ employee.date_of_birth ?? 'N/A' }}</span>
                            </div>
                        </div>
                        <hr>
                        <div class="row">
                            <div class="col-12">
                                <h6 class="text-primary">Genre</h6>
                                <span>{{ employee.sexe ? formater.firstUpperCase(employee.sexe) : 'N/A'
                                    }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-12 d-flex align-items-center">
                <h6 class="m-0">Adresse</h6>
                <button class="btn btn-outline-primary btn-sm ms-auto" data-bs-toggle="offcanvas"
                    data-bs-target="#addressInfo" aria-controls="offcanvasEnd">
                    <i class="ti ti-pencil me-2"></i>
                    Modifier
                </button>
                <AddressCanva :employee="employee" />
            </div>
            <div class="col-12 mt-4">
                <div class="card shadow-none border">
                    <div class="card-body">
                        <div class="row">
                            <div class="col-12">
                                <h6 class="text-primary">Adresse du domicile</h6>
                                <p class="mb-2">{{ employee.address ?? 'N/A' }}</p>
                                <p class="mb-0">{{ employee.city }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-12 d-flex align-items-center">
                <h6 class="m-0">Coordonnées</h6>
                <button class="btn btn-outline-primary btn-sm ms-auto" data-bs-toggle="offcanvas"
                    data-bs-target="#coordonneesInfo" aria-controls="offcanvasEnd">
                    <i class="ti ti-pencil me-2"></i>
                    Modifier
                </button>
                <CoordonneesInfoCanva :employee="employee" :work-email="email" />
            </div>
            <div class="col-12 mt-4">
                <div class="card shadow-none border">
                    <div class="card-body">

                        <div class="row">
                            <div class="col-12">
                                <h6 class="text-primary">Adresse email de travail</h6>
                                <span>{{ employee.user.email ?? 'N/A' }}</span>
                            </div>
                        </div>
                        <hr>
                        <div class="row">
                            <div class="col-12">
                                <h6 class="text-primary">Adresse email personnel</h6>
                                <span>{{ employee.email ?? 'N/A' }}</span>
                            </div>
                        </div>
                        <hr>

                        <div class="row">
                            <div class="col-12">
                                <h6 class="text-primary">Téléphone de travail</h6>
                                <span>{{ formater.phoneNumber(employee.flotte) ?? 'N/A' }}</span>
                            </div>
                        </div>
                        <hr>
                        <div class="row">
                            <div class="col-12">
                                <h6 class="text-primary">Téléphone personnel</h6>
                                <span>{{ formater.phoneNumber(employee.phone_no) ?? 'N/A' }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-12 d-flex align-items-center">
                <h6 class="m-0">Documents</h6>
                <button class="btn btn-outline-primary btn-sm ms-auto">
                    <i class="ti ti-pencil me-2"></i>
                    Modifier
                </button>
            </div>
            <div class="col-12 mt-4">
                <div class="card shadow-none border">
                    <div class="card-body">

                        <div class="row">
                            <div class="col-12">
                                <h6 class="text-primary">Copie de la CIN recto</h6>
                                <small :class="employee.copie_cin ? '' : 'text-muted'">{{ employee.copie_cin
        ?? 'Copie de la CIN recto non disponible' }}</small>
                            </div>
                        </div>
                        <hr>
                        <div class="row">
                            <div class="col-12">
                                <h6 class="text-primary">Copie de la CIN verso</h6>
                                <small :class="employee.copie_cin_verso ? '' : 'text-muted'">{{
        employee.copie_cin_verso ?? 'Copie de la CIN verso non disponible'
    }}</small>
                            </div>
                        </div>
                        <hr>
                        <div class="row">
                            <div class="col-12">
                                <h6 class="text-primary">Copie de CNSS</h6>
                                <small :class="employee.copie_cnss ? '' : 'text-muted'">{{ employee.copie_cnss
        ?? 'Copie de CNSS non disponible' }}</small>
                            </div>
                        </div>
                        <hr>
                        <div class="row">
                            <div class="col-12">
                                <h6 class="text-primary">Copie de RIB</h6>
                                <small :class="employee.copie_rib ? '' : 'text-muted'">{{ employee.copie_rib
        ?? 'Copie de RIB non disponible' }}</small>
                            </div>
                        </div>
                        <hr>
                        <div class="row">
                            <div class="col-12">
                                <h6 class="text-primary">Copie apptitude médicale</h6>
                                <small :class="employee.copie_appt ? '' : 'text-muted'">{{ employee.copie_appt
                                    ?? 'Copie apptitude médicale non disponible'
                                    }}</small>
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