import { useState } from 'react';
import { matchPath, useLocation, NavLink as RouterLink } from 'react-router-dom';
import { Box, List, ListItemText, Popover, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import NavItem from './NavItem';
import { getIcon } from '@iconify/react';
import config from 'config';
import { ReactIcon } from 'components/molecules';
import { CancleModal } from '../CancleModal';
import { ListItemIconStyle, ListItemStyle } from './styles';

const {
    roles: { Admin, Manager, Employee, HR },
} = config;

const allRole = [Manager, Admin, Employee, HR];

const NavSection = ({ isOpenSidebar, navConfig, other }) => {
    // const { showToast } = useToast();
    const logout = {
        title: 'My Profile',
        path: `/${process.env.REACT_APP_CONTEXT_PATH}/profile`,
        icon: getIcon('gg:profile'),
        fillIcon: getIcon('gg:profile'),
        roles: allRole,
        grouped: {
            groupName: 'Profile Management',
            groupedItems: [
                {
                    title: 'Edit Profile',
                    path: `${process.env.REACT_APP_CONTEXT_PATH}/edit-account`,
                    icon: getIcon('iconamoon:profile-duotone'),
                    fillIcon: getIcon('iconamoon:profile-duotone'),
                    roles: allRole,
                },
            ],
            groupedPaths: [
                `/${process.env.REACT_APP_CONTEXT_PATH}/edit-account`,
                `/${process.env.REACT_APP_CONTEXT_PATH}/logout`,
            ],
        },
    };
    const { pathname } = useLocation();
    // const navigate = useNavigate();
    const theme = useTheme();
    const match = (path) => {
        if (pathname.length === 1) return path ? !!matchPath(path, pathname) : false;
        else return path.includes(pathname.substr(1));
    };
    // const {
    //     userResponse: { role },
    // } = useSelector((state) => state.auth);
    // const { userResponse } = useSelector((state) => state.auth);
    const [openPopover, setOpenPopover] = useState(null);
    const [openLogout, setOpenLogout] = useState(false);
    const [isloading, setIsloading] = useState(false);

    const handleOpen = () => setOpenLogout(true);
    const handleClose = () => setOpenLogout(false);

    const handleOpenPopover = (event) => {
        setOpenPopover(event.currentTarget);
    };

    const handleLogout = () => {
        setIsloading(true);
        // AuthService.logout()
        //     .then(() => {
        //         showToast('Logged out', 'success');
        //         removeToken({
        //             name: 'token',
        //         });
        //         removeToken({
        //             name: 'refresh',
        //         });

        //         handleClose();
        //         navigate(`${process.env.REACT_APP_CONTEXT_PATH}/login`);
        //     })
        //     .catch((err) => {
        //         showToast(err?.data?.message || err?.data?.error, 'error');
        //     })
        //     .finally(() => {
        //         setIsloading(false);
        //     });
    };

    return (
        <>
            <Box
                {...other}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    height: '85%',
                }}
            >
                <List disablePadding>
                    {navConfig.map((item) => {
                        if (item.roles.includes('Admin')) {
                            return (
                                <NavItem
                                    key={item.title}
                                    isOpenSidebar={isOpenSidebar}
                                    item={item}
                                    active={match}
                                />
                            );
                        }
                        return null;
                    })}
                </List>
                <>
                    <Box
                        sx={
                            {
                                // display: "flex",
                                // justifyContent: "flex-end",
                                // backgroundColor: "red",
                            }
                        }
                    >
                        <ListItemStyle
                            style={{
                                paddingLeft: theme.spacing('10px'),
                                paddingRight: theme.spacing('10px'),
                            }}
                        >
                            <ListItemIconStyle>
                                <ReactIcon icon="mdi:github" width={28} height={28} />
                            </ListItemIconStyle>
                            {isOpenSidebar && (
                                <ListItemText
                                    style={{
                                        color: theme.palette.icon.primary,
                                        fontSize: theme.typography.h1.fontSize,
                                    }}
                                >
                                    {logout.title}
                                </ListItemText>
                            )}
                        </ListItemStyle>
                        <ListItemStyle
                            onClick={handleOpenPopover}
                            style={{
                                paddingLeft: theme.spacing('10px'),
                                paddingRight: theme.spacing('10px'),
                            }}
                        >
                            <ListItemIconStyle>
                                <ReactIcon icon="gg:profile" width={28} height={28} />
                            </ListItemIconStyle>
                            {isOpenSidebar && (
                                <ListItemText
                                    style={{
                                        color: theme.palette.icon.primary,
                                        fontSize: theme.typography.h1.fontSize,
                                    }}
                                >
                                    {logout.title}
                                </ListItemText>
                            )}
                        </ListItemStyle>
                    </Box>

                    {/* grouped popover */}
                    <Popover
                        open={Boolean(openPopover)}
                        anchorEl={openPopover}
                        onClose={() => setOpenPopover(null)}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                        }}
                        transformOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                        PaperProps={{
                            sx: {
                                p: 0.4,
                                ml: '.5rem',
                                width: '180px',
                                backgroundColor: theme.palette.popover.background,
                                border: `2px solid ${theme.palette.popover.border}`,
                                boxShadow: theme.shadows[0],
                                '& .MuiMenuItem-root': {
                                    typography: 'body2',
                                    borderRadius: 0.75,
                                },
                            },
                        }}
                    >
                        <Box sx={{ my: 1.5, px: 2.5, wordBreak: 'break-word' }}>
                            <Typography sx={{ color: theme.palette.text.primary }}>
                                {/* {userResponse?.username} */}
                                Chandan Sahoo
                            </Typography>
                            <Typography sx={{ color: '#a3aab0', fontSize: '.8rem' }}>
                                {/* {userResponse?.role} */}
                                Admin
                            </Typography>
                            <Box
                                sx={{
                                    borderBottom: `2px solid ${theme.palette.border}`,
                                    paddingTop: '5px',
                                }}
                            ></Box>
                            <Box>
                                {logout.grouped?.groupedItems.map((item, index) => (
                                    <Box
                                        component={RouterLink}
                                        to={item?.path}
                                        key={index}
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 2,
                                            margin: '10px 0',
                                            color: theme.palette.text.primary,
                                            cursor: 'pointer',
                                            textDecoration: 'none',
                                            paddingBottom: '10px',
                                            borderBottom: `${
                                                index !== logout.grouped?.groupedItems.length &&
                                                `2px solid ${theme.palette.border}`
                                            }`,
                                        }}
                                    >
                                        {/* {item?.icon} */}
                                        <Typography sx={{ fontWeight: '500' }}>
                                            {item?.title}
                                        </Typography>
                                    </Box>
                                ))}
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 2,
                                        margin: '10px 0',
                                        color: theme.palette.text.primary,
                                        cursor: 'pointer',
                                        textDecoration: 'none',
                                        paddingBottom: '10px',
                                    }}
                                    onClick={handleOpen}
                                >
                                    {/* {item?.icon} */}
                                    <Typography sx={{ fontWeight: '500' }}>Logout</Typography>
                                </Box>
                            </Box>
                        </Box>
                    </Popover>
                </>
            </Box>
            <CancleModal
                loading={isloading}
                handleClick={handleLogout}
                open={openLogout}
                handleClose={handleClose}
                title={'Are you sure want to logout?'}
            />
        </>
    );
};

export default NavSection;
