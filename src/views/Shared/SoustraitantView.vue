<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed, watch } from 'vue';
import { CardTwo, CardTwoSkeleton, DeleteModal } from '@/ui';
import { useSharedStore } from '@/store/v2';
import { SousTraitantService } from '@/services/v2';
import  FournisseurTable  from './components/tables/FournisseurTable.vue';
import AddSoustraitantModal from './components/Modals/sous-traitant/AddSoustraitantModal.vue'
import Activat from './components/Modals/Activat.vue';
import  fournisseurService  from '@/services/v2/shared/fournisseur_service';
// import {
//     FournisseurTable,
//     AddSoustraitantModal
// } from './components';
const isLoading = ref(false)
const sharedStore = useSharedStore();

let fournisseurs = ref(computed(() => sharedStore.fournisseurs.data));
let stats = ref(computed(() => sharedStore.fournisseurs.stats));

// let data = ref({
//     fournisseurs: null,
//     stats: null,
// });
console.log(fournisseurs);

onMounted(async () => {
    await SousTraitantService.getSoustraitants();
    // value.fournisseurs = fournisseurs.value;
    // value.stats = stats.value;
});

onUnmounted(() => {
    sharedStore.clearFournisseurs();
});

// watch(fournisseurs, () => {
//     value.fournisseurs = fournisseurs.value;
//     value.stats = stats.value;
// }, { deep: true });


const civility = ref('btn btn-danger')
const modalMessage = () => {
  const item = sharedStore.fournisseurs.item;
  if (item && item.is_active === 1) {
    return 'Confirmez-vous la désactivation';
  } else if (item && item.is_active === 0) {
    return "Confirmez-vous l'activation";
  }
  return 'Item not available or is_active is not set';
};

const modalConfirmation = () => {
  const item = sharedStore.fournisseurs.item;
  if (item && item.is_active === 1) {
    civility.value = 'btn btn-danger'
    return 'Oui, Désactiver le';
  } else if (item && item.is_active === 0) {
    civility.value = 'btn btn-success'
    return 'Oui, Activer le';
  }
  return 'Item not available or is_active is not set';
};
const validatItem = async ()=>{
    await fournisseurService.validateTier(sharedStore.fournisseurs.item.id)
    $('#activat-tier').modal('hide')
    
}
</script>

<template>
    <div class="flex-grow-1 container-fluid mt-3">
        <h5 class="py-3 mb-4 fw-medium text-muted">Dashboard / <span class="text-dark">Sous-traitant</span></h5>
        <div v-if="stats" class="row g-3">
            <div class="col-12 col-sm-12 col-md-12 col-lg-4 col-xl-4 col-xxl-4">
                <CardTwo title="Sous-traitant" :count="String(stats.total)" color="bg-label-primary"
                    icon="ti ti-building-store" card-color=" card-border-shadow-primary" />
            </div>
            <div class="col-12 col-sm-12 col-md-12 col-lg-4 col-xl-4 col-xxl-4">
                <CardTwo title="Sous-traitant Actif" :count="String(stats.actif)" color="bg-label-success"
                    icon="ti ti-building-store" card-color="card-border-shadow-success" />
            </div>
            <div class="col-12 col-sm-12 col-md-12 col-lg-4 col-xl-4 col-xxl-4">
                <CardTwo title="Sous-traitant Inactif" :count="String(stats.inactif)" color="bg-label-warning"
                    icon="ti ti-building-store" card-color="card-border-shadow-warning" />
            </div>
        </div>
        <div v-else class="row g-3">
            <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-4 col-xxl-4">
                <CardTwoSkeleton />
            </div>
            <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-4 col-xxl-4">
                <CardTwoSkeleton />
            </div>
            <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-4 col-xxl-4">
                <CardTwoSkeleton />
            </div>
        </div>
        <div class="row mt-4">
            <div class="col-12">
                <div class="card">
                    <div class="card card-border-shadow-primary">
                        <div class="card-header d-flex align-items-center">
                            <div class="me-auto">
                                <h5 class="fw-bold mb-1">Liste des sous-traitants</h5>
                                <small class="fw-bold mb-1 text-muted">Liste des Sous-traitants</small>
                            </div>
                            <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addSoustraitant">
                                <i class="ti ti-square-rounded-plus-filled me-2"></i>
                                Ajouter un sous-traitant
                            </button>
                        </div>
                        <div v-if="fournisseurs && fournisseurs.length > 0 " class="card-body border-top pt-4">
                            <FournisseurTable :fournisseurs="fournisseurs" />
                        </div>
                        <div v-else class="card-body border-top pt-4 d-flex align-items-center justify-content-center"
                            style="height: 650px;">
                            <div class="row mt-5">
                                <div class="col-12 text-center">
                                    <h5>Chargement des données...</h5>
                                    <div class="spinner-border text-primary mt-4" role="status">
                                        <span class="visually-hidden">Loading...</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Activat
        id="activat-tier"
        title="Confirmation"
        :isLoading="isLoading"
        :message="modalMessage()"
        :method="validatItem"
        :civility="civility"
        :confirmation="modalConfirmation()"
      />
        <AddSoustraitantModal type="sous-traitant" title="Nouveau Sous-traitant"/>
        <DeleteModal title="Supprimer un sous-traitant" text="Voulez-vous vraiment supprimer ce sous-traitant?"
            textButton="Oui, Supprimer" :action="() => fournisseurService.deleteSoustraitant()"
            message="Sous-traitant supprimé avec succès" />
    </div>
</template>