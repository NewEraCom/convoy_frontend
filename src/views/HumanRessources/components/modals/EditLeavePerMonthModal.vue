<script setup lang="ts">
import { ref, watch } from 'vue';
import { Modal } from '@/ui';
import { employeeService } from '@/services/v2/human_ressource';
import { useToast } from 'vue-toastification';

const toast = useToast();

const isLoading = ref(false);

const props = defineProps({
    id: {
        type: Object,
        required: true,
    },
    oldDayPerMonth: {
        type: Number,
        required: true,
    },
});


const solde_conge = ref(null);
const operation = ref(null);


const submit = async () => {
    isLoading.value = true;
    console.log(props.id);

    const formData = {
        solde_conge: solde_conge.value,
        operation: operation.value,

    };
    await employeeService.EditLeaveEmployee(props.id, formData).then(() => {
        $('#editLeavePerMonth').modal('hide');
        toast.success('Solde de congé modifié avec succès');
    }).catch((error) => {
        console.error('Error during action execution', error);
        toast.error('Une erreur est survenue');
    }).finally(() => {
        isLoading.value = false;
    });
};

watch(() => props.oldDayPerMonth, (value) => {
    dayPerMonth.value = value;
});


</script>

<template>
    <Modal id="editLeavePerMonth" title="Modification de congé" size="modal-md">
        <form @submit.prevent="submit">
            <div class="modal-body">
                <div class="row">
                    <div class="col-sm-12">
                        <div class="mb-3">
                            <label class="form-label mb-1">
                                Opération
                                <span class="text-danger font-18">*</span>
                            </label>
                            <div class="d-flex align-items-center justify-content-around">

                                <div class="form-check ">
                                    <input class="form-check-input" type="radio" id="addValue" name="operation" value="add" v-model="operation" required>
                                    <label class="form-check-label" for="addValue">
                                        Ajouter des jours
                                    </label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" type="radio" id="subtractValue" name="operation" value="subtract" v-model="operation" required>
                                    <label class="form-check-label" for="subtractValue">
                                        Soustraire des jours
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div class="mb-3">
                            <label for="newSalary" class="form-label mb-1">
                                Nombre de Jours
                                <span class="text-danger font-18">*</span>
                            </label>
                            <input type="number" name="" id="" class="form-control" v-model="solde_conge">
                        </div>
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
                    <span v-else> Modifier</span>
                </button>
            </div>
        </form>
    </Modal>
</template>