import { IconButton, Typography, useTheme } from '@mui/material';
import { ReactIcon } from 'components/molecules';
import CustomInput from 'components/molecules/CustomInput/CustomInput';
import { APPBAR_DESKTOP } from 'components/organism/Navbar/Navbar';
import { useResponsive } from 'hooks';
import React, { useState } from 'react';

export const QuestionContainer = () => {
    const theme = useTheme();
    const isMobile = useResponsive('down', 'sm', '', '');

    const [tab, setTab] = useState(0);
    const [isExpandedTestcase, setIsExpandedTestcase] = useState(false);
    const [inputs, setInputs] = useState('');

    const changeTab = (newTab) => {
        setTab(newTab);
    };

    const questions = [
        {
            questionId: 1,
            title: 'Maximum Product of Two Elements in an Array',
            difficulty: 'easy',
            description: `Given the array of integers nums, you will choose two different indices i and j
                    of that array. Return the maximum value of (nums[i]-1)*(nums[j]-1).`,
            example: [
                {
                    input: `nums: [2, 7, 11, 15]`,
                    output: 12,
                    explanation: `If you choose the indices i=1 and j=2 (indexed from 0), you will get
                                the maximum value, that is, (nums[1]-1)*(nums[2]-1) = (4-1)*(5-1) =
                                3*4 = 12.`,
                },
                {
                    input: `nums: [2, 7, 11, 15]`,
                    output: 12,
                    explanation: `If you choose the indices i=1 and j=2 (indexed from 0), you will get
                                the maximum value, that is, (nums[1]-1)*(nums[2]-1) = (4-1)*(5-1) =
                                3*4 = 12.`,
                },
            ],
            hints: ['Brute Force', 'Hash Map'],
            tags: ['Array', 'Hash Table'],
        },
        {
            questionId: 2,
            title: '2963. Count the Number of Good Partitions',
            difficulty: 'hard',
            description: `You are given a 0-indexed array nums consisting of positive integers. A partition of an array into one or more 
                            contiguous subarrays is called good if no two subarrays contain the same number. Return the total number of 
                            good partitions of nums. Since the answer may be large, return it modulo 109 + 7.`,
            example: [
                {
                    input: `nums: [2, 7, 11, 15]`,
                    output: 12,
                    explanation: `The 8 possible good partitions are: ([1], [2], [3], [4]), ([1], [2], [3,4]), ([1], [2,3], [4]), ([1], [2,3,4]), ([1,2], [3], [4]), ([1,2], [3,4]), ([1,2,3], [4]), and ([1,2,3,4]).`,
                },
                {
                    input: `nums: [2, 7, 11, 15]`,
                    output: 12,
                    explanation: `The only possible good partition is: ([1,1,1,1]).`,
                },
                {
                    input: `nums: [2, 7, 11, 15]`,
                    output: 12,
                    explanation: `The 2 possible good partitions are: ([1,2,1], [3]) and ([1,2,1,3]).`,
                },
            ],
            hints: ['Brute Force', 'Hash Map'],
            tags: ['Array', 'Hash Table'],
        },
    ];

    return (
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: '5px' }}>
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
                        {questions.map((_, index) => (
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
                            {questions[tab].title}
                        </Typography>
                        <Typography
                            sx={{
                                display: 'inline-block',
                                textTransform: 'capitalize',
                                fontSize: isMobile
                                    ? theme.typography.body1.fontSize
                                    : theme.typography.h6.fontSize,
                                fontWeight: theme.typography.fontWeightRegular,
                                backgroundColor: theme.palette.tags[questions[tab]?.difficulty],
                                margin: '5px 0px',
                            }}
                            className="playground-tag"
                        >
                            {questions[tab].difficulty}
                        </Typography>
                        <Typography sx={{ color: 'text.primary', margin: '10px 0px' }}>
                            {questions[tab].description}
                        </Typography>

                        {questions[tab]?.example.map((example, index) => (
                            <div
                                className="question-container-example"
                                style={{ backgroundColor: theme.palette.container.secondary }}
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
                            icon={!isExpandedTestcase ? 'mingcute:up-line' : 'mingcute:down-line'}
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
                            name={'inputs'}
                            value={inputs}
                            onChange={(e) => setInputs(e.target.value)}
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
        </div>
    );
};
