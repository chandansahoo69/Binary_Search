import React from 'react';
import { ListItemButton, Avatar, ListItemText, Typography, useTheme, Box } from '@mui/material';
import moment from 'moment/moment';

import userProfileDemo from 'assets/images/svg/user-profile-demo.svg';
import { CustomButton, ReactIcon } from 'components/molecules';
import { useResponsive } from 'hooks';

const NotificationBox = ({ notification, index, totalCount }) => {
    const theme = useTheme();
    const isMobile = useResponsive('down', 'sm', '', '');

    return (
        <>
            <ListItemButton
                className="notification-box-item"
                // sx={{ flexDirection: isMobile ? 'column' : 'row' }}
            >
                <Box
                    className="notification-box-left-container"
                    sx={{
                        width: isMobile ? '100%' : '70%',
                    }}
                >
                    {notification?.notificationData?.isRead ? (
                        <>
                            <Box sx={{ position: 'relative' }}>
                                <Avatar
                                    sx={{
                                        width: '50px',
                                        height: '50px',
                                        border: `3px solid ${theme.palette.primary.main}`,
                                    }}
                                    alt={'user_avatar'}
                                    src={userProfileDemo}
                                />
                                <div
                                    style={{
                                        position: 'absolute',
                                        right: '0px',
                                        bottom: '50%',
                                        backgroundColor: theme.palette.primary.main,
                                        width: '18px',
                                        height: '18px',
                                        borderRadius: '50%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <ReactIcon
                                        icon={`mi:message`}
                                        color={theme.palette.common.white}
                                        height={11}
                                        width={11}
                                    />
                                </div>
                            </Box>
                        </>
                    ) : (
                        <ReactIcon
                            icon="lucide:user"
                            sx={{
                                color: theme.palette.icon.primary,
                                backgroundColor: 'rgba(56, 96, 255, 0.15)',
                                width: '44px',
                                height: '44px',
                                padding: '10px',
                                borderRadius: '50%',
                            }}
                        />
                    )}
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                        }}
                    >
                        <div style={{ display: 'flex', gap: '10px' }}>
                            <Typography sx={{ color: theme.palette.text.primary, fontWeight: 600 }}>
                                {notification?.notificationData?.user?.fullName}
                            </Typography>
                            <Typography sx={{ color: theme.palette.text.disabled }}>
                                @{notification?.notificationData?.user?.username}
                            </Typography>
                        </div>

                        <ListItemText sx={{ color: theme.palette.text.primary }}>
                            {notification?.notificationData?.content}
                        </ListItemText>

                        {isMobile && (
                            <Typography
                                sx={{
                                    color: theme.palette.text.info,
                                    fontSize: theme.typography.caption,
                                }}
                            >
                                {moment
                                    .utc('2023-11-14 12:00:24')
                                    .local()
                                    .startOf('seconds')
                                    .fromNow()}
                            </Typography>
                        )}

                        <div style={{ paddingTop: isMobile ? '5px' : '0' }}>
                            <CustomButton
                                text="Like"
                                type="text"
                                textColor={theme.palette.icon.default}
                                onClick={() => {}}
                            />
                            <CustomButton
                                text="Reply"
                                type="text"
                                textColor={theme.palette.icon.default}
                                onClick={() => {}}
                            />
                        </div>
                    </div>
                </Box>
                {!isMobile && (
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '20px',
                            // flexDirection: 'column',
                        }}
                    >
                        <Typography
                            sx={{
                                color: theme.palette.text.info,
                                fontSize: theme.typography.caption,
                            }}
                        >
                            {moment.utc('2023-11-14 12:00:24').local().startOf('seconds').fromNow()}
                        </Typography>
                        {notification?.notificationData?.isRead && (
                            <Box
                                className="notification-unread-dot"
                                sx={{
                                    backgroundColor: theme.palette.primary.main,
                                }}
                            ></Box>
                        )}
                    </Box>
                )}
            </ListItemButton>
            {index !== totalCount - 1 && (
                <div
                    style={{
                        borderBottom: `1px solid ${theme.palette.divider}`,
                    }}
                ></div>
            )}
        </>
    );
};

export default NotificationBox;
