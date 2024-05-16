<script setup>
import { CardTwo, CardTwoSkeleton } from '@/ui';
import { onMounted, ref, computed, watch } from 'vue';
import { projectService, preProjectService, caisseService } from '@/services';
import { useProductionStore } from '@/store/v2';
import { helpers, formater } from '@/utils';


const productionStore = useProductionStore();

const projects = ref(computed(() => productionStore.projectsList));
const preProjects = ref(computed(() => productionStore.preProjectsList));
const caisse = ref(computed(() => productionStore.caisseSum));
const stats = ref(computed(() => productionStore.preProjectsStats));
const error = ref(computed(() => productionStore.error));

onMounted(async () => {
    await projectService.getProjectList();
    await preProjectService.getPreprojectList();
    await caisseService.getCaisseByUser();
});

watch(error, (newValue) => {
    if (newValue) {
        console.log('Error:', newValue);
        // redirect to error page
    }
});

</script>

<template>
    <div class="flex-grow-1 container-fluid mt-3">
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item active">
                    Dashboard
                </li>
            </ol>
        </nav>

        <div v-if="stats" class="row g-3">
            <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-3 col-xxl-3">
                <CardTwo title="Avant projet en attente" :count="String(stats.waiting)" color="bg-label-warning"
                    icon="ti ti-bolt" card-color="card-border-shadow-warning" />
            </div>
            <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-3 col-xxl-3">
                <CardTwo title="Avant projet en soumission" :count="String(stats.inProgress)" color="bg-label-info"
                    icon="ti ti-bolt" card-color="card-border-shadow-info" />
            </div>
            <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-3 col-xxl-3">
                <CardTwo title="Avant projet gagne" :count="String(stats.completed)" color="bg-label-success"
                    icon="ti ti-briefcase" card-color="card-border-shadow-success" />
            </div>
            <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-3 col-xxl-3">
                <CardTwo title="Avant projet perdu" :count="String(stats.lost)" color="bg-label-danger"
                    icon="ti ti-coins" card-color="card-border-shadow-danger" />
            </div>
        </div>
        <div v-else class="row g-3">
            <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-3 col-xxl-3">
                <CardTwoSkeleton />
            </div>
            <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-3 col-xxl-3">
                <CardTwoSkeleton />
            </div>
            <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-3 col-xxl-3">
                <CardTwoSkeleton />
            </div>
            <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-3 col-xxl-3">
                <CardTwoSkeleton />
            </div>
        </div>

        <div class="row g-3 mt-2">
            <div class="col-12 col-xl-5 col-md-12">
                <div class="card card-border-shadow-primary h-100">
                    <div class="card-body">
                        <div class="bg-label-primary rounded-3 text-center mb-3 pt-4">
                            <img class="img-fluid" src="@/assets/img/budget_caisse.png" alt="Card girl image"
                                width="140">
                        </div>
                        <h4 class="mb-2 pb-1">Budget de caisse</h4>
                        <p class="small">Vous avez jusqu'au cinquième jour avant la fin de chaque mois pour saisir votre
                            budget. Passé ce délai, le budget sera clôturé.</p>
                        <div class="row mb-3 g-3 mt-3">
                            <div class="col-12">
                                <div class="d-flex">
                                    <div class="avatar flex-shrink-0 me-2">
                                        <span class="avatar-initial rounded bg-label-primary"><i
                                                class="ti ti-coins ti-md"></i></span>
                                    </div>
                                    <div>
                                        <small class="mb-0 text-nowrap d-block">Votre budget demandé pour ce
                                            mois</small>
                                        <small class="fw-bold" v-if='caisse != null'>{{ formater.number(caisse) }}
                                            MAD</small>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <router-link to="/production/budget"
                            class="btn btn-primary w-100 waves-effect waves-light mt-3">
                            <span class="me-1">Voir le budget</span>
                            <i class="ti ti-arrow-right"></i>
                        </router-link>
                    </div>
                </div>
            </div>
            <div class="col-12 col-xl-7 col-md-12">
                <div class="card card-border-shadow-primary h-100">
                    <div class="card-header d-flex align-items-center justify-content-between">
                        <div>
                            <h5 class="card-title fw-bold m-0 me-2">Derniers avant-projets</h5>
                            <small class="text-muted">Les derniers avant-projets</small>
                        </div>
                    </div>
                    <div class="card-body" v-if="preProjects">
                        <ul class="list-unstyled mb-0" v-if="preProjects.length > 0">
                            <li class="d-flex mb-4 pb-1 align-items-center" v-for="item in preProjects.slice(0, 5)"
                                :key="item.id">
                                <div class="avatar flex-shrink-0 me-3">
                                    <span class="avatar-initial rounded bg-label-primary"><i
                                            class="ti ti-video ti-md"></i></span>
                                </div>
                                <div class="row w-100 align-items-center">
                                    <div class="col-sm-6 col-lg-7 col-xxl-6 mb-1 mb-sm-0 mb-lg-1 mb-xxl-0">
                                        <p class="mb-0 fw-bold text-primary">{{ item.n_offre }}</p>
                                        <small class="fw-bold text-muted">Maitre ouvrage : {{ item.maitre_ouvrage
                                            }}</small>
                                    </div>
                                    <div
                                        class="col-sm-6 col-lg-5 col-xxl-6 d-flex justify-content-sm-end justify-content-md-end justify-content-xxl-end">
                                        <small class="fw-bold" :class="helpers.returnBadge(String(item.status))[0]">{{
            helpers.returnBadge(String(item.status))[1] }}
                                        </small>
                                    </div>
                                </div>
                            </li>
                        </ul>
                        <div class="text-center" v-else>
                            <img src="@/assets/img/no_pre_project.png" alt="No data" class="img-fluid mb-3" width="240">
                            <p class="text-center text-muted">Aucun avant-projet trouvé !</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="row g-3 mt-2">
            <div class="col-12 col-xl-12 col-md-12">
                <div class="card card-border-shadow-primary h-100">
                    <div class="card-header">
                        <h5 class="card-title fw-bold m-0 me-2">Projets</h5>
                        <small class="text-muted">Les derniers projets</small>
                    </div>
                    <div class="table-responsive" v-if="projects">
                        <table class="table table-borderless border-top">
                            <thead class="border-bottom table-light">
                                <tr>
                                    <th class="fw-bold">Projet</th>
                                    <th class="fw-bold text-center">Client</th>
                                    <th class="fw-bold text-center">Chef de projet </th>
                                    <th class="fw-bold text-center">Superviseur</th>
                                    <th class="fw-bold text-center">Status</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody v-if="projects.length > 0">
                                <tr v-for="item in projects.slice(0,5)" :key="item.id">
                                    <td class="text-primary text-start">
                                        <router-link to="">
                                            <h6 class="mb-1 fw-bold">{{ item.code }}</h6>
                                        </router-link>
                                        <small class="fw-bold text-muted">
                                            Maitre ouvrage :
                                            {{
            item.pre_project.maitre_ouvrage
        }}
                                        </small>
                                    </td>
                                    <td class="text-center fw-bold">
                                        <small>
                                            {{ item.client.raison_social }}
                                        </small>
                                    </td>
                                    <td class="text-center fw-bold">
                                        <small>
                                            {{ item.pre_project.project_manager.employee.first_name }}
                                            {{ item.pre_project.project_manager.employee.last_name }}
                                        </small>
                                    </td>
                                    <td class="text-center fw-bold">
                                        <small>
                                            {{ item.pre_project.project_manager.employee.first_name }}
                                            {{ item.pre_project.project_manager.employee.last_name }}
                                        </small>
                                    </td>
                                    <td class="text-center">
                                        <small class="fw-bold" :class="helpers.returnBadge(String(item.status))[0]">{{
                                            helpers.returnBadge(String(item.status))[1] }}
                                        </small>
                                    </td>
                                    <td>
                                        <div class="d-flex justify-content-center">
                                            <button class="btn btn-sm p-2 btn-primary ms-2">
                                                <i class="ti ti-eye"></i>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                            <tbody v-else>
                                <tr class="border-bottom">
                                    <td colspan="6">
                                        <p class="text-center text-muted mb-0">Aucun projet trouvé !</p>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>