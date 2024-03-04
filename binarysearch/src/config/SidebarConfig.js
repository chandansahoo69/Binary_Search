import { ReactIcon } from 'components/molecules';
import config from 'config';

const getIcon = (name) => <ReactIcon icon={name} width={25} height={25} />;

const {
    roles: { Admin, BDM },
} = config;

const allRole = [Admin, BDM];

const sidebarConfig = [
    {
        title: 'Dashboard',
        path: '/',
        icon: getIcon('pepicons-pop:grid'),
        fillIcon: getIcon('pepicons-pop:grid'),
        roles: allRole,
    },
    {
        title: 'Playground',
        path: `${process.env.REACT_APP_CONTEXT_PATH}/playground?type=public`,
        icon: getIcon('humbleicons:code'),
        fillIcon: getIcon('humbleicons:code'),
        roles: allRole,
    },
    {
        title: 'Events',
        path: `${process.env.REACT_APP_CONTEXT_PATH}/events`,
        icon: getIcon('solar:calendar-line-duotone'),
        fillIcon: getIcon('solar:calendar-line-duotone'),
        roles: allRole,
    },
    {
        title: 'People',
        path: `${process.env.REACT_APP_CONTEXT_PATH}/peoples`,
        icon: getIcon('mdi:users-outline'),
        fillIcon: getIcon('mdi:users-outline'),
        roles: allRole,
    },
    {
        title: 'Profiles',
        path: `${process.env.REACT_APP_CONTEXT_PATH}/profile`,
        icon: getIcon('gg:profile'),
        fillIcon: getIcon('gg:profile'),
        roles: [Admin],
    },
];

export default sidebarConfig;
