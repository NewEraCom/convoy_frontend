$
<script setup lang="ts">
import { ref } from 'vue';
import { portalService } from '@/services';

const props = defineProps({
    employee: Object
});

const isLoading = ref(false);

const formData = ref({
    first_name: props.employee.first_name,
    last_name: props.employee.last_name,
    email: props.employee.email,
    cin: props.employee.cin,
    cnss: props.employee.cnss,
    rib: props.employee.rib,
    bank_name: props.employee.bank_name,
    situation_familiale: props.employee.situation_familiale,
    nb_enfants: props.employee.nb_enfants,
    date_of_birth: props.employee.date_of_birth,
    sexe: props.employee.sexe,
});

const submitForm = () => {
    isLoading.value = true;

    const query = new FormData();

    query.append('first_name', formData.value.first_name);
    query.append('last_name', formData.value.last_name);
    query.append('cin', formData.value.cin);
    query.append('cnss', formData.value.cnss);
    query.append('rib', formData.value.rib);
    query.append('bank_name', formData.value.bank_name);
    query.append('situation_familiale', formData.value.situation_familiale);
    query.append('nb_enfants', formData.value.nb_enfants);
    query.append('date_of_birth', formData.value.date_of_birth);
    query.append('sexe', formData.value.sexe);

    portalService.updatePersonalInfo(query)
        .then(() => {
            isLoading.value = false;
        })
        .catch(() => {
            isLoading.value = false;
        });


};

</script>
<template>

    <div class="offcanvas offcanvas-end off-canva-width" tabindex="-1" id="personalInfo"
        aria-labelledby="offcanvasEndLabel">
        <div class="offcanvas-header">
            <h5 id="offcanvasEndLabel" class="offcanvas-title">Modifier les informations personnelles
            </h5>
            <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body  mx-0 flex-grow-0">
            <form @submit.prevent="submitForm">
                <div class="row">
                    <div class="col-6">
                        <div class="mb-3">
                            <label for="first_name" class="form-label">Prénom</label>
                            <input type="text" class="form-control" id="first_name" v-model="formData.first_name"
                                disabled>
                        </div>
                    </div>
                    <div class="col-6">
                        <div class="mb-3">
                            <label for="last_name" class="form-label">Nom</label>
                            <input type="text" class="form-control" id="last_name" v-model="formData.last_name"
                                disabled>
                        </div>
                    </div>
                    <div class="col-12">
                        <div class="mb-3">
                            <label for="email" class="form-label">Adresse email</label>
                            <input type="email" class="form-control" id="email" v-model="formData.email" disabled
                                placeholder="Enrtrer votre email">
                        </div>
                    </div>
                    <div class="col-12">
                        <div class="mb-3">
                            <label for="birthdate" class="form-label">Date de naissance</label>
                            <input type="date" class="form-control" id="birthdate" v-model="formData.date_of_birth">
                        </div>
                    </div>
                    <div class="col-12">
                        <div class="mb-3">
                            <label for="cin" class="form-label">Numéro de CIN</label>
                            <input type="text" class="form-control" id="cin" v-model="formData.cin">
                        </div>
                    </div>
                    <div class="col-12">
                        <div class="mb-3">
                            <label for="cnss" class="form-label">Matricule CNSS</label>
                            <input type="text" class="form-control" id="cnss" v-model="formData.cnss">
                        </div>
                    </div>
                    <div class="col-12">
                        <div class="mb-3">
                            <label for="rib" class="form-label">RIB Bancaire</label>
                            <input type="text" class="form-control" id="rib" v-model="formData.rib">
                        </div>
                    </div>
                    <div class="col-12">
                        <div class="mb-3">
                            <label for="bank_name" class="form-label">Nom de la banque</label>
                            <select class="form-select" id="bank_name" v-model="formData.bank_name">
                                <option value="ATTIJARIWAFA BANK">Attijariwafa Bank</option>
                                <option value="BMCE Bank">BMCE Bank</option>
                                <option value="BANQUE POPULAIRE">Banque Populaire</option>
                                <option value="Crédit Agricole">Crédit Agricole</option>
                                <option value="CIH">CIH Bank</option>
                                <option value="BMCI">BMCI Bank</option>
                                <option value="SOCIETE GENERALE">Société Générale</option>
                                <option value="Al Barid Bank">Al Barid Bank</option>
                                <option value="Crédit du Maroc">Crédit du Maroc</option>
                                <option value="Autre">Autre</option>
                            </select>
                        </div>
                    </div>
                    <div class="col-12">
                        <div class="mb-3">
                            <label for="situation_familiale" class="form-label">Situation familiale</label>
                            <select class="form-select" id="situation_familiale" v-model="formData.situation_familiale">
                                <option value="Célibataire">Célibataire</option>
                                <option value="Marié">Marié</option>
                                <option value="Divorcé">Divorcé</option>
                                <option value="Veuf">Veuf</option>
                            </select>
                        </div>
                    </div>
                    <div class="col-12">
                        <div class="mb-3">
                            <label for="nb_enfants" class="form-label">Nombre d'enfants</label>
                            <input type="number" class="form-control" id="nb_enfants" :value="formData.nb_enfants">
                        </div>
                    </div>
                    <div class="col-12">
                        <div class="mb-3">
                            <label for="nb_enfants" class="form-label">Genre</label>
                            <select class="form-select" id="sexe">
                                <option value="homme">Homme</option>
                                <option value="femme">Femme</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-12 d-flex justify-content-end">
                        <button type="button" class="btn btn-label-outline-dark"
                            data-bs-dismiss="offcanvas">Annuler</button>
                        <button type="submit" class="btn btn-primary">
                            <span v-if="isLoading" class="spinner-border spinner-border-sm" role="status"
                                aria-hidden="true"></span>
                            <span v-else>
                                Modifier
                            </span>
                        </button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>