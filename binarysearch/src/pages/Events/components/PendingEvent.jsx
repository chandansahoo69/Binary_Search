import React from 'react';
import { Typography, useTheme } from '@mui/material';
import { useResponsive } from 'hooks';
import { CustomButton } from 'components/molecules';

export const PendingEvent = ({ event }) => {
    const theme = useTheme();
    const isMobile = useResponsive('down', 'sm', '', '');

    return (
        <>
            <div
                className="event-manager-item"
                style={{
                    backgroundColor: 'rgba(56, 96, 255, 0.38)',
                    border: `2px solid rgba(56, 96, 255, 0.38)`,
                }}
            >
                <div className="event-manager-item-header">
                    <Typography
                        sx={{
                            fontSize: isMobile
                                ? theme.typography.h6.fontSize
                                : theme.typography.h5.fontSize,
                            fontWeight: theme.typography.fontWeightMedium,
                        }}
                    >
                        {event.title}
                    </Typography>
                    <Typography
                        sx={{
                            color: theme.palette.text.disabled,
                            fontSize: isMobile
                                ? theme.typography.body2.fontSize
                                : theme.typography.body1.fontSize,
                            fontWeight: theme.typography.fontWeightRegular,
                        }}
                    >
                        {event.start} - {event.end}
                    </Typography>
                </div>
                <div className="event-manager-item-body">
                    <Typography
                        sx={{
                            fontSize: isMobile
                                ? theme.typography.body2.fontSize
                                : theme.typography.body1.fontSize,
                            fontWeight: theme.typography.fontWeightRegular,
                        }}
                    >
                        {event.description}
                    </Typography>
                </div>
                <div className="event-manager-item-footer">
                    <Typography
                        sx={{
                            fontSize: isMobile
                                ? theme.typography.body2.fontSize
                                : theme.typography.body1.fontSize,
                            fontWeight: theme.typography.fontWeightRegular,
                        }}
                    >
                        {event.location}
                    </Typography>

                    <div className="event-manager-item-buttons">
                        <CustomButton
                            text="Accept"
                            type="contained"
                            bgColor={'#38C976'}
                            width={isMobile ? '100%' : 'auto'}
                            textColor={theme.palette.icon.default}
                            onClick={() => {}}
                        />
                        <CustomButton
                            text="Reject"
                            type="contained"
                            bgColor={'#FF4D4D'}
                            width={isMobile ? '100%' : 'auto'}
                            textColor={theme.palette.icon.default}
                            onClick={() => {}}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};
