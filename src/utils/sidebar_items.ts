const sharedMenu = [
    {
        id: 12,
        name: 'Calendrier',
        route: '/shared/calendar',
        icon: 'ti ti-calendar',
        path: 'Calendar'
    },
    {
        id: 13,
        name: 'Salle de réunion',
        route: '/shared/meeting-room',
        icon: 'ti ti-calendar-time',
        path: 'MeetingRoom'
    },
    {
        id: 14,
        name: 'Coursier',
        route: '/shared/coursier',
        icon: 'ti ti-car',
        path: 'Coursier'
    }
];

const sharedMenu2 = [

];


const DGMenu = [
    {
        id: 1,
        name: 'Dashboard',
        route: '/dashboard',
        icon: 'ti ti-smart-home',
        path: 'DashboardDG'
    },
];



const CFMenu = [
    {
        id: 1,
        name: 'Dashboard',
        route: '/dashboard-pm',
        icon: 'ti ti-smart-home',
        path: 'DashboardPM'
    },
    {
        id: 2,
        name: 'Projets',
        route: '/projects',
        icon: 'ti ti-package',
        path: 'Projects'
    },
    {
        id: 3,
        name: 'Demande d\'achat',
        route: '/project/purchase_order',
        icon: 'ti ti-shopping-cart',
        path: 'PurchaseOrderProject'
    },
    {
        id: 3,
        name: 'Demande d\'exécution',
        route: '/project/executation_order',
        icon: 'ti ti-settings',
        path: 'ExecutionOrderProject'
    },
    {
        id: 4,
        name: 'Factures',
        route: '/facture',
        icon: 'ti ti-file-invoice',
        path: 'DashboardPM'
    },
    {
        id: 5,
        name: 'Demande DSS',
        route: '/project/out-of-stock',
        icon: 'ti ti-transfer-out',
        path: 'OutOfStockProject'
    },
    {
        id: 6,
        name: 'Sous-traitants',
        route: '/soustraitant',
        icon: 'ti ti-forklift',
        path: 'Soustraitant'
    },
    {
        id: 7,
        name: 'Demande de caisse',
        route: '/project/caisse-request',
        icon: 'ti ti-transfer-out',
        path: 'CaisseRequest'
    },

    ...sharedMenu2,
    ...sharedMenu
];

const RHMenu = [
    {
        id: 1,
        name: 'Dashboard',
        route: '/dashboard-rh',
        icon: 'ti ti-smart-home',
        path: 'DashboardRH'
    },
    {
        id: 2,
        name: 'Employés',
        route: '/employees',
        icon: 'ti ti-users',
        path: 'Employees'
    },
    {
        id: 3,
        name: 'Pointage',
        route: '/pointage',
        icon: 'ti ti-clock-up',
        path: 'Pointage'
    },
    {
        id: 4,
        name: 'Stagiaires',
        route: '/interns',
        icon: 'ti ti-users-group',
        path: 'Interns'
    },
    {
        id: 5,
        name: 'Soustraitant',
        route: '/rh-soustraitant',
        icon: 'ti ti-settings',
        path: 'RhSoustraitant'
    },
    {
        id: 6,
        name: 'Congés',
        route: '/leaves',
        icon: 'ti ti-plane-inflight',
        path: 'Leaves'
    },
    /* {
        id: 7,
        name: 'Documents',
        route: '/documents',
        icon: 'ti ti-files',
        path: 'DocumentsRH'
    }, */
    {
        id: 8,
        name: 'Recrutements',
        route: '/recruitments',
        icon: 'ti ti-search',
        path: 'Recruitments'
    },
    {
        id: 9,
        name: 'Demandes RH',
        route: '/demandes-rh',
        icon: 'ti ti-file-export',
        path: 'DemandesRH'
    },
    /*   {
          id: 10,
          name: 'Contrats',
          route: '/contracts',
          icon: 'ti ti-file-stack',
          path: 'Contracts',
      }, */
    {
        id: 11,
        name: 'Paie',
        route: '/paie',
        icon: 'ti ti-businessplan',
        path: 'Paie'
    },
    {
        id: 12,
        name: 'Avance sur salaire',
        route: '/salary-advance',
        icon: 'ti ti-building-bank',
        path: 'SalaryAdvance'
    },
    ...sharedMenu
];

