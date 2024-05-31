<script setup lang="ts">
import { ref, watch } from 'vue';
import { Modal } from '@/ui';
import { useHrStore } from '@/store';
import { helpers } from '@/utils';
import { paieService } from '@/services/v2';
import { Validate } from '.';

const rhStore = useHrStore();

const isLoading = ref(false);

const formData = ref({
    employee_id: '-',
    employee: null,
    avance: null,
    deduction: null,
    date_start: null,
    status: null,
    approval_rh: null,
});

const data = { approval_rh:''};
const changeStatus=(stat)=>{
    data.approval_rh = stat;
};
watch(() => rhStore.Item, () => {
    if (rhStore.Item) {
        formData.value.employee_id = rhStore.Item.employee.id;
        formData.value.employee = rhStore.Item.employee.first_name + ' ' + rhStore.Item.employee.last_name;
        formData.value.avance = rhStore.Item.avance;
        formData.value.deduction = rhStore.Item.deduction;
        formData.value.date_start = rhStore.Item.start_payment;
        formData.value.status = rhStore.Item.status;
        formData.value.approval_rh = rhStore.Item.approval_rh;
    }
});
const submit = async () => {
    if (formData.value.approval_rh!='approved') {
    await paieService.validateSalaryAdvance(rhStore.Item.id,data).then(() => {
        rhStore.Item = null;
        data.approval_rh == 'rejected' ? $('#reject-modal').modal('hide') : $('#validate-modal').modal('hide');
    }).catch((error) => {
        console.error('Error during action execution', error);
    }).finally(() => {
        isLoading.value = false;
    });
}
};


</script>
<template>
    <Modal id="showSalaryAdvance" title="Details de l'avance sur salaire" size="modal-md">
            <div class="modal-body">
                <div class="row">
                    <div v-if="formData.employee" class="col-sm-12">
                        <div class="mb-3">
                            <label for="avance" class="form-label">Employé <span class="text-danger">*</span></label>
                            <input class="form-control" type="text" placeholder="Entrez le total des salaires" tabindex="0"
                                id="avance" v-model="formData.employee" disabled>
                        </div>
                    </div>

                    <div class="col-sm-12">
                        <div class="mb-3">
                            <label for="avance" class="form-label">Montant d'avance <span
                                    class="text-danger">*</span></label>
                            <input class="form-control" type="number" placeholder="Entrez le total des salaires"
                                tabindex="0" id="avance" v-model="formData.avance" disabled>
                        </div>
                    </div>

                    <div class="col-sm-12">
                        <div class="mb-3">
                            <label for="deduction" class="form-label">Payer chaque mois <span
                                    class="text-danger">*</span></label>
                            <input class="form-control" type="number" placeholder="Entrez le total des salaires"
                                tabindex="0" id="deduction" v-model="formData.deduction" disabled>
                        </div>
                    </div>


                    <div class="col-sm-12">
                        <div class="mb-3">
                            <label for="date_start" class="form-label">Date de début <span
                                    class="text-danger">*</span></label>
                            <input class="form-control" type="date" placeholder="Entrez le total des salaires" tabindex="0"
                                id="date_start" v-model="formData.date_start" disabled>
                        </div>
                    </div>
                    <div class="col-sm-12">
                        <div class="mb-3">
                            <label for="date_start" class="form-label">Status</label>
                            <span class="d-flex fw-bold align-items-center badge badge-pill" style=" height: 40px;"
                                :class="helpers.returnBadge(String(formData.approval_rh))[0]">
                                {{ helpers.returnBadge(String(formData.approval_rh))[1] }}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                
                <button v-if="formData.approval_rh == 'pending'" 
                :disabled="isLoading" class="btn btn-success" @click="changeStatus('approved')"
                data-bs-target="#validate-modal" data-bs-toggle="modal">
                    <span v-if="isLoading" class="d-flex align-items-center">
                        <div class="spinner-border spinner-border-sm text-white me-2" role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div>
                        Chargement...
                    </span>
                    <span v-else> Valider </span>
                </button>
                <button v-if="formData.approval_rh == 'pending'" 
                :disabled="isLoading" class="btn btn-danger" @click="changeStatus('rejected')"
                data-bs-target="#reject-modal" data-bs-toggle="modal">
                    <span v-if="isLoading" class="d-flex align-items-center">
                        <div class="spinner-border spinner-border-sm text-white me-2" role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div>
                        Chargement...
                    </span>
                    <span v-else> Rejeter </span>
                </button>
            </div>
    </Modal>
    <Validate id="validate-modal" :isLoading="isLoading" :method="submit" 
      title="Valider Avance" message="Êtes-vous sûr de valider cet avance" severity="success" />
    <Validate id="reject-modal" :isLoading="isLoading" :method="submit" 
      title="Rejeter Avance" message="Êtes-vous sûr de rejeter cet avance" severity="danger" />
</template>