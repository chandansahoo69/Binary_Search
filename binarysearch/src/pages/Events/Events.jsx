import React from 'react';
import { subDays } from 'date-fns';
import { useResponsive } from 'hooks';
import { EventManager, EventList, EventCalendar } from './components';

const Events = () => {
    const isMobile = useResponsive('down', 'sm', '', '');

    return (
        <>
            <div style={{ padding: isMobile ? '5px 5px' : '10px 15px' }}>
                <EventCalendar
                    events={[
                        { date: subDays(new Date(), 6), title: 'Post Video' },
                        { date: subDays(new Date(), 1), title: 'Edit Video' },
                        { date: subDays(new Date(), 3), title: 'Write Script' },
                        { date: subDays(new Date(), 3), title: 'Write Story' },
                        { date: subDays(new Date(), 3), title: 'Journaling' },
                        { date: subDays(new Date(), 3), title: 'Reading' },
                        { date: subDays(new Date(), 3), title: 'Meditation' },
                    ]}
                />
                <div className="events-management-container">
                    <EventList />
                    <EventManager />
                </div>
            </div>
        </>
    );
};

export default Events;
