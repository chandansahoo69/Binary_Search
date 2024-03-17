import React, { useEffect, useState } from 'react';
import { useTheme } from '@emotion/react';
import { BattleBanner, BattleInfo, CodeEditor, QuestionContainer } from './components';

import { APPBAR_DESKTOP } from 'components/organism/Navbar/Navbar';
import { useToast } from 'hooks';
import { getRoom } from 'services/RoomApiRequests';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { socket } from 'socket/socket';

const Battle = () => {
    const { id: roomId } = useParams();
    const theme = useTheme();
    const { showToast } = useToast();
    // const [showBanner, setshowBanner] = useState(true);
    const [roomDetails, setRoomDetails] = useState(null);
    const { user } = useSelector((state) => state.auth);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const getRoomDetails = async () => {
            try {
                const { data: response } = await getRoom(roomId);
                console.log(response);
                setRoomDetails(response?.data);
            } catch (error) {
                showToast(error?.message, 'error');
            }
        };

        getRoomDetails();
    }, []);

    useEffect(() => {
        socket.connect();

        const currentUser = {
            _id: user?._id,
            username: user?.username,
            avatar: user?.avatar,
            email: user?.email,
        };

        socket.on('update', (message, users) => {
            console.log('update -> ', message, users);
            setUsers(users);
        });

        socket.emit('joinRoom', roomId, currentUser);

        const handleWindowClose = () => {
            socket.emit('leaveRoom', roomId, currentUser);
            socket.disconnect();
        };

        window.addEventListener('beforeunload', handleWindowClose);

        return () => {
            window.removeEventListener('beforeunload', handleWindowClose);
        };
    }, []);

    // return <BattleBanner showBanner={showBanner} setshowBanner={setshowBanner} />;

    return (
        <>
            <div
                className="battle-container"
                style={{ height: `calc(100vh - ${APPBAR_DESKTOP + 8}px)` }}
            >
                {/* <div
                    className="battle-left-container"
                    style={{
                        backgroundColor: theme.palette.container.background,
                        height: `calc(100vh - ${APPBAR_DESKTOP + 7}px)`,
                    }}
                > */}
                <QuestionContainer />
                {/* </div> */}
                {/* <div
                    className="battle-center-container"
                    style={{
                        backgroundColor: theme.palette.container.background,
                        height: `calc(100vh - ${APPBAR_DESKTOP + 7}px)`,
                    }}
                > */}
                <CodeEditor />
                {/* </div> */}
                <div
                    className="battle-right-container"
                    style={{
                        backgroundColor: theme.palette.container.background,
                        height: `calc(100vh - ${APPBAR_DESKTOP + 7}px)`,
                    }}
                >
                    <BattleInfo users={users} />
                </div>
            </div>
        </>
    );
};

export default Battle;
