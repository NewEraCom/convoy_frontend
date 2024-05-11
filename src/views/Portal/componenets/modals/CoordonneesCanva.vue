<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps({
    employee: Object,
    workEmail: String
});


const formData = ref({
    email: props.employee.email,
    work_email: props.workEmail,
    phone_no: props.employee.phone_no,
    flotte: props.employee.flotte,
});


</script>
<template>

    <div class="offcanvas offcanvas-end off-canva-width" tabindex="-1" id="coordonneesInfo"
        aria-labelledby="offcanvasEndLabel">
        <div class="offcanvas-header">
            <h5 id="offcanvasEndLabel" class="offcanvas-title">Modifier les coordonnées
            </h5>
            <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body  mx-0 flex-grow-0">
            <form action="">
                <div class="row">

                    <div class="col-12">
                        <div class="mb-3">
                            <label for="adresse" class="form-label">Adresse email personnel</label>
                            <input type="text" class="form-control" id="email" :value="formData.email"
                                placeholder="Enrtrer votre adresse">
                        </div>
                    </div>
                    <div class="col-12">
                        <div class="mb-3">
                            <label for="city" class="form-label">Adresse email professionnel</label>
                            <input type="text" class="form-control" id="city" :value="formData.work_email"
                                placeholder="Enrtrer votre ville">
                        </div>
                    </div>
                    <div class="col-12">
                        <div class="mb-3">
                            <label for="city" class="form-label">Numéro de téléphone personnel</label>
                            <input type="text" class="form-control" id="city" :value="formData.phone_no"
                                placeholder="Enrtrer votre ville">
                        </div>
                    </div>
                    <div class="col-12">
                        <div class="mb-3">
                            <label for="city" class="form-label">Numéro de téléphone professionnel</label>
                            <input type="text" class="form-control" id="city" :value="formData.flotte"
                                placeholder="Enrtrer votre ville">
                        </div>
                    </div>

                </div>
                <div class="row">
                    <div class="col-12 d-flex justify-content-end">
                        <button type="button" class="btn btn-label-outline-dark"
                            data-bs-dismiss="offcanvas">Annuler</button>
                        <button type="submit" class="btn btn-primary">Enregistrer</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>