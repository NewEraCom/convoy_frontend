<script setup>
import { onMounted, onUnmounted, ref, computed } from 'vue';
import { CardTwo, CardTwoSkeleton } from '@/ui';
import { leaveService } from '@/services';
import { useHrStore } from '@/store';

const hrStore = useHrStore();

const leaves = ref(computed(() => hrStore.leaves));
const leavesStats = ref(computed(() => hrStore.leavesStats));

onMounted(async () => {
    await leaveService.getLeaveByRespo();
});

onUnmounted(() => {
    hrStore.resetLeaves();
});


</script>

<template>
    <div class="flex-grow-1 container-fluid mt-3">
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item">
                    <a href="javascript:void(0);">Dashboard</a>
                </li>
                <li class="breadcrumb-item active">Demande de congé</li>
            </ol>
        </nav>
        <div v-if="leavesStats" class="row g-3">
            <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-3 col-xxl-3">
                <CardTwo title="Total Demande" :count="String(leavesStats.total)" color="bg-label-primary"
                    icon="ti ti-bolt" card-color="card-border-shadow-primary" />
            </div>

            <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-3 col-xxl-3">
                <CardTwo title="Demande en attente" :count="String(leavesStats.pending)" color="bg-label-warning"
                    icon="ti ti-briefcase" card-color="card-border-shadow-warning" />
            </div>
            <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-3 col-xxl-3">
                <CardTwo title="Demande validé" :count="String(leavesStats.approved)" color="bg-label-success"
                    icon="ti ti-bolt" card-color="card-border-shadow-success" />
            </div>
            <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-3 col-xxl-3">
                <CardTwo title="Demande rejeté" :count="String(leavesStats.rejected)" color="bg-label-danger"
                    icon="ti ti-bolt" card-color="card-border-shadow-danger" />
            </div>
        </div>
        <div v-else class="row g-3">
            <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-3 col-xxl-3">
                <CardTwoSkeleton />
            </div>
            <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-3 col-xxl-3">
                <CardTwoSkeleton />
            </div>
            <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-3 col-xxl-3">
                <CardTwoSkeleton />
            </div>
            <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-3 col-xxl-3">
                <CardTwoSkeleton />
            </div>
        </div>

        <div class="row g-3 mt-2">
            <div class="col-12 col-xl-12 col-md-12">
                <div class="card card-border-shadow-primary h-100">
                    <div class="card-header border-bottom d-flex justify-content-between align-items-center">
                        <div>
                            <h5 class="card-title fw-bold m-0 me-2">Demande de congé</h5>
                            <small class="text-muted">Liste des demandes de congé</small>
                        </div>
                    </div>
                    <div class="card-header border-bottom d-flex justify-content-between align-items-center">
                        <div class="d-flex align-items-center">
                            <span class="me-2">
                                De :
                            </span>
                            <input type="date" class="form-control w-180 me-2" placeholder="Rechercher...">
                            <span class="me-2">
                                à
                            </span>
                            <input type="date" class="form-control w-180 me-2" placeholder="Rechercher...">

                            <select name="" id="" class="form-select w-160 me-2">
                                <option value="Tout">Tout</option>
                                <option value="pending">En attente</option>
                                <option value="approved">Validé</option>
                                <option value="rejected">Rejeté</option>
                            </select>

                        </div>
                        <div class="d-flex align-items-center">
                            <select name="" id="" class="form-select w-80 me-2">
                                <option value="5">5</option>
                            </select>
                            <input type="text" class="form-control w-240" placeholder="Rechercher...">
                        </div>
                    </div>
                    <div class="table-responsive">
                        <table class="table table-borderless border-top">
                            <thead class="border-bottom table-light">
                                <tr>
                                    <th class="fw-bold">AO</th>
                                    <th class="fw-bold">Type</th>
                                    <th class="fw-bold">Code </th>
                                    <th class="fw-bold">Echantillon</th>
                                    <th class="fw-bold">Visite de lieux</th>
                                    <th class="fw-bold">Status</th>
                                    <th class="fw-bold">Date de depot</th>
                                    <th class="fw-bold">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        <div class="d-flex justify-content-start align-items-center">
                                            <div class="me-3">
                                                <img src="../../assets/img/icons/payments/visa-img.png" alt="Visa"
                                                    height="30">
                                            </div>
                                            <div class="d-flex flex-column">
                                                <p class="mb-0 fw-medium">*4230</p><small
                                                    class="text-muted">Credit</small>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="d-flex flex-column">
                                            <p class="mb-0 fw-medium">Sent</p>
                                            <small class="text-muted text-nowrap">17 Mar 2022</small>
                                        </div>
                                    </td>
                                    <td><span class="badge bg-label-success">Verified</span></td>

                                    <td><span class="badge bg-label-success">Verified</span></td>
                                    <td>
                                        <p class="mb-0 fw-medium">+$1,678</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div class="d-flex justify-content-start align-items-center">
                                            <div class="me-3">
                                                <img src="../../assets/img/icons/payments/master-card-img.png"
                                                    alt="Visa" height="30">
                                            </div>
                                            <div class="d-flex flex-column">
                                                <p class="mb-0 fw-medium">*5578</p><small
                                                    class="text-muted">Credit</small>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="d-flex flex-column">
                                            <p class="mb-0 fw-medium">Sent</p>
                                            <small class="text-muted text-nowrap">12 Feb 2022</small>
                                        </div>
                                    </td>
                                    <td><span class="badge bg-label-danger">Rejected</span></td>
                                    <td>
                                        <p class="mb-0 fw-medium">-$839</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div class="d-flex justify-content-start align-items-center">
                                            <div class="me-3">
                                                <img src="../../assets/img/icons/payments/american-express-img.png"
                                                    alt="Visa" height="30">
                                            </div>
                                            <div class="d-flex flex-column">
                                                <p class="mb-0 fw-medium">*4567</p><small
                                                    class="text-muted">Credit</small>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="d-flex flex-column">
                                            <p class="mb-0 fw-medium">Sent</p>
                                            <small class="text-muted text-nowrap">28 Feb 2022</small>
                                        </div>
                                    </td>
                                    <td><span class="badge bg-label-success">Verified</span></td>
                                    <td>
                                        <p class="mb-0 fw-medium">+$435</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div class="d-flex justify-content-start align-items-center">
                                            <div class="me-3">
                                                <img src="../../assets/img/icons/payments/visa-img.png" alt="Visa"
                                                    height="30">
                                            </div>
                                            <div class="d-flex flex-column">
                                                <p class="mb-0 fw-medium">*5699</p><small
                                                    class="text-muted">Credit</small>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="d-flex flex-column">
                                            <p class="mb-0 fw-medium">Sent</p>
                                            <small class="text-muted text-nowrap">8 Jan 2022</small>
                                        </div>
                                    </td>
                                    <td><span class="badge bg-label-secondary">Pending</span></td>
                                    <td>
                                        <p class="mb-0 fw-medium">+$2,345</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div class="d-flex justify-content-start align-items-center">
                                            <div class="me-3">
                                                <img src="../../assets/img/icons/payments/visa-img.png" alt="Visa"
                                                    height="30">
                                            </div>
                                            <div class="d-flex flex-column">
                                                <p class="mb-0 fw-medium">*5699</p><small
                                                    class="text-muted">Credit</small>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="d-flex flex-column">
                                            <p class="mb-0 fw-medium">Sent</p>
                                            <small class="text-muted text-nowrap">8 Jan 2022</small>
                                        </div>
                                    </td>
                                    <td><span class="badge bg-label-danger">Rejected</span></td>
                                    <td>
                                        <p class="mb-0 fw-medium">-$234</p>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
.w-80 {
    width: 80px;
}

.w-160 {
    width: 160px;
}

.w-180 {
    width: 180px;
}
</style>