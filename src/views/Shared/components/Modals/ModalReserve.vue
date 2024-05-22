<script setup lang="ts">
import { ref ,computed, onMounted} from 'vue';
import { Modal, MultiSelect } from '@/ui';
import { sharedService } from '@/services';
import { employeeService } from '../../../../services/v2/index'
import { useToast } from 'vue-toastification';
import VueMultiselect from 'vue-multiselect';

import { useHrStore } from './../../../../store/v2/hr_store';

const components = {
  VueMultiselect
}
const props = defineProps({
  employees: Array,
  type : String
})
console.log(props.employees)
const toast = useToast();
const isLoading = ref(false)
const hrStore = useHrStore()

const addTag = (newTag) => {
  const tag = {
    name: newTag,
    code: newTag.substring(0, 2) + Math.floor(Math.random() * 10000000)
  }
  options.value.push(tag)
  selectedEmployees.value.push(tag)
}
// const props = defineProps({
//     type: {
//         type: String,
//         required: true
//     },
//     title: {
//         type: String,
//         default: 'Ajouter un événement'
//     },
//     employees: {
//         type: Array,
//         default: () => []
//     }

//});
const event = ref('')
const date = ref('')
const start = ref('')
const end = ref('')
const comment = ref('')
const selectedEmployees = ref([])
const isShared = ref('')
const options = ref([])

const submit = async () => {
  isLoading.value = true
  const userString = localStorage.getItem('user')
  const user = JSON.parse(userString)
  const userId = user.id
  const formData = new FormData()
  formData.append('event', event.value)
  formData.append('date', date.value)
  formData.append('start', start.value)
  formData.append('end', end.value)
  formData.append('user_id', userId)
  formData.append('is_shared', isShared.value)
  formData.append('comment', comment.value)
  formData.append('type', props.type)
  const EmployeeArray = selectedEmployees.value.map((emp) => emp.id)
  EmployeeArray.forEach((emp) => {
    formData.append('employees[]', emp)
  })

  try {
    const res = await sharedService.createEvent(formData)
            if(res){
                $('#addEventModal').modal('hide');
            toast.success('Evénement ajouté avec succès');
            }
}  catch(error){
        isLoading.value = false;
        toast.error(error.error);
    };
  
};







// const formData = ref({
//     event: '',
//     date: '',
//     start: '',
//     end: '',
//     comment: '',
//     shared: true,
//     type: props.type,
//     employees: []
// });

// const submit = async () => {
//     isLoading.value = true;

//     await sharedService.createEvent(formData.value).then(() => {
//         isLoading.value = false;
//         formData.value = {
//             event: '',
//             date: '',
//             start: '',
//             end: '',
//             comment: '',
//             shared: true,
//             type: props.type,
//             employees: []
//         };
//         $('#addEventModal').modal('hide');
//         toast.success('Evénement ajouté avec succès');
//     }).catch((error) => {
//         isLoading.value = false;
//         toast.error(error.response.data.message);
//     });
// };

</script>

<template>
    <!-- :title="title" -->
    <Modal id="addEventModal" >
        <form @submit.prevent="submit">
            <div class="modal-body">
                <div class="row">
                    <div class="col-12">
                        <div class="mb-3">
                            <label for="eventTitle" class="form-label">Titre <span class="text-danger">*</span> </label>
                            <input v-model="event" type="text" class="form-control" id="eventTitle"
                                placeholder="Titre de l'événement" />
                        </div>
                    </div>
                    <div class="col-12">
                        <div class="mb-3">
                            <label for="eventDate" class="form-label">Date d'événement <span
                                    class="text-danger">*</span>
                            </label>
                            <input v-model="date" type="date" class="form-control" id="eventDate" />
                        </div>
                    </div>
                    <div class=" col-6">
                        <div class="mb-3">
                            <label for="evenetDateStart" class="form-label">Date debut <span
                                    class="text-danger">*</span>
                            </label>
                            <input v-model="start" type="time" class="form-control" id="evenetDateStart" />
                        </div>
                    </div>
                    <div class="col-6">
                        <div class="mb-3">
                            <label for="eventDateEnd" class="form-label">Date fin <span class="text-danger">*</span>
                            </label>
                            <input v-model="end" type="time" class="form-control" id="eventDateEnd" />
                        </div>
                    </div>
                    <div class="col-12">
                        <label for="eventDateEnd" class="form-label">Participants<span class="text-danger">*</span>
                            </label>
            <VueMultiselect
              v-model="selectedEmployees"
              :options="props.employees"
              :multiple="true"
              :close-on-select="false"
              :clear-on-select="false"
              :preserve-search="true"
              placeholder="Choisir les participants"
              label="first_name"
              track-by="id"
              :taggable="true"
              tag-placeholder="Add this as new tag"
              @tag="addTag"
            ></VueMultiselect>
          </div>
                    <div class="col-12">
                        <div class="mb-3">
                            <label for="eventComment" class="form-label">Description <span class="text-danger">*</span>
                            </label>
                            <textarea v-model="comment" class="form-control" id="eventComment"
                                placeholder="Commentaire"></textarea>
                        </div>
                    </div>
                    <div class="col-6">
            <div class="mb-3">
              <div class="form-check form-switch">
                <input
                  class="form-check-input"
                  type="checkbox"
                  id="switchPlaquePPI"
                  v-model="isShared"
                  true-value="true"
                  false-value="false"
                />
                <label class="form-check-label" for="switch">Partager avec tout le monde</label>
              </div>
            </div>
          </div>
                    <!-- <div v-if="type === 'event'" class="col-12">
                        <div class="mb-3">
                            <div class="mb-3 d-flex align-items-center">
                                <input v-model="shared" :value=1 type="checkbox" class="form-check-input me-2"
                                    id="sharedEvent" />
                                <label for="sharedEvent" class="form-check-label">Partager avec tout le monde</label>
                            </div>
                        </div>
                    </div> -->
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-label-outline-dark" data-bs-dismiss="modal">Fermer</button>
                <button type="submit" class="btn btn-primary" :disabled="isLoading">
                    <span v-if="isLoading" class="spinner-border spinner-border-sm" role="status"
                        aria-hidden="true"></span>
                    <span v-else>Ajouter</span>
                </button>
            </div>
        </form>
    </Modal>
</template>

<style src="../../../../../node_modules/vue-multiselect/dist/vue-multiselect.css"></style>