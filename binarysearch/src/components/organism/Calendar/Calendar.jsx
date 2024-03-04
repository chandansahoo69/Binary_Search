import { IconButton, useTheme } from '@mui/material';
import { ReactIcon } from 'components/molecules';
import React from 'react';

const Calendar = () => {
    const theme = useTheme();

    const todayDate = new Date();

    const days = [
        { day: 'Sunday', date: 1 },
        { day: 'Monday', date: 2 },
        { day: 'Tuesday', date: 3 },
        { day: 'Wednesday', date: 4 },
        { day: 'Thursday', date: 5 },
        { day: 'Friday', date: 6 },
        { day: 'Saturday', date: 7 },
        { day: 'Sunday', date: 8 },
        { day: 'Monday', date: 9 },
        { day: 'Tuesday', date: 10 },
        { day: 'Wednesday', date: 11 },
        { day: 'Thursday', date: 12 },
        { day: 'Friday', date: 13 },
        { day: 'Saturday', date: 14 },
        { day: 'Sunday', date: 15 },
        { day: 'Monday', date: 16 },
        { day: 'Tuesday', date: 17 },
        { day: 'Wednesday', date: 18 },
        { day: 'Thursday', date: 19 },
        { day: 'Friday', date: 20 },
        { day: 'Saturday', date: 21 },
        { day: 'Sunday', date: 22 },
        { day: 'Monday', date: 23 },
        { day: 'Tuesday', date: 24 },
        { day: 'Wednesday', date: 25 },
        { day: 'Thursday', date: 26 },
        { day: 'Friday', date: 27 },
        { day: 'Saturday', date: 28 },
        { day: 'Sunday', date: 29 },
        { day: 'Monday', date: 30 },
    ];

    // const sameDate = (date1, date2) => {};

    return (
        <div
            className="calendar-container"
            style={{ backgroundColor: theme.palette.container.background }}
        >
            <div className="calendar-months-wrapper">
                <IconButton
                    size="medium"
                    sx={{
                        backgroundColor: 'transparent',
                        '&:hover': {
                            backgroundColor: 'action.hover',
                        },
                    }}
                    // onClick={changeColorMode.toggleColorMode}
                >
                    <ReactIcon
                        icon={`icon-park-outline:left`}
                        color={theme.palette.icon.primary}
                        height={22}
                        width={22}
                    />
                </IconButton>
                <div
                    style={{
                        fontSize: theme.typography.h5.fontSize,
                        fontWeight: theme.typography.h6.fontWeight,
                    }}
                >
                    November 2023
                </div>
                <IconButton
                    size="medium"
                    sx={{
                        backgroundColor: 'transparent',
                        '&:hover': {
                            backgroundColor: 'action.hover',
                        },
                    }}
                    // onClick={changeColorMode.toggleColorMode}
                >
                    <ReactIcon
                        icon={`icon-park-outline:right`}
                        color={theme.palette.icon.primary}
                        height={22}
                        width={22}
                    />
                </IconButton>
            </div>
            <div className="calendar-weeks-wrapper" style={{ color: theme.palette.text.secondary }}>
                <div className="calendar-weeks-day">SUN</div>
                <div className="calendar-weeks-day">MON</div>
                <div className="calendar-weeks-day">TUE</div>
                <div className="calendar-weeks-day">WED</div>
                <div className="calendar-weeks-day">THR</div>
                <div className="calendar-weeks-day">FRI</div>
                <div className="calendar-weeks-day">SAT</div>
            </div>
            <div className="calendar-days-wrapper">
                {days.map((day, index) => (
                    <div
                        key={index}
                        className={`calendar-days-day ${
                            day.date === todayDate.getDate() && 'calendar-active-date'
                        }`}
                        style={{
                            backgroundColor: !(day.date === todayDate.getDate())
                                ? theme.palette.container.background
                                : 'rgba(56, 96, 255, 0.18)',
                            color: theme.palette.text.primary,
                        }}
                    >
                        <div className="calendar-days-date">{day.date}</div>
                        <div className="calendar-days-event"></div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Calendar;
