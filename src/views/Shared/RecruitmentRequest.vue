<script setup>
import { CardTwo } from '@/ui';

</script>

<template>
    <div class="flex-grow-1 container-fluid mt-3">
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item">
                    <a href="javascript:void(0);">Dashboard</a>
                </li>
                <li class="breadcrumb-item active">Demande de recrutement</li>
            </ol>
        </nav>

        <div class="row g-3">
            <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-4 col-xxl-4">
                <CardTwo title="Total Demande" :count="12" color="bg-label-primary" icon="ti ti-bolt"
                    card-color="card-border-shadow-primary" />
            </div>
            <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-4 col-xxl-4">
                <CardTwo title="Demande validé" :count="12" color="bg-label-success" icon="ti ti-bolt"
                    card-color="card-border-shadow-success" />
            </div>
            <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-4 col-xxl-4">
                <CardTwo title="Demande en attente" :count="12" color="bg-label-warning" icon="ti ti-briefcase"
                    card-color="card-border-shadow-warning" />
            </div>
        </div>

        <div class="card mt-4">
            <div class="card-header d-flex flex-wrap justify-content-between align-items-center gap-3">
                <div class="card-title mb-0 me-1">
                    <h5 class="mb-1">Demande de recrutement</h5>
                    <p class="text-muted mb-0">Liste des demandes de recrutement</p>
                </div>
                <button class="btn btn-primary btn-sm">
                    <i class="ti ti-plus me-2"></i>
                    Nouveau Demande de recrutement
                </button>
            </div>
            <div class="card-body">
                <div class="row gy-4 mb-4">
                    <div class="col-sm-6 col-lg-4">
                        <div class="card p-2 h-100 shadow-none border">
                            <div class="card-body p-3 pt-2">
                                <div class="d-flex justify-content-between align-items-center mb-3">
                                    <span class="badge bg-label-primary">Web</span>
                                </div>
                                <a href="app-academy-course-details.html" class="h5">Basics of Angular</a>
                                <p class="mt-2">Introductory course for Angular and framework basics in web development.
                                </p>
                                <small class="d-flex align-items-center"><i
                                        class="ti ti-clock me-2 mt-n1"></i>12-01-2024</small>
                                <div class="d-flex flex-column flex-md-row gap-2 mt-3 text-nowrap align-items-center">
                                    <a class="app-academy-md-50 btn btn-label-primary d-flex align-items-center waves-effect"
                                        href="app-academy-course-details.html">
                                        <span class="me-2">Afficher</span><i
                                            class="ti ti-chevron-right scaleX-n1-rtl ti-sm"></i>
                                    </a>
                                    <span class="badge bg-warning ms-auto">
                                        En Attente
                                    </span>
                                </div>
                            </div>
                        </div>
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