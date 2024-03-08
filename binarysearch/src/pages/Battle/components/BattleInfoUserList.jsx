import React from 'react';
import { Avatar, ButtonBase, Typography, useTheme, Zoom } from '@mui/material';
import { CustomButton, ReactIcon } from 'components/molecules';
import { LightTooltip } from 'components/organism/NavSection/NavItem';

export const BattleInfoUserList = ({ users }) => {
    const theme = useTheme();

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
            <div className="battle-info-timer-wrapper">
                <CustomButton
                    text="Start War"
                    type="contained"
                    textColor={theme.palette.icon.default}
                    // onClick={() => joinRoom()}
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
