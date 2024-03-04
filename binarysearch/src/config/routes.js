import { lazy as lazyImport } from 'react';

const Dashboard = lazyImport(() => import('pages/Dashboard/Dashboard'));
const Notification = lazyImport(() => import('pages/Notification/Notification'));
const Playground = lazyImport(() => import('pages/Playground/Playground'));
const Login = lazyImport(() => import('pages/Login/Login'));
const Signup = lazyImport(() => import('pages/Signup/Signup'));
const Peoples = lazyImport(() => import('pages/Peoples/Peoples'));
const Profile = lazyImport(() => import('pages/Profile/Profile'));
const Events = lazyImport(() => import('pages/Events/Events'));
const Battle = lazyImport(() => import('pages/Battle/Battle'));
const ForgotPassword = lazyImport(() => import('pages/ForgotPassword/ForgotPassword'));

const routes = {
    dashboard: {
        path: '/',
        component: <Dashboard />,
    },
    notification: {
        path: '/notifications',
        component: <Notification />,
    },
    playground: {
        path: `${process.env.REACT_APP_CONTEXT_PATH}/playground`,
        component: <Playground />,
    },
    peoples: {
        path: `${process.env.REACT_APP_CONTEXT_PATH}/peoples`,
        component: <Peoples />,
    },
    profile: {
        path: `${process.env.REACT_APP_CONTEXT_PATH}/profile`,
        component: <Profile />,
    },
    battle: {
        path: `${process.env.REACT_APP_CONTEXT_PATH}/battle/:id`,
        component: <Battle />,
    },
    events: {
        path: `${process.env.REACT_APP_CONTEXT_PATH}/events`,
        component: <Events />,
    },
    login: {
        path: `${process.env.REACT_APP_CONTEXT_PATH}/login`,
        component: <Login />,
    },
    signup: {
        path: `${process.env.REACT_APP_CONTEXT_PATH}/signup`,
        component: <Signup />,
    },
    forgotPassword: {
        path: `${process.env.REACT_APP_CONTEXT_PATH}/forgot-password`,
        component: <ForgotPassword />,
    },
    //   tasks: {
    //     path: `${process.env.REACT_APP_CONTEXT_PATH}/tasks`,
    //     component: <Tasks />,
    //   },
    //   addTask: {
    //     path: `${process.env.REACT_APP_CONTEXT_PATH}/tasks/add`,
    //     component: <TasksForm />,
    //   },
    //   editTask: {
    //     path: `${process.env.REACT_APP_CONTEXT_PATH}/tasks/edit/:id`,
    //     component: <TasksEditForm />,
    //   },
    //   taskUpload: {
    //     path: `${process.env.REACT_APP_CONTEXT_PATH}/tasks/:id/upload`,
    //     component: <TaskFileUpload />,
    //   },
    //   vendor: {
    //     path: `${process.env.REACT_APP_CONTEXT_PATH}/vendor`,
    //     component: <Vendor />,
    //   },
    //   addVendor: {
    //     path: `${process.env.REACT_APP_CONTEXT_PATH}/vendor/add`,
    //     component: <VendorsForm />,
    //   },
    //   editVendor: {
    //     path: `${process.env.REACT_APP_CONTEXT_PATH}/vendor/edit/:id`,
    //     component: <VendorsEditForm />,
    //   },
    //   students: {
    //     path: `${process.env.REACT_APP_CONTEXT_PATH}/students`,
    //     component: <Students />,
    //   },
    //   addStudent: {
    //     path: `${process.env.REACT_APP_CONTEXT_PATH}/students/add`,
    //     component: <StudentForm />,
    //   },
    //   editStudent: {
    //     path: `${process.env.REACT_APP_CONTEXT_PATH}/students/edit/:id`,
    //     component: <StudentEditForm />,
    //   },
    //   projects: {
    //     path: `${process.env.REACT_APP_CONTEXT_PATH}/projects`,
    //     component: <Projects />,
    //   },
    //   profiles: {
    //     path: `${process.env.REACT_APP_CONTEXT_PATH}/profiles`,
    //     component: <Profiles />,
    //   },
    //   editAccount: {
    //     path: `${process.env.REACT_APP_CONTEXT_PATH}/edit-account`,
    //     component: <EditAccount />,
    //   },
    //   editProfile: {
    //     path: `${process.env.REACT_APP_CONTEXT_PATH}/profiles/:id`,
    //     component: <EditProfile />,
    //   },
    //   addProfile: {
    //     path: `${process.env.REACT_APP_CONTEXT_PATH}/profiles/add/:role`,
    //     component: <AddProfile />,
    //   },
    //   login: {
    //     path: `${process.env.REACT_APP_CONTEXT_PATH}/login`,
    //     component: <Login />,
    //   },
};

export default routes;
