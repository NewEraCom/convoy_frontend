<script setup lang="ts">
import { watch, ref, computed, onMounted } from 'vue';
import VueCal from 'vue-cal';
import 'vue-cal/dist/vuecal.css';
import { employeeService } from '@/services';
import { eventService } from '@/services/v2';
import { useHrStore } from './../../store/v2/hr_store';
import { useSharedStore } from '../../store/v2/shared_store';

import ModalReserve from './components/Modals/ModalReserve.vue'

const sharedStore = useSharedStore();
const hrStore = useHrStore()
const employees = ref(computed(() => hrStore.employees))
const minDate = new Date();
const events = ref(computed(() => sharedStore.events));
console.log(events)

watch(events, () => {
    events.value = sharedStore.events;
}, { deep: true });

onMounted(async () => {
    await employeeService.getEmployees();
   await eventService.getEvent('coursier');
});
const onEventClick = (event: any) => {
  sharedStore.setEvent(event);
  $('#eventModal').modal('show');
};
</script>

<template>
    <div class="flex-grow-1 container-fluid mt-3">
        <div class="d-flex align-items-center justify-content-between mb-3">
            <nav aria-label="breadcrumb mb-0 pb-0">
                <ol class="breadcrumb mb-0 pb-0">
                    <li class="breadcrumb-item">
                        <a href="javascript:void(0);">Dashboard</a>
                    </li>
                    <li class="breadcrumb-item active">Coursier</li>
                </ol>
            </nav>
            <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addEventModal">
                <i class="ti ti-calendar-plus me-2"></i>
                Ajouter un événement
            </button>
        </div>
        <div class="card ">
      <div v-if="events" class="card-body m-0 p-0 ">
        <vue-cal class="vuecal--green-theme" click-to-navigate :time-from="8 * 60" :time-to="19.5 * 60" :time-step="30"
          active-view="month" :disable-views="['years', 'year']" locale="fr" :min-date="minDate"
          style="width: 100%;height: 56rem" events-on-month-view="short" :events="events" hide-weekends
          :onEventClick="onEventClick" />
      </div>
    </div>
        <!-- <div class="card">
            <div v-if="events" class="card-body m-0 p-0 ">
                <vue-cal class="vuecal--green-theme" click-to-navigate :time-from="8 * 60" :time-to="19.5 * 60"
                    :time-step="30" active-view="month" :disable-views="['years', 'year']" locale="fr"
                    :min-date="minDate" style="width: 100%;height: 56rem" events-on-month-view="short" :events="events"
                    hide-weekends onEventClick="" />
            </div>
        </div> -->
        <!-- <ModalReserve type="event" title="Ajouter un événement" />
        <EventModal /> -->
        <ModalReserve :employees="employees" type="coursier" title="Réserver la salle de réunion"/>
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


<!-- <div class="card">
    <div v-if="events" class="card-body m-0 p-0 ">
        <vue-cal class="vuecal--green-theme" click-to-navigate :time-from="8 * 60" :time-to="19.5 * 60"
            :time-step="30" active-view="month" :disable-views="['years', 'year']" locale="fr"
            :min-date="minDate" style="width: 100%;height: 56rem" events-on-month-view="short" :events="events"
            hide-weekends :onEventClick="onEventClick" />
    </div>
</div> -->