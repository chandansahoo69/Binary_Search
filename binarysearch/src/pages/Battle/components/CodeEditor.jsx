import React, { useContext, useState } from 'react';

import Editor from '@monaco-editor/react';
import { APPBAR_DESKTOP } from 'components/organism/Navbar/Navbar';
import { ColorModeContext } from 'theme';
import { MenuItem, Select, Typography, useTheme } from '@mui/material';
import { CustomButton } from 'components/molecules';

export const CodeEditor = () => {
    const theme = useTheme();
    const colorMode = useContext(ColorModeContext);
    const { mode } = colorMode;

    const [editorTheme, setEditorTheme] = useState(mode === 'dark' ? 'vs-dark' : 'light');
    const [language, setLanguage] = useState('python');

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
                    defaultLanguage={language || 'javascript'}
                    defaultValue="// some comment"
                    theme={editorTheme}
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
                        onClick={() => {}}
                    />
                    <CustomButton
                        text="Submit"
                        type="contained"
                        bgColor={'#00db48'}
                        textColor={theme.palette.icon.default}
                        onClick={() => {}}
                    />
                </div>
            </div>
        </div>
    );
};
