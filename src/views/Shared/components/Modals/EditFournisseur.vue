<script setup>
import { ref ,watch,onMounted,defineProps} from 'vue';
import { Modal } from '@/ui';
import { SousTraitantService, sharedService } from '@/services';
// const props = defineProps({
//     soustraitant :{
//         type:Object,
//         required:true
//     }
// });

const props = defineProps(['soustraitant']);


// const props = defineProps({
//     soustraitant: {
//         type: Array
//     },
// });
// onMounted(async () => {
//     await SousTraitantService.getSousTraitantById(props.soustraitant.id);

// });
console.log(props.soustraitant)
let commercial_name = ref('');
let commercial_phone = ref('');
let commercial_email = ref('');
let raison_social = ref('');
let adresse = ref('');
let ville = ref('');
let fix = ref('');
let m_paiement = ref('');
let custom_paiement = ref('');
let d_paiement = ref('');
let phone_no_1 = ref('');
let phone_no_2 = ref('');
let email = ref('');

let num_rc = ref('');
let copie_rc = '';
let num_ice = ref('');
let copie_ice = '';
let num_cnss = ref('');
let copie_cnss = '';
let livraison = ref('');
let num_rf = ref('');
let copie_rf = '';
const handleRCChange = (event) => {
    copie_rc = event.target.files[0];
};
const handleCNSSChange = (event) => {
    copie_cnss = event.target.files[0];
};
const handleICEChange = (event) => {
    copie_ice = event.target.files[0];
};
const handleRFChange = (event) => {
    copie_rf = event.target.files[0];
};

function getValueOrDefault(value) {
        return (value == null || value === 'null') ? '' : value;
}
// watch(props,()=>{
if (props && props.soustraitant) {
    commercial_name.value = getValueOrDefault(props.soustraitant.commercial_name);
    commercial_phone.value = getValueOrDefault(props.soustraitant.commercial_phone);
    commercial_email.value = getValueOrDefault(props.soustraitant.commercial_email);
    raison_social.value = getValueOrDefault(props.soustraitant.raison_social);
    adresse.value = getValueOrDefault(props.soustraitant.adresse);
    ville.value = getValueOrDefault(props.soustraitant.ville);
    fix.value = getValueOrDefault(props.soustraitant.fix);
    m_paiement.value = getValueOrDefault(props.soustraitant.m_paiement);
    d_paiement.value = getValueOrDefault(props.soustraitant.d_paiement);
    phone_no_1.value = getValueOrDefault(props.soustraitant.phone_no_1);
    phone_no_2.value = getValueOrDefault(props.soustraitant.phone_no_2);
    email.value = getValueOrDefault(props.soustraitant.email);
    num_cnss.value = getValueOrDefault(props.soustraitant.num_cnss);
    num_ice.value = getValueOrDefault(props.soustraitant.num_ice);
    num_rc.value = getValueOrDefault(props.soustraitant.num_rc);
    num_rf.value = getValueOrDefault(props.soustraitant.num_rf);
    livraison.value = getValueOrDefault(props.soustraitant.livraison);
}



//  });


const isLoading = ref(false);

const submit = async () => {
 
    isLoading.value = true;

    const formData = new FormData();
    formData.append('commercial_name', commercial_name.value);
    formData.append('commercial_phone', commercial_phone.value);
    formData.append('commercial_email', commercial_email.value);
    formData.append('raison_social', raison_social.value);
    formData.append('adresse', adresse.value);
    formData.append('ville', ville.value);
    formData.append('fix', fix.value);
    formData.append('d_paiment', d_paiement.value);
    formData.append(
        'm_paiment',
        m_paiement.value === 'autre' ? custom_paiement.value : m_paiement.value
    );
    formData.append('email', email.value);
    formData.append('phone_no_1', phone_no_1.value);
    formData.append('phone_no_2', phone_no_2.value);
    formData.append('num_ice', num_ice.value);
    formData.append('num_cnss', num_cnss.value);
    formData.append('num_rc', num_rc.value);
    formData.append('num_rf', num_rf.value);
    formData.append('livraison', livraison.value);
    formData.append('copy_cnss', copie_cnss);
    formData.append('copy_ice', copie_ice);
    formData.append('copy_rc', copie_rc);
    formData.append('copy_rf', copie_rf);

    try{
       const res = await SousTraitantService.updateTier(formData,props.soustraitant.id)
            if(res){
                console.log(res);
            }
                resetFormFields();
            }catch(error){
                console.log(error);
            };
   
};

const resetFormFields = () => {
    isLoading.value = false;
    $('#edit-st').modal('hide');
};

