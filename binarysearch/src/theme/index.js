import PropTypes from 'prop-types';
import React, { createContext, useLayoutEffect, useMemo, useState } from 'react';
// @mui
import { CssBaseline } from '@mui/material';
import {
    ThemeProvider as MUIThemeProvider,
    createTheme,
    StyledEngineProvider,
} from '@mui/material/styles';
// theme
import { darkPalette, lightPalette } from './palette';
import typography from './typography';
import GlobalStyles from './globalStyles';

// ----------------------------------------------------------------------
export const ColorModeContext = createContext({});

ThemeProvider.propTypes = {
    children: PropTypes.node,
};

export default function ThemeProvider({ children }) {
    const [mode, setMode] = useState('light');

    const colorMode = useMemo(
        () => ({
            toggleColorMode: () => {
                setMode((prevMode) => {
                    localStorage.setItem('theme', prevMode === 'light' ? 'dark' : 'light');
                    return prevMode === 'light' ? 'dark' : 'light';
                });
            },
        }),
        []
    );

    const themeOptions = useMemo(
        () => ({
            palette: mode === 'light' ? lightPalette : darkPalette,
            shape: { borderRadius: 6 },
            typography,
        }),
        [mode]
    );

    useLayoutEffect(() => {
        const localTheme = localStorage.getItem('theme');
        localTheme && setMode(localTheme);
    }, []);

    const theme = createTheme(themeOptions);

    return (
        <StyledEngineProvider injectFirst>
            <ColorModeContext.Provider value={{ colorMode, mode }}>
                <MUIThemeProvider theme={theme}>
                    <CssBaseline />
                    <GlobalStyles />
                    {children}
                </MUIThemeProvider>
            </ColorModeContext.Provider>
        </StyledEngineProvider>
    );
}
