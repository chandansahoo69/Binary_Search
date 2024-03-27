import React, { Fragment } from 'react';
import { APPBAR_DESKTOP } from 'components/organism/Navbar/Navbar';
import { IconButton, useTheme } from '@mui/material';

export const BattleChat = ({ isOpenChat, setIsOpenChat }) => {
    const theme = useTheme();

    return (
        <>
            <div
                className="battle-info-chat-container"
                style={{
                    backgroundColor: theme.palette.container.other,
                    display: isOpenChat ? 'block' : 'none',
                    height: `calc(100vh - ${APPBAR_DESKTOP + 38}px)`,
                    transform: isOpenChat ? 'translate(0px)' : 'translate(450px)',
                }}
            >
                <div className="chatbot">
                    <div className="chatbot-header">
                        <h2>Chat Room</h2>
                        <IconButton
                            className="chatbot-close-icon"
                            size="small"
                            sx={{
                                height: '30px',
                                backgroundColor: '#323639',
                                borderRadius: '5px',
                                color: '#fff',
                                '&:hover': {
                                    backgroundColor: 'action.hover',
                                },
                            }}
                            onClick={() => setIsOpenChat(false)}
                        >
                            X
                            {/* <ReactIcon
                                icon={'solar:qr-code-bold-duotone'}
                                color={theme.palette.common.white}
                                height={25}
                                width={25}
                            /> */}
                        </IconButton>
                    </div>
                    <ul
                        className="chatbox"
                        style={{ height: `calc(100vh - ${APPBAR_DESKTOP + 40}px)` }}
                    >
                        {[0, 1, 2, 3, 4, 5, 6].map((_, index) => (
                            <Fragment key={index}>
                                <li className="chat incoming">
                                    <span className="material-symbols-outlined">O</span>
                                    <p
                                        style={{
                                            backgroundColor: theme.palette.chat.secondary,
                                            color: theme.palette.chat.color,
                                        }}
                                    >
                                        Hi there 👋
                                        <br />
                                        How can I help you today?
                                    </p>
                                </li>
                                <li className="chat outgoing">
                                    <p
                                        style={{
                                            backgroundColor: theme.palette.chat.secondary,
                                            color: theme.palette.chat.color,
                                        }}
                                    >
                                        Hi there 👋
                                        <br />
                                        How can I help you today?
                                    </p>
                                </li>
                            </Fragment>
                        ))}
                    </ul>
                    <div
                        className="chat-input"
                        style={{ backgroundColor: theme.palette.chat.secondary }}
                    >
                        <textarea
                            style={{ backgroundColor: theme.palette.chat.secondary }}
                            placeholder="Enter a message..."
                            spellCheck="false"
                            required
                        ></textarea>

                        <span id="send-btn" className="material-symbols-rounded">
                            send
                        </span>
                    </div>
                </div>
            </div>
        </>
    );
};
