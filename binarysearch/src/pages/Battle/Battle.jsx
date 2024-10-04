import React, { useEffect, useState } from 'react';
import { useTheme } from '@mui/material';
import { BattleBanner, BattleInfo, CodeEditor, QuestionContainer } from './components';

import { APPBAR_DESKTOP } from 'components/organism/Navbar/Navbar';
import { useToast } from 'hooks';
import { getRoom, startWar } from 'services/RoomApiRequests';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { socket } from 'socket/socket';

const Battle = () => {
    const { id: roomId } = useParams();
    const theme = useTheme();
    const { showToast } = useToast();
    // const [showBanner, setshowBanner] = useState(true);
    const [roomDetails, setRoomDetails] = useState(null);
    const [tab, setTab] = useState(0);
    const { user } = useSelector((state) => state.auth);
    const [users, setUsers] = useState([]);
    const [input, setInput] = useState('');

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
            // console.log('update -> ', message, users);
            setUsers(users);
        });

        socket.on('war-started', (message, updatedRoom) => {
            console.log('war-started -> ', message, updatedRoom);
            setRoomDetails(updatedRoom);
        });

        socket.emit('joinRoom', roomId, currentUser);

        const handleWindowClose = () => {
            console.log('Window closed');
            socket.emit('leaveRoom', roomId, currentUser);
            // socket.disconnect();
        };

        const handleBackButton = (event) => {
            if (event.type === 'popstate') {
                // Browser back button was clicked
                console.log('Browser back button clicked');
                socket.emit('leaveRoom', roomId, currentUser);
            }
        };

        const handleScroll = (event) => {
            if (event.deltaY < 0) {
                // Mouse scroll back event detected
                console.log('Mouse scroll back event detected');
                socket.emit('leaveRoom', roomId, currentUser);
            }
        };

        window.addEventListener('beforeunload', handleWindowClose);
        window.addEventListener('popstate', (event) => handleBackButton(event));

        return () => {
            window.removeEventListener('beforeunload', handleWindowClose);
            window.removeEventListener('popstate', (event) => handleBackButton(event));
        };
    }, []);

    const handleStartWar = async () => {
        try {
            const { data: response } = await startWar({
                roomId: roomDetails?._id,
                userId: user._id,
            });
            setRoomDetails(response?.data);
        } catch (error) {
            showToast(error?.response?.data?.data, 'error');
        }
    };

    // return <BattleBanner showBanner={showBanner} setshowBanner={setshowBanner} />;

    return (
        <>
            <div
                className="battle-container"
                style={{ height: `calc(100vh - ${APPBAR_DESKTOP + 3}px)`, overflow: 'hidden' }}
            >
                <QuestionContainer
                    tab={tab}
                    setTab={setTab}
                    roomDetails={roomDetails}
                    input={input}
                    setInput={setInput}
                />
                <CodeEditor tab={tab} input={input} roomDetails={roomDetails} />
                <div
                    className="battle-right-container"
                    style={{
                        backgroundColor: theme.palette.container.background,
                        height: `calc(100vh - ${APPBAR_DESKTOP + 7}px)`,
                        width: '100%',
                    }}
                >
                    <BattleInfo
                        users={users}
                        roomDetails={roomDetails}
                        handleStartWar={handleStartWar}
                    />
                </div>
            </div>
        </>
    );
};

export default Battle;
