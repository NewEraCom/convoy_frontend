<script setup>


</script>

<template>
    <div class="flex-grow-2 container-md mt-3 mb-5">

        <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item">
                    <router-link :to="{ name: 'DashboardPortal' }">Dashboard</router-link>
                </li>
                <li class="breadcrumb-item active">Article de bureau</li>
            </ol>
        </nav>

        <div class="card mt-3 border shadow-none">
            <div class="card-body m-0 p-0">
                <div class="row p-0 m-0 p-0">
                    <div class="col-12 border-bottom  item-clicable p-3">
                        <div class="d-flex align-items-center">
                            <div class="bg-primary align-items-center d-flex justify-content-center rounded-circle"
                                style="width: 45px;height: 45px;">
                                <i class="ti ti-bookmark-filled text-white"></i>
                            </div>
                            <div class="d-block align-items-center ms-3">
                                <h6 class="mb-2">Macbook Pro 2021 16 pouces</h6>
                                <small class="text-muted fw-medium">Affectation: 2021-09-01</small>
                            </div>
                            <i class="bg-secondary rounded-circle p-2 ti ti-chevron-right text-white ms-auto"></i>
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