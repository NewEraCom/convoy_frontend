<script setup lang="ts">
import { ref } from 'vue';
import { DataTable } from '@/ui';
import { formater } from '@/utils';

const props = defineProps({
    clients: {
        type: Array,
        required: true,
    },
});
const headers = [
    { text: 'Client', isComplex: 'true', type: 'client' },
    { text: 'Ville', value: 'ville', type: 'text' },
    { text: 'ICE', value: 'num_ice', type: 'text' },
    { text: 'Fix', value: 'fix', type: 'phone' },
    { text: 'Téléphone', value: 'phone', type: 'phone' },
    { text: 'Status', value: 'status', type: 'badge' },
];

const actionsConfig = [
    {
        icon: 'ti ti-eye', class: 'btn btn-label-primary waves-effect btn-sm', onClick: (item: any) => {
            console.log(item);
        },
    },
];


const filteredData = ref(props.clients);

const searchQuery = ref('');
const statusQuery = ref('-');
const startQuery = ref();
const endQuery = ref();
const itemPerPage = ref(15);

const filter = () => {
    filteredData.value = props.clients.filter((item: any) => {
        const combinedFields = `${item.pre_project.project_code} ${item.pre_project.maitre_ouvrage} ${item.date_visite} ${item.date_depot} ${item.date_echantillion} ${item.type_project}`.toLowerCase();
        const searchWords = searchQuery.value.toLowerCase().split(' ');
        return searchWords.every(word => combinedFields.includes(word)) &&
            (statusQuery.value === '-' || item.status == statusQuery.value) && (!startQuery.value || formater.startOfDay(item.date_depot) >= formater.startOfDay(startQuery.value)) &&
            (!endQuery.value || formater.startOfDay(item.date_depot) <= formater.startOfDay(endQuery.value));
    });
};

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
                            <option value="0">Recupérée</option>
                            <option value="1">Non recupérée</option>

                        </select>
                    </div>
                    <div class="d-flex align-items-center ms-auto">
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