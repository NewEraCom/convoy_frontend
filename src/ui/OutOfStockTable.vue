<script setup lang="ts">
import { ref } from 'vue';
import { DataTable } from '@/ui';
import { formater } from '@/utils';
import { useLogisticsStore } from '@/store';

const logisticsStore = useLogisticsStore();

const props = defineProps({
    requests: {
        type: Array,
        required: true,
    },
    role: {
        type: String,
        required: true,
    }
});

const headers = [
    { text: 'N° de demande', value: 'code', type: 'text' },
    { text: 'Projet', value: 'code', type: 'project' },
    { text: 'Date de demande', value: 'created_at', type: 'date' },
    { text: 'Statut', value: 'status', type: 'badge' },
];

if (props.role != 'chef') {
    headers.push({ text: 'Créé par', value: 'created_by', type: 'created_by' });
}

const actionsConfig = [
    {
        icon: 'ti ti-eye', class: 'btn btn-primary btn-sm', onClick: (item: any) => {
            logisticsStore.setSelectedItem(item);
            $('#detailsRequest').modal('show');
        }
    },
];





const filteredData = ref(props.requests);

const searchQuery = ref('');
const statusQuery = ref('-');
const startQuery = ref();
const endQuery = ref();
const itemPerPage = ref(15);

const filter = () => {
    filteredData.value = props.requests.filter((item: any) => {
        const combinedFields = `${item.created_by.employee.first_name} ${item.created_by.employee.last_name} ${item.project.code} ${item.code}`.toLowerCase();
        const searchWords = searchQuery.value.toLowerCase().split(' ');
        return searchWords.every(word => combinedFields.includes(word)) &&
            (statusQuery.value === '-' || item.status === statusQuery.value) && (!startQuery.value || formater.startOfDay(item.created_at) >= formater.startOfDay(startQuery.value)) &&
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
                            <option value="pending">En attente</option>
                            <option value="on going">En cours</option>
                            <option value="done">Traité</option>
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
            buttonType="simple" disabled="done" />
    </div>
</template>
<style>
.w-240 {
    width: 240px;
}
</style>
