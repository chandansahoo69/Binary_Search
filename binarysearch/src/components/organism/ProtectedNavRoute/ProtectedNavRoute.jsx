import React, { Suspense, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { Spinner } from 'components/molecules';
import routes from 'config/routes';
import { AuthNavLayout } from '../AuthNavLayout';
import { useDispatch, useSelector } from 'react-redux';
import { clearTokens, getAccessToken } from 'services/ApiService';
import { getCurrentUser } from 'services/ApiRequests';

export const ProtectedNavRoute = ({ children, roles }) => {
    const navigate = useNavigate();
    // const isAuthed = true;
    const isAuthed = getAccessToken();

    const dispatch = useDispatch();

    const { user } = useSelector((state) => state.auth);

    useEffect(() => {
        if (isAuthed && user === null) {
            (async () => {
                const response = await dispatch(getCurrentUser());

                if (response.meta.requestStatus !== 'fulfilled') {
                    clearTokens();
                    navigate(routes.login.path);
                }
            })();
        }
    }, [isAuthed, user, dispatch]);

    const userHasRequiredRole = isAuthed && roles && roles.includes('Admin');

    const getChildren = () => {
        if (userHasRequiredRole) {
            return children;
        } else {
            return (
                <Navigate
                    to={{
                        pathname: isAuthed ? window.location.pathname : routes.login.path,
                    }}
                />
            );
        }
    };

    return (
        <>
            <AuthNavLayout>
                <React.Fragment>
                    <Suspense fallback={<Spinner />}>{getChildren()}</Suspense>
                </React.Fragment>
            </AuthNavLayout>
        </>
    );
};
