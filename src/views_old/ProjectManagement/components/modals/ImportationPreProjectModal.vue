<script setup>
import { ref } from 'vue';
import { pmService } from '@/services';
import { useToast } from 'vue-toastification';

const toast = useToast();

let file = ref('');


let message = ref(null);

const isLoading = ref(false);

const submit = async () => {

    isLoading.value = true;

    const formData = new FormData();
};
</script>

<template>
    <form @submit.prevent="submit">
        <div class="modal-body">
            <div class="row">
                <div class="col-sm-12">
                    <div class="mb-3">
                        <label class="form-label mb-2">Fichier a importer</label>
                        <input type="file" class="form-control" :ref="file" accept=".csv" required>
                    </div>
                </div>
            </div>
            <div class="row">
                <label for="">
                    <small class="text-primary" href="">Veuillez télécharger le modèle de fichier CSV pour l'importation
                        des
                        avant-projets</small>
                </label>
            </div>
        </div>
        <div class="modal-footer">
            <div v-if="message != null" class="alert alert-danger" role="alert">
                <span class="message-error"> {{ message }}</span>
            </div>
            <button type="button" class="btn btn-label-outline-dark" data-bs-dismiss="modal">
                Fermer
            </button>

            <button type="submit" :disabled="isLoading" class="btn btn-primary me-0">
                <span v-if="isLoading" class="d-flex align-items-center">
                    <div class="spinner-border spinner-border-sm text-white" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                </span>
                <span v-else> Terminer</span>
            </button>
        </div>
    </form>
</template>

<style scoped>
.custom-option-icon.checked i {
    color: #324877;
}

.font-18 {
    font-size: 14px !important;
}

.message-error::first-letter {
    text-transform: uppercase;
}

.message-error {
    font-weight: 800;
    text-transform: lowercase;
}
</style>
