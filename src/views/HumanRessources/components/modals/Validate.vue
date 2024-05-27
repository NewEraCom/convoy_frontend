<script setup>
import { Modal } from '@/ui';

defineProps({
    id: String,
    isLoading: Boolean,
    method: Function,
    itemid: String,
    title: String,
    message: String,
    severity: String,
    reason: Boolean, // Add this line
});
</script>

<template>
    <Modal :id="id" :title="title">
        <form @submit.prevent="method">
            <div class="modal-body">
                <input type="text" id="validateInput" hidden :value="itemid" />
                <p>{{ message }}</p>
                
                <div class="col-sm-12" v-if="reason">
                    <div class="mb-3">
                        <label for="Type" class="form-label">Raison</label>
                        <input class="form-control" type="text" id="reason" >
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-label-outline-dark" data-bs-dismiss="modal">
                    Fermer
                </button>
                <button type="submit" :class="severity == 'success' ? 'btn btn-success me-0' : 'btn btn-danger me-0'"
                    :disabled="isLoading">
                    <span v-if="isLoading" class="d-flex align-items-center">
                        <div class="spinner-border spinner-border-sm text-white" role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div>
                    </span>
                    <span v-else>Oui, Valider</span>
                </button>
            </div>
        </form>
    </Modal>
</template>

<style></style>