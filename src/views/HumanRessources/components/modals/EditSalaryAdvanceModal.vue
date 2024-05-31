<script setup lang="ts">
import { ref, watch } from 'vue';
import { Modal ,CustomSelect} from '@/ui';
import { useHrStore } from '@/store';
import { paieService } from '@/services';
import { useToast } from 'vue-toastification';

const toast = useToast();
const rhStore = useHrStore();

const isLoading = ref(false);
defineProps({
    employees: {
        type: Object,
        default: () => ({})
    }
});

const formData = ref({
    employee_id: '-',
    avance: null,
    deduction: null,
    start_payment: null,
    status: null,
    approval_rh: null,
    restant: null,
});

watch(() => rhStore.Item, () => {
    if (rhStore.Item) {
        formData.value.employee_id = rhStore.Item.employee.id;
        formData.value.avance = rhStore.Item.avance;
        formData.value.deduction = rhStore.Item.deduction;
        formData.value.start_payment = rhStore.Item.start_payment;
        formData.value.status = rhStore.Item.status;
        formData.value.restant = rhStore.Item.restant;
        formData.value.approval_rh = rhStore.Item.approval_rh;
    }
});

const submit = async () => {
    isLoading.value = true;
    if (formData.value.approval_rh!='approved') {
        formData.value.employee_id = formData.value.employee_id.key;
        formData.value.restant = formData.value.avance;
        await paieService.updateSalaryAdvance(rhStore.Item.id,formData.value).then(() => {
            rhStore.Item = null;
            $('#editSalaryAdvance').modal('hide');
        }).catch((error) => {
            console.error('Error during action execution', error);
        }).finally(() => {
            isLoading.value = false;
        });
    }else{
        toast.error('Cette avance est déjà validée et ne peut pas être modifiée.');
    }
};


</script>
<template>
    <Modal id="editSalaryAdvance" title="Edit l'avance sur salaire" size="modal-md">
        <form @submit.prevent="submit" enctype="multipart/form-data">
            <div class="modal-body">
                <div class="row">
                    <div v-if="employees != null" class="col-12 mb-3">
                        <CustomSelect v-model="formData.employee_id" placeholder="Choisir un employee" label="Employee"
                            :data="employees.filter(item => item.status == 'active').map((item) => ({
                            key: item.id,
                            value: item.first_name + ' ' + item.last_name
                        }))
                            " />
                    </div>
                    <div class="col-sm-12">
                        <div class="mb-3">
                            <label for="avance" class="form-label">Montant d'avance <span
                                    class="text-danger">*</span></label>
                            <input class="form-control" type="number" placeholder="Entrez le total des salaires"
                                tabindex="0" id="avance" v-model="formData.avance" required>
                        </div>
                    </div>

                    <div class="col-sm-12">
                        <div class="mb-3">
                            <label for="deduction" class="form-label">Payer chaque mois <span
                                    class="text-danger">*</span></label>
                            <input class="form-control" type="number" placeholder="Entrez le total des salaires"
                                tabindex="0" id="deduction" v-model="formData.deduction" required>
                        </div>
                    </div>


                    <div class="col-sm-12">
                        <div class="mb-3">
                            <label for="date_start" class="form-label">Date de début <span
                                    class="text-danger">*</span></label>
                            <input class="form-control" type="date" placeholder="Entrez le total des salaires"
                                tabindex="0" id="date_start" v-model="formData.start_payment" required>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-label-outline-dark" data-bs-dismiss="modal">
                    Fermer
                </button>
                <button type="submit" :disabled="isLoading" class="btn btn-primary" v-if="formData.approval_rh!='approved'">
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