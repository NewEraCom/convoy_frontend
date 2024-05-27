<script setup lang="ts">
import { ref, watch } from 'vue';
import { Modal } from '@/ui';
import { louerService } from '@/services/v2';
import { useToast } from 'vue-toastification';


const toast = useToast();
const isLoading = ref(false);
const montant = ref('')
const date = ref('')
const props= defineProps({
        paiement: {
            type: Object,
            required: true,
        },
        id: {
            type: Number,
            required: true,
        },
    })
watch(props, () => {
if(props && props.paiement){
    montant.value = props.paiement.montant
}})



const onSubmit = async () => {
    isLoading.value = true;
    const formData = new FormData();
 

 formData.append('date_paiement', date.value);
 formData.append('montant', montant.value);
 formData.append('loue_id',String(props.id));

    await louerService.createPaiement(formData).then(() => {
        $('#new-paiement').modal('hide');
        toast.success('Paiement ajouté avec succès');
    }).catch((error) => {
        console.log(error);
        toast.error('Erreur lors de l\'ajout');
    }).finally(() => {
        isLoading.value = false;
    });
};


</script>

<template>
    <Modal id="new-paiement" title="Nouveau paiement" size="modal-md">
        <form @submit.prevent="onSubmit">
            <div class="modal-body">
                <div class="row">
                    <div class="col-md-12 mb-3">
                        <label for="montant" class="mb-2">Montant <span class="text-danger">*</span> </label>
                        <input type="number" v-model="montant" class="form-control"
                            placeholder="Entrer le montant" required />
                    </div>
  
                    <div class="col-md-12 mb-3">
                        <label for="date_payment" class="mb-2">Date de paiement <span
                                class="text-danger">*</span></label>
                        <input type="date" v-model="date" class="form-control" />
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-label-outline-dark" data-bs-dismiss="modal">
                    Fermer
                </button>
                <button type="submit" :disabled="isLoading" class="btn btn-primary">
                    <span v-if="isLoading" class="d-flex align-items-center">
                        <div class="spinner-border spinner-border-sm text-white" role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div>
                    </span>
                    <span v-else> Terminer</span>
                </button>
            </div>
        </form>
    </Modal>

</template>
