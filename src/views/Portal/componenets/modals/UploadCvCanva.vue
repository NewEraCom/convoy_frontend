<script setup lang="ts">
import { ref } from 'vue';


const cv = ref(null);


</script>
<template>

    <div class="offcanvas offcanvas-end off-canva-width" tabindex="-1" id="uploadCv"
        aria-labelledby="offcanvasEndLabel">
        <div class="offcanvas-header">
            <h5 id="offcanvasEndLabel" class="offcanvas-title">Modifier votre CV
            </h5>
            <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body  mx-0 flex-grow-0">
            <form action="">
                <div class="row">
                    <div class="col-12">
                        <div class="mb-3">
                            <label for="adresse" class="form-label">CV</label>
                            <input type="file" class="form-control" id="email" :ref="cv"
                                placeholder="Enrtrer votre adresse">
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