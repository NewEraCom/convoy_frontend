<script setup lang="ts">
import { ref, watch } from 'vue';
import { Modal } from '@/ui';
import { useHrStore } from '@/store';
import { helpers } from '@/utils';

const rhStore = useHrStore();

const isLoading = ref(false);

const formData = ref({
    employee_id: '-',
    employee: null,
    titre: null,
    status: null,
    raison: null,
});

watch(() => rhStore.Item, () => {
    if (rhStore.Item) {
        formData.value.employee_id = rhStore.Item.employee.id;
        formData.value.employee = rhStore.Item.employee.first_name + ' ' + rhStore.Item.employee.last_name;
        formData.value.titre = rhStore.Item.titre;
        formData.value.status = rhStore.Item.status;
        formData.value.raison = rhStore.Item.raison;
        formData.value.status = rhStore.Item.status;
    }
});

// const submit = async () => {



</script>
<template>
    <Modal id="showDemandeRh" title="Details de l'avance sur salaire" size="modal-md">
            <div class="modal-body">
                <div class="row">
                    <div v-if="formData.employee" class="col-sm-6">
                        <div class="mb-3">
                            <label for="avance" class="form-label">Employé <span class="text-danger">*</span></label>
                            <input class="form-control" type="text" placeholder="Nom d'employee" tabindex="0"
                                id="avance" v-model="formData.employee" disabled>
                        </div>
                    </div>

                    <div class="col-sm-6">
                        <div class="mb-3">
                            <label for="avance" class="form-label">Titre <span
                                    class="text-danger">*</span></label>
                            <input class="form-control" type="text" placeholder="Titre"
                                tabindex="0" id="avance" v-model="formData.titre" disabled>
                        </div>
                    </div>

                    <div class="col-sm-12">
                        <div class="mb-3">
                            <label for="deduction" class="form-label">Raison <span
                                    class="text-danger">*</span></label>
                                <textarea name="" id="" cols="30" rows="10" class="form-control" v-model="formData.raison" disabled></textarea>
                        </div>
                    </div>


                    
                    <div class="col-sm-12">
                        <div class="mb-3">
                            <label for="date_start" class="form-label">Status</label>
                            <span class="d-flex fw-bold align-items-center badge badge-pill" style=" height: 40px;"
                                :class="helpers.returnBadge(String(formData.status))[0]">
                                {{ helpers.returnBadge(String(formData.status))[1] }}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-label-outline-dark" data-bs-dismiss="modal" @click="rhStore.Item==null">
                    Fermer
                </button>
                <!-- <button v-if="formData.approval_rh == '0'" type="submit" :disabled="isLoading" class="btn btn-success">
                    <span v-if="isLoading" class="d-flex align-items-center">
                        <div class="spinner-border spinner-border-sm text-white me-2" role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div>
                        Chargement...
                    </span>
                    <span v-else> Valider </span>
                </button> -->
            </div>
    </Modal>
</template>