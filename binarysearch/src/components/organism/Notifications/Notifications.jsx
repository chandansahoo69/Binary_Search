import React, { useState } from 'react';
import { Box, IconButton, Popover, Typography, useTheme } from '@mui/material';
import { ReactIcon } from 'components/molecules';

import NotificationItem from './NotificationItem';
import { useNavigate } from 'react-router-dom';

const Notifications = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const [notificationAnchor, setNotificationAnchor] = useState(null);

    const notifications = [
        {
            id: 1,
            notificationData: {
                content: `Krishna created a new playground.`,
                link: '/profile',
                type: 'playground',
                isRead: false,
            },
            modifiedDate: 1693675092,
        },
        {
            id: 1,
            notificationData: {
                content: `Adam O'Neill mentioned you in a comment.`,
                link: '/profile',
                type: 'comment',
                isRead: true,
            },
            modifiedDate: 1693675092,
        },
        {
            id: 1,
            notificationData: {
                content: `You have a new follower!`,
                link: '/profile',
                type: 'follower',
                isRead: true,
            },
            modifiedDate: 1693675092,
        },
    ];

    const handleOpenNotifications = (event) => {
        setNotificationAnchor(event.currentTarget);
    };

    const handleCloseNotifications = () => {
        setNotificationAnchor(null);
    };

    const ShowAllNotifications = () => {
        handleCloseNotifications();
        setTimeout(() => {
            navigate('/notifications');
        }, 500);
    };

    return (
        <>
            <IconButton
                size="medium"
                sx={{
                    backgroundColor: 'transparent',
                    '&:hover': {
                        backgroundColor: 'action.hover',
                    },
                }}
                onClick={handleOpenNotifications}
            >
                <ReactIcon
                    icon={`material-symbols:notifications-outline-rounded`}
                    color={theme.palette.icon.primary}
                    height={25}
                    width={25}
                />
            </IconButton>
            <Popover
                id={Boolean(notificationAnchor)}
                open={Boolean(notificationAnchor) ? 'simple-popover' : undefined}
                anchorEl={notificationAnchor}
                onClose={handleCloseNotifications}
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
                        width: 400,
                        height: 450,
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
                        <Box
                            sx={{
                                width: '100%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                            }}
                        >
                            <Typography
                                sx={{
                                    fontSize: theme.typography.h4.fontSize,
                                }}
                            >
                                Notifications
                            </Typography>
                            {notifications?.length >= 0 && (
                                <IconButton
                                    size="medium"
                                    sx={{
                                        backgroundColor: 'transparent',
                                        '&:hover': {
                                            backgroundColor: 'action.hover',
                                        },
                                    }}
                                    onClick={() => ShowAllNotifications()}
                                >
                                    <ReactIcon
                                        icon={`ic:baseline-more-horiz`}
                                        color={theme.palette.icon.primary}
                                        height={22}
                                        width={22}
                                    />
                                </IconButton>
                            )}
                        </Box>
                    </Box>
                    <Box className="navbar-action-box">
                        {notifications.map((notification, index) => (
                            <NotificationItem key={index} notification={notification} />
                        ))}
                    </Box>
                </Box>
            </Popover>
        </>
    );
};

export default Notifications;
