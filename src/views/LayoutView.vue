<script setup lang="ts">
import { RouterView } from 'vue-router';
import { TheSideBar, TheTopBar, LogoutModal } from '@/ui';
import { ref, onMounted } from 'vue';

const user = ref(null);
const env = import.meta.env.VITE_UPLOADS_URL;

onMounted(() => {
    user.value = JSON.parse(localStorage.getItem('user'));
});

</script>

<template>
    <div class="layout-wrapper layout-content-navbar">
        <div class="layout-container" v-if="user && user.type_account == 'erp'">
            <TheSideBar />
            <div class="layout-page">
                <div v-if="user" class="content-wrapper mt-4">
                    <TheTopBar :user="user" :env="env" />
                    <RouterView />
                </div>
            </div>
        </div>
        <div class="layout-container" v-else>

            <div class="portal-page p-0">
                <nav class="navbar navbar-sticky navbar-light bg-primary p-0" v-if="user">
                    <div class="d-flex container-md justify-content-between w-100">

                        <div class="d-flex  flex-grow-1">
                            <img src="@/assets/img/Logo_white_bg.png" alt="logo" class="logo" />
                        </div>
                        <ul class="navbar-nav flex-row align-items-center">
                            <li class="nav-item navbar-dropdown dropdown-user dropdown">
                                <a class="nav-link d-flex align-items-center dropdown-toggle hide-arrow"
                                    data-bs-toggle="dropdown">
                                    <div class="d-flex flex-column">
                                        <span class="me-2">{{ user.employee.first_name + ' ' +
            user.employee.last_name
                                            }}</span>
                                    </div>
                                    <div class="avatar avatar-online border rounded-circle">
                                        <img :src="env + user.profile_picture" class="rounded-circle"
                                            style="object-fit: fill; height: 100%" />
                                    </div>
                                </a>
                            </li>
                        </ul>
                    </div>
                </nav>
                <div v-if="user" class="content-wrapper mt-4">
                    <RouterView />
                </div>
            </div>
        </div>
        <LogoutModal />
    </div>

</template>

<style scoped>
.layout-wrapper {
    display: flex;
}

.layout-container {
    display: flex;
    flex-grow: 1;
}

.layout-page {
    margin-left: 250px;
    flex-grow: 1;
    padding: 20px;
    background: #f1f1f1;
}

.portal-page {
    margin-left: 0;
    flex-grow: 1;
    padding: 20px;
    background: #f1f1f1;

}


@media (max-width: 1458px) {
    .sidebar {
        display: none;
        /* Hide the sidebar */
    }

    .layout-page {
        margin-left: 75px;
    }
}

.sidebar {
    width: 250px;
    height: 100vh;
    position: fixed;
    background-color: #333;
    color: white;
    transition: width 0.3s;
    overflow: hidden;
}

.bg-primary {
    background-color: #2a3042 !important;
    color: white;
    height: 80px;
}

.logo {
    width: 150px;
    height: 40px;
    object-fit: contain !important;
}

.navbar-sticky {
    position: sticky;
    top: 0;
    z-index: 100;
}
</style>