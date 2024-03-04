import React from 'react';
import { Typography, useTheme } from '@mui/material';
import { useResponsive } from 'hooks';
import { PendingEvent } from '.';
import { CustomButton } from 'components/molecules';

export const EventManager = () => {
    const theme = useTheme();
    const isMobile = useResponsive('down', 'sm', '', '');

    const pendingEvents = [
        {
            id: 1,
            sender: {
                userId: 123,
                username: 'john_doe',
            },
            recipient: {
                userId: 456,
                username: 'jane_smith',
            },
            title: 'Coffee Meeting',
            start: '2023-02-01T15:00:00',
            end: '2023-02-01T16:00:00',
            location: 'Starbucks',
            description: 'Discuss upcoming project over coffee.',
            status: 'pending',
        },
        {
            id: 2,
            sender: {
                userId: 789,
                username: 'alice_jones',
            },
            recipient: {
                userId: 456,
                username: 'jane_smith',
            },
            title: 'Tech Talk',
            start: '2023-02-05T14:30:00',
            end: '2023-02-05T16:30:00',
            location: 'Office',
            description: 'Share insights on the latest technologies.',
            status: 'pending',
        },
    ];

    return (
        <>
            <div
                className="event-manager-container"
                style={{
                    backgroundColor: theme.palette.background.container,
                    padding: isMobile ? '10px' : '20px',
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}
                >
                    <div className="container-pre-heading">
                        <div className="prebox-style" style={{ backgroundColor: '#FF3131' }}></div>
                        <Typography
                            sx={{
                                fontSize: isMobile
                                    ? theme.typography.h4.fontSize
                                    : theme.typography.h3.fontSize,
                                fontWeight: theme.typography.fontWeightMedium,
                            }}
                        >
                            Event Manager
                        </Typography>
                    </div>
                    <CustomButton text="See All" type="text" onClick={() => {}} />
                </div>
                <div className="events-manager-pending-list">
                    {pendingEvents.map((event) => (
                        <PendingEvent key={event.id} event={event} />
                    ))}
                </div>
            </div>
        </>
    );
};