const SalesMenu = [
    {
        id: 1,
        name: 'Dashboard',
        route: '/dashboard-sales',
        icon: 'ti ti-smart-home',
        path: 'DashboardSales'
    },
    {
        id: 2,
        name: 'Demande d\'achat',
        route: '/purchase-order',
        icon: 'ti ti-shopping-cart',
        path: 'PurchaseOrder'
    },
    {
        id: 3,
        name: 'Demande d\'exécution',
        route: '/execution-request',
        icon: 'ti ti-settings',
        path: 'ExecutionRequest'
    },
    {
        id: 4,
        name: 'Bons de commande',
        route: '/bon-de-commande',
        icon: 'ti ti-file-3d',
        path: 'BonDeCommande'
    },
    {
        id: 5,
        name: 'Factures',
        route: '/invoices-sales',
        icon: 'ti ti-file-invoice',
        path: 'InvoicesSales'
    },
    {
        id: 6,
        name: 'Fournisseur',
        route: '/fournisseur',
        icon: 'ti ti-building-store',
        path: 'Fournisseur'
    },
    {
        id: 7,
        name: 'Sous-traitant',
        route: '/soustraitant',
        icon: 'ti ti-forklift',
        path: 'Soustraitant'
    },
    {
        id: 8,
        name: 'Suive des stocks',
        icon: 'ti ti-stack',
        children: [
            {
                id: 1,
                name: 'Stock',
                route: '/stock',
                path: 'Stock'
            },
            {
                id: 2,
                name: 'Stock Informatique',
                route: '/stock-informatique',
                path: 'StockInformatique'
            },
            {
                id: 3,
                name: 'Fournitures',
                route: '/fournitures',
                path: 'Fournitures'
            },
        ]
    },
    ...sharedMenu2,
    ...sharedMenu
];

const LogisticsMenu = [
    {
        id: 1,
        name: 'Dashboard',
        route: '/dashboard-logistics',
        icon: 'ti ti-smart-home',
        path: 'DashboardLogistics'
    },
    {
        id: 2,
        name: 'Abonnements',
        icon: 'ti ti-shopping-cart',
        children: [
            {
                id: 1,
                name: 'Parc GSM',
                route: '/parc-gsm',
                path: 'ParcGsm'
            },
            {
                id: 2,
                name: 'Carte carburant',
                route: '/carte-carburant',
                path: 'CarteCarburant'
            },
            {
                id: 3,
                name: 'Jawaz',
                route: '/Jawaz',
                path: 'Jawaz'
            },
        ]
    },
    {
        id: 4,
        name: 'Cachets',
        route: '/cachets',
        icon: 'ti ti-rubber-stamp',
        path: 'Cachets'
    },
    {
        id: 5,
        name: 'Caisse',
        route: '/caisse',
        icon: 'ti ti-cash',
        path: 'Caisse'
    },
    {
        id: 6,
        name: 'Véhicules',
        route: '/vehicules',
        icon: 'ti ti-car',
        path: 'Vehicules'
    },
    {
        id: 7,
        name: 'Fournisseur',
        route: '/fournisseur',
        icon: 'ti ti-building-store',
        path: 'Fournisseur'
    },
    {
        id: 8,
        name: 'Sous-traitant',
        route: '/soustraitant',
        icon: 'ti ti-forklift',
        path: 'Soustraitant'
    },
    {
        id: 9,
        name: 'Stock',
        icon: 'ti ti-stack',
        children: [
            {
                id: 1,
                name: 'Stock',
                route: '/stock',
                path: 'Stock'
            },
            {
                id: 2,
                name: 'Stock Informatique',
                route: '/stock-informatique',
                path: 'StockInformatique'
            },
            {
                id: 3,
                name: 'Fournitures',
                route: '/fournitures',
                path: 'Fournitures'
            },
        ]
    },
    {
        id: 8,
        name: 'Transports',
        route: '/transports',
        icon: 'ti ti-truck-delivery',
        path: 'Transports'
    },
    {
        id: 8,
        name: 'Loyer',
        route: '/rent',
        icon: 'ti ti-building',
        path: 'Rent'
    },
    ...sharedMenu2,
    ...sharedMenu
];

