import React, { useContext, useState } from 'react';
import {
    AppBar,
    Avatar,
    Box,
    IconButton,
    ListItemButton,
    ListItemText,
    Popover,
    Stack,
    Toolbar,
    Typography,
    useTheme,
} from '@mui/material';
import { ReactIcon } from 'components/molecules';
import { ColorModeContext } from 'theme';

import userProfileDemo from 'assets/images/svg/user-profile-demo.svg';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Notifications } from '../Notifications';
import { Searchbar } from '../Searchbar';
import { useResponsive } from 'hooks';
import routes from 'config/routes';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from 'services/ApiRequests';

export const APPBAR_MOBILE = 64;
export const APPBAR_DESKTOP = 65;

export const DRAWER_WIDTH = 200;
export const MINI_DRAWER_WIDTH = 80;

const Navbar = ({ isOpenSidebar, onOpenSideBar }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isMobile = useResponsive('down', 'sm', '', '');
    const location = useLocation();
    let locationPath = location.pathname.slice(
        location.pathname.lastIndexOf('/'),
        location.pathname.length
    );
    const { user: userResponse } = useSelector((state) => state.auth);

    const theme = useTheme();
    const colorMode = useContext(ColorModeContext);
    const { colorMode: changeColorMode, mode } = colorMode;

    const [profileAnchor, setProfileAnchor] = useState(null);

    const handleOpenProfile = (event) => {
        setProfileAnchor(event.currentTarget);
    };

    const handleCloseProfile = () => {
        setProfileAnchor(null);
    };

    const handleLogout = async () => {
        try {
            await dispatch(logout());
            navigate(routes.login.path);
        } catch (error) {}
    };

    return (
        <>
            <AppBar
                sx={{
                    boxShadow: 'none',
                    backdropFilter: 'blur(6px)',
                    WebkitBackdropFilter: 'blur(6px)', // Fix on Mobile
                    backgroundColor: theme.palette.common.white,
                    [theme.breakpoints.up('lg')]: {
                        width: `calc(100% - ${
                            isOpenSidebar ? DRAWER_WIDTH : MINI_DRAWER_WIDTH + 1
                        }px)`,
                    },
                }}
            >
                <Toolbar
                    sx={{
                        minHeight: APPBAR_MOBILE,
                        backgroundColor: theme.palette.background.paper,
                        [theme.breakpoints.up('lg')]: {
                            minHeight: APPBAR_DESKTOP,
                            padding: theme.spacing(0, 2),
                        },
                    }}
                >
                    <IconButton
                        onClick={onOpenSideBar}
                        sx={{
                            mr: 1,
                            color: 'icon.primary',
                            '&:hover': {
                                backgroundColor: 'action.hover',
                            },
                        }}
                    >
                        {isOpenSidebar ? (
                            <ReactIcon icon="material-symbols:menu-open-rounded" />
                        ) : (
                            <ReactIcon icon="eva:menu-2-fill" />
                        )}
                    </IconButton>

                    <Typography
                        sx={{
                            textTransform: 'capitalize',
                            color: 'text.primary',
                            fontSize: isMobile
                                ? theme.typography.h4.fontSize
                                : theme.typography.h3.fontSize,
                            fontWeight: theme.typography.fontWeightMedium,
                        }}
                    >
                        {location.pathname === '/' ? 'Dashboard' : locationPath.substring(1)}
                    </Typography>

                    <Box sx={{ flexGrow: 1 }} />

                    <Stack direction="row" alignItems="center" spacing={{ xs: 0.5, sm: 1.5 }}>
                        {!isMobile && <Searchbar />}
                        <IconButton
                            size="medium"
                            sx={{
                                backgroundColor: 'transparent',
                                '&:hover': {
                                    backgroundColor: 'action.hover',
                                },
                            }}
                            onClick={changeColorMode.toggleColorMode}
                        >
                            <ReactIcon
                                icon={`${
                                    mode === 'light'
                                        ? 'iconamoon:mode-light-light'
                                        : 'tdesign:mode-dark'
                                }`}
                                color={theme.palette.themeIcon.color}
                                height={25}
                                width={25}
                            />
                        </IconButton>
                        <Notifications />
                        <>
                            <IconButton
                                size="small"
                                sx={{
                                    backgroundColor: 'transparent',
                                    '&:hover': {
                                        backgroundColor: 'action.hover',
                                    },
                                }}
                                onClick={handleOpenProfile}
                            >
                                <Avatar
                                    alt="Remy Sharp"
                                    sx={{ border: `3px solid ${theme.palette.primary.main}` }}
                                    src={userResponse?.avatar || userProfileDemo}
                                />
                            </IconButton>
                            <Popover
                                id={Boolean(profileAnchor)}
                                open={Boolean(profileAnchor) ? 'simple-popover' : undefined}
                                anchorEl={profileAnchor}
                                onClose={handleCloseProfile}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'center',
                                }}
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'center',
                                }}
                                PaperProps={{
                                    sx: {
                                        p: 0,
                                        mt: 1.5,
                                        ml: 0.75,
                                        width: 250,
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
                                <Box sx={{ p: 2 }}>
                                    <Box
                                        className="navbar-profile-box"
                                        sx={{ borderBottom: `1px solid ${theme.palette.divider}` }}
                                    >
                                        <Avatar
                                            alt="Remy Sharp"
                                            sx={{
                                                border: `2px solid ${theme.palette.primary.main}`,
                                            }}
                                            src={userResponse?.avatar || userProfileDemo}
                                        />
                                        <Box>
                                            <Typography>{userResponse?.fullName}</Typography>
                                            <Typography
                                                sx={{
                                                    color: theme.palette.text.secondary,
                                                    fontSize: '13px',
                                                }}
                                            >
                                                {userResponse?.username}
                                            </Typography>
                                        </Box>
                                    </Box>
                                    <Box className="navbar-action-box">
                                        <ListItemButton>
                                            <NavLink
                                                to={routes.profile.path}
                                                style={{ color: theme.palette.primary.main }}
                                                className="navbar-action-item"
                                            >
                                                <ReactIcon
                                                    icon="lucide:user"
                                                    sx={{
                                                        color: theme.palette.icon.primary,
                                                        fontSize: '1.1rem',
                                                    }}
                                                />
                                                <ListItemText
                                                    sx={{ color: theme.palette.text.primary }}
                                                >
                                                    Profile
                                                </ListItemText>
                                            </NavLink>
                                        </ListItemButton>
                                        <ListItemButton onClick={handleLogout}>
                                            <ReactIcon
                                                icon="lucide:arrow-big-right-dash"
                                                sx={{
                                                    color: theme.palette.icon.primary,
                                                    fontSize: '1.1rem',
                                                }}
                                            />
                                            <ListItemText
                                                sx={{ color: theme.palette.text.primary }}
                                            >
                                                Logout
                                            </ListItemText>
                                        </ListItemButton>
                                    </Box>
                                </Box>
                            </Popover>
                        </>
                    </Stack>
                </Toolbar>
            </AppBar>
        </>
    );
};

export default Navbar;
