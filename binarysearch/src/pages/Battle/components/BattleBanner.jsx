import React, { useEffect, useState } from 'react';
import { CustomButton } from 'components/molecules';
import { socket } from 'socket/socket';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import userProfileDemo from 'assets/images/svg/user-profile-demo.svg';
import { Avatar, useTheme } from '@mui/material';
import { randomColorGenerator } from 'utils/utilityFunctions';

export const BattleBanner = ({ showBanner, setshowBanner }) => {
    const randomSize = Math.floor(Math.random() * 20);
    const theme = useTheme();
    const { id: roomId } = useParams();
    const { user } = useSelector((state) => state.auth);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        socket.connect();

        socket.on('update', (message, users) => {
            console.log('update -> ', message, users);
            setUsers(users);
        });

        socket.emit('joinRoom', roomId, user);

        return () => {
            socket.disconnect();
        };
    }, []);

    return (
        <>
            <div>Battle Banner</div>

            <div className="battle-joined-user-list">
                {users.map((item) => (
                    <div key={item.id} className="battle-user-profile-avatar">
                        <div>{item.fullName}</div>
                        <div>
                            <Avatar
                                alt="Remy Sharp"
                                sx={{
                                    border: `3px solid ${
                                        randomColorGenerator() || theme.palette.primary.main
                                    }`,
                                    width: 50 + randomSize,
                                    height: 50 + randomSize,
                                }}
                                src={item?.avatar || userProfileDemo}
                            />
                        </div>
                    </div>
                ))}
            </div>
            <CustomButton
                text="Join"
                width={'auto'}
                height={'30px'}
                type="contained"
                otherStyle={{
                    borderRadius: '30px',
                }}
                // onClick={() => handleJoinRoom(item._id)}
            />
        </>
    );
};
