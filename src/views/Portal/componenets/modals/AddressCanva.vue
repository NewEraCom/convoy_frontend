<script setup lang="ts">
import { ref } from 'vue';
import { portalService } from '@/services';
import { useToast } from 'vue-toastification';

const toast = useToast();


const props = defineProps({
    employee: Object
});


const isLoading = ref(false);

const formData = ref({
    address: props.employee.address,
    city: props.employee.city
});

const saveAddress = () => {
    isLoading.value = true;

    const query = new FormData();

    query.append('address', formData.value.address);
    query.append('city', formData.value.city);

    portalService.updateAddress(query).then(() => {
        toast.success('Adresse modifiée avec succès');
    }).catch(() => {
        toast.error('Erreur lors de la modification de l\'adresse');
    }).finally(() => {
        isLoading.value = false;
    });
};

</script>
<template>

    <div class="offcanvas offcanvas-end off-canva-width" tabindex="-1" id="addressInfo"
        aria-labelledby="offcanvasEndLabel">
        <div class="offcanvas-header">
            <h5 id="offcanvasEndLabel" class="offcanvas-title">Modifier l'adresse
            </h5>
            <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body  mx-0 flex-grow-0">
            <form @submit.prevent="saveAddress">
                <div class="row">

                    <div class="col-12">
                        <div class="mb-3">
                            <label for="adresse" class="form-label">Adresse</label>
                            <input type="text" class="form-control" id="email" v-model="formData.address"
                                placeholder="Enrtrer votre adresse">
                        </div>
                    </div>
                    <div class="col-12">
                        <div class="mb-3">
                            <label for="city" class="form-label">Ville</label>
                            <input type="text" class="form-control" id="city" v-model="formData.city"
                                placeholder="Enrtrer votre ville">
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-12 d-flex justify-content-end">
                        <button type="button" class="btn btn-label-outline-dark"
                            data-bs-dismiss="offcanvas">Annuler</button>
                        <button type="submit" class="btn btn-primary" :disabled="isLoading">
                            <span v-if="isLoading" class="spinner-border spinner-border-sm" role="status"
                                aria-hidden="true"></span>
                            <span v-else>Modifier</span>
                        </button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>