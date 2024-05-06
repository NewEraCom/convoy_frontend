<script setup>
import { ref } from 'vue';
import { Modal } from '@/ui';
import { preProjectService } from '@/services';

const isLoading = ref(false);
const maitre_ouvrage = ref('');
const num_offre = ref('');
const created_at = ref('');
const status = ref('');

const submit = async () => {
    try {
        isLoading.value = true;


        const queryParams = {
            maitre_ouvrage: maitre_ouvrage.value,
            num_offre: num_offre.value,
            created_at: created_at.value,
            status: status.value,
        };
        const queryString = new URLSearchParams(queryParams).toString();

        const response = await preProjectService.exportPreProjects(queryString);
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'avant_projet.xlsx'); // Ensure the file name is correct
        document.body.appendChild(link);
        link.click();
    } catch (error) {
        console.log(error);
    } finally {
        isLoading.value = false;
    }
};

</script>

<template>
    <Modal id="export-avantprojet" title="Exporter vers Excel" size="modal-xl">
        <form @submit.prevent="submit">
            <div class="modal-body">
                <div class="row">
                    <small class="text-danger mb-2">* Veuillez remplir les champs suivants pour exporter les avant
                        projets filtrés.</small>
                    <small class="text-danger mb-2">* En indiquant la date de création, vous pourrez afficher toutes les
                        offres créées entre aujourd'hui et la date que vous avez spécifiée.</small>
                </div>
                <div class="row border rounded p-2 m-1">
                    <div class="col-3">
                        <div class="mb-3">
                            <label class="form-label mb-2">Maitre d'ouvrage
                            </label>
                            <input type="text" class="form-control" v-model="maitre_ouvrage"
                                placeholder="Entrez le nom du maitre d'ouvrage" />
                        </div>
                    </div>
                    <div class="col-3">
                        <div class="mb-3">
                            <label class="form-label mb-2">N° d'offre
                            </label>
                            <input type="text" class="form-control" v-model="num_offre"
                                placeholder="Entrez le numéro d'offre" />
                        </div>
                    </div>
                    <div class="col-3">
                        <div class="mb-3">
                            <label class="form-label mb-2">Date de création
                            </label>
                            <input type="date" class="form-control" v-model="created_at"
                                placeholder="Entrez le numéro d'offre" />
                        </div>
                    </div>

                    <div class="col-3">
                        <div class="mb-3">
                            <label class="form-label mb-2">Status
                            </label>
                            <select id="exampleFormControlSelect1" v-model="status" class="form-select"
                                aria-label="Default select example">
                                <option value="">Tout</option>
                                <option value="En attente">En attente</option>
                                <option value="En soumission">En soumission</option>
                                <option value="Gagné">Gagné</option>
                                <option value="Perdu">Perdu</option>
                            </select>
                        </div>
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
