<script setup>
import { ref } from 'vue';
import { Modal } from '@/ui';
import { preProjectService } from '@/services';

const isLoading = ref(false);

const file = ref(null);


const handleFileUpload = (event) => {
    file.value = event.target.files[0];
};

const submit = async () => {

    isLoading.value = true;

    const formData = new FormData();
    formData.append('file', file.value);

    await preProjectService.importPreProjects(formData);
};

</script>

<template>
    <Modal id="import-avantprojet" title="Importer les appels d'offres" size="modal-md">
        <form @submit.prevent="submit">
            <div class="modal-body">
                <div class="row">
                    <div class="col-12 mb-3">
                        <small class="text-danger">
                            * Merci de télécharger le modèle ci-dessous et de l'utiliser pour vérifier le bon
                            fonctionnement de tout.
                        </small>
                    </div>
                    <div class="col-12">
                        <div class="mb-3">
                            <label class="form-label mb-2">
                                File à importer
                            </label>
                            <input type="file" class="form-control" @change="handleFileUpload" accept=".xlsx"
                                required />
                        </div>
                    </div>
                    <div class="col-12 mt-2">
                        <a href="/src/assets/Template_AO.xlsx" class="btn-link">
                            <i class="ti ti-file-download"></i> Télécharger le modèle
                        </a>
                    </div>
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
                    <span v-else> Exporter</span>
                </button>
            </div>
        </form>
    </Modal>
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
