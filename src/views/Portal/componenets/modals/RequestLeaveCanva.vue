<script setup lang="ts">
import { ref } from 'vue';

const formData = ref({
    dateDebut: '',
    dateFin: '',
    duration: '',
    type: '',
    certificat: '',
    message: ''
});

</script>

<template>
    <div class="offcanvas offcanvas-end off-canva-width" tabindex="-1" id="requestLeave"
        aria-labelledby="offcanvasEndLabel">
        <div class="offcanvas-header">
            <h5 id="offcanvasEndLabel" class="offcanvas-title">Demande de congé
            </h5>
            <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body  mx-0 flex-grow-0">
            <form action="">
                <div class="row">
                    <div class="col-12">
                        <div class="mb-3">
                            <label for="dateDebut" class="form-label">Date de début</label>
                            <input type="date" class="form-control" id="dateDebut" required>
                        </div>
                    </div>
                    <div class="col-12">
                        <div class="mb-3">
                            <label for="dateFin" class="form-label">Date de fin</label>
                            <input type="date" class="form-control" id="dateFin" required>
                        </div>
                    </div>
                    <div class="col-12">
                        <div class="mb-3">
                            <label for="duration" class="form-label">Duration</label>
                            <input type="number" class="form-control" id="duration" placeholder="Duration" required>
                        </div>
                    </div>
                    <div class="col-12">
                        <div class="mb-3">
                            <label for="type" class="form-label">Type</label>
                            <select class="form-select" id="type" v-model="formData.type" required>
                                <option value="">Choisir un type</option>
                                <option value="congé">Congé</option>
                                <option value="maladie">Maladie</option>
                            </select>
                        </div>
                    </div>
                    <div class="col-12" v-if="formData.type == 'maladie'">
                        <div class="mb-3">
                            <label for="certificat" class="form-label">Certificat</label>
                            <input type="files" class="form-control" id="certificat" placeholder="certificat" required>
                        </div>
                    </div>
                    <div class="col-12">
                        <div class="mb-3">
                            <label for="message" class="form-label">Message</label>
                            <textarea class="form-control" id="message" rows="5" placeholder="Message"
                                required></textarea>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-12 d-flex justify-content-end">
                        <button type="button" class="btn btn-label-outline-dark"
                            data-bs-dismiss="offcanvas">Annuler</button>
                        <button type="submit" class="btn btn-primary">Envoyer</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>