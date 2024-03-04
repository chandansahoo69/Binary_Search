import React from 'react';
import { Typography, useTheme } from '@mui/material';
import { useResponsive } from 'hooks';
import { format } from 'date-fns';
import { Event } from './Event';
import { CustomButton } from 'components/molecules';

export const EventList = () => {
    const theme = useTheme();
    const isMobile = useResponsive('down', 'sm', '', '');
    const currentDate = new Date();

    const events = [
        {
            id: 1,
            title: 'Team Meeting',
            start: '2023-01-10T10:00:00',
            end: '2023-01-10T11:30:00',
            location: 'Conference Room A',
            description: 'Discuss project updates and upcoming tasks.',
            color: '#3498db',
        },
        {
            id: 2,
            title: 'Lunch with Client',
            start: '2023-01-12T12:30:00',
            end: '2023-01-12T13:30:00',
            location: 'Local Restaurant',
            description: 'Meet with the client to review project requirements.',
            color: '#e74c3c',
        },
        {
            id: 3,
            title: 'Training Session',
            start: '2023-01-15T14:00:00',
            end: '2023-01-15T16:00:00',
            location: 'Training Room',
            description: 'Employee training on new tools and technologies.',
            color: '#2ecc71',
        },
        {
            id: 4,
            title: 'Project Deadline',
            start: '2023-01-20T09:00:00',
            end: '2023-01-20T18:00:00',
            location: 'Office',
            description: 'Submit the final project deliverables.',
            color: '#f39c12',
        },
    ];

    return (
        <>
            <div
                className="notification-page-box-container"
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
                        <div className="prebox-style" style={{ backgroundColor: '#39FF14' }}></div>
                        <Typography
                            sx={{
                                fontSize: isMobile
                                    ? theme.typography.h4.fontSize
                                    : theme.typography.h3.fontSize,
                                fontWeight: theme.typography.fontWeightMedium,
                            }}
                        >
                            {format(currentDate, 'd MMMM')}
                        </Typography>
                    </div>
                    <CustomButton text="See All" type="text" onClick={() => {}} />
                </div>
                <div>
                    {events.map((event, index) => (
                        <Event key={index} event={event} index={index} totalCount={events.length} />
                    ))}
                </div>
            </div>
        </>
    );
};
