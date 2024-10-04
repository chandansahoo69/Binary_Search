import React from 'react';
import { Paper, Tabs, Tab, Typography, Grid, useTheme } from '@mui/material';
import { APPBAR_DESKTOP } from 'components/organism/Navbar/Navbar';

export const BattleInstruction = () => {
    const theme = useTheme();

    const [currentTab, setCurrentTab] = React.useState(0);

    const handleTabChange = (event, newValue) => {
        setCurrentTab(newValue);
    };

    return (
        <div
            className="battle-right-container"
            style={{
                backgroundColor: theme.palette.container.background,
                height: `calc(100vh - ${APPBAR_DESKTOP + 7}px)`,
                overflowY: 'auto',
                borderRadius: '8px',
            }}
        >
            <Typography variant="h5" gutterBottom>
                Game Instructions
            </Typography>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                    <Tabs
                        orientation="vertical"
                        value={currentTab}
                        onChange={handleTabChange}
                        aria-label="Game Instructions Tabs"
                    >
                        <Tab label="Starting the Game" />
                        <Tab label="Writing Code" />
                        <Tab label="Game Information" />
                        <Tab label="Navigating Questions" />
                        <Tab label="Ending the Game" />
                    </Tabs>
                </Grid>
                <Grid item xs={12} sm={8}>
                    {currentTab === 0 && (
                        <Typography>
                            When the game creator initiates the game, the coding question will
                            appear on the left side of the screen.
                        </Typography>
                    )}
                    {currentTab === 1 && (
                        <Typography>
                            The code editor is located in the center of the interface. This is where
                            you can write and edit your code.
                        </Typography>
                    )}
                    {currentTab === 2 && (
                        <Typography>
                            On the right side, you will find the game information panel. This
                            includes:
                            <ul>
                                <li>Timer: Shows the remaining time for the coding challenge.</li>
                                <li>
                                    Real-Time Connections: Displays the number of users connected to
                                    the game.
                                </li>
                                <li>Scoreboard: Lists the current scores of all participants.</li>
                                <li>Room URL: Provides the link to the current game room.</li>
                                <li>
                                    Messages: A section for receiving game-related notifications.
                                </li>
                            </ul>
                        </Typography>
                    )}
                    {currentTab === 3 && (
                        <Typography>
                            If multiple coding questions are available, they will be presented in
                            separate tabs on the left side. You can switch between questions by
                            clicking on the respective tabs. The code within the editor will be
                            compiled and submitted for the question currently selected.
                        </Typography>
                    )}
                    {currentTab === 4 && (
                        <Typography>
                            Once the timer runs out, the game concludes. A modal window will pop up
                            to announce the winner of the coding challenge. Remember to save your
                            progress frequently and keep an eye on the timer to manage your coding
                            time effectively. Good luck!
                        </Typography>
                    )}
                </Grid>
            </Grid>
        </div>
    );
};
