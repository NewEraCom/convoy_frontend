<script setup lang="ts">
import { ref } from 'vue';
import { Modal, CustomSelect } from '@/ui';


defineProps({
    employees: {
        type: Object,
        default: () => ({})
    },
});


const isLoading = ref(false);

const formData = ref({
    employee_id: '-',
});




const submit = async () => {
};

</script>
<template>
    <Modal id="affectVehicule" title="Ajouter un pointage" size="modal-lg">
        <form @submit.prevent="submit">
            <div class="modal-body">
                <div class="row">
                    <div v-if="employees != null" class="col-12 mb-3">
                        <CustomSelect v-model="formData.employee_id" placeholder="Choisir un employee" label="Employee"
                            :data="employees.filter(item => item.status == 1).map((item) => ({
            key: item.id,
            value: item.first_name + ' ' + item.last_name
        }))
            " />
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
                    <span v-else> Terminer</span>
                </button>
            </div>
        </form>
    </Modal>
</template>