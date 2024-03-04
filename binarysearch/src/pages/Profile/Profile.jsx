import React from 'react';
import { Avatar, Typography, useTheme } from '@mui/material';

import { CustomButton, ReactIcon } from 'components/molecules';
import { useResponsive } from 'hooks';

import userProfileDemo from 'assets/images/dashboard-banner-image.jpg';

const Profile = () => {
    const theme = useTheme();
    const isMobile = useResponsive('down', 'sm', '', '');

    const communityInfo = [
        {
            title: 'Views',
            value: 10,
            icon: 'mdi:eye',
            iconColor: '#0FFF50',
        },
        {
            title: 'Total Rooms',
            value: 10,
            icon: 'mdi:code',
            iconColor: '#daf7a6',
        },
        {
            title: 'Followers',
            value: 10,
            icon: 'solar:user-linear',
            iconColor: '#ffc300',
        },
        {
            title: 'Following',
            value: 10,
            icon: 'solar:user-linear',
            iconColor: '#5f3d9c',
        },
    ];

    return (
        <>
            <div className="profile-container">
                <div
                    className="profile-left-container"
                    style={{
                        backgroundColor: theme.palette.background.container,
                    }}
                >
                    <div>
                        <div className="profile-left-container-avatar-box">
                            <div className="profile-left-container-image">
                                <Avatar
                                    sx={{
                                        width: 100,
                                        height: 100,
                                        bgcolor: '#476752',
                                        border: `2px solid ${theme.palette.primary.main}`,
                                    }}
                                    src={userProfileDemo}
                                    alt="profile"
                                    variant="rounded"
                                />
                            </div>
                            <div className="profile-left-container-info">
                                <div
                                    className="profile-left-container-info-name"
                                    style={{ fontWeight: '600' }}
                                >
                                    Radha Krishna
                                </div>
                                <div
                                    className="profile-left-container-info-email"
                                    style={{ color: theme.palette.text.secondary }}
                                >
                                    krishna@gmail.com
                                </div>
                                <div className="profile-left-container-info-phone">1234567890</div>
                            </div>
                        </div>
                        <CustomButton
                            text="Edit Profile"
                            type="contained"
                            bgColor={'#476752'}
                            textColor={'#0FFF50'}
                            width={'100%'}
                            onClick={() => {}}
                        />
                    </div>

                    <div
                        style={{ borderBottom: `1px solid ${theme.palette.divider}` }}
                        className="divider"
                    ></div>

                    <div className="profile-community-info-container">
                        <Typography
                            sx={{
                                color: 'text.primary',
                                fontSize: isMobile
                                    ? theme.typography.h5.fontSize
                                    : theme.typography.h4.fontSize,
                                fontWeight: theme.typography.fontWeightMedium,
                            }}
                        >
                            Community Stats
                        </Typography>

                        <div className="profile-community-info-container-box">
                            {communityInfo.map((item, index) => (
                                <div key={index} className="profile-community-info-container-item">
                                    <ReactIcon
                                        icon={item.icon}
                                        color={item.iconColor || theme.palette.icon.primary}
                                        height={22}
                                        width={22}
                                    />
                                    <div
                                        className="profile-community-info-container-item-title"
                                        style={{ color: theme.palette.text.secondary }}
                                    >
                                        {item.title}
                                    </div>
                                    <div className="profile-community-info-container-item-value">
                                        {item.value}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div
                    className="profile-right-container"
                    style={{
                        backgroundColor: theme.palette.background.container,
                    }}
                >
                    Right
                </div>
            </div>
        </>
    );
};

export default Profile;
