<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue';
import { louerService } from '@/services/v2';
import { useLogisticsStore } from '@/store/v2';
import { helpers } from '@/utils';
import LouerPaiement from '../table/LouerPaiement.vue'
import NewPaiement from '../modals/NewPaiement.vue'
import DeleteModal from '@/ui/modals/DeleteModal.vue';
//import { EditSousTraitantModal, PurchaseOrderTable } from './components';
const props = defineProps({
    id: {
        type: Number,
        required: true,
    },

});

console.log(props.id)
const logisticsStore = useLogisticsStore();
const louer = ref(computed(() => logisticsStore.selectedItem));
console.log(louer)
onMounted(async () => {
    await louerService.getLouerById(props.id);

});
onUnmounted(()=>{
    logisticsStore.selectedItem = null;
})

function getValueOrDefault(value) {
        return (value == null || value === 'null') ? '-' : value;
}
</script>
<template>
    <div class="flex-grow-1 container-fluid mt-3" v-if="louer">
        <div class="d-flex align-items-center justify-content-between mb-4">
            <h5 class="py-3 mb-4 fw-medium text-muted">Dashboard / Profile / <span class="text-dark"> {{
        louer.designation }}</span> </h5>
            <div>
                <button class="btn btn-warning" data-bs-target="#edit-st" data-bs-toggle="modal">
                    <i class="ti ti-pencil me-2"></i>
                    Modifier
                </button>

            </div>
        </div>
  
      <div class="row">
        <!-- Profile Information -->
        <div class="col-xl-3 col-lg-3 col-md-12 mb-4">
          <div class="card card-border-shadow-primary">
            <div class="card-body">
              <div class="user-avatar-section border-bottom pb-4 text-center">
                <img class="img-fluid rounded mb-3 pt-1 mt-4"
                     src="../../assets/img/avatars/user_avatar.png"
                     height="100" width="100"
                     alt="User avatar">
                <div class="user-info">
                  <h4 class="mb-2">{{ louer.designation }}</h4>
                  <span class="badge mt-1" :class="helpers.returnBadge(String(louer.a_payer))[0]">
                    {{ helpers.returnBadge(String(louer.a_payer))[1] }}
                  </span>
                </div>
              </div>
              <p class="mt-4 small text-uppercase text-muted">À PROPOS</p>
              <div class="info-container">
                <ul class="list-unstyled">
                  <li class="mb-2" v-if="louer.designation">
                    <span class="fw-medium me-1">Designation:</span>
                    <span>{{ louer.designation }}</span>
                  </li>
                  <li class="mb-2" v-if="louer.adresse">
                    <span class="fw-medium me-1">Adresse:</span>
                    <span>{{ louer.adresse }}</span>
                  </li>
                  <li class="mb-2" v-if="louer.mode_paiement">
                    <span class="fw-medium me-1">Mode de paiement:</span>
                    <span>{{ louer.mode_paiement }}</span>
                  </li>
                  <li class="mb-2" v-if="louer.montant">
                    <span class="fw-medium me-1">Montant:</span>
                    <span>{{ getValueOrDefault(louer.montant) }}</span>
                  </li>
                  <li class="mb-2" v-if="louer.date">
                    <span class="fw-medium me-1">Date de paiement:</span>
                    <span>{{ louer.date }}</span>
                  </li>
                  <li class="mb-2" v-if="louer.d_paiment">
                    <span class="fw-medium me-1">Délai de paiement:</span>
                    <span>{{ louer.d_paiment }}</span>
                  </li>
                  <li class="mb-2" v-if="louer.recepteur">
                    <span class="fw-medium me-1">Récepteur:</span>
                    <span>{{ louer.recepteur }}</span>
                  </li>
                  <li class="mb-2" v-if="louer.created_at">
                    <span class="fw-medium me-1">Initié le:</span>
                    <span>{{ helpers.formattedDate(louer.created_at) }}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
  
        <!-- Bon de Commande -->
        <div class="col-xl-9 col-lg-9 col-md-12">
          <div class="card card-border-shadow-primary">
            <div class="card-header d-flex align-items-center">
    <h5 class="fw-bold mb-0 me-2">Loyer</h5>
    <button class="btn btn-primary ms-auto" data-bs-target="#new-paiement" data-bs-toggle="modal">
        <i class="ti ti-plus me-2"></i> Ajouter un paiement
    </button>
</div>
            <div class="card-body" v-if="louer.paiements">
                <LouerPaiement :louer_paiement="louer.paiements" />
            </div>
          </div>
        </div>
      </div>
    </div>
  
    <div class="container-fluid mt-5" v-else>
      <div class="col-12 card">
        <img src="/src/assets/img/No_Results.png" class="empty_stats_img_md" alt="" style="object-fit: contain" />
        <h6 class="text-center mt-3 fw-bold">
          Aucun Sous Traitant trouvé
        </h6>
      </div>
    </div>
    <NewPaiement :paiement="louer" :id="props.id"/>
        <DeleteModal title="Supprimer un Paiement" text="Voulez-vous vraiment supprimer ce Paiement ?"
            textButton="Oui, Supprimer" :action="() => louerService.deletePaiement()"
            message="Element supprimé avec succès" />
  </template>
  
<style>
.empty_stats_img_md {
    width: 100%;
    max-width: 400px;
    margin: 0 auto;
}
</style>