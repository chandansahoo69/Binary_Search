import Navbar, { DRAWER_WIDTH, MINI_DRAWER_WIDTH } from 'components/organism/Navbar/Navbar';
import React, { useState } from 'react';
import { Sidebar } from '../Sidebar';
import { useResponsive } from 'hooks';
import { MainStyle, RootStyle } from './style';

const AuthLayout = ({ children }) => {
    const isDesktop = useResponsive('up', 'lg', '', '');

    const [openSidebar, setOpenSidebar] = useState(false);

    const toggleSidebar = () => {
        setOpenSidebar(!openSidebar);
    };

    return (
        <RootStyle>
            <Navbar isOpenSidebar={openSidebar} onOpenSideBar={toggleSidebar} />
            <Sidebar isOpenSidebar={openSidebar} onCloseSidebar={toggleSidebar} />
            <MainStyle
                sx={{
                    paddingLeft: isDesktop
                        ? openSidebar
                            ? `${DRAWER_WIDTH + 10}px!important`
                            : `${MINI_DRAWER_WIDTH + 10}px!important`
                        : '10px!important',
                }}
            >
                {children}
            </MainStyle>
        </RootStyle>
    );
};

export default AuthLayout;
