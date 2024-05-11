console.log(helpers.init());
import { helpers } from '@/utils';

export const productionRoutes = [
    {
        path: '/bdm/dashboard',
        name: 'DashboardBDM',
        component: () => import('@/views/Production/BDMDashboard.vue'),
        meta: {
            title: 'Dashboard',
            role: [helpers.roles.BDM]
        },
    },
    {
        path: '/pre-projects',
        name: 'PreProjectsBDM',
        component: () => import('@/views/Production/PreProjectView.vue'),
        meta: {
            title: 'Avant Projets',
            role: [helpers.roles.BDM]
        },
    },
    {
        path: '/pre-projects/:id',
        name: 'DetailsPreProject',
        component: () => import('@/views/Production/PreProjectDetails.vue'),
        props: true,
        meta: {
            title: 'Avant Projets',
        },
    },
    {
        path: '/bdm/projects',
        name: 'ProjectsBDM',
        component: () => import('@/views/Production/ProjectView.vue'),
        meta: {
            title: 'Projets',
            role: [helpers.roles.BDM]
        },
    },
    {
        path: '/production/budget',
        name: 'BudgetCaisse',
        component: () => import('@/views/Production/BudgetCaisseView.vue'),
        meta: {
            title: 'Budget Caisse',
        },
    }
];