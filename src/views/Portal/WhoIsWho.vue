<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { employeeService } from '@/services';
import { useHrStore } from '@/store';

const hrStore = useHrStore();

const employees = ref(computed(() => hrStore.employees));
const env = ref(null);

const searchQuery = ref('');
const currentPage = ref(1);
const pageSize = ref(10);

const filteredEmployees = computed(() => {
    let em = [];
    if (employees.value) {
        em = employees.value.filter((item) =>
            item.first_name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
            item.last_name.toLowerCase().includes(searchQuery.value.toLowerCase())
        );
    }
    return em;
});

const pageCount = computed(() => {
    return Math.ceil(filteredEmployees.value.length / pageSize.value);
});

const paginatedItems = computed(() => {
    const start = (currentPage.value - 1) * pageSize.value;
    const end = start + pageSize.value;
    return filteredEmployees.value.slice(start, end);
});

const pages = computed(() => {
    let pages = [];
    for (let i = 1; i <= pageCount.value; i++) {
        pages.push(i);
    }
    return pages;
});

function nextPage() {
    if (currentPage.value < pageCount.value) {
        currentPage.value++;
    }
}

function prevPage() {
    if (currentPage.value > 1) {
        currentPage.value--;
    }
}

function changePage(page) {
    currentPage.value = page;
}

onMounted(async () => {
    employees.value = await employeeService.getEmployees();
    env.value = import.meta.env.VITE_UPLOADS_URL;
});

</script>

<template>
    <div class="flex-grow-2 container-md mt-3 mb-5">

        <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item">
                    <router-link :to="{ name: 'DashboardPortal' }">Dashboard</router-link>
                </li>
                <li class="breadcrumb-item active">Qui est qui</li>
            </ol>
        </nav>

        <div class="row">
            <div class="col-12">
                <div class="input-group input-group-merge">
                    <span class="input-group-text cursor-pointer"><i class="ti ti-search"></i></span>
                    <input v-model="searchQuery" type="text" class="form-control form-control-lg"
                        placeholder="Rechercher une personne" />
                </div>
            </div>
        </div>

        <div class="card mt-3 border shadow-none">
            <div class="card-body m-0 p-0">
                <div class="row p-0 m-0">
                    <div class="col-12 border-bottom item-clicable p-3" v-for="item in paginatedItems" :key="item.id">
                        <router-link :to="{ name: 'ProfilePortal' }" class="d-flex align-items-center">
                            <img :src="env + 'uploads/pictures/' + item.user.profile_picture" alt="profile"
                                class="rounded-circle p-1 border" style="height: 55px; object-fit: contain;" />
                            <div class="ms-3">
                                <h6 class="mb-0">{{ item.first_name + ' ' + item.last_name }}</h6>
                                <small class="text-muted">{{ item.poste }}</small>
                            </div>
                            <i class="bg-secondary rounded-circle p-2 ti ti-chevron-right text-white ms-auto"></i>
                        </router-link>
                    </div>
                </div>
            </div>
        </div>

        <div class="pagination mt-3">
            <button class="btn btn-primary btn-sm me-2" @click="prevPage" :disabled="currentPage <= 1">
                <i class="ti ti-chevron-left"></i>
            </button>
            <button v-for="page in pages" :key="page" @click="changePage(page)" class="btn btn-primary btn-sm"
                :class="{ 'active-page': currentPage === page }">
                {{ page }}
            </button>

            <button class="btn btn-primary btn-sm ms-2" @click="nextPage" :disabled="currentPage >= pageCount">
                <i class="ti ti-chevron-right"></i>
            </button>
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

.welcome-card {
    background-color: #2a3042 !important;
}

.off-canva-width {
    width: 550px !important;
}
</style>