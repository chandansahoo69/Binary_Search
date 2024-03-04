import React from 'react';
import { SingleNavbar } from '../SingleNavbar';
import { MainStyle, RootStyle } from './style';

const AuthNavLayout = ({ children }) => {
    return (
        <RootStyle>
            <SingleNavbar />
            <MainStyle>{children}</MainStyle>
        </RootStyle>
    );
};

export default AuthNavLayout;
