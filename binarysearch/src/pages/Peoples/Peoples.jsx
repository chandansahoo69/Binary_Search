import React from 'react';
import { Typography, useTheme } from '@mui/material';
import { useResponsive } from 'hooks';
import NotificationBox from 'pages/Notification/NotificationBox';

const Peoples = () => {
    const theme = useTheme();
    const isMobile = useResponsive('down', 'sm', '', '');

    const notifications = [
        {
            id: 1,
            notificationData: {
                content: `Krishna created a new playground.`,
                user: { avatar: '', username: 'sahooc', fullName: 'Chandan Sahoo' },
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
                user: { avatar: '', username: 'madhav', fullName: 'Krishna Basudev' },
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

    return (
        <>
            <div className="page-container" style={{ padding: isMobile ? '5px 5px' : '10px 20px' }}>
                <Typography
                    sx={{
                        fontSize: isMobile
                            ? theme.typography.h3.fontSize
                            : theme.typography.h2.fontSize,
                        fontWeight: theme.typography.h2.fontWeight,
                        paddingBottom: '1rem',
                    }}
                >
                    Peoples
                </Typography>
                <div
                    className="notification-page-box-container"
                    style={{
                        backgroundColor: theme.palette.background.container,
                        padding: isMobile ? '10px' : '20px',
                    }}
                >
                    <div className="container-pre-heading">
                        <div className="prebox-style"></div>
                        <Typography
                            sx={{
                                fontSize: isMobile
                                    ? theme.typography.h4.fontSize
                                    : theme.typography.h3.fontSize,
                                fontWeight: theme.typography.fontWeightMedium,
                            }}
                        >
                            All
                        </Typography>
                    </div>
                    <div>
                        {notifications.map((notification, index) => (
                            <NotificationBox
                                key={index}
                                notification={notification}
                                index={index}
                                totalCount={notifications.length}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Peoples;
