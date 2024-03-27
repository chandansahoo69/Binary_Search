import React, { useEffect, useState } from 'react';
import { Box, IconButton, Popover, Typography, useTheme } from '@mui/material';
import { ReactIcon } from 'components/molecules';

import NotificationItem from './NotificationItem';
import { useNavigate } from 'react-router-dom';
import { socket } from 'socket/socket';
import { useSelector } from 'react-redux';
import { createEvent, getNotifications } from 'services/RoomApiRequests';
import { useToast } from 'hooks';

const Notifications = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const { showToast } = useToast();
    const { user } = useSelector((state) => state.auth);
    const [notificationAnchor, setNotificationAnchor] = useState(null);

    const [notifications, setNotifications] = useState([]);

    const fetchNotifications = async () => {
        try {
            const { data: response } = await getNotifications();
            setNotifications([...notifications, ...response?.data]);
        } catch (error) {
            showToast(error?.message, 'error');
        }
    };

    useEffect(() => {
        if (!user) return;

        socket.connect();

        socket.emit('joinNotification', user._id);

        socket.on('notification', (data) => {
            fetchNotifications();
        });

        const handleWindowClose = () => {
            socket.emit('leaveNotification', user._id);
            socket.off('notification');
            socket.disconnect();
        };

        window.addEventListener('beforeunload', handleWindowClose);

        return () => {
            window.removeEventListener('beforeunload', handleWindowClose);
        };
    }, [socket, user]);

    useEffect(() => {
        fetchNotifications();
    }, []);

    const handleAddToCalendar = async (e, notification, index) => {
        e.stopPropagation();
        const args = {
            title: notification?.content,
            details: notification?.details,
            startDate: new Date(notification?.details?.startDate),
            creator: notification?.from._id,
            notficationId: notification?._id,
        };

        try {
            const { data: response } = await createEvent(args);
            let newNotifications = [...notifications];
            newNotifications[index] = response?.data;
            setNotifications(newNotifications);
            showToast(response?.message, 'success');
        } catch (error) {
            showToast(error?.message, 'error');
        }
    };

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
                id={Boolean(notificationAnchor) ? 'simple-popover' : undefined}
                open={Boolean(notificationAnchor)}
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
                            <NotificationItem
                                key={index}
                                index={index}
                                notification={notification}
                                handleAddToCalendar={handleAddToCalendar}
                            />
                        ))}
                    </Box>
                </Box>
            </Popover>
        </>
    );
};

export default Notifications;
