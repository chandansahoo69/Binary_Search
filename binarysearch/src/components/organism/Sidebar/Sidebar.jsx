import React from 'react';
import { useResponsive } from 'hooks';
import { Box, Drawer, useTheme } from '@mui/material';
import { DRAWER_WIDTH, MINI_DRAWER_WIDTH } from '../Navbar/Navbar';
import sidebarConfig from 'config/SidebarConfig';
import { NavSection } from '../NavSection';
import { ReactIcon } from 'components/molecules';

const Sidebar = ({ isOpenSidebar, onCloseSidebar }) => {
    // const { pathname } = useLocation();
    const theme = useTheme();
    const isDesktop = useResponsive('up', 'lg', '', '');

    // useEffect(() => {
    //     if (isOpenSidebar) {
    //         onCloseSidebar();
    //     }
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [pathname]);

    const renderContent = (
        <div
            style={{
                backgroundColor: theme.palette.sidebar.background,
                // backgroundColor: 'pink',
                height: '100%',
                borderRadius: '15px',
                margin: '.5rem .5rem .5rem .5rem',
            }}
        >
            <Box sx={{ px: 2.5, py: 3, display: 'flex', justifyContent: 'center' }}>
                {/* <Logo type={`${isOpenSidebar ? '' : 'text'}`} /> */}
                <ReactIcon
                    icon={`tabler:binary-tree`}
                    color={theme.palette.primary.main}
                    height={25}
                    width={25}
                />
            </Box>

            <NavSection isOpenSidebar={isOpenSidebar} navConfig={sidebarConfig} />

            {/* <Box sx={{ flexGrow: 1 }} /> */}
        </div>
    );

    return (
        <div
            style={{
                [theme.breakpoints.up('lg')]: {
                    flexShrink: 0,
                    width: isOpenSidebar ? DRAWER_WIDTH : MINI_DRAWER_WIDTH,
                },
            }}
        >
            {!isDesktop && (
                <Drawer
                    open={isOpenSidebar}
                    onClose={onCloseSidebar}
                    PaperProps={{
                        sx: { width: DRAWER_WIDTH },
                    }}
                >
                    {renderContent}
                </Drawer>
            )}

            {isDesktop && (
                <Drawer
                    open
                    variant="persistent"
                    PaperProps={{
                        sx: {
                            width: isOpenSidebar ? DRAWER_WIDTH : MINI_DRAWER_WIDTH,
                            border: 'none',
                        },
                    }}
                >
                    {renderContent}
                </Drawer>
            )}
        </div>
    );
};

export default Sidebar;
