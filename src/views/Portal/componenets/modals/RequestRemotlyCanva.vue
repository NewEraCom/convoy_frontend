<script setup lang="ts">
import { ref } from 'vue';


const formData = ref({
    duration: '',
    start_date: '',
    end_date: '',

});


</script>
<template>

    <div class="offcanvas offcanvas-end off-canva-width" tabindex="-1" id="requestRemotly"
        aria-labelledby="offcanvasEndLabel">
        <div class="offcanvas-header">
            <h5 id="offcanvasEndLabel" class="offcanvas-title">Demande de travail à distance
            </h5>
            <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body  mx-0 flex-grow-0">
            <form action="">
                <div class="row">
                    <div class="col-12">
                        <div class="mb-3">
                            <label for="duration" class="form-label">Duration <span class="text-danger">*</span></label>
                            <input type="number" class="form-control" id="duration" :value="formData.duration"
                                placeholder="Enrtrer la durée" required>
                        </div>
                    </div>
                    <div class="col-12">
                        <div class="mb-3">
                            <label for="start_date" class="form-label">Date de début <span
                                    class="text-danger">*</span></label>
                            <input type="date" class="form-control" id="start_date" :value="formData.start_date"
                                required>
                        </div>
                    </div>
                    <div class="col-12">
                        <div class="mb-3">
                            <label for="end_date" class="form-label">Date de fin <span
                                    class="text-danger">*</span></label>
                            <input type="date" class="form-control" id="end_date" :value="formData.end_date" required>
                        </div>
                    </div>
                    <div class="col-12">
                        <div class="mb-3">
                            <label for="message" class="form-label">Message <span class="text-danger">*</span></label>
                            <textarea class="form-control" id="message" rows="5" placeholder="Enrtrer votre message"
                                required></textarea>
                        </div>
                    </div>
                    <div class="col-12">
                        <div class="alert alert-danger" role="alert">
                            <p>Votre demande doit être soumise au moins une semaine à l'avance pour être validée.</p>
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