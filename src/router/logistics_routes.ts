export const logisticsRoutes = [
    {
        path:'/logistics/louer',
        name:'Louer',
        component: () => import('@/views/Logistics/Loyer/LouerView.vue'),
        props:true, 
        meta: {
            title: 'Louer',
        },
    },
    {
        path:'/logistics/louer/profile/:id',
        name:'Louer-Profile',
        component: () => import('@/views/Logistics/Loyer/profile/ProfileLouer.vue'),
        props:true, 
        meta: {
            title: 'Louer-Profile',
        },
    },
];