const SupportMenu = [
    {
        id: 1,
        name: 'Dashboard',
        route: '/dashboard-admin',
        icon: 'ti ti-smart-home',
        path: 'DashboardAdmin'
    },
    {
        id: 2,
        name: 'Resources Humaines',
        icon: 'ti ti-users',
        children: [
            {
                id: 1,
                name: 'Liste des employés',
                route: '/employees',
                path: 'Employees'
            },
            {
                id: 2,
                name: 'Employés sous-traitants',
                route: '/rh-soustraitant',
                path: 'RhSoustraitant'
            },
            {
                id: 3,
                name: 'Paie',
                route: '/paie',
                icon: 'ti ti-file-invoice',
                path: 'Paie'
            },
            {
                id: 9,
                name: 'Stagiaires',
                route: '/interns',
                icon: 'ti ti-users-group',
                path: 'Interns'
            },
            {
                id: 3,
                name: 'Pointage',
                route: '/pointage',
                path: 'Pointage'
            },
            {
                id: 4,
                name: 'Congés',
                route: '/leaves',
                path: 'Leaves'
            },
            {
                id: 5,
                name: 'Avance sur salaire',
                route: '/salary-advance',
                path: 'SalaryAdvance'
            },
            {
                id: 6,
                name: 'Demande RH',
                route: '/demandes-rh',
                path: 'DemandesRH'
            },
            {
                id: 7,
                name: 'Recrutements',
                route: '/recruitments',
                path: 'Recruitments'
            },

        ]
    },
    {
        id: 2,
        name: 'Logistique',
        icon: 'ti ti-stack',
        children: [
            {
                id: 4,
                name: 'Caisse',
                route: '/caisse',
                icon: 'ti ti-cash',
                path: 'Caisse'
            },
            {
                id: 1,
                name: 'Stock',
                route: '/stock',
                path: 'Stock'
            },
            {
                id: 2,
                name: 'Stock Informatique',
                route: '/stock-informatique',
                path: 'StockInformatique'
            },
            {
                id: 3,
                name: 'Fournitures',
                route: '/fournitures',
                path: 'Fournitures'
            },
            {
                id: 1,
                name: 'Louer',
                route: '/louer',
                path: 'Louer'
            },
            {
                id: 2,
                name: 'Cachets',
                route: '/cachets',
                path: 'Cachets'
            },
            {
                id: 3,
                name: 'Véhicules',
                route: '/vehicules',
                path: 'Vehicules'
            },
            {
                id: 1,
                name: 'Parc GSM',
                route: '/parc-gsm',
                path: 'ParcGsm'
            },
            {
                id: 2,
                name: 'Carte carburant',
                route: '/carte-carburant',
                path: 'CarteCarburant'
            },
            {
                id: 3,
                name: 'Jawaz',
                route: '/Jawaz',
                path: 'Jawaz'
            },
        ]
    },
    {
        id: 7,
        name: 'Achats',
        icon: 'ti ti-shopping-cart',
        children: [
            {
                id: 1,
                name: 'Demandes d\'achats',
                route: '/purchase-order',
                path: 'PurchaseOrder'
            },
            {
                id: 2,
                name: 'Demande d\'exécution',
                route: '/execution-request',
                path: 'ExecutionRequest',
            },
            {
                id: 3,
                name: 'Bons de commande',
                route: '/bon-de-commande',
                path: 'BonDeCommande'
            },
        ]
    },
    {
        id: 8,
        name: 'Finance',
        icon: 'ti ti-report-money',
        children: [
            {
                id: 1,
                name: 'Facture Client',
                route: '/dashboard-sales',
                path: 'DashboardSales'
            },
            {
                id: 2,
                name: 'Cautions',
                route: '/dashboard-sales',
                path: 'DashboardSales'
            },
        ]
    },
    {
        id: 2,
        name: 'Avant Projets',
        route: '/pre-project',
        icon: 'ti ti-briefcase',
        path: 'PreProject'
    },
    {
        id: 5,
        name: 'Projets',
        route: '/projects',
        icon: 'ti ti-package',
        path: 'Projects'
    },
    {
        id: 6,
        name: 'Clients',
        route: '/clients',
        icon: 'ti ti-affiliate',
        path: 'Clients'
    },


    {
        id: 10,
        name: 'Fournisseur',
        route: '/fournisseur',
        icon: 'ti ti-building-store',
        path: 'Fournisseur'
    },
    {
        id: 12,
        name: 'Sous-traitant',
        route: '/soustraitant',
        icon: 'ti ti-forklift',
        path: 'Soustraitant'
    },
    ...sharedMenu
];

const FinanceMenu = [
    {
        id: 1,
        name: 'Facture',
        route: '/fn/facture',
        icon: 'ti ti-files',
        path: 'FnFacture'
    },
    {
        id: 2,
        name: 'Cheque',
        route: '/fn/cheque',
        icon: 'ti ti-file-dollar',
        path: 'FnCheque'
    },
    {
        id: 3,
        name: 'Caution',
        route: '/fn/Caution',
        icon: 'ti ti-coins',
        path: 'FnCaution'
    }
];

