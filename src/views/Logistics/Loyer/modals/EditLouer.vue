<script setup lang="ts">
import { ref, computed ,watch} from 'vue';
import { Modal } from '@/ui';
import { useLogisticsStore } from '@/store/v2';
import { formater } from '@/utils';
import { louerService } from '@/services';

const logisticsStore = useLogisticsStore();
// const props = defineProps({
//     louer: Array,
// })
const isLoading = ref(false)


// const selectedOperation = ref(computed(() => logisticsStore.selectedItem));


const props = defineProps(['louer']);
console.log(props.louer)
const designation = ref('')
const recepteur = ref('')
const type = ref('')
const adresse = ref('')
const d_paiement = ref('')
const m_paiement = ref('')
const montant = ref('')

watch(props, () => {
if(props && props.louer){
    designation.value = props.louer.designation
    recepteur.value = props.louer.recepteur
    type.value = props.louer.type
    adresse.value = props.louer.adresse
    montant.value = props.louer.montant
    d_paiement.value = props.louer.date
    m_paiement.value = props.louer.mode_paiement
}
})






const submit = async () => {
 
 isLoading.value = true;

 const formData = new FormData();
 
 formData.append('designation', designation.value);
 formData.append('recepteur', recepteur.value);
 formData.append('type', type.value);
 formData.append('adresse', adresse.value);
 formData.append('montant', montant.value);
 formData.append('date', d_paiement.value);
 formData.append('mode_paiement', m_paiement.value);
 try{
    const res = await louerService.updateLouer(formData,props.louer.id)

             console.log(res);
             resetFormFields();
         }catch(error){
             console.log(error);
         };


};
const resetFormFields = () => {
    isLoading.value = false;
    $('#edit-louer').modal('hide');
};
</script>

<template>
    <Modal id="edit-louer" title="Détails de l'opération" size="modal-md">
        <form @submit.prevent="submit">
        <div  class="modal-body">
            <div class="row">
                <div class="col-md-12 mb-3">
                    <label for="type" class="mb-2">Désignation</label>
                    <input type="text" v-model="designation" class="form-control" />
                </div>
                <div class="col-md-12 mb-3">
                    <label for="type" class="mb-2">Montant</label>
                    <input type="number" v-model="montant" class="form-control"
                     />
                </div>
                <div class="col-md-12 mb-3">
                    <label for="type" class="mb-2">Récepteur</label>
                    <input type="text" v-model="recepteur" class="form-control" />
                </div>
                <div class="col-md-12 mb-3">
                        <label for="type" class="mb-2">Type <span class="text-danger">*</span></label>
                        <select name="type" id="type" class="form-select" v-model="type" required>
                            <option value="-">Sélectionner le type</option>
                            <option value="Appartement">Appartement</option>
                            <option value="Villa">Villa</option>
                            <option value="Magasin">Magasin</option>
                            <option value="Dépôt">Dépôt</option>
                            <option value="autre">Autre</option>
                        </select>
                    </div>
                <div class="col-md-12 mb-3">
                        <label for="mode_payment" class="mb-2">Mode de paiement <span
                                class="text-danger">*</span></label>
                        <select name="mode_payment" id="mode_payment" class="form-select"
                            v-model="m_paiement">
                            <option value="-">Sélectionner le mode de paiement</option>
                            <option value="espece">Cash</option>
                            <option value="cheque">Chèque</option>
                            <option value="virement">Virement</option>
                        </select>
                    </div>
                <div class="col-md-12 mb-3">
                    <label for="adresse" class="mb-2">Adresse</label>
                    <input type="text" v-model="adresse" class="form-control" />
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
