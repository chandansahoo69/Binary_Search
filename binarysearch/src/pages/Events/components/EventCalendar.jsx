import React, { useContext, useEffect, useMemo, useState } from 'react';
import { eachDayOfInterval, endOfMonth, format, getDay, isToday, startOfMonth } from 'date-fns';
import { WEEKDAYS } from 'utils/contants';
import { Box, ButtonBase, IconButton, Popover, Typography, useTheme } from '@mui/material';
import { ReactIcon } from 'components/molecules';
import { useResponsive, useToast } from 'hooks';
import { getEvents } from 'services/EventApiRequests';
import { ColorModeContext } from 'theme';
import moment from 'moment';

export const EventCalendar = ({}) => {
    const isMobile = useResponsive('down', 'sm', '', '');
    const isTablet = useResponsive('between', '', 'sm', 'md');
    const isDesktop = useResponsive('up', 'md', '', '');
    const { showToast } = useToast();
    const colorMode = useContext(ColorModeContext);
    const { mode } = colorMode;

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
    const [events, setEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [todaysMoreEvents, setTodaysMoreEvents] = useState([]);
    const [moreEventsDate, setMoreEventsDate] = useState(null);

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

    const fetchEvents = async () => {
        try {
            const { data: response } = await getEvents(format(currentDate, 'MM'));
            setEvents(response?.data);
        } catch (error) {
            showToast(error?.message, 'error');
        }
    };

    useEffect(() => {
        fetchEvents();
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
            const dateKey = format(new Date(event.startDate), 'yyyy-MM-dd');
            if (!acc[dateKey]) {
                acc[dateKey] = [];
            }
            acc[dateKey].push(event);
            return acc;
        }, {});
    }, [events]);

    const [eventAnchorEl, setEventAnchorEl] = useState(null);
    const [moreEventsAnchorEl, setMoreEventsAnchorEl] = useState(null);

    const handleOpenEventPopover = (event, currentEvent) => {
        setSelectedEvent(currentEvent);
        setEventAnchorEl(event.currentTarget);
    };

    const handleCloseEventPopover = () => {
        setEventAnchorEl(null);
        setSelectedEvent(null);
    };

    const handleOpenMoreEventPopover = (event, todaysEvents, day) => {
        setTodaysMoreEvents(todaysEvents);
        setMoreEventsAnchorEl(event.currentTarget);
        setMoreEventsDate(day);
    };

    const handleCloseMoreEventPopover = () => {
        setMoreEventsAnchorEl(null);
        setTodaysMoreEvents(null);
        setMoreEventsDate(null);
    };

    return (
        <>
            <div
                className="event-calendar-container"
                style={{
                    backgroundColor: theme.palette.background.container,
                    gap: isMobile ? '5px' : isTablet ? '6px' : '10px',
                    padding: isMobile ? '10px' : isTablet ? '15px' : '15px',
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
                    <div
                        className="event-calendar-weekdays"
                        style={{
                            borderColor:
                                mode === 'light'
                                    ? theme.palette.grey[300]
                                    : theme.palette.grey[800],
                        }}
                    >
                        {WEEKDAYS.map((day) => (
                            <div
                                key={day}
                                className="event-calendar-weekday"
                                style={{ color: theme.palette.text.secondary }}
                            >
                                {day}
                            </div>
                        ))}
                    </div>
                    <div
                        className="event-calendar-dates"
                        style={{ gap: (isTablet || isMobile) && '4px' }}
                    >
                        {Array.from({ length: startingDayIndex }).map((_, index) => (
                            <div key={`empty-${index}`} />
                        ))}
                        {daysInMonth.map((day, index) => {
                            const dateKey = format(day, 'yyyy-MM-dd');
                            const todaysEvents = eventsByDate[dateKey] || [];

                            const noOfEventsToShow = isDesktop ? 2 : isTablet ? 1 : 4;

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
                                    <div
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            flexDirection: isMobile ? 'row' : 'column',
                                            flexWrap: 'wrap',
                                            gap: '3px',
                                        }}
                                    >
                                        {todaysEvents
                                            .slice(0, noOfEventsToShow)
                                            .map((event, index) => (
                                                <div
                                                    key={index}
                                                    className={
                                                        isMobile
                                                            ? 'event-calendar-event-small'
                                                            : 'event-calendar-event'
                                                    }
                                                    style={{
                                                        backgroundColor: '#ffa401',
                                                        color: theme.palette.text.primary,
                                                    }}
                                                    onClick={(e) =>
                                                        handleOpenEventPopover(e, event)
                                                    }
                                                >
                                                    {isMobile ? '' : event.type}
                                                </div>
                                            ))}
                                        {todaysEvents?.length > noOfEventsToShow && (
                                            <div
                                                className="event-calendar-event"
                                                style={{
                                                    backgroundColor: 'gray',
                                                    color: theme.palette.text.primary,
                                                }}
                                                onClick={(e) =>
                                                    handleOpenMoreEventPopover(e, todaysEvents, day)
                                                }
                                            >
                                                {todaysEvents?.length - noOfEventsToShow} more
                                                events
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* More Event popover */}
            <Popover
                id={Boolean(moreEventsAnchorEl) ? 'simple-popover' : undefined}
                open={Boolean(moreEventsAnchorEl)}
                anchorEl={moreEventsAnchorEl}
                onClose={handleCloseMoreEventPopover}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                PaperProps={{
                    sx: {
                        p: 0,
                        mt: 1.5,
                        ml: 0.75,
                        width: 200,
                        backgroundColor: theme.palette.popover.background,
                        border: `2px solid ${theme.palette.popover.border}`,
                        boxShadow: theme.shadows[0],
                        '& .MuiMenuItem-root': {
                            typography: 'body2',
                            borderRadius: 0.75,
                        },
                    },
                }}
            >
                <Box sx={{ p: 2 }}>
                    <Box className="event-popover-close-icon-container">
                        <ButtonBase
                            className="event-popover-close-icon"
                            onClick={handleCloseMoreEventPopover}
                        >
                            <ReactIcon
                                icon={'ic:round-close'}
                                color={theme.palette.icon.secondary}
                                sx={{ cursor: 'pointer' }}
                                height={18}
                                width={18}
                            />
                        </ButtonBase>
                    </Box>
                    {moreEventsDate && (
                        <Box className="more-events-date">
                            <Typography variant="body1" sx={{ color: theme.palette.text.primary }}>
                                {format(moreEventsDate, 'eee')}
                            </Typography>
                            <Typography
                                variant="body2"
                                sx={{ color: theme.palette.text.secondary }}
                            >
                                {format(moreEventsDate, 'dd')}
                            </Typography>
                        </Box>
                    )}
                    <div style={{ marginTop: '5px' }}>
                        {todaysMoreEvents?.map((event, index) => (
                            <Typography
                                key={index}
                                className="event-calendar-event"
                                variant="body1"
                                sx={{
                                    backgroundColor: '#ffa401',
                                    padding: '0 5px',
                                    margin: '3px 0 !important',
                                    color: theme.palette.text.primary,
                                }}
                                onClick={(e) => handleOpenEventPopover(e, event)}
                            >
                                {event.type}
                            </Typography>
                        ))}
                    </div>
                </Box>
            </Popover>

            {/* Single Event popover */}
            <Popover
                id={Boolean(eventAnchorEl) ? 'simple-popover' : undefined}
                open={Boolean(eventAnchorEl)}
                anchorEl={eventAnchorEl}
                onClose={handleCloseEventPopover}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                PaperProps={{
                    sx: {
                        p: 0,
                        mt: 1.5,
                        ml: 0.75,
                        width: 250,
                        backgroundColor: theme.palette.popover.background,
                        border: `2px solid ${theme.palette.popover.border}`,
                        boxShadow: theme.shadows[0],
                        '& .MuiMenuItem-root': {
                            typography: 'body2',
                            borderRadius: 0.75,
                        },
                    },
                }}
            >
                <Box sx={{ p: 2 }}>
                    <Box className="event-popover-close-icon-container">
                        <ButtonBase
                            className="event-popover-close-icon"
                            onClick={handleCloseEventPopover}
                        >
                            <ReactIcon
                                icon={'ic:round-close'}
                                color={theme.palette.icon.secondary}
                                sx={{ cursor: 'pointer' }}
                                height={18}
                                width={18}
                            />
                        </ButtonBase>
                    </Box>
                    <Box sx={{ marginTop: '12px' }}>
                        <Typography variant="body1" sx={{ color: theme.palette.text.primary }}>
                            {selectedEvent?.title}
                        </Typography>
                        <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>
                            {moment(selectedEvent?.startDate).format('dddd, MMMM D ⋅ h:mm A')}
                        </Typography>
                    </Box>
                    <Typography
                        variant="body2"
                        sx={{
                            color: theme.palette.primary.main,
                            textTransform: 'uppercase',
                            margin: '15px 0 2px 0',
                        }}
                    >
                        {selectedEvent?.details?.title}
                    </Typography>
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                        }}
                    >
                        <Typography
                            variant="body2"
                            sx={{
                                color: theme.palette.text.primary,
                                backgroundColor:
                                    theme.palette.tags[selectedEvent?.details?.difficultyLevel],
                                borderRadius: '8px',
                                padding: '2px 5px',
                                display: 'inline-block',
                            }}
                        >
                            {selectedEvent?.details?.difficultyLevel}
                        </Typography>
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '3px',
                            }}
                        >
                            <ReactIcon
                                icon={'tabler:clock'}
                                color={theme.palette.icon.primary}
                                sx={{ cursor: 'pointer' }}
                                height={18}
                                width={18}
                            />
                            <Typography
                                variant="body2"
                                sx={{
                                    color: theme.palette.text.primary,
                                }}
                            >
                                {selectedEvent?.details?.challangeTime} min
                            </Typography>
                        </Box>
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '3px',
                            marginTop: '5px',
                        }}
                    >
                        <ReactIcon
                            icon={'iconamoon:location'}
                            color={theme.palette.icon.primary}
                            sx={{ cursor: 'pointer' }}
                            height={18}
                            width={18}
                        />
                        <Typography
                            variant="body2"
                            sx={{
                                color: theme.palette.text.secondary,
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                paddingRight: '10px',
                            }}
                        >
                            {selectedEvent?.title} min
                        </Typography>
                    </Box>
                </Box>
            </Popover>
        </>
    );
};
