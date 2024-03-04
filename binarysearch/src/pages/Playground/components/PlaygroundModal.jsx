import React, { Fragment, useState } from 'react';
import {
    Box,
    IconButton,
    ListItemButton,
    MenuItem,
    Select,
    Stack,
    TextField,
    Typography,
    useTheme,
} from '@mui/material';
import { ReactModal } from 'components/organism';
import { useResponsive, useToast } from 'hooks';
import { CustomButton, ReactIcon } from 'components/molecules';
import CustomInput from 'components/molecules/CustomInput/CustomInput';
import { uniqueNamesGenerator, adjectives } from 'unique-names-generator';
import { createRoom } from 'services/RoomApiRequests';
import {
    DatePicker,
    LocalizationProvider,
    TimePicker,
    renderTimeViewClock,
} from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import moment from 'moment';
import schema from './playgroundSchema.js';

const improvedAdjectives = [...adjectives, 'abrasive', 'brash', 'callous', 'daft', 'eccentric'];
const avengers = [
    'ironman',
    'thor',
    'hulk',
    'captain-america',
    'black-widow',
    'hawkeye',
    'scarlet-witch',
    'quick-silver',
    'vision',
    'war-machine',
    'falcon',
    'antman',
    'wasp',
    'black-panther',
    'doctor-strange',
    'captain-marvel',
    'spiderman',
    'black-bolt',
    'groot',
    'rocket',
    'gamora',
    'drax',
    'nebula',
    'yondu',
    'mantis',
    'starlord',
    'nick-fury',
    'agent-coulson',
    'phil-coulson',
];

const config = {
    dictionaries: [improvedAdjectives, avengers],
    separator: '-',
};

