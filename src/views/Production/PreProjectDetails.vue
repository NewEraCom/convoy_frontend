<script setup>
import { ref, computed, onMounted } from 'vue';
import { useProductionStore } from '@/store';
import { preProjectService } from '@/services';
import { formater, helpers } from '@/utils';

const props = defineProps({
    id: {
        type: String,
        default: '0'
    }
});

const productionStore = useProductionStore();


const selectedPreProject = ref(computed(() => productionStore.selectedPreProject));

onMounted(async () => {
    await preProjectService.getPreProjectById(props.id);
});

</script>

<template>
    <div class="flex-grow-1 container-fluid mt-3">
        <div class="d-flex align-items-center justify-content-between mb-3">
            <nav aria-label="breadcrumb mb-0 pb-0">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item">
                        <a href="javascript:void(0);">Dashboard</a>
                    </li>
                    <li class="breadcrumb-item">Avant Projets</li>
                    <li class="breadcrumb-item active" aria-current="page">Détails</li>
                </ol>
            </nav>
            <div v-if="selectedPreProject && selectedPreProject.status == 'En soumission'" class="ms-auto">
                <button class="btn btn-warning" data-bs-target="#cancel-submission" data-bs-toggle="modal">
                    <i class="ti ti-arrow-back-up-double me-2" /> Annuler la soumission
                </button>
                <button class="btn btn-danger ms-2" data-bs-target="#close" data-bs-toggle="modal">
                    <i class="ti ti-square-rounded-x-filled me-2" /> Projet perdu
                </button>
                <button class="btn btn-success ms-2" data-bs-target="#cloture" data-bs-toggle="modal">
                    <i class="ti ti-square-rounded-check-filled me-2" /> Projet gagné
                </button>
            </div>
            <div class="ms-auto">
                <button class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#refuser-project">
                    <i class="ti ti-square-rounded-x-filled me-2" /> Non Valider
                </button>
                <button class="btn btn-success ms-2" data-bs-toggle="modal" data-bs-target="#validate-project">
                    <i class="ti ti-square-rounded-check-filled me-2" /> Valider
                </button>
            </div>
        </div>
        <div v-if="selectedPreProject && selectedPreProject.cps_file == null"
            class="alert alert-warning border border-warning d-flex align-items-center" role="alert">
            Veuillez télécharger le fichier cps pour ce projet avant. Pour le télécharger, &nbsp;
            <button class="btn btn-link fw-bold" data-bs-target="#import-assets" data-bs-toggle="modal">
                cliquez ici <i class="ms-1 ti ti-link" />
            </button>
        </div>
        <div v-if="selectedPreProject && selectedPreProject.type_project == 'special' && selectedPreProject.lots.length == 0"
            class="alert alert-danger border border-danger d-flex align-items-center" role="alert">
            Merci de compléter cet avant projet, vous devez compléter le nombre de lots et les cautions,
            &nbsp;
            <a class="fw-bold" data-bs-target="#add-lots" data-bs-toggle="modal">
                cliquez ici <i class="ms-1 ti ti-link" />
            </a>
        </div>
        <div v-if="selectedPreProject" class="row">
            <div class="col-12">
                <div class="card rounded mb-4">
                    <div class="user-profile-header d-flex flex-column flex-sm-row text-sm-start text-center mb-4">
                        <div class="flex-shrink-0 mt-4 mx-sm-0 mx-auto">
                            <img src="/src/assets/img/Logo_white_bg.png" alt="user image" style="object-fit: contain"
                                class="d-block client-logo ms-0 ms-sm-4 rounded user-profile-img bg-primary" />
                        </div>
                        <div class="flex-grow-1 mt-3 mt-sm-5">
                            <div
                                class="d-flex align-items-md-end align-items-sm-start align-items-center justify-content-md-between justify-content-start mx-4 flex-md-row flex-column gap-4">
                                <div class="user-profile-info">
                                    <h4 class="fw-bold">
                                        N° AO : {{ selectedPreProject.n_offre }}
                                        <i v-if="selectedPreProject.type_project != 'simple'"
                                            class="ti ti-bookmarks-filled text-danger" />
                                    </h4>
                                    <ul
                                        class="list-inline mb-0 d-flex align-items-center flex-wrap justify-content-sm-start justify-content-center gap-2">
                                        <li class="list-inline-item d-flex gap-1">
                                            Créer le :
                                            {{ helpers.formattedDate(selectedPreProject.created_at) }}
                                        </li>
                                        <li v-if="selectedPreProject.project_manager != null"
                                            class="list-inline-item d-flex gap-1">
                                            <span class="ms-2 me-4">|</span>
                                            Chef de projet :
                                            {{
                selectedPreProject.project_manager.employee.first_name +
                ' ' +
                selectedPreProject.project_manager.employee.last_name
            }}
                                        </li>
                                        <li v-if="selectedPreProject.project == null"
                                            class="list-inline-item d-flex gap-1">
                                            <span class="badge fw-bold"
                                                :class="helpers.returnBadge(selectedPreProject.status)[0]">
                                                {{ helpers.returnBadge(selectedPreProject.status)[1] }}
                                            </span>
                                        </li>
                                    </ul>
                                </div>
                                <button v-if="selectedPreProject.status == 'En attente'" class="ms-auto btn btn-primary"
                                    data-bs-target="#edit-preproject" data-bs-toggle="modal">
                                    <i class="ti ti-pencil me-2" />Modifier
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div v-if="selectedPreProject" class="row">
            <div class="col-xl-12 col-lg-12 col-md-12 order-0 order-md-1">
                <div class="nav-align-top nav-fill mb-4">
                    <ul class="nav nav-pills mb-3" role="tablist">
                        <li class="nav-item" role="presentation">
                            <button type="button" class="nav-link active" role="tab" data-bs-toggle="tab"
                                data-bs-target="#fiche-projet" aria-controls="fiche-projet" aria-selected="true">
                                Fiche de projet
                            </button>
                        </li>
                        <li class="nav-item" role="presentation">
                            <button type="button" class="nav-link" role="tab" data-bs-toggle="tab"
                                data-bs-target="#devis" aria-controls="devis" aria-selected="false" tabindex="-1">
                                Devis
                            </button>
                        </li>
                        <li class="nav-item" role="presentation">
                            <button type="button" class="nav-link" role="tab" data-bs-toggle="tab"
                                data-bs-target="#bordereau" aria-controls="bordereau" aria-selected="false"
                                tabindex="-1">
                                Bordereau
                            </button>
                        </li>
                    </ul>
                    <div class="tab-content bg-none border-none shadow-none p-0">
                        <div id="fiche-projet" class="tab-pane fade active show" role="tabpanel">
                            <div class="row">
                                <div class="col-xl-4 col-lg-5 col-md-5 order-1 order-md-0">
                                    <div class="card card-border-shadow-primary rounded">
                                        <div class="card-body">
                                            <h5 class="d-block text-dark fw-bold mb-4">Historique</h5>
                                            <ul v-if="selectedPreProject.timeline.length > 0" class="timeline pt-3">
                                                <li v-for="(item, index) in selectedPreProject.timeline" :key="item.id"
                                                    class="timeline-item pb-4 timeline-item-primary border-left-dashed"
                                                    :class="{
                'border-transparent': index === selectedPreProject.timeline.length - 1
            }">
                                                    <span
                                                        class="timeline-indicator-advanced timeline-indicator-primary">
                                                        <i class="ti ti-circle-filled rounded-circle scaleX-n1-rtl" />
                                                    </span>
                                                    <div class="timeline-event">
                                                        <div class="timeline-header border-bottom mb-3">
                                                            <h6 class="mb-0 fw-bold">
                                                                {{ item.title }}
                                                            </h6>
                                                            <span class="text-dark fw-medium">{{
                helpers.formattedDate(item.created_at)
            }}</span>
                                                        </div>
                                                        <div v-if="item.description != null || item.description != '-'"
                                                            class="d-flex justify-content-between flex-wrap mb-2">
                                                            <div class="d-flex align-items-center">
                                                                {{ item.description }}
                                                            </div>
                                                        </div>
                                                        <div v-if="item.file_name_1"
                                                            class="d-flex align-items-center mt-3 border-top border-top-dashed pt-3">
                                                            <i class="ti ti-file-type-pdf font-18 me-2" />
                                                            <span class="mb-0">{{ item.file_name_1 }}</span>
                                                        </div>
                                                    </div>
                                                </li>
                                            </ul>
                                            <div v-else class="text-start">
                                                <h6 class="mt-3">Aucun historique disponible</h6>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-xl-8 col-lg-7 col-md-5">
                                    <div class="row">
                                        <div class="col-md-6 mb-4">
                                            <div class="card h-100 card-border-shadow-primary">
                                                <div class="card-body">
                                                    <div class="card-icon mb-3">
                                                        <div class="avatar">
                                                            <div class="avatar-initial rounded bg-label-primary">
                                                                <i class="ti ti-currency-dollar ti-md"></i>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="card-info">
                                                        <h4 class="card-title mb-3">Estimation du marche</h4>
                                                        <div class="d-flex align-items-baseline mb-1 gap-1">

                                                            <h4 v-if="selectedPreProject.type_project == 'simple'"
                                                                class="text-primary mb-0 fw-bold">
                                                                {{
                formater.number(selectedPreProject.montant_marche)
            }}
                                                            </h4>

                                                            <p class="mb-0 fw-bold text-muted">MAD</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-6 mb-4">
                                            <div class="card h-100 card-border-shadow-primary">
                                                <div class="card-body">
                                                    <div class="card-icon mb-3">
                                                        <div class="avatar">
                                                            <div class="avatar-initial rounded bg-label-primary">
                                                                <i class="ti ti-currency-dollar ti-md"></i>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="card-info">
                                                        <h4 class="card-title mb-3">Caution provisoire</h4>
                                                        <div class="d-flex align-items-baseline mb-1 gap-1">

                                                            <h4 v-if="selectedPreProject.type_project == 'simple'"
                                                                class="text-primary mb-0 fw-bold">
                                                                {{
                formater.number(selectedPreProject.montant_caution)
            }}
                                                            </h4>

                                                            <p class="mb-0 fw-bold text-muted">MAD</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-12 mb-4">
                                            <div class="card card-border-shadow-primary rounded">
                                                <div class="card-body">
                                                    <h5 class="d-block text-dark fw-bold mb-4">Informations</h5>
                                                    <div v-if="selectedPreProject.objet">
                                                        <label class="mb-1 text-dark fw-bold"> Objet : </label>
                                                        <p>{{ selectedPreProject.objet }}</p>
                                                    </div>
                                                    <div class="table-responsive text-nowrap">
                                                        <table class="table table-hover table-bordered">
                                                            <tbody>
                                                                <tr>
                                                                    <th class="fw-bold text-dark">Client :</th>
                                                                    <td>
                                                                        {{ selectedPreProject.maitre_ouvrage }}
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <th class="fw-bold text-dark">N° AO :</th>
                                                                    <td>
                                                                        {{ selectedPreProject.n_offre }}
                                                                    </td>
                                                                </tr>
                                                                <tr v-if="selectedPreProject.locaalite != null">
                                                                    <th class="fw-bold text-dark">Localite :</th>
                                                                    <td>
                                                                        {{ selectedPreProject.localite }}
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <th class="fw-bold text-dark">Date visite des lieux
                                                                        :</th>
                                                                    <td>
                                                                        {{
                formater.dateTime(selectedPreProject.date_visite)
            }}
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <th class="fw-bold text-dark">Date d'echantillion :
                                                                    </th>
                                                                    <td>
                                                                        {{
                    formater.dateTime(selectedPreProject.date_echantillion)
                                                                        }}
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <th class="fw-bold text-dark">Date de depot :</th>
                                                                    <td>
                                                                        {{
                                                                        formater.dateTime(selectedPreProject.date_depot)
                                                                        }}
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                    <div v-if="selectedPreProject.exigences_majeures" class="mt-4">
                                                        <label class="mb-1 text-dark fw-bold"> Exigences majeures :
                                                        </label>
                                                        <p v-html="selectedPreProject.exigences_majeures">
                                                        </p>
                                                    </div>
                                                    <div v-if="selectedPreProject.qualification_demande != 'null' &&
    selectedPreProject.qualification_demande != '-'
    " class="mt-4">
                                                        <label class="mb-1 text-dark fw-bold"> Qualification demandé :
                                                        </label>
                                                        <p>
                                                            {{ selectedPreProject.qualification_demande }}
                                                        </p>
                                                    </div>
                                                    <div v-if="selectedPreProject.description" class="mt-4">
                                                        <label class="mb-1 text-dark fw-bold"> Description : </label>
                                                        <p v-html="selectedPreProject.description">
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
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
.client-logo {
    width: 100px;
    height: 100px;
    padding: 10px;
}

.btn-link {
    border: none;
    background: none;
    box-shadow: none !important;
    padding: 0;
}

.bg-none {
    background-color: transparent !important;
}
</style>