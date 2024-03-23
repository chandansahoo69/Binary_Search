import React, { useEffect, useState } from 'react';
import { Avatar, ListItemButton, Typography, useTheme } from '@mui/material';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { CustomButton, Loader, ReactIcon } from 'components/molecules';
import { Searchbar } from 'components/organism';
import { useDebounce, useResponsive, useToast } from 'hooks';

import routes from 'config/routes';
import { PlaygroundModal } from './components';
import { getRooms } from 'services/RoomApiRequests';
import { useSelector } from 'react-redux';

import userProfileDemo from 'assets/images/svg/user-profile-demo.svg';

const Playground = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const { showToast } = useToast();
    const isMobile = useResponsive('down', 'sm', '', '');
    const [searchParams, setSearchParams] = useSearchParams();
    const type = searchParams.get('type');

    const [rooms, setRooms] = useState(null);
    const [tab, setTab] = useState(type || 'public');
    const [search, setSearch] = useState('');
    const [openPlaygroundModal, setOpenPlaygroundModal] = useState(false);
    const debouncedSearch = useDebounce(search);

    const { user } = useSelector((state) => state.auth);

    const handleOpenPlaygroundModal = () => {
        setOpenPlaygroundModal(true);
    };

    const handleClosePlaygroundModal = () => {
        setOpenPlaygroundModal(false);
    };

    const handleSearchChange = (value) => {
        setSearch(value);
    };

    const handleJoinRoom = (roomId) => {
        let roomURL = routes.battle.path;

        roomURL = roomURL.split('/');
        roomURL[roomURL.length - 1] = roomId;
        roomURL = roomURL.join('/');

        navigate(roomURL);
    };

    const changeTab = (newTab) => {
        setSearchParams({ type: newTab });
        setTab(newTab);
    };

    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const { data: response } = await getRooms();
                // console.log('response in playground', response?.data);
                setRooms(response?.data);
            } catch (error) {
                showToast(error?.message, 'error');
            }
        };
        fetchRooms();
    }, []);

    return (
        <>
            <div className="page-container" style={{ padding: isMobile ? '5px 5px' : '10px 20px' }}>
                <div className="playground-top-header">
                    <Typography
                        sx={{
                            fontSize: isMobile
                                ? theme.typography.h3.fontSize
                                : theme.typography.h2.fontSize,
                            fontWeight: theme.typography.h2.fontWeight,
                        }}
                    >
                        Find a Playground
                    </Typography>
                    <Searchbar
                        name={'search'}
                        value={search}
                        onChange={(e) => handleSearchChange(e.target.value)}
                        backgroundColor={theme.palette.input.secondary}
                        placeholder="Search playground"
                    />
                </div>

                {/* <div>
                    <h1>Rooms</h1>
                    <ul style={{ display: 'flex', gap: '20px' }}>
                        {playgrounds.map((playground, index) => (
                            <CustomButton
                                text={playground.title + ' ' + index}
                                width={'auto'}
                                height={'30px'}
                                type="contained"
                                otherStyle={{
                                    borderRadius: '30px',
                                }}
                                key={index}
                                onClick={() => handleJoinRoom(playground.id)}
                            >
                                {playground.title}
                            </CustomButton>
                        ))}
                    </ul>
                </div> */}
                <div
                    className="playground-box-container"
                    style={{
                        backgroundColor: theme.palette.background.container,
                        padding: isMobile ? '10px' : '20px',
                    }}
                >
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div className="container-pre-heading">
                            <div className="prebox-style"></div>
                            <Typography
                                sx={{
                                    fontSize: isMobile
                                        ? theme.typography.h4.fontSize
                                        : theme.typography.h3.fontSize,
                                    fontWeight: theme.typography.fontWeightMedium,
                                }}
                            >
                                All
                            </Typography>
                        </div>
                        <CustomButton
                            text="Create a Playground"
                            type="contained"
                            width={'auto'}
                            bgColor={theme.palette.button.background}
                            textColor={theme.palette.button.color}
                            onClick={() => handleOpenPlaygroundModal()}
                        />
                    </div>
                    <div
                        className="tabs"
                        style={{ borderBottom: `1px solid ${theme.palette.divider}` }}
                    >
                        <div
                            className="tab"
                            style={{
                                backgroundColor:
                                    tab === 'public' ? theme.palette.tab.background : 'transparent',
                                fontWeight:
                                    tab === 'public'
                                        ? theme.typography.fontWeightMedium
                                        : theme.typography.fontWeightRegular,
                            }}
                            onClick={() => changeTab('public')}
                        >
                            <ReactIcon
                                icon={'uiw:global'}
                                color={theme.palette.icon.primary}
                                height={16}
                                width={16}
                            />
                            Public
                        </div>
                        <div
                            className="tab"
                            style={{
                                backgroundColor:
                                    tab === 'private'
                                        ? theme.palette.tab.background
                                        : 'transparent',
                                fontWeight:
                                    tab === 'private'
                                        ? theme.typography.fontWeightMedium
                                        : theme.typography.fontWeightRegular,
                            }}
                            onClick={() => changeTab('private')}
                        >
                            <ReactIcon
                                icon={'ri:git-repository-private-fill'}
                                color={theme.palette.icon.primary}
                                height={16}
                                width={16}
                            />
                            Private
                        </div>
                    </div>

                    {rooms ? (
                        <div className="playground-main-container">
                            {rooms?.map((item, index) => (
                                <ListItemButton
                                    key={index}
                                    className="playground-box"
                                    sx={{
                                        backgroundColor: theme.palette.card.background,
                                        border: `2px solid ${theme.palette.popover.border}`,
                                        alignItems: 'flex-start',
                                    }}
                                >
                                    <div className="playground-box-header">
                                        <Typography
                                            className="playground-box-header-title"
                                            sx={{
                                                fontSize: isMobile
                                                    ? theme.typography.h5.fontSize
                                                    : theme.typography.h4.fontSize,
                                                fontWeight: theme.typography.fontWeightMedium,
                                            }}
                                        >
                                            {item?.title}
                                        </Typography>
                                        <div className="playground-box-header-subtitle">
                                            <span
                                                className="playground-tag"
                                                style={{
                                                    backgroundColor:
                                                        theme.palette.tags[item?.difficultyLevel],
                                                }}
                                            >
                                                {item?.difficultyLevel}
                                            </span>
                                            <Typography
                                                sx={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '5px',
                                                    fontSize: theme.typography.body2.fontSize,
                                                    fontWeight: theme.typography.fontWeightRegular,
                                                }}
                                            >
                                                <ReactIcon
                                                    icon={`mdi:timer-outline`}
                                                    color={theme.palette.icon.primary}
                                                    height={18}
                                                    width={18}
                                                />
                                                {item?.challangeTime} M
                                            </Typography>
                                        </div>
                                    </div>
                                    <div className="playground-box-body">
                                        <div className="playground-box-user">
                                            <Avatar
                                                alt="user_profile"
                                                src={item?.createdBy?.avatar || userProfileDemo}
                                                sx={{
                                                    border: `2px solid ${theme.palette.primary.main}`,
                                                    width: '34px',
                                                    height: '34px',
                                                }}
                                            />
                                            <Typography
                                                sx={{
                                                    fontSize: isMobile
                                                        ? theme.typography.body2.fontSize
                                                        : theme.typography.body1.fontSize,
                                                    fontWeight: theme.typography.fontWeightRegular,
                                                }}
                                            >
                                                {item?.createdBy?.username}
                                            </Typography>
                                        </div>
                                        <div className="playground-box-body-description">
                                            <Typography
                                                sx={{
                                                    fontSize: isMobile
                                                        ? theme.typography.body2.fontSize
                                                        : theme.typography.body1.fontSize,
                                                    fontWeight: theme.typography.fontWeightRegular,
                                                }}
                                            >
                                                {item?.description}
                                            </Typography>
                                        </div>
                                        <div className="playground-extra-information">
                                            <div className="playground-extra-information-user">
                                                <Typography
                                                    sx={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: '5px',
                                                        fontSize: isMobile
                                                            ? theme.typography.body2.fontSize
                                                            : theme.typography.body1.fontSize,
                                                        fontWeight:
                                                            theme.typography.fontWeightRegular,
                                                    }}
                                                >
                                                    <ReactIcon
                                                        icon={`tdesign:user`}
                                                        color={theme.palette.icon.primary}
                                                        height={18}
                                                        width={18}
                                                    />
                                                    {item?.noOfUsers}
                                                </Typography>
                                            </div>
                                            <div className="playground-extra-information-button">
                                                <CustomButton
                                                    text="Join"
                                                    width={'100%'}
                                                    height={'30px'}
                                                    type="contained"
                                                    otherStyle={{
                                                        borderRadius: '30px',
                                                    }}
                                                    onClick={() => handleJoinRoom(item._id)}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </ListItemButton>
                            ))}
                        </div>
                    ) : (
                        <Loader />
                    )}
                </div>
            </div>
            {openPlaygroundModal && (
                <PlaygroundModal
                    open={openPlaygroundModal}
                    handleClose={handleClosePlaygroundModal}
                />
            )}
        </>
    );
};

export default Playground;
