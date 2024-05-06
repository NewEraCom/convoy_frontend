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
        path: '/shared/profile',
        name: 'ProfileView',
        component: () => import('@/views/Shared/ProfileView.vue'),
        meta: {
            title: 'Profil',
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