const DOMenu = [
    {
        id: 1,
        name: 'Dashboard',
        route: '/dashboard-pm',
        icon: 'ti ti-smart-home',
        path: 'DashboardPM'
    },
    {
        id: 2,
        name: 'Projets',
        route: '/projects',
        icon: 'ti ti-package',
        path: 'Projects'
    },
    {
        id: 3,
        name: 'Demande d\'achat',
        route: '/project/purchase_order',
        icon: 'ti ti-shopping-cart',
        path: 'PurchaseOrderProject'
    },
    {
        id: 3,
        name: 'Demande d\'exécution',
        route: '/project/executation_order',
        icon: 'ti ti-settings',
        path: 'ExecutionOrderProject'
    },
    {
        id: 4,
        name: 'Factures',
        route: '/facture',
        icon: 'ti ti-file-invoice',
        path: 'DashboardPM'
    },
    {
        id: 2,
        name: 'Avant Projets',
        route: '/pre-project',
        icon: 'ti ti-briefcase',
        path: 'PreProject'
    },
    {
        id: 5,
        name: 'Demande DSS',
        route: '/project/out-of-stock',
        icon: 'ti ti-transfer-out',
        path: 'OutOfStockProject'
    },
    {
        id: 6,
        name: 'Sous-traitants',
        route: '/soustraitant',
        icon: 'ti ti-forklift',
        path: 'Soustraitant'
    },
    {
        id: 4,
        name: 'Caisse',
        route: '/caisse',
        icon: 'ti ti-cash',
        path: 'Caisse'
    },
    {
        id: 7,
        name: 'Demande de caisse',
        route: '/project/caisse-request',
        icon: 'ti ti-transfer-out',
        path: 'CaisseRequest'
    },
    {
        id: 6,
        name: 'Congés',
        route: '/leaves',
        icon: 'ti ti-plane-inflight',
        path: 'Leaves'
    },

    ...sharedMenu2,
    ...sharedMenu
];

const BDMenu = [
    {
        id: 1,
        name: 'Dashboard',
        route: '/bdm/dashboard',
        icon: 'ti ti-smart-home',
        path: 'DashboardBDM'
    },
    {
        id: 2,
        name: 'Avant Projets',
        route: '/pre-projects',
        icon: 'ti ti-bolt',
        path: 'PreProjectsBDM'
    },
    {
        id: 3,
        name: 'Projets',
        route: '/bdm/projects',
        icon: 'ti ti-package',
        path: 'ProjectsBDM'
    },
    {
        id: 4,
        name: 'Cautions',
        route: '/finance/cautions',
        icon: 'ti ti-coins',
        path: 'Cautions'
    },
    {
        id: 5,
        name: 'Clients',
        route: '/finance/clients',
        icon: 'ti ti-users-group',
        path: 'Clients'
    },
    {
        id: 6,
        name: 'Budget de caisse',
        route: '/production/budget',
        icon: 'ti ti-moneybag',
        path: 'BudgetCaisse'
    },
    {
        id: 7,
        name: 'Decaissement',
        route: '/logistics/decaissement',
        icon: 'ti ti-wallet',
        path: 'Decaissement'
    },
    {
        id: 8,
        name: 'Demande de congé',
        route: '/shared/leaves-request',
        icon: 'ti ti-plane-inflight',
        path: 'LeavesRequest'
    },
    {
        id: 9,
        name: 'Recrutements',
        route: '/shared/recruitment-request',
        icon: 'ti ti-tie',
        path: 'RecruitmentRequest'
    },
    ...sharedMenu,
    /* 
    {
        id: 5,
        name: 'Budget de caisse',
        route: '/project/caisse-request',
        icon: 'ti ti-transfer-out',
        path: 'CaisseRequest'
    },
    {
        id: 6,
        name: 'Decaissement',
        route: '/project/caisse-request',
        icon: 'ti ti-transfer-out',
        path: 'CaisseRequest'
    },
    {
        id: 7,
        name: 'Demande de congé',
        route: '/leaves',
        icon: 'ti ti-plane-inflight',
        path: 'Leaves'
    }, 
    ...sharedMenu*/
];

export const sideBar = {
    DGMenu,
    CFMenu,
    RHMenu,
    SalesMenu,
    LogisticsMenu,
    SupportMenu,
    FinanceMenu,
    DOMenu,
    BDMenu
};
