import React, { useContext, useState } from 'react';

import Editor from '@monaco-editor/react';
import { APPBAR_DESKTOP } from 'components/organism/Navbar/Navbar';
import { ColorModeContext } from 'theme';
import { MenuItem, Select, useTheme } from '@mui/material';
import { CustomButton } from 'components/molecules';
import { compileCode, submitCode } from 'services/RoomApiRequests';
import { useToast } from 'hooks';

export const CodeEditor = ({ tab, input, roomDetails }) => {
    const { showToast } = useToast();
    const theme = useTheme();
    const colorMode = useContext(ColorModeContext);
    const { mode } = colorMode;

    const [editorTheme, setEditorTheme] = useState(mode === 'dark' ? 'vs-dark' : 'light');
    const [language, setLanguage] = useState('c++');
    const [userCode, setUserCode] = useState(``);
    const options = {
        fontSize: 18,
    };

    const handleRun = async () => {
        if (!input) {
            showToast('Input is required', 'error');
            return;
        }

        const args = {
            code: userCode,
            input,
            language,
            questionId: roomDetails?.questions[tab]?._id,
        };

        console.log(roomDetails?.questions[tab]);

        try {
            const { data: response } = await compileCode(args);
            console.log(response);
            showToast(response?.message, 'success');
        } catch (error) {
            showToast(error?.message, 'error');
        }
    };

    const handleSubmit = async () => {
        if (!input) {
            showToast('Input is required', 'error');
            return;
        }

        const args = {
            code: userCode,
            input,
            language,
            questionId: roomDetails?.questions[tab]?._id,
            roomId: roomDetails?._id,
        };

        console.log(roomDetails?.questions[tab]);

        try {
            const { data: response } = await submitCode(args);
            console.log(response);
            showToast(response?.message, 'success');
        } catch (error) {
            showToast(error?.message, 'error');
        }
    };

    return (
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <div
                className="battle-center-container"
                style={{
                    backgroundColor: theme.palette.container.background,
                    height: `calc(100vh - ${APPBAR_DESKTOP + 57}px)`,
                }}
            >
                <Editor
                    height={`calc(100vh - ${APPBAR_DESKTOP + 57}px)`}
                    defaultLanguage={language || 'c++'}
                    defaultValue="// Enter your code here"
                    theme={editorTheme}
                    options={options}
                    onChange={(value) => {
                        setUserCode(value);
                    }}
                />
            </div>
            <div
                className="code-editor-action-item-container"
                style={{ backgroundColor: theme.palette.container.other, height: '45px' }}
            >
                <div className="code-editor-left-action-items">
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
                        value={language}
                        name="language"
                        onChange={(e) => setLanguage(e.target.value)}
                    >
                        <MenuItem value={'python'}>Python</MenuItem>
                        <MenuItem value={'java'}>Java</MenuItem>
                        <MenuItem value={'c++'}>C++</MenuItem>
                    </Select>
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
                        value={editorTheme}
                        name="editorTheme"
                        onChange={(e) => setEditorTheme(e.target.value)}
                    >
                        <MenuItem value={'vs-dark'}>vs-dark</MenuItem>
                        <MenuItem value={'light'}>light</MenuItem>
                    </Select>
                </div>
                <div className="code-editor-right-action-items">
                    <CustomButton
                        text="Run"
                        type="contained"
                        bgColor={'#ffa401'}
                        textColor={theme.palette.icon.default}
                        onClick={() => handleRun()}
                    />
                    <CustomButton
                        text="Submit"
                        type="contained"
                        bgColor={'#00db48'}
                        textColor={theme.palette.icon.default}
                        onClick={() => handleSubmit()}
                    />
                </div>
            </div>
        </div>
    );
};
