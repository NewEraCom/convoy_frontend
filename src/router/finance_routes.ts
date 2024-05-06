//import { helpers } from '@/utils';

export const financeRoutes = [
    {
        path: '/finance/cautions',
        name: 'Cautions',
        component: () => import('@/views/Finance/CautionsView.vue'),
        meta: {
            title: 'Cautions',
        },
    },
    {
        path: '/finance/clients',
        name: 'Clients',
        component: () => import('@/views/Finance/ClientsView.vue'),
        meta: {
            title: 'Clients',
        },
    },
];