import React, { useEffect, useState } from 'react';
import { Avatar, ButtonBase, Typography, useTheme, Zoom } from '@mui/material';
import { CustomButton, ReactIcon } from 'components/molecules';
import { LightTooltip } from 'components/organism/NavSection/NavItem';
import moment from 'moment';

export const BattleInfoUserList = ({ users, roomDetails, handleStartWar }) => {
    const theme = useTheme();

    const [timeLeft, setTimeLeft] = useState('');

    useEffect(() => {
        if (!roomDetails?.warStartTime) return;

        const timerDuration = roomDetails?.challangeTime * 60 * 1000;

        const updateTimer = () => {
            const timePassed = new Date() - new Date(roomDetails?.warStartTime);
            const timeRemaining = timerDuration - timePassed;

            // Calculate hours, minutes, and seconds
            const hours = Math.floor((timeRemaining / (1000 * 60 * 60)) % 24);
            const minutes = Math.floor((timeRemaining / (1000 * 60)) % 60);
            const seconds = Math.floor((timeRemaining / 1000) % 60);

            // Format the time left as a string
            const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes
                .toString()
                .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

            setTimeLeft(formattedTime);
        };

        // Update the timer every second
        const intervalId = setInterval(updateTimer, 1000);

        return () => {
            clearInterval(intervalId);
        };
    }, [roomDetails?.warStartTime, roomDetails?.challangeTime]);

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
                style={{
                    borderBottom: `2px solid ${theme.palette.popover.border}`,
                }}
            >
                <ButtonBase onClick={() => {}} sx={{ borderRadius: '10px' }}>
                    <ReactIcon
                        icon={'mingcute:left-line'}
                        color={theme.palette.icon.secondary}
                        height={22}
                        width={22}
                    />
                </ButtonBase>
                <div
                    style={{
                        display: 'flex',
                        gap: '5px',
                        width: '100%',
                        overflow: 'auto',
                    }}
                >
                    {users.map((user, index) => (
                        <div key={index} className="battle-info-user">
                            <LightTooltip TransitionComponent={Zoom} title={user?.username}>
                                <div className="battle-info-user-avatar">
                                    <Avatar
                                        sx={{ border: `2px solid ${theme.palette.primary.main}` }}
                                        src={user?.avatar}
                                        alt="avatar"
                                    />
                                </div>
                            </LightTooltip>
                        </div>
                    ))}
                </div>
                <ButtonBase onClick={() => {}} sx={{ borderRadius: '10px' }}>
                    <ReactIcon
                        icon={'mingcute:right-line'}
                        color={theme.palette.icon.secondary}
                        height={22}
                        width={22}
                    />
                </ButtonBase>
            </div>
            <div className="battle-info-timer-wrapper">
                <CustomButton
                    text="Start War"
                    type="contained"
                    textColor={theme.palette.icon.default}
                    onClick={() => handleStartWar()}
                />
                <div className="battle-info-timer-container">
                    {timeLeft && (
                        <>
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
                                    {timeLeft}
                                </div>
                            </ButtonBase>
                        </>
                    )}
                </div>
            </div>
        </>
    );
};
