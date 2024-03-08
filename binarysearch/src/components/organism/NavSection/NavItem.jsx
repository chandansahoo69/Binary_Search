import { useState } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import { NavLink as RouterLink, useLocation } from 'react-router-dom';
import {
    Box,
    List,
    Collapse,
    ListItemText,
    Popover,
    Typography,
    ListItemButton,
    ListItemIcon,
    Zoom,
    Tooltip,
    tooltipClasses,
} from '@mui/material';
import { ReactIcon } from 'components/molecules';
import { ListItemIconStyle, ListItemStyle } from './styles';

export const LightTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
        padding: '10px 18px',
        borderRadius: '4px',
        // border: `2px solid ${theme.palette.popover.border}`,
        backgroundColor: theme.palette.tooltip.background,
        color: theme.palette.tooltip.color,
        boxShadow: theme.shadows[0],
        fontSize: 11,
    },
}));

const NavItem = ({ isOpenSidebar, item, active }) => {
    const { pathname } = useLocation();
    const [openPopover, setOpenPopover] = useState(null);
    // const { userResponse } = useSelector((state) => state.auth);
    const theme = useTheme();
    let isActiveRoot = active(item.path);
    const { title, path, icon, info, children, fillIcon, grouped } = item;

    const [open, setOpen] = useState(isActiveRoot);

    const handleOpen = () => {
        setOpen((prev) => !prev);
    };

    const handleOpenPopover = (event) => {
        setOpenPopover(event.currentTarget);
    };

    const handleClick = () => {
        setOpenPopover(null);
    };

    const activeRootStyle = {
        fontWeight: 'fontWeightMedium',
        backgroundColor: 'rgba(56, 96, 255, 0.08)',
        border: 'none',
    };

    const activeSubStyle = {
        color: 'text.primary',
        fontWeight: 'fontWeightMedium',
    };

    const checkGroupURL = (groupedPaths) => {
        return groupedPaths?.includes(pathname);
    };

    if (children) {
        return (
            <>
                <ListItemButton
                    onClick={handleOpen}
                    sx={{
                        ...(isActiveRoot && activeRootStyle),
                    }}
                    style={{
                        ...theme.typography.body2,
                        height: 60,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        textTransform: 'capitalize',
                        paddingLeft: theme.spacing(2.5),
                        paddingRight: theme.spacing(2.5),
                        color: theme.palette.icon.primary,
                    }}
                >
                    <ListItemIcon>{icon && icon}</ListItemIcon>
                    <ListItemText
                        disableTypography
                        primary={title}
                        style={{
                            color: theme.palette.common.black,
                            fontSize: theme.typography.h1.fontSize,
                        }}
                    />
                    {info && info}
                    <ReactIcon
                        icon={open ? 'eva:arrow-ios-downward-fill' : 'eva:arrow-ios-forward-fill'}
                        sx={{ width: 16, height: 16, ml: 1 }}
                    />
                </ListItemButton>

                <Collapse in={open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        {children.map((item) => {
                            const { title, path } = item;
                            const isActiveSub = active(path);

                            return (
                                <ListItemButton
                                    key={title}
                                    component={RouterLink}
                                    to={path}
                                    sx={{
                                        ...(isActiveSub && activeSubStyle),
                                    }}
                                    style={{
                                        ...theme.typography.body2,
                                        height: 60,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        textTransform: 'capitalize',
                                        paddingLeft: theme.spacing(2.5),
                                        paddingRight: theme.spacing(2.5),
                                        color: theme.palette.common.black,
                                    }}
                                >
                                    <ListItemIcon
                                        style={{
                                            width: 40,
                                            height: 40,
                                            // border: `1px solid ${theme.palette.secondary.light}`,
                                            minWidth: 'auto',
                                            // borderRadius: "8px",
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            color: theme.palette.common.black,
                                            fontSize: theme.typography.h1.fontSize,
                                        }}
                                    >
                                        <Box
                                            component="span"
                                            sx={{
                                                width: 4,
                                                height: 4,
                                                display: 'flex',
                                                borderRadius: '50%',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                bgcolor: 'text.disabled',
                                                transition: (theme) =>
                                                    theme.transitions.create('transform'),
                                                ...(isActiveSub && {
                                                    transform: 'scale(2)',
                                                    bgcolor: 'primary.main',
                                                }),
                                            }}
                                        />
                                    </ListItemIcon>
                                    <ListItemText
                                        style={{
                                            color: theme.palette.common.black,
                                            fontSize: theme.typography.h1.fontSize,
                                        }}
                                        disableTypography
                                        primary={title}
                                    />
                                </ListItemButton>
                            );
                        })}
                    </List>
                </Collapse>
            </>
        );
    }

    if (grouped) {
        isActiveRoot = checkGroupURL(grouped?.groupedPaths);
        return (
            <>
                {/* <LightTooltip title={title} placement="right"> */}
                <Box>
                    <ListItemButton onClick={handleOpenPopover}>
                        <ListItemIcon
                            sx={{
                                ...(isActiveRoot && activeRootStyle),
                            }}
                        >
                            {isActiveRoot ? fillIcon : icon}
                        </ListItemIcon>
                        {isOpenSidebar && (
                            <ListItemText
                                sx={isActiveRoot && { color: theme.palette.common.white }}
                            >
                                {title}
                            </ListItemText>
                        )}
                    </ListItemButton>
                </Box>
                {/* </LightTooltip> */}
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
                            p: 1,
                            '& .MuiMenuItem-root': {
                                typography: 'body2',
                                borderRadius: 0.75,
                            },
                        },
                    }}
                >
                    <Box sx={{ my: 1.5, px: 2.5 }}>
                        <Typography sx={{ color: theme.palette.common.black }}>
                            {/* {userResponse?.username} */}
                            Chandan Sahoo
                        </Typography>
                        <Typography sx={{ color: '#a3aab0', fontSize: '.8rem' }}>
                            {/* {userResponse?.role} */}
                            Admin
                        </Typography>
                        <Box sx={{ borderBottom: '2px solid #f6f8fb', paddingTop: '5px' }}></Box>
                        {/* <Divider /> */}
                        <Box>
                            {grouped?.groupedItems.map((item, index) => (
                                <Box
                                    component={RouterLink}
                                    to={item?.path}
                                    key={index}
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 2,
                                        margin: '10px 0',
                                        color: theme.palette.common.black,
                                        cursor: 'pointer',
                                        textDecoration: 'none',
                                        paddingBottom: '10px',
                                        borderBottom: `${
                                            index !== grouped?.groupedItems.length - 1 &&
                                            '2px solid #f6f8fb'
                                        }`,
                                    }}
                                    onClick={handleClick}
                                >
                                    {item?.icon}
                                    <Typography sx={{ fontWeight: '500' }}>
                                        {item?.title}
                                    </Typography>
                                </Box>
                            ))}
                        </Box>
                    </Box>
                </Popover>
            </>
        );
    }

    return (
        <>
            <LightTooltip
                TransitionComponent={Zoom}
                title={!isOpenSidebar ? title : ''}
                placement="right"
            >
                <Box>
                    <ListItemStyle
                        component={RouterLink}
                        to={path}
                        className={`${isActiveRoot && 'krishna'}`}
                        sx={isActiveRoot && activeRootStyle}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                padding: '0 10px',
                            }}
                        >
                            <ListItemIconStyle
                                sx={isActiveRoot && { color: theme.palette.primary.main }}
                            >
                                {isActiveRoot ? fillIcon : icon}
                            </ListItemIconStyle>

                            {isOpenSidebar && (
                                <ListItemText
                                    sx={[
                                        { color: theme.palette.text.secondary },
                                        isActiveRoot && { color: theme.palette.text.primary },
                                    ]}
                                >
                                    {title}
                                </ListItemText>
                            )}
                        </Box>
                    </ListItemStyle>
                </Box>
            </LightTooltip>
        </>
    );
};

export default NavItem;
