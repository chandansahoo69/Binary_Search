import React from 'react';
import { ListItemButton, Avatar, ListItemText, Typography, useTheme, Box } from '@mui/material';
import moment from 'moment';

import userProfileDemo from 'assets/images/svg/user-profile-demo.svg';

const NewUserBox = ({ user }) => {
    const theme = useTheme();

    return (
        <>
            <ListItemButton className="notification-item">
                <Box className="notification-left-box">
                    <Avatar
                        alt="user_profile"
                        src={userProfileDemo}
                        sx={{ border: `2px solid ${theme.palette.primary.main}` }}
                    />

                    <ListItemText sx={{ color: theme.palette.text.primary, display: 'flex' }}>
                        {user.username}
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

export default NewUserBox;
