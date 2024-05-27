<script setup lang="ts">

import { ref, onMounted, onUnmounted, computed } from 'vue';
import { CardTwo, CardTwoSkeleton } from '@/ui';
import { useSharedStore } from '@/store/v2';
import  fournisseurService  from '@/services/v2/shared/fournisseur_service';
import  FournisseurTable  from './components/tables/FournisseurTable.vue';
import AddSoustraitantModal from './components/Modals/sous-traitant/AddSoustraitantModal.vue';
import Activat from './components/Modals/Activat.vue';
//import { fournisseurService } from '@/services/v2';
import DeleteModal from '../../ui/modals/DeleteModal.vue'
import { log } from 'node:console';

const sharedStore = useSharedStore();
const isLoading = ref(false)
const fournisseurs = ref(computed(() => sharedStore.fournisseurs.data));
const stats = ref(computed(() => sharedStore.fournisseurs.stats));
const props = defineProps({
    id: {
        type: Number,
        required: true,
    },
});
onMounted(async () => {
    await fournisseurService.getFournisseurs();
});

console.log(fournisseurs)

onUnmounted(() => {
    sharedStore.clearFournisseurs();
});
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
        <h5 class="py-3 mb-4 fw-medium text-muted">Dashboard / <span class="text-dark">Fournisseurs</span></h5>
        <div v-if="stats" class="row g-3">
            <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-4 col-xxl-4">
                <CardTwo title="Fournisseurs" :count="stats.total" color="bg-label-primary" icon="ti ti-building-store"
                    card-color=" card-border-shadow-primary" />
            </div>
            <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-4 col-xxl-4">
                <CardTwo title="Fournisseur Actif" :count="stats.actif" color="bg-label-warning" icon="ti ti-building-store"
                    card-color="card-border-shadow-warning" />
            </div>
            <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-4 col-xxl-4">
                <CardTwo title="Fournisseur Inactif" :count="stats.inactif" color="bg-label-success"
                    icon="ti ti-building-store" card-color="card-border-shadow-success" />
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
                                <h5 class="fw-bold mb-1">Liste des fournisseurs</h5>
                                <small class="fw-bold mb-1 text-muted">Liste des fournisseurs</small>
                            </div>
                            <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addSoustraitant">
                                <i class="ti ti-square-rounded-plus-filled me-2"></i>
                                Ajouter un fournisseur
                            </button>
                        </div>
                        <div v-if="fournisseurs && fournisseurs.length > 0" class="card-body border-top pt-4">
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
    <AddSoustraitantModal type="fournisseur" title="Nouveau Fournisseur"/>
      <DeleteModal title="Supprimer un fournisseur" text="Voulez-vous vraiment supprimer ce fournisseur?"
            textButton="Oui, Supprimer" :action="() => fournisseurService.deleteSoustraitant()"
            message="Fournisseur supprimé avec succès" />
</template>