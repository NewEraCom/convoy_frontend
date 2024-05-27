import { helpers } from '@/utils';

export const sharedRoutes = [
    {
        path: '/shared/leaves-request',
        name: 'LeavesRequest',
        component: () => import('@/views/Shared/LeavesRequest.vue'),
        meta: {
            title: 'Demande de congé',
        },
    },
    {
        path: '/shared/recruitment-request',
        name: 'RecruitmentRequest',
        component: () => import('@/views/Shared/RecruitmentRequest.vue'),
        meta: {
            title: 'Demande de recrutement',
        },
    },
    {
        path: '/shared/profile/:id',
        name: 'ProfileView',
        component: () => import('@/views/Shared/components/Profile/ProfileView.vue'),
        props: true,
        meta: {
            title: 'Profil',
        },
    },
    // {
    //     path: '/shared/profile',
    //     name: 'ProfileView',
    //     component: () => import('@/views/Shared/ProfileView.vue'),
    //     meta: {
    //         title: 'Profil',
    //     },
    // },
    {
        path: '/shared/fournisseur',
        name: 'Fournisseur',
        component: () => import('@/views/Shared/FournisseurView.vue'),
        props: true,
        meta: {
            title: 'Fournisseur',
            requiresAuth: true,
            role: [helpers.roles.DG,helpers.roles.DO,helpers.roles.DS,helpers.roles.SALES]

        },
    },
    {
        path: '/shared/soustraitant',
        name: 'Soustraitant',
        component: () => import('@/views/Shared/SoustraitantView.vue'),
        props: true,
        meta: {
            title: 'Sous-traitant',
            requiresAuth: true,
            role: [helpers.roles.DG,helpers.roles.DO,helpers.roles.DS,helpers.roles.SALES]

        },
    },
    {
        path: '/shared/calendar',
        name: 'Calendar',
        component: () => import('@/views/Shared/CalendarView.vue'),
        meta: {
            title: 'Calendrier',
        },
    },
    {
        path: '/shared/coursier',
        name: 'Coursier',
        component: () => import('@/views/Shared/CoursierView.vue'),
        meta: {
            title: 'Coursier',
        }
    },
    {
        path: '/shared/meeting-room',
        name: 'MeetingRoom',
        component: () => import('@/views/Shared/MeetingRoomView.vue'),
        meta: {
            title: 'Salle de réunion',
        },

    }
];