export const PlaygroundModal = ({ open, handleClose }) => {
    const theme = useTheme();
    const { showToast } = useToast();
    const isMobile = useResponsive('down', 'sm', '', '');

    const showNumberOfStick = isMobile ? 5 : 7;

    const [tab, setTab] = useState(0);
    const [playground, setPlayground] = useState('');
    const [time, setTime] = useState(20);
    const [difficulty, setDifficulty] = useState('easy');
    const [startDate, setStartDate] = useState('');
    const [startTime, setStartTime] = useState('');
    const [noOfQuestions, setNoOfQuestions] = useState(1);

    const tabs = [
        { title: 'public', icon: 'uiw:global' },
        { title: 'private', icon: 'ri:git-repository-private-fill' },
    ];

    const tags = [{ title: 'easy' }, { title: 'medium' }, { title: 'hard' }];

    const times = [20, 30, 40, 60, 90, 120];

    const generateUniqueName = () => {
        const name = uniqueNamesGenerator(config);
        setPlayground(name);
    };

    const handleInputChange = (event) => {
        const { value } = event.target;
        setPlayground(value);
    };

    const changeTab = (newTab) => {
        setTab(newTab);
    };

    // Function to format time
    const formatTime = (time) => {
        if (!time) return ''; // return empty string if time is null or undefined
        const hours = time.getHours();
        const minutes = ('0' + time.getMinutes()).slice(-2); // format MM
        const amPm = hours >= 12 ? 'PM' : 'AM'; // determine AM or PM
        const formattedHours = hours % 12 || 12; // convert 24-hour format to 12-hour format
        return formattedHours + ':' + minutes + ' ' + amPm; // format HH:MM AM/PM
    };

    const handleCreateRoom = async () => {
        const args = {
            title: playground,
            type: tab ? 'private' : 'public',
            startDate: new Date(),
            startTime: formatTime(startTime?.$d),
            noOfUsers: 4,
            noOfQuestions: noOfQuestions,
            difficultyLevel: difficulty,
            challangeTime: time,
        };

        try {
            const validatedArgs = schema.parse(args);

            console.log('create room', args, validatedArgs);

            // return;
            await createRoom(args);
            showToast('Room created successfully', 'success');
            handleClose();
        } catch (error) {
            console.log(error);
            // showToast(error?.message, 'error');
        }
    };

    const handleStartDateChange = (date) => {
        const formatedDate = moment(date?.$d).format('YYYY-MM-DD');
        setStartDate(formatedDate);
        setStartTime('');
    };

    return (
        <>
            <ReactModal
                fullWidth
                maxWidth={true ? 'md' : 'lg'}
                open={open}
                title={
                    <Stack
                        style={{
                            borderBottom: `1px solid ${theme.palette.divider}`,
                            paddingBottom: '10px',
                        }}
                    >
                        <Typography
                            sx={{
                                fontSize: isMobile
                                    ? theme.typography.h4.fontSize
                                    : theme.typography.h2.fontSize,
                                fontWeight: theme.typography.fontWeightMedium,
                                color: theme.palette.text.primary,
                            }}
                        >
                            Let's create a playground
                        </Typography>
                        <Typography
                            sx={{ ...theme.typography.subtitle2, color: theme.palette.grey[500] }}
                        >
                            You can both public and private playgrounds.
                        </Typography>
                    </Stack>
                }
                handleClose={() => {
                    handleClose();
                }}
            >
                <>
                    <div className="modal-content-container" style={{ paddingBottom: '15px' }}>
                        <div
                            style={{
                                width: '100%',
                                flexDirection: isMobile ? 'column' : 'row',
                                gap: '10px',
                                display: 'flex',
                                justifyContent: isMobile ? 'center' : 'space-between',
                                alignItems: 'center',
                            }}
                        >
                            <div
                                className="tabs"
                                style={{ justifyContent: isMobile ? 'center' : '', padding: '0px' }}
                            >
                                {tabs.map((tabItem, index) => (
                                    <div
                                        className="tab"
                                        style={{
                                            textTransform: 'capitalize',
                                            backgroundColor:
                                                tab === index
                                                    ? theme.palette.primary.main
                                                    : theme.palette.tab.background,
                                            fontWeight: theme.typography.fontWeightRegular,
                                        }}
                                        onClick={() => changeTab(index)}
                                    >
                                        <ReactIcon
                                            icon={tabItem.icon}
                                            color={
                                                tab === index
                                                    ? theme.palette.common.white
                                                    : theme.palette.icon.primary
                                            }
                                            height={16}
                                            width={16}
                                        />
                                        {tabItem.title}
                                    </div>
                                ))}
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker
                                        disablePast
                                        sx={{
                                            width: '100%',
                                            height: '40px!important',
                                            border: `1px solid ${theme.palette.border}`,
                                            borderRadius: '6px!important',
                                        }}
                                        value={startDate ? dayjs(startDate) : null}
                                        onChange={handleStartDateChange}
                                        format="DD/MM/YYYY"
                                        renderInput={(params) => (
                                            <Box>
                                                <TextField {...params.inputProps} />
                                            </Box>
                                        )}
                                    />
                                </LocalizationProvider>

                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <TimePicker
                                        ampm
                                        minTime={
                                            startDate === '' ||
                                            moment(new Date()).format('yyyy-MM-DD') === startDate
                                                ? moment(new Date(), 'HH:mm')
                                                : moment('00:00', 'HH:mm')
                                        }
                                        sx={{
                                            width: '80%',
                                            height: '40px!important',
                                            border: `1px solid ${theme.palette.border}`,
                                            borderRadius: '6px!important',
                                        }}
                                        onChange={(date) => setStartTime(date)}
                                        value={startTime}
                                        viewRenderers={{
                                            hours: renderTimeViewClock,
                                            minutes: renderTimeViewClock,
                                            seconds: renderTimeViewClock,
                                        }}
                                    />
                                </LocalizationProvider>
                            </div>
                        </div>
                        <Select
                            sx={{
                                '.MuiOutlinedInput-notchedOutline': {
                                    border: 'none',
                                },
                                color: theme.palette.input.text,
                                backgroundColor: theme.palette.input.box,
                                border: `1px solid ${theme.palette.popover.border}`,
                            }}
                            className="select-input"
                            value={noOfQuestions}
                            name="noOfQuestions"
                            onChange={(e) => setNoOfQuestions(e.target.value)}
                        >
                            <MenuItem value={1}>1</MenuItem>
                            <MenuItem value={2}>2</MenuItem>
                        </Select>

                        <div style={{ display: 'flex', gap: '10px', width: '100%' }}>
                            <CustomInput
                                name={'playground'}
                                value={playground}
                                onChange={handleInputChange}
                                borderRadius={'8px'}
                                width={'100%'}
                                placeholder={'How about doctor-steven-strange?'}
                            />

                            <IconButton
                                size="medium"
                                sx={{
                                    backgroundColor: 'transparent',
                                    borderRadius: '8px',
                                    '&:hover': {
                                        backgroundColor: 'action.hover',
                                    },
                                }}
                                onClick={generateUniqueName}
                            >
                                <ReactIcon
                                    icon={'solar:qr-code-bold-duotone'}
                                    color={theme.palette.common.white}
                                    height={25}
                                    width={25}
                                />
                            </IconButton>
                        </div>

                        {tab === 1 && (
                            <div>
                                <CustomInput
                                    name={'playground'}
                                    value={playground}
                                    onChange={handleInputChange}
                                    borderRadius={'8px'}
                                    width={'100%'}
                                    placeholder={'How about doctor-steven-strange?'}
                                />
                            </div>
                        )}

                        <div className="playground-modal-dificulty-container">
                            {tags.map((tag) => (
                                <ListItemButton
                                    key={tag?.title}
                                    className="playground-modal-dificulty-item"
                                    style={{
                                        backgroundColor: theme.palette.tags[tag.title],
                                        color: theme.palette.common.white,
                                    }}
                                    onClick={() => setDifficulty(tag.title)}
                                >
                                    {difficulty === tag.title && (
                                        <ReactIcon
                                            icon={'lets-icons:check-fill'}
                                            color={theme.palette.common.white}
                                            height={25}
                                            width={25}
                                        />
                                    )}
                                    <Typography>&nbsp;{tag.title}</Typography>
                                </ListItemButton>
                            ))}
                        </div>

                        <div className="playground-modal-time-container-wrapper">
                            <div className="playground-modal-time-container">
                                {times.map((timeValue) => (
                                    <div
                                        key={timeValue}
                                        className="playground-modal-time-item"
                                        style={{
                                            backgroundColor:
                                                time === timeValue
                                                    ? theme.palette.primary.main
                                                    : theme.palette.container.secondary,
                                            color: theme.palette.text.primary,
                                        }}
                                    >
                                        {timeValue} {isMobile ? 'm' : 'min'}
                                    </div>
                                ))}
                            </div>

                            <div className="playground-modal-time-custom">
                                {times.map((timeValue, index) => (
                                    <Fragment key={index}>
                                        {index >= 0 && (
                                            <div
                                                className={`playground-modal-time-long-stick ${
                                                    time >= timeValue && 'long-time-stick-active'
                                                }`}
                                                onClick={() => setTime(timeValue)}
                                            ></div>
                                        )}
                                        {index < times.length - 1 && (
                                            <>
                                                {Array.from(Array(showNumberOfStick).keys()).map(
                                                    (_, index) => (
                                                        <div
                                                            key={index}
                                                            className={`playground-modal-time-stick ${
                                                                time > timeValue &&
                                                                'time-stick-active'
                                                            }`}
                                                        ></div>
                                                    )
                                                )}
                                            </>
                                        )}
                                    </Fragment>
                                ))}
                            </div>
                        </div>

                        <CustomButton
                            text="Let's Go"
                            type="contained"
                            width={isMobile ? '30%' : '20%'}
                            bgColor={theme.palette.button.background}
                            textColor={theme.palette.button.color}
                            icon={'maki:arrow'}
                            onClick={() => handleCreateRoom()}
                        />
                    </div>
                </>
            </ReactModal>
        </>
    );
};
