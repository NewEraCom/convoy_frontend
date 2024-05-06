export const logisticsRoutes = [
    {
        path: '/logistics/decaissement',
        name: 'Decaissement',
        component: () => import('@/views/Logistics/DecaissementView.vue'),
        meta: {
            title: 'Decaissement',
        },
    },
];