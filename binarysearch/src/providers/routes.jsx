import React from 'react';
import { useRoutes } from 'react-router-dom';

import routes from 'config/routes';
import config from 'config';
import { ProtectedNavRoute, ProtectedRoute, PublicRoute } from 'components/organism';

const {
    roles: { Admin, Manager, Employee, HR, BDM },
} = config;

const allRoles = [Employee, Manager, Admin, HR, BDM];

export const Routes = () => {
    return (
        <>
            {useRoutes([
                {
                    path: routes.dashboard.path,
                    element: (
                        <ProtectedRoute roles={allRoles}>
                            {routes.dashboard.component}
                        </ProtectedRoute>
                    ),
                },
                {
                    path: routes.notification.path,
                    element: (
                        <ProtectedRoute roles={allRoles}>
                            {routes.notification.component}
                        </ProtectedRoute>
                    ),
                },
                {
                    path: routes.playground.path,
                    element: (
                        <ProtectedRoute roles={allRoles}>
                            {routes.playground.component}
                        </ProtectedRoute>
                    ),
                },
                {
                    path: routes.peoples.path,
                    element: (
                        <ProtectedRoute roles={allRoles}>{routes.peoples.component}</ProtectedRoute>
                    ),
                },
                {
                    path: routes.events.path,
                    element: (
                        <ProtectedRoute roles={allRoles}>{routes.events.component}</ProtectedRoute>
                    ),
                },
                {
                    path: routes.profile.path,
                    element: (
                        <ProtectedRoute roles={allRoles}>{routes.profile.component}</ProtectedRoute>
                    ),
                },
                {
                    path: routes.battle.path,
                    element: (
                        <ProtectedNavRoute roles={allRoles}>
                            {routes.battle.component}
                        </ProtectedNavRoute>
                    ),
                },
                {
                    path: routes.login.path,
                    element: <PublicRoute roles={allRoles}>{routes.login.component}</PublicRoute>,
                },
                {
                    path: routes.signup.path,
                    element: <PublicRoute roles={allRoles}>{routes.signup.component}</PublicRoute>,
                },
                {
                    path: routes.forgotPassword.path,
                    element: (
                        <PublicRoute roles={allRoles}>
                            {routes.forgotPassword.component}
                        </PublicRoute>
                    ),
                },
                {
                    /* {
                    path: routes.tasks.path,
                    element: (
                        <ProtectedRoute roles={allRoles}>{routes.tasks.component}</ProtectedRoute>
                    ),
                },
                {
                    path: routes.addTask.path,
                    element: (
                        <ProtectedSkeletonRoute roles={allRoles}>
                            {routes.addTask.component}
                        </ProtectedSkeletonRoute>
                    ),
                },
                {
                    path: routes.editTask.path,
                    element: (
                        <ProtectedSkeletonRoute roles={allRoles}>
                            {routes.editTask.component}
                        </ProtectedSkeletonRoute>
                    ),
                },
                {
                    path: routes.taskUpload.path,
                    element: (
                        <ProtectedSkeletonRoute roles={allRoles}>
                            {routes.taskUpload.component}
                        </ProtectedSkeletonRoute>
                    ),
                },
                {
                    path: routes.vendor.path,
                    element: (
                        <ProtectedRoute roles={allRoles}>{routes.vendor.component}</ProtectedRoute>
                    ),
                },
                {
                    path: routes.addVendor.path,
                    element: (
                        <ProtectedSkeletonRoute roles={allRoles}>
                            {routes.addVendor.component}
                        </ProtectedSkeletonRoute>
                    ),
                },
                {
                    path: routes.editVendor.path,
                    element: (
                        <ProtectedSkeletonRoute roles={allRoles}>
                            {routes.editVendor.component}
                        </ProtectedSkeletonRoute>
                    ),
                },
                {
                    path: routes.students.path,
                    element: (
                        <ProtectedRoute roles={allRoles}>
                            {routes.students.component}
                        </ProtectedRoute>
                    ),
                },
                {
                    path: routes.addStudent.path,
                    element: (
                        <ProtectedSkeletonRoute roles={allRoles}>
                            {routes.addStudent.component}
                        </ProtectedSkeletonRoute>
                    ),
                },
                {
                    path: routes.editStudent.path,
                    element: (
                        <ProtectedSkeletonRoute roles={allRoles}>
                            {routes.editStudent.component}
                        </ProtectedSkeletonRoute>
                    ),
                },
                {
                    path: routes.projects.path,
                    element: (
                        <ProtectedRoute roles={allRoles}>
                            {routes.projects.component}
                        </ProtectedRoute>
                    ),
                },
                {
                    path: routes.profiles.path,
                    element: (
                        <ProtectedRoute roles={[Admin]}>{routes.profiles.component}</ProtectedRoute>
                    ),
                },
                {
                    path: routes.editAccount.path,
                    element: (
                        <ProtectedSkeletonRoute roles={allRoles}>
                            {routes.editAccount.component}
                        </ProtectedSkeletonRoute>
                    ),
                },
                {
                    path: routes.editProfile.path,
                    element: (
                        <ProtectedSkeletonRoute roles={allRoles}>
                            {routes.editProfile.component}
                        </ProtectedSkeletonRoute>
                    ),
                },
                {
                    path: routes.addProfile.path,
                    element: (
                        <ProtectedSkeletonRoute roles={allRoles}>
                            {routes.addProfile.component}
                        </ProtectedSkeletonRoute>
                    ),
                },
                {
                    path: routes.login.path,
                    element: <PublicRoute>{routes.login.component}</PublicRoute>,
                }, */
                },
            ])}
        </>
    );
};
