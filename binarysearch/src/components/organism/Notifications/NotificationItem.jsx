import React from 'react';
import { ListItemButton, Avatar, ListItemText, Typography, useTheme, Box } from '@mui/material';
import { ReactIcon } from 'components/molecules';
import moment from 'moment/moment';

import userProfileDemo from 'assets/images/svg/user-profile-demo.svg';

const NotificationItem = ({ notification }) => {
    const theme = useTheme();

    return (
        <>
            <ListItemButton className="notification-item">
                <Box className="notification-left-box">
                    {notification.notificationData?.isRead ? (
                        <Avatar
                            alt="user_profile"
                            src={userProfileDemo}
                            sx={{ border: `2px solid ${theme.palette.primary.main}` }}
                        />
                    ) : (
                        <ReactIcon
                            icon="lucide:user"
                            sx={{
                                color: theme.palette.icon.primary,
                                backgroundColor: 'rgba(56, 96, 255, 0.15)',
                                width: '44px',
                                height: '40px',
                                padding: '10px',
                                borderRadius: '50%',
                            }}
                        />
                    )}
                    <ListItemText sx={{ color: theme.palette.text.primary, display: 'flex' }}>
                        {notification.notificationData.content}
                    </ListItemText>
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        flexDirection: 'column',
                    }}
                >
                    {notification.notificationData?.isRead && (
                        <Box
                            className="notification-unread-dot"
                            sx={{
                                backgroundColor: theme.palette.primary.main,
                            }}
                        ></Box>
                    )}
                    <Typography
                        sx={{
                            color: theme.palette.text.info,
                            fontSize: theme.typography.caption,
                        }}
                    >
                        {moment.utc('2023-11-14 12:00:24').local().startOf('seconds').fromNow()}
                    </Typography>
                </Box>
            </ListItemButton>
        </>
    );
};

export default NotificationItem;
