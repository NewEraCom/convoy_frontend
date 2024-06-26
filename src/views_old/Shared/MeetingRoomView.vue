<script setup lang="ts">
import { watch, ref, computed, onMounted } from 'vue';
import VueCal from 'vue-cal';
import 'vue-cal/dist/vuecal.css';
import { rhService, sharedService } from '@/services';
import { useSharedStore, useRhStore } from '@/store';
import { ModalReserve, EventModal } from './components';

const sharedStore = useSharedStore();
const rhStore = useRhStore();

const minDate = new Date();
const events = ref(computed(() => sharedStore.events));
const employees = ref(computed(() => rhStore.employees));
const dataEvents = ref(events.value);

const onEventClick = (event: any) => {
  sharedStore.setEvent(event);
  $('#eventModal').modal('show');
};

watch(events, () => {
  dataEvents.value = events.value;
}, { deep: true });

onMounted(async () => {
  sharedService.getEvent('reservation');
  rhService.getEmployees();
});

</script>
<template>
  <div class="flex-grow-1 container-fluid mt-3">
    <div class="d-flex align-items-center justify-content-between">
      <h5 class="py-3 mb-4 fw-medium text-muted">Dashboard / <span class="text-dark">Salle de réunion</span> </h5>
      <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addEventModal">
        <i class="ti ti-calendar-plus me-2"></i>
        Réserver la salle de réunion
      </button>
    </div>
    <div class="card ">
      <div v-if="events" class="card-body m-0 p-0 ">
        <vue-cal class="vuecal--green-theme" click-to-navigate :time-from="8 * 60" :time-to="19.5 * 60" :time-step="30"
          active-view="month" :disable-views="['years', 'year']" locale="fr" :min-date="minDate"
          style="width: 100%;height: 56rem" events-on-month-view="short" :events="dataEvents" hide-weekends
          :onEventClick="onEventClick" />
      </div>
      <div v-else>
        <div class="d-flex justify-content-center align-items-center" style="height: 50vh">
          <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    </div>
    <ModalReserve v-if="employees" type="reservation" title="Réserver la salle de réunion" :employees="employees" />
    <EventModal />
  </div>
</template>

<style>
.vuecal__event.shared {
  background-color: rgba(255, 102, 102, 0.9);
  border: 1px solid rgb(235, 82, 82);
  color: #fff;
}

.vuecal__event.personal {
  background-color: rgba(102, 107, 255, 0.9);
  border: 1px solid rgb(46, 62, 239);
  color: #fff;
}

.vuecal__event.meeting {
  background-color: rgb(0, 135, 20);
  border: 1px solid rgb(0, 174, 84);
  color: #ffffff;
}

.vuecal--green-theme .vuecal__menu {
  background-color: #2a3042ff !important;
}

.vuecal--green-theme .vuecal__title-bar {
  background-color: rgb(217, 221, 232) !important;
}
</style>
