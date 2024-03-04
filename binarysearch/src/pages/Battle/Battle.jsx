import React, { useEffect, useState } from 'react';
import { useTheme } from '@emotion/react';
import { BattleBanner, BattleInfo, CodeEditor, QuestionContainer } from './components';

import { APPBAR_DESKTOP } from 'components/organism/Navbar/Navbar';
import { useToast } from 'hooks';
import { getRoom } from 'services/RoomApiRequests';
import { useParams } from 'react-router-dom';

const Battle = () => {
    const { id: roomId } = useParams();
    const theme = useTheme();
    const { showToast } = useToast();
    const [showBanner, setshowBanner] = useState(true);
    const [roomDetails, setRoomDetails] = useState(null);

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
                    <BattleInfo />
                </div>
            </div>
        </>
    );
};

export default Battle;
