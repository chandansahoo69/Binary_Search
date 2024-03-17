import React, { useEffect, useState } from 'react';
import { useTheme } from '@mui/material';
import { BattleChat, BattleInfoActionButton, BattleInfoUserList } from '.';
import { useParams } from 'react-router-dom';
import { socket } from 'socket/socket';
import { useSelector } from 'react-redux';

export const BattleInfo = ({ users }) => {
    const theme = useTheme();
    const [isOpenChat, setIsOpenChat] = useState(false);

    // const { id: roomId } = useParams();
    // const { user } = useSelector((state) => state.auth);
    // const [users, setUsers] = useState([]);

    // useEffect(() => {
    //     socket.connect();

    //     const currentUser = {
    //         _id: user?._id,
    //         username: user?.username,
    //         avatar: user?.avatar,
    //         email: user?.email,
    //     };

    //     socket.on('update', (message, users) => {
    //         console.log('update -> ', message, users);
    //         setUsers(users);
    //     });

    //     socket.emit('joinRoom', roomId, currentUser);

    //     return () => {
    //         socket.emit('leaveRoom', roomId, currentUser);

    //         socket.disconnect();
    //     };
    // }, []);

    return (
        <>
            <div className="battle-info-container">
                <BattleChat isOpenChat={isOpenChat} setIsOpenChat={setIsOpenChat} />
                <BattleInfoUserList users={users} />
                <BattleInfoActionButton setIsOpenChat={setIsOpenChat} />
            </div>
        </>
    );
};