// function checkOther() {
//         if (m_paiement.value === 'autre') {
//             this.showOther = true;
//         } else {
//             this.showOther = false;
//             this.otherMethod = ''; // Réinitialiser le champ de saisie si une autre option est sélectionnée
//         }
//     }
</script>

<template>
    <Modal id="edit-st" title="Edit Sous Traitant" class-name="modal-xl" >
        <form @submit.prevent="submit">
            
            <div class="modal-body">
                <div class="row" v-if="soustraitant != null">
                    
                    <div class="col-sm-12">
                        <div class="mb-3">
                            <label for="nom" class="form-label">Nom </label>
                            <input
                                id="nom"
                                v-model="commercial_name"
                                class="form-control"
                                placeholder="Entrez le nom"
                                type="text"
                                tabindex="0"
                                autofocus
                                
                            />
                        </div>
                    </div>

                    <div class="col-sm-6">
                        <div class="mb-3">
                            <label for="phone_no" class="form-label"
                                >Numéro de téléphone Commercial</label
                            >
                            <input
                                id="phone_no"
                                v-model="commercial_phone"
                                class="form-control"
                                placeholder="Entre le numéro de téléphone"
                                type="text"
                                tabindex="0"
                                
                            />
                        </div>
                    </div>
                    <div class="col-sm-6">
                        <div class="mb-3">
                            <label for="phone_no" class="form-label">Numéro de téléphone N°1</label>
                            <input
                                id="phone_no"
                                v-model="phone_no_1"
                                class="form-control"
                                placeholder="Entre le numéro de téléphone"
                                type="text"
                                tabindex="0"
                                
                            />
                        </div>
                    </div>
                    <div class="col-sm-6">
                        <div class="mb-3">
                            <label for="phone_no" class="form-label">Numéro de téléphone N°2</label>
                            <input
                                id="phone_no"
                                v-model="phone_no_2"
                                class="form-control"
                                placeholder="Entre le numéro de téléphone"
                                type="text"
                                
                            />
                        </div>
                    </div>
                    <div class="col-sm-6">
                        <div class="mb-3">
                            <label for="prenon" class="form-label">Email</label>
                            <input
                                id="prenon"
                                v-model="commercial_email"
                                class="form-control"
                                placeholder="Entrez le numero de tel"
                                type="email"
                                tabindex="0"
                                
                            />
                        </div>
                    </div>
                    <div class="col-sm-6">
                        <div class="mb-3">
                            <label for="nameEx" class="form-label">Raison social</label>
                            <input
                                class="form-control"
                                placeholder="Entrer le numero de matricule"
                                type="text"
                                tabindex="0"
                                id="nameEx"
                                v-model="raison_social"
                                
                            />
                        </div>
                    </div>
                    <div class="col-sm-6">
                        <div class="mb-3">
                            <label for="nameEx" class="form-label">Adresse</label>
                            <input
                                class="form-control"
                                placeholder="Entrer l'Adresse"
                                type="text"
                                tabindex="0"
                                id="nameEx"
                                v-model="adresse"
                                
                            />
                        </div>
                    </div>
                    <div class="col-sm-6">
                        <div class="mb-3">
                            <label for="nameEx" class="form-label">Ville</label>
                            <input
                                class="form-control"
                                placeholder="Entrer la ville"
                                type="text"
                                tabindex="0"
                                id="nameEx"
                                v-model="ville"
                                
                            />
                        </div>
                    </div>
                    <div class="col-sm-6">
                        <div class="mb-3">
                            <label for="nameEx" class="form-label">Fix</label>
                            <input
                                class="form-control"
                                placeholder="Entrer le numero fix"
                                type="text"
                                tabindex="0"
                                id="nameEx"
                                v-model="fix"
                                
                            />
                        </div>
                    </div>

                    <div class="col-sm-6">
                        <div class="mb-3">
                            <label for="nameEx" class="form-label">Methode de paiement</label>
                            <select name="" id="" class="form-select" v-model="m_paiement">
                                <option value="virement bancaire">Virement bancaire</option>
                                <option value="cash">Cash</option>
                                <option value="Chèque">Chèque</option>

                                <option value="autre">Autre</option>
                            </select>
                        </div>
                    </div>
                    <!-- <div v-if="showOther">
    <div class="col-sm-6">
        <div class="mb-3">
            <label for="otherMethod" class="form-label">Autre méthode de paiement</label>
            <input type="text" id="otherMethod" class="form-control" v-model="otherMethod">
        </div>
    </div>
