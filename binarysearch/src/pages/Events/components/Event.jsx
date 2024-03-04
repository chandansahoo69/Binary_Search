import React from 'react';

export const Event = ({ event }) => {
    return (
        <>
            <div className="event-box-container">
                <div className="event-box">
                    <div className="event-box-date">
                        <div className="event-box-date-month">10:00</div>
                        <div className="event-box-date-day">AM</div>
                    </div>
                    <div className="event-box-separator" />
                    <div className="event-box-content">
                        <div className="event-box-content-title">{event.title}</div>
                        <div className="event-box-content-description">{event.description}</div>
                    </div>
                </div>
            </div>
        </>
    );
};
