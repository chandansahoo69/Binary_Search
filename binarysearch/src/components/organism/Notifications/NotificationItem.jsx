import React from 'react';
import { ListItemButton, Avatar, ListItemText, Typography, useTheme, Box } from '@mui/material';
import { CustomButton, ReactIcon } from 'components/molecules';
import moment from 'moment/moment';

import userProfileDemo from 'assets/images/svg/user-profile-demo.svg';

const NotificationItem = ({ index, notification, handleAddToCalendar }) => {
    const theme = useTheme();

    return (
        <>
            <ListItemButton sx={{ flexDirection: 'column', alignItems: 'start' }}>
                <Box className="notification-item">
                    <Box className="notification-left-box">
                        {notification.notificationData?.isRead ? (
                            <Avatar
                                alt="user_profile"
                                src={userProfileDemo}
                                sx={{ border: `2px solid ${theme.palette.primary.main}` }}
                            />
                        ) : (
                            <ReactIcon
                                icon={`ant-design:code-outlined`}
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
                            {notification?.content}
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
                        {true && (
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
                            {moment
                                .utc(notification?.details?.startDate)
                                .local()
                                .startOf('seconds')
                                .fromNow()}
                        </Typography>
                    </Box>
                </Box>
                <Box className="notification-sender">
                    <Typography sx={{ color: theme.palette.text.disabled, fontSize: '.65rem' }}>
                        - created by
                    </Typography>
                    <Avatar
                        alt="user_profile"
                        src={notification?.from?.avatar}
                        sx={{
                            border: `1px solid ${theme.palette.primary.main}`,
                            width: '20px',
                            height: '20px',
                        }}
                    />
                    <Typography sx={{ color: theme.palette.text.secondary, fontSize: '.85rem' }}>
                        {notification?.from?.username}
                    </Typography>
                </Box>
                {notification?.showAction && (
                    <Box className="notification-action-buttons">
                        <CustomButton
                            text="Add to Calendar"
                            type="contained"
                            height={'30px'}
                            bgColor={theme.palette.button.background}
                            textColor={theme.palette.button.color}
                            onClick={(e) => handleAddToCalendar(e, notification, index)}
                        />
                        <CustomButton
                            text="Decline"
                            type="outlined"
                            bgColor={'transparent'}
                            height={'30px'}
                            textColor={theme.palette.icon.default}
                            onClick={() => {}}
                        />
                    </Box>
                )}
            </ListItemButton>
        </>
    );
};

export default NotificationItem;
