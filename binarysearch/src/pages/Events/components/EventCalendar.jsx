import React, { useEffect, useMemo, useState } from 'react';
import { eachDayOfInterval, endOfMonth, format, getDay, isToday, startOfMonth } from 'date-fns';
import { WEEKDAYS } from 'utils/contants';
import { IconButton, useTheme } from '@mui/material';
import { ReactIcon } from 'components/molecules';
import { useResponsive } from 'hooks';

export const EventCalendar = ({ events }) => {
    const isMobile = useResponsive('down', 'sm', '', '');
    const isTablet = useResponsive('between', '', 'sm', 'md');
    const isDesktop = useResponsive('up', 'md', '', '');

    const theme = useTheme();
    const [currentDate, setCurrentDate] = useState(new Date());
    const [firstDayOfMonth, setFirstDayOfMonth] = useState(startOfMonth(currentDate));
    const [lastDayOfMonth, setLastDayOfMonth] = useState(endOfMonth(currentDate));
    const [startingDayIndex, setStartingDayIndex] = useState(getDay(firstDayOfMonth));
    const [daysInMonth, setDaysInMonth] = useState(
        eachDayOfInterval({
            start: firstDayOfMonth,
            end: lastDayOfMonth,
        })
    );

    const changePreviousMonth = () => {
        let previousMonth = new Date(currentDate.setMonth(currentDate.getMonth() - 1));
        previousMonth = new Date(previousMonth.setDate(1));
        setCurrentDate(previousMonth);
    };

    const changeNextMonth = () => {
        let nextMonth = new Date(currentDate.setMonth(currentDate.getMonth() + 1));
        nextMonth = new Date(nextMonth.setDate(1));
        setCurrentDate(nextMonth);
    };

    useEffect(() => {
        setFirstDayOfMonth(startOfMonth(currentDate));
        setLastDayOfMonth(endOfMonth(currentDate));
        setStartingDayIndex(getDay(startOfMonth(currentDate)));
        setDaysInMonth(
            eachDayOfInterval({
                start: startOfMonth(currentDate),
                end: endOfMonth(currentDate),
            })
        );
    }, [currentDate]);

    const eventsByDate = useMemo(() => {
        return events.reduce((acc, event) => {
            const dateKey = format(event.date, 'yyyy-MM-dd');
            if (!acc[dateKey]) {
                acc[dateKey] = [];
            }
            acc[dateKey].push(event);
            return acc;
        }, {});
    }, [events]);

    return (
        <div
            className="event-calendar-container"
            style={{
                backgroundColor: theme.palette.background.container,
            }}
        >
            <div className="event-calendar-month-wrapper">
                <IconButton
                    size="medium"
                    sx={{
                        backgroundColor: 'transparent',
                        '&:hover': {
                            backgroundColor: 'action.hover',
                        },
                    }}
                    onClick={changePreviousMonth}
                >
                    <ReactIcon
                        icon={`icon-park-outline:left`}
                        color={theme.palette.icon.primary}
                        height={22}
                        width={22}
                    />
                </IconButton>
                <h2 className="event-calendar-month">{format(currentDate, 'MMMM yyyy')}</h2>
                <IconButton
                    size="medium"
                    sx={{
                        backgroundColor: 'transparent',
                        '&:hover': {
                            backgroundColor: 'action.hover',
                        },
                    }}
                    onClick={changeNextMonth}
                >
                    <ReactIcon
                        icon={`icon-park-outline:right`}
                        color={theme.palette.icon.primary}
                        height={22}
                        width={22}
                    />
                </IconButton>
            </div>
            <div>
                <div className="event-calendar-weekdays">
                    {WEEKDAYS.map((day) => (
                        <div key={day} className="event-calendar-weekday">
                            {day}
                        </div>
                    ))}
                </div>
                <div className="event-calendar-dates">
                    {Array.from({ length: startingDayIndex }).map((_, index) => (
                        <div key={`empty-${index}`} />
                    ))}
                    {daysInMonth.map((day, index) => {
                        const dateKey = format(day, 'yyyy-MM-dd');
                        const todaysEvents = eventsByDate[dateKey] || [];

                        return (
                            <div
                                key={index}
                                className={'event-calendar-day'}
                                style={{
                                    border: `2px solid ${
                                        isToday(day)
                                            ? 'rgba(56, 96, 255, 0.38)'
                                            : theme.palette.border
                                    }`,
                                    backgroundColor: !isToday(day)
                                        ? theme.palette.container.background
                                        : 'rgba(56, 96, 255, 0.38)',
                                    color: theme.palette.text.primary,
                                }}
                            >
                                {format(day, 'd')}
                                {isDesktop && (
                                    <>
                                        {todaysEvents.slice(0, 2).map((event, index) => (
                                            <div
                                                key={index}
                                                className="event-calendar-event"
                                                style={{
                                                    backgroundColor: '#ffa401',
                                                    color: theme.palette.text.primary,
                                                }}
                                            >
                                                {event.title}
                                            </div>
                                        ))}
                                        {todaysEvents?.length > 2 && (
                                            <div
                                                className="event-calendar-event"
                                                style={{
                                                    backgroundColor: 'gray',
                                                    color: theme.palette.text.primary,
                                                }}
                                            >
                                                {todaysEvents?.length - 2} more events
                                            </div>
                                        )}
                                    </>
                                )}
                                {isMobile && (
                                    <div>
                                        <div
                                            style={{
                                                display: 'flex',
                                                justifyContent: 'center',
                                                gap: '2px',
                                            }}
                                        >
                                            {todaysEvents.slice(0, 4).map((_, index) => (
                                                <div
                                                    key={index}
                                                    className="event-calendar-event-small"
                                                    style={{
                                                        backgroundColor: '#ffa401',
                                                        color: theme.palette.text.primary,
                                                    }}
                                                ></div>
                                            ))}
                                        </div>
                                        {todaysEvents?.length > 4 && (
                                            <div
                                                className="event-calendar-event"
                                                style={{
                                                    marginTop: '5px',
                                                    backgroundColor: 'gray',
                                                    color: theme.palette.text.primary,
                                                }}
                                            >
                                                + {todaysEvents?.length - 4}
                                            </div>
                                        )}
                                    </div>
                                )}
                                {isTablet && (
                                    <>
                                        {todaysEvents.slice(0, 1).map((event, index) => (
                                            <div
                                                key={index}
                                                className="event-calendar-event"
                                                style={{
                                                    backgroundColor: '#ffa401',
                                                    color: theme.palette.text.primary,
                                                }}
                                            >
                                                {event.title}
                                            </div>
                                        ))}
                                        {todaysEvents?.length > 1 && (
                                            <div
                                                className="event-calendar-event"
                                                style={{
                                                    backgroundColor: 'gray',
                                                    color: theme.palette.text.primary,
                                                }}
                                            >
                                                {todaysEvents?.length - 1} more events
                                            </div>
                                        )}
                                    </>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};
