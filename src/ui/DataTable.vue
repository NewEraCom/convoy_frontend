<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { formater, helpers } from '@/utils';
const role = localStorage.getItem('role');

//const role = localStorage.getItem('role');
type Item = {
    [key: string]: any; // This allows any number of properties with any type
}

type ActionButton = {
    icon?: string | ((item: Item) => void);
    class: string;
    type?: string;
    text?: string;
    onClick: (item: Item) => void;
};

const props = defineProps<{
    items: Item[],
    headers: Array<{ text: string, value?: string, isComplex?: boolean, type?: string }>,
    buttonType?: string,
    pageSize: number,
    disabled?: string,
    actionsConfig: ActionButton[];
}>();

const currentPage = ref(1);
const sortKey = ref('');
const sortOrder = ref('asc');

const sortedItems = computed(() => {
    return [...props.items].sort((a, b) => {
        let modifier = 1;
        if (sortOrder.value === 'desc') modifier = -1;
        if (a[sortKey.value] < b[sortKey.value]) return -1 * modifier;
        if (a[sortKey.value] > b[sortKey.value]) return 1 * modifier;
        return 0;
    });
});

const paginatedItems = computed(() => {
    const start = (currentPage.value - 1) * props.pageSize;
    const end = start + props.pageSize;
    return sortedItems.value.slice(start, end);
});

const totalPageNumbers = computed(() => {
    return Math.ceil(props.items.length / props.pageSize);
});

function sortTable(key: string) {
    if (sortKey.value === key) {
        sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc';
    } else {
        sortKey.value = key;
        sortOrder.value = 'asc';
    }
}

function changePage(page: number) {
    currentPage.value = page;
}

const visiblePageNumbers = computed(() => {
    const pages = [];
    const totalPages = totalPageNumbers.value;
    const currentPageNum = currentPage.value;
    const pageRangeDisplayed = 2; // Number of pages shown before and after the current page

    let startPage = currentPageNum - pageRangeDisplayed;
    let endPage = currentPageNum + pageRangeDisplayed;

    if (startPage <= 1) {
        startPage = 1;
        endPage = Math.min(startPage + pageRangeDisplayed * 2, totalPages);
    }

    if (endPage >= totalPages) {
        endPage = totalPages;
        startPage = Math.max(1, endPage - pageRangeDisplayed * 2);
    }

    // Ensure startPage is always 1 or more
    startPage = Math.max(startPage, 1);

    for (let number = startPage; number <= endPage; number++) {
        pages.push(number);
    }

    return pages;
});

watch(() => props.pageSize, () => {
    currentPage.value = 1;
});


function getIcon(item, action) {
      return typeof action.icon === 'function' ? action.icon(item) : action.icon;
    }
function getClass(item, action) {
      if (action.type === 'delete') {
        return item.status === this.disabled  ?'btn btn-secondary btn-sm': action.class;
      }
      return typeof action.class === 'function' ? action.class(item) : action.class;
    }
    const getFileUrl = (attachment) => {
    console.log(attachment);

    return helpers.baseUrl() + `uploads/${attachment}`;
};
</script>