</div> -->
                    <div class="col-sm-6" v-if="m_paiement === 'autre'">
                        <div class="mb-3">
                            <label for="prenon" class="form-label">Saisir la methode de paiement</label>
                            <input
                                class="form-control"
                                placeholder="Saisir la methode de paiement"
                                type="text"
                                tabindex="0"
                                id="nameEx"
                                v-model="custom_paiement"
                                
                                max="12"
                            />
                        </div>
                    </div>
                    <div class="col-sm-6">
                        <div class="mb-3">
                            <label for="nameEx" class="form-label">Date de paiement</label>
                            <input
                                class="form-control"
                                placeholder="date de paiement"
                                type="date"
                                tabindex="0"
                                id="nameEx"
                                v-model="d_paiement"
                                
                            />
                        </div>
                    </div>

                    <div class="col-sm-6">
                        <div class="mb-3">
                            <label for="nameEx" class="form-label">Adresse e-mail</label>
                            <input
                                class="form-control"
                                placeholder="Entre l'adresse e-mail"
                                type="email"
                                tabindex="0"
                                id="nameEx"
                                v-model="email"
                                
                            />
                        </div>
                    </div>
                    <br>
                    <div class="col-sm-6">
                        <div class="mb-3">
                            <label for="nameEx" class="form-label">Numero Cnss</label>
                            <input
                                class="form-control"
                                placeholder="Entre l'adresse e-mail"
                                type="text"
                                tabindex="0"
                                id="nameEx"
                                v-model="num_cnss"
                                
                            />
                        </div>
                    </div>
                    <div class="mb-3 col-md-6">
                        <label for="copie_cnss" class="form-label">Copie cnss</label>
                        <input
                            type="file"
                            class="form-control"
                            id="copie_cnss"
                            name="copie_cnss"
                            @change="handleCNSSChange"
                        />
                    </div>
                    <div class="col-sm-6">
                        <div class="mb-3">
                            <label for="nameEx" class="form-label">Numero Ice</label>
                            <input
                                class="form-control"
                                placeholder="Entre l'adresse e-mail"
                                type="text"
                                tabindex="0"
                                id="nameEx"
                                v-model="num_ice"
                                
                            />
                        </div>
                    </div>
                    <div class="mb-3 col-md-6">
                        <label for="copie_cnss" class="form-label">Copie Ice</label>
                        <input
                            type="file"
                            class="form-control"
                            id="copie_cnss"
                            name="copie_cnss"
                            @change="handleICEChange"
                        />
                    </div>
                    <div class="col-sm-6">
                        <div class="mb-3">
                            <label for="nameEx" class="form-label">Numero RC</label>
                            <input
                                class="form-control"
                                placeholder="Entre l'adresse e-mail"
                                type="text"
                                tabindex="0"
                                id="nameEx"
                                v-model="num_rc"
                                
                            />
                        </div>
                    </div>
                    <div class="mb-3 col-md-6">
                        <label for="copie_cnss" class="form-label">Copie RC</label>
                        <input
                            type="file"
                            class="form-control"
                            id="copie_cnss"
                            name="copie_cnss"
                            @change="handleRCChange"
                        />
                    </div>
                    <div class="col-sm-6">
                        <div class="mb-3">
                            <label for="nameEx" class="form-label">Numero RF</label>
                            <input
                                class="form-control"
                                placeholder="Entre l'adresse e-mail"
                                type="text"
                                tabindex="0"
                                id="nameEx"
                                v-model="num_rf"
                                
                            />
                        </div>
                    </div>
                    <div class="mb-3 col-md-6">
                        <label for="copie_cnss" class="form-label">Copie RF</label>
                        <input
                            type="file"
                            class="form-control"
                            id="copie_cnss"
                            name="copie_cnss"
                            @change="handleRFChange"
                        />
                    </div>
                </div>
                <div class="col-sm-6">
                        <div class="mb-3">
                            <label for="nameEx" class="form-label">Livraison</label>
                            <select name="" id="" class="form-select" v-model="livraison">
                                <option value="1">Oui</option>
                                <option value="0">Non</option>
                            </select>
                            <!-- <input
                                class="form-control"
                                placeholder="Entre l'adresse e-mail"
                                type="text"
                                tabindex="0"
                                id="nameEx"
                                v-model="livraison"
                                
                            /> -->
                        </div>
                    </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-label-outline-dark" data-bs-dismiss="modal">
                    Fermer
                </button>
                <button type="submit" :disabled="isLoading" class="btn btn-primary">
                    <span v-if="isLoading" class="d-flex align-items-center">
                        <div class="spinner-border spinner-border-sm text-white me-2" role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div>
                        Chargement...
                    </span>
                    <span v-else> Terminer</span>
                </button>
            </div>
        </form>
    </Modal>
</template>

<style></style>
