<script setup lang="ts">
import { ref, watch } from 'vue';
import { DataTable } from '@/ui';
import { formater } from '@/utils';

const props = defineProps({
    preproject: {
        type: Array,
        required: true,
    },
});
const headers = [
    { text: 'Appel d\'offre', isComplex: true, type: 'preproject' },
    { text: 'TYPE DE PROJECT', value: 'type_project', type: 'badge' },
    { text: 'ECHANTILLON', value: 'date_echantillion', isComplex: true, type: 'date_echantillion' },
    { text: 'VISITE DE LIEUX', value: 'date_visite', isComplex: true, type: 'date_visite' },
    { text: 'STATUS', value: 'status', type: 'badge' },
    { text: 'DATE DE DEPOT', value: 'date_depot', type: 'date' },
];

const actionsConfig = [
    {
        icon: 'ti ti-eye', class: 'btn btn-label-primary waves-effect btn-sm', onClick: (item: any) => {
            console.log(item);
        },
    },
];


const filteredData = ref(props.preproject);

const searchQuery = ref('');
const statusQuery = ref('-');
const startQuery = ref();
const endQuery = ref();
const typeQuery = ref('-');
const itemPerPage = ref(15);

const filter = () => {
    filteredData.value = props.preproject.filter((item: any) => {
        const combinedFields = `${item.maitre_ouvrage} ${item.n_offre}`.toLowerCase();
        const searchWords = searchQuery.value.toLowerCase().split(' ');
        return searchWords.every(word => combinedFields.includes(word)) &&
            (typeQuery.value === '-' || item.type_project === typeQuery.value) && (statusQuery.value === '-' || item.status === statusQuery.value) && (!startQuery.value || formater.startOfDay(item.created_at) >= formater.startOfDay(startQuery.value)) &&
            (!endQuery.value || formater.startOfDay(item.created_at) <= formater.startOfDay(endQuery.value));
    });
};

watch(props.preproject, () => {
    filteredData.value = props.preproject;
});

</script>
<template>
    <div class="mt-4">
        <div class="row mb-4 ms-2 me-2">
            <div class="col-12">
                <div class="d-flex align-items-center">
                    <input v-model="searchQuery" type="search" class="form-control w-240 me-2"
                        placeholder="Rechercher..." @input="filter" />
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
                    <div class="d-flex align-items-center ms-0">
                        <select v-model="statusQuery" class="form-select ms-2 me-2 w-180" @change="filter">
                            <option value="-">Tout</option>
                            <option value="En attente">En attente</option>
                            <option value="En soumission">En soumission</option>
                            <option value="Gagné">Gagné</option>
                            <option value="Perdu">Perdu</option>
                        </select>
                    </div>
                    <div class="d-flex align-items-center ms-auto">
                        <select v-model="typeQuery" class="form-select ms-2 me-2 w-180" @change="filter">
                            <option value="-">Tout</option>
                            <option value="simple">Sans lots</option>
                            <option value="special">Avec lots</option>
                        </select>
                    </div>
                    <div class="d-flex align-items-center ms-2">
                        <select v-model="itemPerPage" name="" class="form-select ms-2 me-2 w-120">
                            <option value="15">15</option>
                            <option value="30">30</option>
                            <option value="45">45</option>
                            <option value="60">60</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
        <DataTable :items="filteredData" :headers="headers" :page-size='itemPerPage' :actionsConfig="actionsConfig"
            button-type="simple" disabled="1" />
    </div>
</template>
<style>
.w-240 {
    width: 240px;
}
</style>