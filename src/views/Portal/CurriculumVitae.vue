<script setup>
import { ref, onMounted } from 'vue';
import { UploadCvCanva } from './componenets';

const env = import.meta.env.VITE_UPLOADS_URL;

const cv = ref(null);
const user = ref(null);

onMounted(() => {
    user.value = JSON.parse(localStorage.getItem('user'));
    cv.value = env + 'uploads/cv/' + user.value.employee.cv;
});


</script>

<template>
    <div class="flex-grow-2 container-md mt-3 mb-5">

        <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item">
                    <router-link :to="{ name: 'DashboardPortal' }">Dashboard</router-link>
                </li>
                <li class="breadcrumb-item active">CV (Curriculum Vitae)</li>
            </ol>
        </nav>
        <div class="row">
            <div class="col-12 d-flex align-items-center" v-if="user">
                <h6 class="m-0">Votre Curriculum Vitae</h6>
                <button class="btn btn-outline-primary btn-sm ms-auto" type="button" data-bs-toggle="offcanvas"
                    data-bs-target="#uploadCv" aria-controls="offcanvasEnd" v-if="user.employee.cv != null">
                    <i class="ti ti-pencil me-2"></i>
                    Modifier
                </button>
            </div>
            <div class="col-12 mt-4" v-if="user && user.employee.cv">
                <iframe :src="cv" width="100%" height="1200vh" style="border: none;">
                </iframe>
            </div>
            <div class="col-12 mt-4 text-center" v-else>
                <div class="card shadow-none border">
                    <div class="card-body">
                        <img src="@/assets/img/No_Results.png" height="250px" alt="alert" class="me-2" />
                        <h6>Vous n'avez pas encore de CV</h6>
                        <p class="text-muted">
                            Please upload your CV to complete your profile
                        </p>
                        <button class="btn btn-outline-primary btn-sm ms-auto" type="button" data-bs-toggle="offcanvas"
                            data-bs-target="#uploadCv" aria-controls="offcanvasEnd">
                            <i class="ti ti-upload me-2"></i>
                            Ajouter un CV
                        </button>
                    </div>
                </div>
            </div>
            <UploadCvCanva />
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

.item-clicable:hover {
    cursor: pointer;
    background-color: #f5f5f5;

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
</style>