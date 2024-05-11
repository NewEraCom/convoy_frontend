import { helpers } from '@/utils';



export const portalRoutes = [
    {
        path: '/portal/dashboard',
        name: 'DashboardPortal',
        component: () => import('@/views/Portal/DashboardPortal.vue'),
        meta: {
            title: 'Dashboard',
            role: [helpers.roles.EMPLOYEE]
        },
    },
    {
        path: '/portal/info',
        name: 'PersonalInfo',
        component: () => import('@/views/Portal/PersonalInfo.vue'),
        meta: {
            title: 'Information Personnel',
            role: [helpers.roles.EMPLOYEE]
        },
    },
    {
        path: '/portal/salary',
        name: 'SalaryAdvantage',
        component: () => import('@/views/Portal/SalaryAdvantage.vue'),
        meta: {
            title: 'Salaire et Avantages',
            role: [helpers.roles.EMPLOYEE]
        },
    },
    {
        path: '/portal/curriculum-vitae',
        name: 'CurriculumVitae',
        component: () => import('@/views/Portal/CurriculumVitae.vue'),
        meta: {
            title: 'Curriculum Vitae',
            role: [helpers.roles.EMPLOYEE]
        }
    },
    {
        path: '/portal/who-is-who',
        name: 'WhoIsWho',
        component: () => import('@/views/Portal/WhoIsWho.vue'),
        meta: {
            title: 'Qui est Qui',
            role: [helpers.roles.EMPLOYEE]
        },
    },
    {
        path: '/portal/leaves-lists',
        name: 'LeavesListsPortal',
        component: () => import('@/views/Portal/LeavesList.vue'),
        meta: {
            title: 'Liste des Congés',
            role: [helpers.roles.EMPLOYEE]
        },
    },
    {
        path: '/portal/profile',
        name: 'ProfilePortal',
        component: () => import('@/views/Portal/ProfilePortal.vue'),
        meta: {
            title: 'Profile',
            role: [helpers.roles.EMPLOYEE]
        },
    },
    {
        path: '/portal/contracts',
        name: 'ContractsPortal',
        component: () => import('@/views/Portal/ContractsPortal.vue'),
        meta: {
            title: 'Contracts',
            role: [helpers.roles.EMPLOYEE]
        },
    },
    {
        path: '/portal/documents',
        name: 'DocumentsPortal',
        component: () => import('@/views/Portal/DocumentsPortal.vue'),
        meta: {
            title: 'Documents',
            role: [helpers.roles.EMPLOYEE]
        },
    },
    {
        path: '/portal/items',
        name: 'ItemsPortal',
        component: () => import('@/views/Portal/ItemsPortal.vue'),
        meta: {
            title: 'Articles de bureau',
            role: [helpers.roles.EMPLOYEE]
        },
    },

];