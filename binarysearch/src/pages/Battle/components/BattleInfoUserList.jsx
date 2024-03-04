import React, { useEffect } from 'react';
import { Avatar, ButtonBase, Typography, useTheme } from '@mui/material';
import { CustomButton, ReactIcon } from 'components/molecules';
// import { socket } from 'socket/socket';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const BattleInfoUserList = ({ users }) => {
    const theme = useTheme();
    const { id: roomId } = useParams();

    const { user } = useSelector((state) => state.auth);
    // console.log(user);

    // const users = [
    //     { id: 1, userName: 'Radha', avatar: '' },
    //     { id: 2, userName: 'Krishna', avatar: '' },
    //     { id: 3, userName: 'Arjun', avatar: '' },
    // ];

    // useEffect(() => {
    //     // connection to check socket is working or not
    //     // socket.on('connection', (data) => {
    //     //     console.log(`${data}`);
    //     // });

    //     socket.on('krishna', (data) => {
    //         console.log('krishna ', data);
    //     });

    //     socket.on('update', (data) => {
    //         console.log('update -> ', data);
    //     });

    //     // Clean up socket connection on component unmount
    //     return () => {
    //         socket.disconnect();
    //     };
    // }, [socket]);

    const joinRoom = () => {
        // socket.emit('joinRoom', roomId, user._id);
    };

    return (
        <>
            <Typography
                sx={{
                    color: 'text.primary',
                    fontSize: theme.typography.h6.fontSize,
                    fontWeight: theme.typography.h4.fontWeight,
                    paddingBottom: '10px',
                }}
            >
                Users:
            </Typography>
            <div
                className="battle-info-user-lists"
                style={{ borderBottom: `2px solid ${theme.palette.popover.border}` }}
            >
                {users.map((user, index) => (
                    <div key={index} className="battle-info-user">
                        <div className="battle-info-user-avatar">
                            <Avatar
                                sx={{ border: `2px solid ${theme.palette.primary.main}` }}
                                src={user?.avatar}
                                alt="avatar"
                            />
                        </div>
                        <div className="battle-info-user-name">{user?.username}</div>
                    </div>
                ))}
            </div>
            <div className="battle-info-timer-wrapper">
                <CustomButton
                    text="Start War"
                    type="contained"
                    textColor={theme.palette.icon.default}
                    onClick={() => joinRoom()}
                />
                <div className="battle-info-timer-container">
                    <ButtonBase sx={{ borderRadius: '6px' }} onClick={() => {}}>
                        <ReactIcon
                            className="battle-info-timer-icon"
                            icon={'lets-icons:clock'}
                            color={'#fff' || theme.palette.icon.primary}
                            sx={{ backgroundColor: theme.palette.container.faded }}
                            height={36}
                            width={36}
                        />
                    </ButtonBase>
                    <ButtonBase sx={{ borderRadius: '6px' }} onClick={() => {}}>
                        <div
                            className="battle-info-timer"
                            style={{ backgroundColor: theme.palette.container.faded }}
                        >
                            10:30
                        </div>
                    </ButtonBase>
                </div>
            </div>
        </>
    );
};
