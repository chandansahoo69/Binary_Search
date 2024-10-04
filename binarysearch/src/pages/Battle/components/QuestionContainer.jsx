import { IconButton, Typography, useTheme } from '@mui/material';
import { ReactIcon } from 'components/molecules';
import CustomInput from 'components/molecules/CustomInput/CustomInput';
import { APPBAR_DESKTOP } from 'components/organism/Navbar/Navbar';
import { useResponsive } from 'hooks';
import React, { useState } from 'react';
import { BattleInstruction } from '.';

export const QuestionContainer = ({ tab, setTab, input, setInput, roomDetails }) => {
    const theme = useTheme();
    const isMobile = useResponsive('down', 'sm', '', '');

    // const [tab, setTab] = useState(0);
    const [isExpandedTestcase, setIsExpandedTestcase] = useState(false);

    const changeTab = (newTab) => {
        setTab(newTab);
    };

    return (
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: '5px' }}>
            {roomDetails?.questions ? (
                <>
                    <div
                        className="battle-left-container"
                        style={{
                            backgroundColor: theme.palette.container.background,
                            height: `calc(100vh - ${APPBAR_DESKTOP}px - ${
                                isExpandedTestcase ? 312 : 57
                            }px)`,
                        }}
                    >
                        <div className="question-container-header">
                            <div
                                className="tabs"
                                style={{
                                    borderBottom: `1px solid ${theme.palette.divider}`,
                                    paddingTop: '0px',
                                }}
                            >
                                {roomDetails?.questions.map((_, index) => (
                                    <div
                                        key={index}
                                        className="tab"
                                        style={{
                                            backgroundColor:
                                                tab === index
                                                    ? theme.palette.primary.main
                                                    : theme.palette.tab.background,
                                            fontWeight:
                                                tab === index
                                                    ? theme.typography.fontWeightMedium
                                                    : theme.typography.fontWeightRegular,
                                        }}
                                        onClick={() => changeTab(index)}
                                    >
                                        {index + 1}
                                    </div>
                                ))}
                            </div>
                            <div className="question-continer">
                                <Typography
                                    sx={{
                                        textTransform: 'capitalize',
                                        color: 'text.primary',
                                        fontSize: isMobile
                                            ? theme.typography.h4.fontSize
                                            : theme.typography.h3.fontSize,
                                        fontWeight: theme.typography.fontWeightMedium,
                                        marginTop: '10px',
                                    }}
                                >
                                    {roomDetails?.questions[tab].title}
                                </Typography>
                                <Typography
                                    sx={{
                                        display: 'inline-block',
                                        textTransform: 'capitalize',
                                        fontSize: isMobile
                                            ? theme.typography.body1.fontSize
                                            : theme.typography.h6.fontSize,
                                        fontWeight: theme.typography.fontWeightRegular,
                                        backgroundColor:
                                            theme.palette.tags[
                                                roomDetails?.questions[tab]?.difficulty
                                            ],
                                        margin: '5px 0px',
                                    }}
                                    className="playground-tag"
                                >
                                    {roomDetails?.questions[tab].difficulty}
                                </Typography>
                                <Typography sx={{ color: 'text.primary', margin: '10px 0px' }}>
                                    {roomDetails?.questions[tab].description}
                                </Typography>

                                {roomDetails?.questions[tab]?.examples.map((example, index) => (
                                    <div
                                        key={index}
                                        className="question-container-example"
                                        style={{
                                            backgroundColor: theme.palette.container.secondary,
                                        }}
                                    >
                                        <Typography
                                            sx={{
                                                color: 'text.primary',
                                                fontSize: isMobile
                                                    ? theme.typography.body1.fontSize
                                                    : theme.typography.h6.fontSize,
                                                fontWeight: theme.typography.h4.fontWeight,
                                            }}
                                        >
                                            Example 1:
                                        </Typography>
                                        <Typography sx={{ color: 'text.primary' }}>
                                            <Typography
                                                sx={{
                                                    gap: '5px',
                                                    color: 'text.primary',
                                                    fontSize: isMobile
                                                        ? theme.typography.body1.fontSize
                                                        : theme.typography.h6.fontSize,
                                                    fontWeight: theme.typography.h4.fontWeight,
                                                }}
                                            >
                                                Input:
                                                <Typography sx={{ color: 'text.secondary' }}>
                                                    {example.input}
                                                </Typography>
                                            </Typography>
                                            <Typography
                                                sx={{
                                                    gap: '5px',
                                                    color: 'text.primary',
                                                    fontSize: isMobile
                                                        ? theme.typography.body1.fontSize
                                                        : theme.typography.h6.fontSize,
                                                    fontWeight: theme.typography.h4.fontWeight,
                                                }}
                                            >
                                                Output:
                                                <Typography sx={{ color: 'text.secondary' }}>
                                                    {example.output}
                                                </Typography>
                                            </Typography>
                                            <Typography
                                                sx={{
                                                    gap: '5px',
                                                    color: 'text.primary',
                                                    fontSize: isMobile
                                                        ? theme.typography.body1.fontSize
                                                        : theme.typography.h6.fontSize,
                                                    fontWeight: theme.typography.h4.fontWeight,
                                                }}
                                            >
                                                Explanation:
                                                <Typography sx={{ color: 'text.secondary' }}>
                                                    {example.explanation}
                                                </Typography>
                                            </Typography>
                                        </Typography>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div
                        className="testcase-container"
                        style={{
                            backgroundColor: theme.palette.container.other,
                            height: isExpandedTestcase ? '300px' : '45px',
                        }}
                    >
                        <div className="testcase-container-header">
                            <Typography sx={{ fontWeight: '600' }}>Test Cases</Typography>
                            <IconButton
                                size="medium"
                                sx={{
                                    height: '38px',
                                    bgColor: '#323639',
                                    borderRadius: '8px',
                                    '&:hover': {
                                        backgroundColor: 'action.hover',
                                    },
                                }}
                                onClick={() => setIsExpandedTestcase(!isExpandedTestcase)}
                            >
                                <ReactIcon
                                    icon={
                                        !isExpandedTestcase
                                            ? 'mingcute:up-line'
                                            : 'mingcute:down-line'
                                    }
                                    color={theme.palette.icon.default}
                                    height={25}
                                    width={25}
                                />
                            </IconButton>
                        </div>

                        <div
                            className="testcase-container-main"
                            style={{ display: isExpandedTestcase ? 'flex' : 'none' }}
                        >
                            <div>
                                <Typography sx={{ fontWeight: '600', marginBottom: '10px' }}>
                                    Input
                                </Typography>
                                <CustomInput
                                    name={'input'}
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    borderRadius={'8px'}
                                    width={'100%'}
                                />
                            </div>
                            <div>
                                <Typography sx={{ fontWeight: '600', marginBottom: '10px' }}>
                                    Output
                                </Typography>
                                <CustomInput name={'outputs'} borderRadius={'8px'} width={'100%'} />
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <div
                    style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: '5px' }}
                >
                    <BattleInstruction />
                </div>
            )}
        </div>
    );
};
