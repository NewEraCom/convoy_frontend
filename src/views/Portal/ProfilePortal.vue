<script setup>


</script>

<template>
    <div class="flex-grow-2 container-md mt-3 mb-5">

        <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item">
                    <router-link :to="{ name: 'DashboardPortal' }">Dashboard</router-link>
                </li>
                <router-link :to="{ name: 'WhoIsWho' }" class="breadcrumb-item">Qui est qui</router-link>
                <li class="breadcrumb-item active">Ayoub Chahid</li>
            </ol>
        </nav>

        <div class="card border shadow-none">
            <div class="card-body text-center">
                <img src="https://img.freepik.com/psd-gratuit/illustration-3d-avatar-profil-humain_23-2150671142.jpg?size=626&ext=jpg"
                    class="rounded-circle" style="object-fit: fill; height: 145px" />
                <h4 class="mt-4 mb-1">Ayoub Chahid</h4>
                <p class="text-muted">Developpeur Fullstack</p>
                <hr>
                <small class="mb-1 d-block">Département : Support</small>
                <small class="mt-0">Responsable : Fatimzehra Smaili </small>
            </div>
        </div>
        <h6 class="mt-4 mb-4">Contact information</h6>
        <div class="col-12 mt-4">
            <div class="card shadow-none border">
                <div class="card-body">
                    <div class="row">
                        <div class="col-12">
                            <h6 class="text-primary">Adresse email</h6>
                            <p class="mb-2">a.chahid@neweracom.ma</p>
                        </div>
                    </div>
                    <hr>
                    <div class="row">
                        <div class="col-12">
                            <h6 class="text-primary">Téléphone</h6>
                            <p class="mb-2">a.chahid@neweracom.ma</p>
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