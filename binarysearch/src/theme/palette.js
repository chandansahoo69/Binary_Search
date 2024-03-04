import { alpha } from '@mui/material/styles';

// SETUP COLORS
const GREY = {
    0: '#FFFFFF',
    100: '#F9FAFB',
    200: '#F4F6F8',
    300: '#DFE3E8',
    400: '#C4CDD5',
    500: '#919EAB',
    600: '#637381',
    700: '#454F5B',
    800: '#212B36',
    900: '#161C24',
};

const PRIMARY = {
    lighter: '#FFFFFF',
    light: '#E7F0FF',
    main: '#365eff',
    dark: '#092E69',
    darker: '#092E69',
    contrastText: '#fff',
};

const SECONDARY = {
    lighter: '#DCDCDC',
    light: '#848D96',
    main: '#F4F8FB',
    dark: '#1939B7',
    darker: '#ABB6C7',
    contrastText: '#fff',
};

const INFO = {
    lighter: '#D0F2FF',
    light: '#74CAFF',
    main: '#1890FF',
    dark: '#0C53B7',
    darker: '#04297A',
    contrastText: '#fff',
};

const SUCCESS = {
    lighter: '#E9FCD4',
    light: '#AAF27F',
    main: '#54D62C',
    dark: '#229A16',
    darker: '#08660D',
    contrastText: GREY[800],
};

const WARNING = {
    lighter: '#FFF7CD',
    light: '#FFE16A',
    main: '#FFC107',
    dark: '#B78103',
    darker: '#7A4F01',
    contrastText: GREY[800],
};

const ERROR = {
    lighter: '#FFE7D9',
    light: '#F75B4F',
    main: '#FF4842',
    dark: '#B72136',
    darker: '#7A0C2E',
    contrastText: '#fff',
};

// dark palette
export const darkPalette = {
    common: { black: '#000', white: '#fff' },
    primary: PRIMARY,
    secondary: SECONDARY,
    info: INFO,
    success: SUCCESS,
    warning: WARNING,
    error: ERROR,
    grey: GREY,
    divider: '#454b5c',
    text: {
        primary: '#fafafa',
        secondary: '#a1a1aa',
        other: GREY[500],
        disabled: GREY[500],
        heading: '#fafafa',
        info: '#687387',
    },
    border: '#242730',
    input: { text: '#f4f4f4', label: '#fafafa', box: '#27272a', secondary: '#27272a' },
    table: { head: '#27272a', heading: '#a1a1aa' },
    navbar: { background: '#0c0f14' },
    popover: { background: '#09090b', border: '#242730' },
    accordion: { background: '#2e2e32' },
    card: { background: '#040305', secondary: '#2F374C', other: '#373737' },
    chat: { background: '#040305', secondary: '#3c4043', other: '#373737', color: '#fff' },
    themeIcon: { color: '#eab000' },
    icon: { primary: '#74787f', secondary: '#414856', default: '#f1f1f1' },
    tab: { background: '#040305' },
    tags: { easy: '#50C878', medium: '#FFC107', hard: '#FF4842' },
    sidebar: { background: '#191b1c' },
    button: { background: '#f3f5f9', color: '#000' },
    tooltip: { background: '#f3f5f9', color: '#000' },
    container: { background: '#1a1c1d', secondary: '#262626', other: '#2f3436', faded: '#373b3d' },
    background: {
        paper: '#040305',
        secondary: '#101214',
        other: '#18181b',
        faded: '#383552',
        container: 'rgb(28 31 32)',
        default: GREY[100],
        neutral: GREY[200],
    },
    action: {
        active: GREY[600],
        hover: alpha(GREY[500], 0.2),
        selected: alpha(GREY[500], 0.16),
        disabled: alpha(GREY[500], 0.8),
        disabledBackground: alpha(GREY[500], 0.24),
        focus: alpha(GREY[500], 0.24),
        hoverOpacity: 0.08,
        disabledOpacity: 0.48,
    },
};

// light palette
export const lightPalette = {
    common: { black: '#000', white: '#fff' },
    primary: PRIMARY,
    secondary: SECONDARY,
    info: INFO,
    success: SUCCESS,
    warning: WARNING,
    error: ERROR,
    grey: GREY,
    divider: alpha(GREY[500], 0.18),
    text: {
        primary: GREY[800],
        secondary: GREY[600],
        other: GREY[500],
        disabled: GREY[500],
        heading: '#092e69',
        info: '#4e5256',
    },
    background: {
        paper: '#fff',
        secondary: '#f3f5f9',
        faded: '#fff',
        other: '#efefef',
        container: '#fefefe',
        default: GREY[100],
        neutral: GREY[200],
    },
    border: '#f3f5f9',
    input: { text: '#09090b', label: '#09090b', box: '#f4f8fb', secondary: '#fffff9' },
    table: { head: '#f3f5f9', heading: '#71717a' },
    navbar: { background: '#ffffff' },
    popover: { background: '#ffffff', border: '#eaebef' },
    accordion: { background: '#ffffff' },
    card: { background: '#f3f5f9', secondary: '#f3f5f9', other: '#f1f1f1' },
    chat: { background: '#f3f5f9', secondary: '#f3f5f9', other: '#f1f1f1', color: '#000' },
    themeIcon: { color: '#71717a' },
    icon: { primary: '#48505e', secondary: '#7f7e82', default: '#3b3a40' },
    tags: { easy: '#50C878', medium: '#FFC107', hard: '#FF4842' },
    tab: { background: '#f3f5f9' },
    sidebar: { background: '#f3f5f9' },
    button: { background: '#191b1c', color: '#fff' },
    tooltip: { background: '#191b1c', color: '#fff' },
    container: { background: '#ffffff', secondary: '#f5f7f9', other: '#e1e4ec', faded: '#f3f5f9' },
    action: {
        active: GREY[600],
        hover: alpha(GREY[500], 0.08),
        selected: alpha(GREY[500], 0.16),
        disabled: alpha(GREY[500], 0.8),
        disabledBackground: alpha(GREY[500], 0.24),
        focus: alpha(GREY[500], 0.24),
        hoverOpacity: 0.08,
        disabledOpacity: 0.48,
    },
};
