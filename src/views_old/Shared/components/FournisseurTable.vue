<script setup lang="ts">
import { ref } from 'vue';
import { DataTable } from '@/ui';
import { formater } from '@/utils';

const props = defineProps({
    fournisseurs: {
        type: Array,
        required: true,
    },
});

const headers = [
    { text: 'Raison sociale',  isComplex:true, type: 'SousTraitant' },
    { text: 'Ville', value: 'ville', type: 'text' },
    { text: 'Numéro de téléphone', value: 'phone_no_1', type: 'phone' },
    { text: 'Créé le', value: 'created_at', type: 'date' },
    { text: 'Status', value: 'is_active', type: 'badge' },
];

const actionsConfig = [
   
];



const filteredData = ref(props.fournisseurs);

const searchQuery = ref('');
const statusQuery = ref('-');
const startQuery = ref();
const endQuery = ref();
const itemPerPage = ref(15);

const filter = () => {
    filteredData.value = props.fournisseurs.filter((item: any) => {
        const combinedFields = `${item.raison_social} ${item.ville}`.toLowerCase();
        const searchWords = searchQuery.value.toLowerCase().split(' ');
        return searchWords.every(word => combinedFields.includes(word)) &&
            (statusQuery.value === '-' || item.is_active == statusQuery.value) && (!startQuery.value || formater.startOfDay(item.created_at) >= formater.startOfDay(startQuery.value)) &&
            (!endQuery.value || formater.startOfDay(item.created_at) <= formater.startOfDay(endQuery.value));
    });

};

</script>

<template>
    <div>
        <div class="row mb-4">
            <div class="col-12">
                <div class="d-flex align-items-center">
                    <input v-model="searchQuery" type="search" class="form-control w-240 me-2"
                        placeholder="Rechercher..." @input="filter" />

                    <div class="d-flex align-items-center ms-0">
                        <select v-model="statusQuery" class="form-select ms-2 me-2 w-180" @change="filter">
                            <option value="-">Tout</option>
                            <option value="1">Actif</option>
                            <option value="0">Inactif</option>
                        </select>
                    </div>
                    <div class="d-flex align-items-center ms-2">
                        <label for="start">De</label>
                        <input v-model="startQuery" type="date" id="start" class="form-control ms-2 me-2"
                            @change="filter" />
                    </div>
                    <div class="d-flex align-items-center ms-0">
                        <label for="end">à</label>
                        <input v-model="endQuery" type="date" id="end" class="form-control ms-2 me-2"
                            @change="filter" />
                    </div>
                    <div class="d-flex align-items-center ms-auto">
                        <label for="">Afficher</label>
                        <select v-model="itemPerPage" name="" class="form-select ms-2 me-2 w-120">
                            <option value="15">15</option>
                            <option value="30">30</option>
                            <option value="45">45</option>
                            <option value="60">60</option>
                        </select>
                    </div>
                    <button class="btn btn-secondary" disabled data-bs-toggle="modal" data-bs-target="#import-modal">
                        <i class="ti ti-file-type-csv me-2"></i>
                        Exporter
                    </button>
                </div>
            </div>
        </div>
        <DataTable :items="filteredData" :headers="headers" :page-size=itemPerPage :actionsConfig="actionsConfig"
            buttonType="simple" disabled="actif" />
    </div>
</template>

<style>
.w-240 {
    width: 240px;
}
</style>
