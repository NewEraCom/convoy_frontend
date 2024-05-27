<script setup lang="ts">
import { ref } from 'vue'
import { DataTable } from '@/ui'
import { formater, helpers } from '@/utils'
import { useLogisticsStore } from '@/store/v2'
import router from '@/router';

interface ActionConfig {
  icon: string | ((item: any) => string)
  class: string | ((item: any) => string)
  onClick: (item: any) => void
  type?: string
}
const logisticsSrore = useLogisticsStore()

const props = defineProps({
  louers: {
    type: Array,
    required: true
  }
})

const headers = [
  { text: 'designation', value: 'designation', type: 'text' },
  { text: 'Montant', value: 'montant', type: 'currency' },
  { text: 'Recepteur', value: 'recepteur', type: 'text' },
  { text: 'Mode de paiement', value: 'mode_paiement', type: 'text' },
  { text: 'Type', value: 'type', type: 'text' },
  { text: 'Status', value: 'a_payer', type: 'badge' }
]
const role = localStorage.getItem('role')
const actionsConfig: ActionConfig[] = [
//     {
//     icon: 'ti ti-eye',
//     class: 'btn btn-primary btn-sm',
//     onClick: (item: any) => {
//       logisticsSrore.setSelectedItem(item)
//       $('#detailsLouer').modal('show')
//     }
//   },
{
    class: 'btn btn-primary btn-sm',
    icon: 'ti ti-eye', // Icon for profile action
    onClick: (item) => {
        logisticsSrore.louer.ItemId = item.id
      router.push({ name: 'Louer-Profile', params: { id: item.id } })
    }
  },
  {
    class: 'btn btn-danger btn-sm',
    icon: 'ti ti-trash', // Icon for delete action
    onClick: (item) => {
      logisticsSrore.louer.ItemId = item.id
      $('#deleteModal').modal('show')
    }
  },
  {
    class: 'btn btn-warning btn-sm',
    icon: 'ti ti-edit', 
    onClick: (item) => {
    logisticsSrore.louer.item = item
      $('#edit-louer').modal('show')
    }
  }
]
if ([helpers.roles.DG, helpers.roles.LOGISTICS].includes(role)) {
  actionsConfig.push({
    icon: (item) => (item.a_payer === 0 ? 'ti ti-check' : 'ti ti-x'),
    class: (item) => (item.a_payer === 0 ? 'btn btn-success btn-sm' : 'btn btn-warning btn-sm'),
    onClick: (item: any) => {
        logisticsSrore.louer.item = item
      $('#activat-louer').modal('show')
    },
    type: 'validate'
  })
}

const detailsItem = (item: any) => {
  console.log(item)
}

const deleteItem = (item: any) => {
  console.log('Delete item', item)
}

const filteredData = ref(props.louers)

const searchQuery = ref('')
const statusQuery = ref('-')
const startQuery = ref()
const endQuery = ref()
const itemPerPage = ref(15)

const filter = () => {
  filteredData.value = props.louers.filter((item: any) => {
    const combinedFields = `${item.recepteur} ${item.designation}`.toLowerCase()
    const searchWords = searchQuery.value.toLowerCase().split(' ')
    return (
      searchWords.every((word) => combinedFields.includes(word)) &&
      (statusQuery.value === '-' || item.a_payer == statusQuery.value) &&
      (!startQuery.value ||
        formater.startOfDay(item.created_at) >= formater.startOfDay(startQuery.value)) &&
      (!endQuery.value ||
        formater.startOfDay(item.created_at) <= formater.startOfDay(endQuery.value))
    )
  })
}
</script>

<template>
  <div>
    <div class="row mb-4">
      <div class="col-12">
        <div class="d-flex align-items-center">
          <input
            v-model="searchQuery"
            type="search"
            class="form-control w-240 me-2"
            placeholder="Rechercher..."
            @input="filter"
          />

          <div class="d-flex align-items-center ms-0">
            <select v-model="statusQuery" class="form-select ms-2 me-2 w-180" @change="filter">
              <option value="-">Tout</option>
              <option value="1">Actif</option>
              <option value="0">Inactif</option>
            </select>
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
          <button
            class="btn btn-secondary"
            disabled
            data-bs-toggle="modal"
            data-bs-target="#import-modal"
          >
            <i class="ti ti-file-type-csv me-2"></i>
            Exporter
          </button>
        </div>
      </div>
    </div>
    <DataTable
      :items="filteredData"
      :headers="headers"
      :page-size="itemPerPage"
      :actionsConfig="actionsConfig"
      buttonType="simple"
      disabled="1"
    />
  </div>
</template>

<style>
.w-240 {
  width: 240px;
}
</style>
