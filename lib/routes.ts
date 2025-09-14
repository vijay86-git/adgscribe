const ROUTES = {
    home: '/',
    signin: '/signin',
    signup: '/signup',
    forgotPassword: 'forgot-password',


    dashboard: '/dashboard',
    app: '/app',
    doctors: '/doctors',
    patientsList: '/patients',
    addPatient: '/patient/create',
    profile: '/profile',
    settings: '/settings',

    
} as const;  // "as const" makes the object readonly and literal types

type RouteKeys = keyof typeof ROUTES;
type RouteValues = typeof ROUTES[RouteKeys];

export { ROUTES };
export type { RouteKeys, RouteValues };
