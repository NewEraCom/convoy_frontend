<script setup lang="ts">

defineProps<{
  user: any;
  env: string;
}>();

</script>

<template>
  <nav v-if="user != null" id="layout-navbar" :class="user.type_account == 'erp' ? '' : 'container-md'"
    class="layout-navbar navbar navbar-expand-xl navbar-detached align-items-center bg-navbar-theme">
    <div id="navbar-collapse" class="navbar-nav-right d-flex align-items-center">
      <p class="text-dark m-0 ms-2">
        Bienvenue {{ user.employee.first_name }} sur NewEraERP 👋
      </p>
      <ul class="navbar-nav flex-row align-items-center ms-auto">
        <li class="nav-item dropdown-notifications navbar-dropdown dropdown me-3 me-xl-1">
          <a class="nav-link dropdown-toggle hide-arrow" href="javascript:void(0);" data-bs-toggle="dropdown"
            data-bs-auto-close="outside" aria-expanded="false">
            <i class="ti ti-calendar ti-md"></i>
          </a>
        </li>
        <li class="nav-item dropdown-notifications navbar-dropdown dropdown me-3 me-xl-1">
          <a class="nav-link dropdown-toggle hide-arrow" href="javascript:void(0);" data-bs-toggle="dropdown"
            data-bs-auto-close="outside" aria-expanded="false">
            <i class="ti ti-bell ti-md"></i>
          </a>
          <ul class="dropdown-menu dropdown-menu-end py-0">
            <li class="dropdown-menu-header border-bottom">
              <div class="dropdown-header d-flex align-items-center py-3">
                <h5 class="text-body mb-0 me-auto">Notification</h5>
                <a href="javascript:void(0)" class="dropdown-notifications-all text-body" data-bs-toggle="tooltip"
                  data-bs-placement="top" title="Mark all as read"><i class="ti ti-bell fs-4"></i></a>
              </div>
            </li>
          </ul>
        </li>
        <li class="nav-item navbar-dropdown dropdown-user dropdown">
          <a class="nav-link dropdown-toggle hide-arrow" href="javascript:void(0);" data-bs-toggle="dropdown">
            <div class="avatar avatar-online border rounded-circle">
              <img :src="env + user.profile_picture" class="rounded-circle" style="object-fit: fill; height: 100%" />
            </div>
          </a>
          <ul class="dropdown-menu dropdown-menu-end">
            <li>
              <router-link to="/profile" class="dropdown-item">
                <div class="d-flex">
                  <div class="flex-shrink-0 me-3">
                    <div class="avatar avatar-online">
                      <img :src="env + 'assets/img/' + user.profile_picture" class="rounded-circle"
                        style="object-fit: fill; height: 100%" />
                    </div>
                  </div>
                  <div class="flex-grow-1">
                    <span class="fw-medium d-block">{{
    user.employee.first_name + ' ' + user.employee.last_name
                      }}</span>
                    <small class="text-muted">
                      {{ user.employee.poste }}
                    </small>
                  </div>
                </div>
              </router-link>
            </li>
            <li>
              <div class="dropdown-divider"></div>
            </li>
            <li>
              <router-link to="/shared/profile" class="dropdown-item">
                <i class="ti ti-user-check me-2 ti-sm"></i>
                <span class="align-middle fw-bold">Profil</span>
              </router-link>
            </li>

            <li>
              <button data-bs-toggle="modal" data-bs-target="#logout-modal" class="dropdown-item text-danger">
                <i class="ti ti-logout me-2 ti-sm"></i>
                <span class="align-middle fw-bold">Se deconnecter</span>
              </button>
            </li>
          </ul>
        </li>
      </ul>
    </div>

    <div class="navbar-search-wrapper search-input-wrapper d-none">
      <input type="text" class="form-control search-input container-xxl border-0" placeholder="Search..."
        aria-label="Search..." />
      <i class="ti ti-x ti-sm search-toggler cursor-pointer"></i>
    </div>
  </nav>
</template>

<style scoped>
#layout-navbar {
  background-color: #333;
  /* Example background color */
  color: white;
  /* Example text color */
  padding: 10px;
  /* Example padding */
  position: sticky;
  top: 0;
  z-index: 100;
  /* Adjust the z-index if necessary */
}

.container-md {
  margin-right: 0rem;
  margin-left: 0rem;
}

@media (max-width: 768px) {
  .container-md {
    margin-right: 0rem !important;
    margin-left: 0rem !important;
    padding: 0 !important;
  }
}

@media (max-width: 992px) and (min-width: 768px) {
  .container-md {
    margin-right: 1rem !important;
    margin-left: 1rem !important;
  }
}

@media (max-width: 1200px) and (min-width: 992px) {
  .container-md {
    margin-right: 14rem !important;
    margin-left: 14rem !important;
  }
}

@media (max-width: 1458px) and (min-width: 1200px) {
  .container-md {
    margin-right: 18rem !important;
    margin-left: 18rem !important;
  }
}

@media (min-width: 1458px) {
  .container-md {
    margin-right: 20rem !important;
    margin-left: 20rem !important;
    width: 100% !important;
  }
}
</style>
