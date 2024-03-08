import React, { useState } from 'react';
import { CustomButton, ReactIcon } from 'components/molecules';
import {
    Avatar,
    IconButton,
    Paper,
    Stack,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    styled,
    tableCellClasses,
    useTheme,
} from '@mui/material';
import { useResponsive, useToast } from 'hooks';
import copy from 'copy-to-clipboard';
import { ReactModal } from 'components/organism';

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    td: {
        borderBottom: `1px solid ${theme.palette.divider}`,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}

const rows = [
    createData('Frozen yoghurt', 1, '10:24', 4.0),
    createData('Ice cream sandwich', 7, '12:37', 4.3),
    createData('Eclair', 2, '16:24', 6.0),
    createData('Cupcake', 3, '19:37', 4.3),
    createData('Gingerbread', 6, '21:49', 3.9),
];

export const BattleInfoActionButton = ({ setIsOpenChat }) => {
    const theme = useTheme();
    const { showToast } = useToast();
    const isMobile = useResponsive('down', 'sm', '', '');

    const [openRankTableModal, setOpenRankTableModal] = useState(false);

    const copyToClipboard = () => {
        copy(window.location.href);
        showToast('URL copied to clipboard', 'success');
    };

    const handleCloseRankTableModal = () => {
        setOpenRankTableModal(false);
    };

    return (
        <>
            <ReactModal
                fullWidth
                maxWidth={true ? 'md' : 'lg'}
                open={openRankTableModal}
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
                            Leader Board
                        </Typography>
                    </Stack>
                }
                handleClose={() => {
                    handleCloseRankTableModal();
                }}
            >
                <div style={{ width: '100%' }}>
                    <TableHead>
                        <TableRow>
                            <TableCell align="center" sx={{ width: '10%' }}>
                                SL.
                            </TableCell>
                            <TableCell align="left" sx={{ width: '100%' }}>
                                Name
                            </TableCell>
                            <TableCell align="center">Questions</TableCell>
                            <TableCell align="center">Time</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row, index) => (
                            <React.Fragment key={row.name}>
                                <StyledTableRow>
                                    <TableCell align="center" sx={{ width: '10%' }}>
                                        {index + 1}
                                    </TableCell>
                                    <TableCell align="left" sx={{ width: '100%' }}>
                                        <div
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'flex-start',
                                                gap: '10px',
                                            }}
                                        >
                                            <Avatar
                                                sx={{
                                                    border: `2px solid ${theme.palette.primary.main}`,
                                                    width: '30px',
                                                    height: '30px',
                                                }}
                                                // src={user?.avatar }
                                                alt="avatar"
                                            />
                                            {row.name}
                                        </div>
                                    </TableCell>
                                    <TableCell align="center">{row.calories}</TableCell>
                                    <TableCell align="center">{row.fat}</TableCell>
                                </StyledTableRow>
                            </React.Fragment>
                        ))}
                    </TableBody>
                </div>
            </ReactModal>
            <div className="battle-info-action-buttons">
                {/* <CustomButton
                    text="End War"
                    type="contained"
                    bgColor={'#ff0202'}
                    textColor={theme.palette.icon.default}
                    width={'50%'}
                    onClick={() => {}}
                /> */}
                <IconButton
                    size="medium"
                    sx={{
                        height: '38px',
                        bgColor: '#323639',
                        borderRadius: '8px',
                        border: `2px solid ${theme.palette.divider}`,
                        '&:hover': {
                            backgroundColor: 'action.hover',
                        },
                    }}
                    onClick={() => setIsOpenChat(true)}
                >
                    <ReactIcon
                        icon={'lets-icons:chat-light'}
                        color={theme.palette.icon.default}
                        height={25}
                        width={25}
                    />
                </IconButton>
                <IconButton
                    size="medium"
                    sx={{
                        height: '38px',
                        bgColor: '#323639',
                        borderRadius: '8px',
                        border: `2px solid ${theme.palette.divider}`,
                        '&:hover': {
                            backgroundColor: 'action.hover',
                        },
                    }}
                    onClick={() => setOpenRankTableModal(true)}
                >
                    <ReactIcon
                        icon={'jam:bar-chart'}
                        color={theme.palette.icon.default}
                        height={25}
                        width={25}
                    />
                </IconButton>
                <IconButton
                    size="medium"
                    sx={{
                        height: '38px',
                        bgColor: '#323639',
                        borderRadius: '8px',
                        border: `2px solid ${theme.palette.divider}`,
                        '&:hover': {
                            backgroundColor: 'action.hover',
                        },
                    }}
                    onClick={() => copyToClipboard()}
                >
                    <ReactIcon
                        icon={'solar:share-line-duotone'}
                        color={theme.palette.icon.default}
                        height={25}
                        width={25}
                    />
                </IconButton>
            </div>
        </>
    );
};