<template>
    <div>
        <table class="table">
            <thead class="table-light">
                <tr>
                    <th v-for="(header, index) in headers" @click="sortTable(header.value)" :key="header.value"
                        :class="index == 0 ? 'text-start' : 'text-center'" style="cursor: pointer" class="fw-bold">
                        {{ header.text }}
                        <span v-if="sortKey === header.value">{{ sortOrder === 'asc' ? '↑' : '↓' }}</span>
                    </th>
                    <th></th>
                </tr>
            </thead>
            <tbody v-if="paginatedItems.length > 0">
                <tr v-for="item in paginatedItems" :key="item.id">
                    <template v-for="(header, index) in headers" :key="header.value">
                        <td v-if="header.isComplex && header.type === 'preproject'"
                            :class="index == 0 ? 'text-start' : 'text-center'">
                            <router-link :to="{ name: 'DetailsPreProject', params: { id: item.id } }">
                                <h6 class="mb-1 fw-bold text-primary">
                                    {{ item.n_offre }}
                                    <i class="ti ti-bookmark-filled text-danger"
                                        v-if="item.type_project == 'special'"></i>
                                </h6>
                            </router-link>
                            <small class="fw-bold text-muted">Maitre ouvrage : {{ item.maitre_ouvrage }}</small>
                        </td>
                        <td v-if="header.isComplex && header.type === 'project'" class="text-primary"
                            :class="index == 0 ? 'text-start' : 'text-center'">
                            <router-link to="">
                                <h6 class="mb-1 fw-bold">{{ item.code }}</h6>
                            </router-link>
                            <small class="fw-bold text-muted">Maitre ouvrage : {{ item.pre_project.maitre_ouvrage
                                }}</small>
                        </td>
                        <td v-if="header.isComplex && header.type === 'client'" class="text-primary"
                            :class="index == 0 ? 'text-start' : 'text-center'">
                            <div class="d-flex align-items-center">
                                <div class=" me-2">
                                    <img src="@/assets/img/avatars/10.png" alt="Avatar" class="rounded-circle"
                                        height="45px">
                                </div>
                                <div>
                                    <router-link to="">
                                        <h6 class="mb-1 fw-bold">{{ item.raison_social }}</h6>
                                    </router-link>
                                    <small class="fw-bold text-muted">RC : {{ item.num_rc }}</small>
                                </div>
                            </div>

                        </td>
                        <td v-if="header.isComplex && header.type === 'caution'" class="text-primary"
                            :class="index == 0 ? 'text-start' : 'text-center'">
                            <router-link to="">
                                <h6 class="mb-1 fw-bold">{{ item.pre_project.project_code }}</h6>
                            </router-link>
                            <small class="fw-bold text-muted">Maitre ouvrage : {{ item.pre_project.maitre_ouvrage
                                }}</small>
                        </td>
                        <td v-if="!header.isComplex" :class="index == 0 ? 'text-start' : 'text-center'">
                            <small v-if="header.type == 'badge'">
                                <small class="fw-bold" :class="helpers.returnBadge(String(item[header.value]))[0]">{{
                        helpers.returnBadge(String(item[header.value]))[1] }}
                                </small>
                            </small>
                            <small v-if="header.type == 'client'">
                                {{ item.client.raison_social }}
                            </small>
                            <small v-if="header.type == 'projectManager'">
                                {{ item.pre_project.project_manager.employee.first_name }}
                                {{ item.pre_project.project_manager.employee.last_name }}
                            </small>
                            <small class="fw-bold" v-if="header.type === 'currency'">
                                {{ formater.number(item[header.value]) }} MAD
                            </small>
                            <small v-else>
                                <span v-if="header.type === 'datetime'">
                                    {{ formater.dateTime(item[header.value]) }}
                                </span>
                                <span v-if="header.type === 'date'">
                                    {{ formater.date(item[header.value]) }}
                                </span>
                            </small>
                            <small v-if="header.type === 'text'">
                                {{ item[header.value] }}
                            </small>
                            <small v-if="header.type === 'fournisseur'">
                                {{ item[header.value] }}
                            </small>
                            <small v-if="header.type === 'phone'">
                                {{ formater.phoneNumber(item[header.value]) }}
                            </small>
                            <span v-if="header.type === 'test'">
                                {{ item }}
                            </span>
                            <span v-if="header.type === 'time'">
                                    {{ formater.time(String(item[header.value])) }}
                                </span>
                                <span v-if="header.type === 'workingHour'">
                                    <span class="fw-bold"
                                        :class="helpers.calculateDifference(item, item.employee.working_hours)[2]">
                                        {{ helpers.calculateDifference(item, item.employee.working_hours)[0] }}
                                    </span>
                                </span>
                                <span v-if="header.type === 'workingHourCustom'">
                                    <span class="fw-bold"
                                        :class="helpers.calculateDifference(item, item.employee.working_hours)[2]">
                                        {{ helpers.calculateDifference(item, item.employee.working_hours)[0] }}
                                    </span>
                                </span>
                                <span v-if="header.type === 'days'">
                                    {{ item[header.value] > 1 ? item[header.value] + ' Jours' :
                                        item[header.value] + 'Jour'
                                    }}
                                </span>
                                <span v-if="header.type === 'attachement'">
                                    <small v-if="item[header.value] == '-' || item[header.value] == null">Aucun Attachement</small>
                                    <a v-else class="btn btn-label-primary btn-sm" target="_blank"
                                        :href="getFileUrl(item[header.value])">
                                        <i class="ti ti-download me-2"></i> Télécharger l'attachement
                                    </a>
                                </span>

                        </td>
                        <td class="text-center" v-if="header.isComplex && header.type === 'date_echantillion'">
                            <i v-if="item.date_echantillion != null"
                                class="ti ti-square-rounded-check-filled text-success f-26"></i>
                            <i v-else class="ti ti-square-rounded-x-filled text-danger f-26"></i>
                        </td>
                        <td class="text-center" v-if="header.isComplex && header.type === 'date_visite'">
                            <i v-if="item.date_visite != null"
                                class="ti ti-square-rounded-check-filled text-success f-26"></i>
                            <i v-else class="ti ti-square-rounded-x-filled text-danger f-26"></i>
                        </td>
                        <td v-if="header.isComplex && header.type === 'employee'"
                            :class="index == 0 ? 'text-start' : 'text-center'">
                            <router-link :to="{ name: 'ProfileEmployee', params: { id: item.id } }">
                                <h6 class="mb-1 fw-bold text-primary">{{ item.first_name + ' ' + item.last_name }}</h6>
                            </router-link>
                            <small class="fw-bold text-muted">Matricule : {{ item.matricule }}</small>
                        </td>
                        <td v-if="header.isComplex && header.type === 'leave'"
                                :class="index == 0 ? 'text-start' : 'text-center'">
                                <div v-if="role == helpers.roles.RH">

                                    <router-link :to="{ name: 'ProfileEmployee', params: { id: item.employee.id } }">
                                        <h6 class="mb-1 fw-bold text-primary">{{ item.employee.first_name + ' ' +
                            item.employee.last_name
                                            }}</h6>
                                    </router-link>
                                    <small class="fw-bold text-muted">Matricule : {{ item.employee.matricule }}</small>
                                </div>
                                <div v-else>
                                    <h6 class="mb-1 fw-bold text-primary">{{ item.employee.first_name + ' ' +
                            item.employee.last_name
                                        }}</h6>
                                    <small class="fw-bold text-muted">Matricule : {{ item.employee.matricule }}</small>

                                </div>
                        </td>
                        <td v-if="header.isComplex && header.type === 'fullname'"
                            :class="index == 0 ? 'text-start' : 'text-center'">
                            <router-link :to="{ name: 'StagiaireProfile', params: { id: item.id } }">
                                <h6 class="mb-1 fw-bold text-primary">{{ item.prenom + ' ' + item.nom }}</h6>
                            </router-link>
                            <small class="fw-bold text-muted">Email : {{ item.email }}</small>
                        </td>
                        <td v-if="header.isComplex && header.type === 'recrute'"
                            :class="index == 0 ? 'text-start' : 'text-center'">

                            <h6 class="mb-1 fw-bold">{{ item.created_by.employee.first_name + ' '
                        + item.created_by.employee.last_name }}</h6>
                        </td>
                        <td v-if="header.isComplex && header.type === 'recepteur'"
                            :class="index == 0 ? 'text-start' : 'text-center'">

                            <h6 class="mb-1 fw-bold">{{ item.recepteur.first_name + ' '
                        + item.recepteur.last_name }}</h6>
                        </td>



                    </template>

                    <td v-if="buttonType == 'simple'" class="text-center">
                        <button
                        v-for="action in actionsConfig"
                        :key="action.text"
                        :class="[getClass(item, action), 'me-2']"
                        @click="() => action.onClick(item)"
                        :disabled="action.type === 'delete' ? (item.status !== disabled) : false"
                        >
                        <i v-if="action.type === 'potential'"
                            :class="item.potentiel === '1' ? 'ti ti-bookmark-filled' : 'ti ti-bookmark'"></i>
                        <i v-else :class="getIcon(item, action)"></i>
                        </button>
                    </td>
                    <td v-else class="text-center">
                        <div class="dropdown" v-if="actionsConfig.length > 0">
                            <button class="btn p-0" type="button" id="earningReportsId" data-bs-toggle="dropdown"
                                aria-haspopup="true" aria-expanded="false">
                                <i class="ti ti-dots-vertical ti-sm text-muted"></i>
                            </button>
                            <div class="dropdown-menu dropdown-menu-end" aria-labelledby="earningReportsId" style="">
                                <button v-for="  action   in   actionsConfig  " :key="action.icon" class="dropdown-item"
                                    :class="action.type == 'delete' ? (item.status == disabled ? action.class : 'text-secondary') : action.class"
                                    @click="action.onClick(item)"
                                    :disabled="action.type == 'delete' ? (item.status != disabled) : false">
                                    {{ action.text }}
                                </button>
                            </div>
                        </div>
                    </td>
                </tr>
            </tbody>
            <tbody v-else>
                <tr>
                    <td :colspan="headers.length + 1" class="text-center">Aucun enregistrements correspondants trouvés
                    </td>
                </tr>
            </tbody>
        </table>
        <nav aria-label="Page navigation" class="mt-4 ms-3 align-items-center d-flex justify-content-center">
            <ul class="pagination">
                <li class="page-item" :class="{ disabled: currentPage === 1 }">
                    <a class="page-link" href="#" @click.prevent="changePage(1)">
                        <i class="ti ti-chevrons-left"></i>
                    </a>
                </li>
                <li class="page-item" v-for="    page    in    visiblePageNumbers    " :key="page"
                    :class="{ active: page === currentPage }">
                    <a class="page-link" href="#" @click.prevent="changePage(page)">{{ page }}</a>
                </li>
                <li class="page-item" :class="{ disabled: currentPage === totalPageNumbers }">
                    <a class="page-link" href="#" @click.prevent="changePage(totalPageNumbers)">
                        <i class="ti ti-chevrons-right"></i>
                    </a>
                </li>
            </ul>
        </nav>
    </div>
</template>
