
const routes = [
    {
        name: 'Home',
        path: 'home',
        default: false,
        pressPath: 'home',
        longPressPath: 'home',
    },
    {
        name: 'Inbox',
        path: 'inbox',
        default: false,
        pressPath: 'home',
        longPressPath: 'home',
    },
    {
        name: 'Trend',
        path: 'login',
        default: true,
        pressPath: 'login',
        longPressPath: 'home',
    },
    {
        name: 'Calendar',
        path: 'calendar',
        default: false,
        pressPath: 'home',
        longPressPath: 'home',
    },
    {
        name: 'Settings',
        path: 'settings',
        default: false,
        pressPath: 'home',
        longPressPath: 'home',
    },
    {
        name: 'Logout',
        path: 'logout',
        default: false,
        pressPath: 'home',
        longPressPath: 'login',
    },
];

export default routes;

