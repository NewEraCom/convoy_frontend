<script setup lang="ts">
import { onUnmounted, ref, watch } from 'vue';
import { Modal } from '@/ui';
import { useHrStore } from '@/store';
import { helpers, formater } from '@/utils';
import {Validate} from './';
import { leaveService } from '@/services';
const rhStore = useHrStore();


const formData = ref({
    employee_id: '-',
    employee: null,
    type: null,
    status: null,
    duration: null,
    start_date: null,
    end_date: null,
    attachment: null,
    created_at: null,
    validation_manager:null,
    reason:null
});
const isLoading = ref(false);
watch(() => rhStore.Item, () => {
    if (rhStore.Item) {
        formData.value.employee_id = rhStore.Item.employee.id;
        formData.value.employee = rhStore.Item.employee.first_name + ' ' + rhStore.Item.employee.last_name;
        formData.value.type = rhStore.Item.type;
        formData.value.status = rhStore.Item.status;
        formData.value.duration = rhStore.Item.duration;
        formData.value.status = rhStore.Item.status;
        formData.value.start_date = rhStore.Item.start_date;
        formData.value.end_date = rhStore.Item.end_date;
        formData.value.attachment = rhStore.Item.attachment;
        formData.value.created_at = rhStore.Item.created_at;
        formData.value.validation_manager = rhStore.Item.validation_manager;
        formData.value.reason = rhStore.Item.reason;
    }
});
const getFileUrl = (attachment) => {
    return helpers.baseUrl() + `uploads/documents/${attachment}`;
};

onUnmounted(()=>{
    rhStore.clearItem();
});


const ValidateConge = async () => {
  isLoading.value = true;

  const formData = new FormData();
  formData.append('status', 'approved');
  await leaveService.validateAdmin(rhStore.Item.id, formData).then(() => {
    isLoading.value = false;
    $('#validate-modal').modal('hide');

  });
console.log(rhStore.Item.id);
  console.log($('#reason').val());
};
const RejectConge = async () => {
  isLoading.value = true;

  const formData = new FormData();
  formData.append('status', 'rejected');
  formData.append('reason', $('#reason').val());
  await leaveService.validateAdmin(rhStore.Item.id, formData).then(() => {
    isLoading.value = false;
    $('#reject-modal').modal('hide');

  });
  console.log(rhStore.Item.id);
  console.log($('#reason').val());
};
</script>
<template>
    <Modal id="showLeave" title="Details de la demande de congé" size="modal-xl">
        <div class="modal-body">
            <div class="row">
                <div class="col-sm-12">
                    <div class="mb-3  float-end">
                        <button class="btn btn-success m-1" data-bs-target="#validate-modal" data-bs-toggle="modal">Approuvé</button>
                        <button class="btn btn-danger m-1" data-bs-target="#reject-modal" data-bs-toggle="modal">Rejetée</button>
                    </div>
                </div>
                <div v-if="formData.employee" class="col-sm-12">
                    <div class="mb-3">
                        <label for="avance" class="form-label">Employé</label>
                        <input class="form-control" type="text" tabindex="0" id="avance" v-model="formData.employee"
                            disabled>
                    </div>
                </div>

                <div class="col-sm-6">
                    <div class="mb-3">
                        <label for="Type" class="form-label">Type</label>
                        <input class="form-control" type="text" tabindex="0" id="Type" v-model="formData.type" disabled>
                    </div>
                </div>

                <div class="col-sm-6">
                    <div class="mb-3">
                        <label for="deduction" class="form-label">Durée</label>
                        <input class="form-control" type="text" tabindex="0" id="Type" v-model="formData.duration"
                            disabled>
                    </div>
                </div>
                <div class="col-sm-6">
                    <div class="mb-3">
                        <label for="deduction" class="form-label">Date debut</label>
                        <input class="form-control" type="date" tabindex="0" id="Type" v-model="formData.start_date"
                            disabled>
                    </div>
                </div>
                <div class="col-sm-6">
                    <div class="mb-3">
                        <label for="deduction" class="form-label">Date fin</label>
                        <input class="form-control" type="date" tabindex="0" id="Type" v-model="formData.end_date"
                            disabled>
                    </div>
                </div>
                <div class="col-sm-12" v-if="formData.attachment">
                    <div class="mb-3">
                        <label for="deduction" class="form-label">Attachement</label>
                        <div class="card-body d-flex align-items-center">
                            <div class="bg-label-primary p-3 rounded">
                                <i class="ti ti-file-filled"></i>
                            </div>
                            <div class="ms-2">
                                <a :href="getFileUrl(formData.attachment)" target="_blank">
                                    <h6 class="mb-2">
                                        {{
                    formater.limitText(
                        formData.attachment,
                        55
                    )
                }}
                                    </h6>
                                </a>
                                <small class="mt-auto">Créé le
                                    {{
                        formater.date(
                            formData.created_at
                        )
                    }}</small>
                            </div>

                        </div>
                    </div>
                </div>


                <div class="col-sm-6">
                    <div class="mb-3">
                        <label for="date_start" class="form-label">Validation Responsable</label>
                        <span class="d-flex fw-bold align-items-center badge badge-pill" style=" height: 40px;"
                            :class="helpers.returnBadge(String(formData.validation_manager))[0]">
                            {{ helpers.returnBadge(String(formData.validation_manager))[1] }}
                        </span>
                    </div>
                </div>
                <div class="col-sm-6">
                    <div class="mb-3">
                        <label for="date_start" class="form-label"></label>
                        <span class="d-flex fw-bold align-items-center badge badge-pill" style=" height: 40px;"
                            :class="helpers.returnBadge(String(formData.status))[0]">
                            {{ helpers.returnBadge(String(formData.status))[1] }}
                        </span>
                    </div>
                </div>
                <div class="col-sm-6" v-if="formData.status=='rejected' || formData.validation_manager=='rejected'">
                    <div class="mb-3">
                        <label for="deduction" class="form-label">Raison</label>
                        <input class="form-control" type="text" tabindex="0" id="Type" v-model="formData.reason"
                            disabled>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-label-outline-dark" data-bs-dismiss="modal"
                @click="rhStore.Item == null">
                Fermer
            </button>
           
        </div>
    </Modal>
    <Validate id="validate-modal" :isLoading="isLoading" :method="ValidateConge" :itemid="rhStore.Item.id" v-if="rhStore.Item"
      title="Valider congé" message="Êtes-vous sûr de valider ce congé" severity="success" />
    <Validate id="reject-modal" :isLoading="isLoading" :method="RejectConge" :itemid="rhStore.Item.id" v-if="rhStore.Item"
      title="Rejeter congé" message="Êtes-vous sûr de rejeter ce congé" severity="danger" :reason="true"/>
</template>