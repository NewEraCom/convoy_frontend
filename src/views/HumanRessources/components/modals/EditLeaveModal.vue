<script setup lang="ts">
import { ref,watch } from 'vue';
import { Modal, CustomSelect } from '@/ui';
import { leaveService } from '@/services/v2/human_ressource';

const props = defineProps({
    employees: {
        type: Object,
        default: () => ({})
    },
    leave :{
        type:Object,
        required:true
    }
});
const isLoading = ref(false);

const formData = ref({
    start_date: null,
    end_date: null,
    type: '-',
    duration: null,
    employee_id: '-',
    attachment: null,
    deducted_sick_leave: null,
    status:null,
    validation_manager:null


});
watch(props,()=>{
    if(props.leave){
        formData.value.start_date = props.leave.start_date;
        formData.value.end_date = props.leave.end_date;
        formData.value.type = props.leave.type;
        formData.value.duration = props.leave.duration;
        formData.value.employee_id = props.leave.employee_id;
        formData.value.attachment = props.leave.attachment;
        formData.value.deducted_sick_leave = props.leave.deducted_sick_leave;
        formData.value.status = props.leave.status;
        formData.value.validation_manager = props.leave.validation_manager;

    }
});
const handleFileChange = (e) => {
    formData.value.attachment = e.target.files[0];
};

const submit = async () => {
    isLoading.value = true;

    formData.value.employee_id = formData.value.employee_id.key;
    
    
    await leaveService.editLeave(formData.value,props.leave.id).then(() => {
        isLoading.value = false;
        $('#edit-leave').modal('hide');
    }).catch(() => {
        isLoading.value = false;
    });
};
</script>
<template>
    <Modal id="edit-leave" title="Edit Congé" size="modal-xl">
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
                    <div class="col-sm-6">
                        <div class="mb-3">
                            <label for="start" class="form-label">Date debut de congé <span
                                    class="text-danger">*</span></label>
                            <input class="form-control" placeholder="" type="date" tabindex="0" id="start"
                                v-model="formData.start_date" required />
                        </div>
                    </div>
                    <div class="col-sm-6">
                        <div class="mb-3">
                            <label for="end" class="form-label">Date fin de congé <span
                                    class="text-danger">*</span></label>
                            <input class="form-control" placeholder="" type="date" tabindex="0" id="end"
                                v-model="formData.end_date" required />
                        </div>
                    </div>
                    <div class="col-sm-6">
                        <div class="mb-3">
                            <label for="type" class="form-label">Type de congé <span
                                    class="text-danger">*</span></label>
                            <select name="" id="type" class="form-select" required v-model="formData.type">
                                <option value="-">Choisir un type</option>
                                <option value="conge">Congé</option>
                                <option value="maladie">Maladie</option>
                            </select>
                        </div>
                    </div>
                    <div class="col-sm-6">
                        <div class="mb-3">
                            <label for="duree" class="form-label">Durée de congé <span
                                    class="text-danger">*</span></label>
                            <input class="form-control" placeholder="Entre le nombre de jours" type="number"
                                tabindex="0" id="duree" v-model="formData.duration" required />
                        </div>
                    </div>
                    <div v-if="formData.type == 'maladie'" class="col-sm-6">
                        <div class="mb-3">
                            <label for="attachemet" class="form-label">Attachement (Certificat médical, Email de
                                demande,
                                etc.) <span class="text-danger">*</span></label>
                            <input class="form-control" placeholder="" type="file" tabindex="0" id="attachemet"
                                name="attachemet" @change="handleFileChange" required />
                        </div>
                    </div>
                    <div v-if="formData.type == 'maladie' && formData.duration > 3" class="col-sm-12">
                        <div class="alert alert-warning d-flex align-items-center" role="alert">
                            <span class="alert-icon text-warning me-2">
                                <i class="ti ti-bell ti-xs"></i>
                            </span>
                            Votre congé maladie dépasse 3 jours. Veuillez choisir entre déduire les jours excédentaires de votre salaire ou de votre solde de congés.
                        </div>
                        <div class="d-flex align-items-center justify-content-around">
                            <div class="form-check ">
                                <input class="form-check-input" type="radio" id="conge" name="deducted_sick_leave" value="conge" v-model="formData.deducted_sick_leave" required>
                                <label class="form-check-label" for="addValue">
                                    Solde de congé
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" id="pay" name="deducted_sick_leave" value="pay" v-model="formData.deducted_sick_leave" required>
                                <label class="form-check-label" for="subtractValue">
                                    Salaire
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-label-outline-dark" data-bs-dismiss="modal">
                    Fermer
                </button>
                <button type="submit" :disabled="isLoading" class="btn btn-primary" v-if="formData.status != 'approved' && formData.validation_manager != 'approved'">
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