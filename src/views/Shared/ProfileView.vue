<script setup>
import { CardTwo } from '@/ui';
</script>

<template>
    <div class="flex-grow-1 container-fluid mt-3">
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item">
                    <a href="javascript:void(0);">Dashboard</a>
                </li>
                <li class="breadcrumb-item active">Profil</li>
            </ol>
        </nav>

        <div class="nav-align-top mb-4">
            <ul class="nav nav-pills mb-3" role="tablist">
                <li class="nav-item" role="presentation">
                    <button type="button" class="nav-link active" role="tab" data-bs-toggle="tab"
                        data-bs-target="#navs-pills-top-home" aria-controls="navs-pills-top-home"
                        aria-selected="true">Profil</button>
                </li>
                <li class="nav-item" role="presentation">
                    <button type="button" class="nav-link" role="tab" data-bs-toggle="tab"
                        data-bs-target="#navs-pills-top-profile" aria-controls="navs-pills-top-profile"
                        aria-selected="false" tabindex="-1">Demande de congé</button>
                </li>
                <li class="nav-item" role="presentation">
                    <button type="button" class="nav-link" role="tab" data-bs-toggle="tab"
                        data-bs-target="#navs-pills-top-messages" aria-controls="navs-pills-top-messages"
                        aria-selected="false" tabindex="-1">Demande des documents RH</button>
                </li>
            </ul>
            <div class="tab-content">
                <div class="tab-pane fade show active" id="navs-pills-top-home" role="tabpanel">
                    <div class="card-body">
                        <div class="d-flex align-items-start align-items-sm-center gap-4">
                            <img src="../../assets/img/avatars/14.png" alt="user-avatar"
                                class="d-block w-px-100 h-px-100 rounded" id="uploadedAvatar">
                            <div class="button-wrapper">
                                <label for="upload" class="btn btn-primary me-2 mb-3 waves-effect waves-light"
                                    tabindex="0">
                                    <span class="d-none d-sm-block">Télécharger une nouvelle photo</span>
                                    <i class="ti ti-upload d-block d-sm-none"></i>
                                    <input type="file" id="upload" class="account-file-input" hidden=""
                                        accept="image/png, image/jpeg">
                                </label>
                                <div class="text-muted">JPG, GIF ou PNG autorisés. Taille maximale de 800K</div>
                            </div>
                        </div>
                    </div>
                    <div class="card-body mt-3">
                        <form id="formAccountSettings" method="GET" onsubmit="return false"
                            class="fv-plugins-bootstrap5 fv-plugins-framework" novalidate="novalidate">
                            <div class="row">
                                <div class="mb-3 col-md-6 fv-plugins-icon-container">
                                    <label for="firstName" class="form-label">First Name</label>
                                    <input class="form-control" type="text" id="firstName" name="firstName" value="John"
                                        autofocus="">
                                    <div
                                        class="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback">
                                    </div>
                                </div>
                                <div class="mb-3 col-md-6 fv-plugins-icon-container">
                                    <label for="lastName" class="form-label">Last Name</label>
                                    <input class="form-control" type="text" name="lastName" id="lastName" value="Doe">
                                    <div
                                        class="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback">
                                    </div>
                                </div>
                            </div>
                            <div class="mt-2">
                                <button type="submit" class="btn btn-primary me-2 waves-effect waves-light">
                                    Sauvegarder les modifications
                                </button>
                            </div>
                            <input type="hidden">
                        </form>
                    </div>
                </div>
                <div class="tab-pane fade" id="navs-pills-top-profile" role="tabpanel">
                    <div class="row g-3">
                        <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-3 col-xxl-3">
                            <CardTwo title="Solde du congé" :count="12" color="bg-label-warning" icon="ti ti-bolt"
                                card-color="shadow-none border" />
                        </div>
                        <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-3 col-xxl-3">
                            <CardTwo title="Demande de congé validé" :count="12" color="bg-label-info" icon="ti ti-bolt"
                                card-color="shadow-none border" />
                        </div>
                        <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-3 col-xxl-3">
                            <CardTwo title="Demande de congé en attente" :count="12" color="bg-label-success"
                                icon="ti ti-briefcase" card-color="shadow-none border" />
                        </div>
                        <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-3 col-xxl-3">
                            <CardTwo title="Demande de congé non validé" :count="12" color="bg-label-danger"
                                icon="ti ti-coins" card-color="shadow-none border" />
                        </div>
                    </div>
                    <div class="row g-3 mt-2">
                        <div class="col-12 col-xl-12 col-md-12">
                            <div class="card border shadow-none h-100">
                                <div
                                    class="card-header border-bottom d-flex justify-content-between align-items-center">
                                    <div>
                                        <h5 class="card-title fw-bold m-0 me-2">Demande de congé</h5>
                                        <small class="text-muted">Liste des demandes de congé</small>
                                    </div>
                                    <div>
                                        <button class="btn btn-sm p-2 btn-primary">
                                            <i class="ti ti-square-rounded-plus me-2"></i>
                                            Nouveau demande de congé
                                        </button>
                                    </div>
                                </div>
                                <div
                                    class="card-header border-bottom d-flex justify-content-between align-items-center">

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
                                            <option value="En attente">En attente</option>
                                            <option value="En soumission">En soumission</option>
                                            <option value="En cours">En cours</option>
                                            <option value="Terminé">Terminé</option>
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
                                                            <img src="../../assets/img/icons/payments/visa-img.png"
                                                                alt="Visa" height="30">
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
                                                            <img src="../../assets/img/icons/payments/visa-img.png"
                                                                alt="Visa" height="30">
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
                                                            <img src="../../assets/img/icons/payments/visa-img.png"
                                                                alt="Visa" height="30">
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
                <div class="tab-pane fade" id="navs-pills-top-messages" role="tabpanel">
                    <div class="row g-3">
                        <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-3 col-xxl-3">
                            <CardTwo title="Solde du congé" :count="12" color="bg-label-warning" icon="ti ti-bolt"
                                card-color="shadow-none border" />
                        </div>
                        <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-3 col-xxl-3">
                            <CardTwo title="Demande de congé validé" :count="12" color="bg-label-info" icon="ti ti-bolt"
                                card-color="shadow-none border" />
                        </div>
                        <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-3 col-xxl-3">
                            <CardTwo title="Demande de congé en attente" :count="12" color="bg-label-success"
                                icon="ti ti-briefcase" card-color="shadow-none border" />
                        </div>
                        <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-3 col-xxl-3">
                            <CardTwo title="Demande de congé non validé" :count="12" color="bg-label-danger"
                                icon="ti ti-coins" card-color="shadow-none border" />
                        </div>
                    </div>
                    <div class="row g-3 mt-2">
                        <div class="col-12 col-xl-12 col-md-12">
                            <div class="card border shadow-none h-100">
                                <div
                                    class="card-header border-bottom d-flex justify-content-between align-items-center">
                                    <div>
                                        <h5 class="card-title fw-bold m-0 me-2">Demande de congé</h5>
                                        <small class="text-muted">Liste des demandes de congé</small>
                                    </div>
                                    <div>
                                        <button class="btn btn-sm p-2 btn-primary">
                                            <i class="ti ti-square-rounded-plus me-2"></i>
                                            Nouveau demande de congé
                                        </button>
                                    </div>
                                </div>
                                <div
                                    class="card-header border-bottom d-flex justify-content-between align-items-center">

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
                                            <option value="En attente">En attente</option>
                                            <option value="En soumission">En soumission</option>
                                            <option value="En cours">En cours</option>
                                            <option value="Terminé">Terminé</option>
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
                                                            <img src="../../assets/img/icons/payments/visa-img.png"
                                                                alt="Visa" height="30">
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
                                                            <img src="../../assets/img/icons/payments/visa-img.png"
                                                                alt="Visa" height="30">
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
                                                            <img src="../../assets/img/icons/payments/visa-img.png"
                                                                alt="Visa" height="30">
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