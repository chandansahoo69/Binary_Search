import { Link as RouterLink } from 'react-router-dom';
import { Box } from '@mui/material';

import logo from 'assets/images/svg/logo.svg';
import TextLogo from 'assets/images/svg/text-logo.svg';

export const Logo = ({ styles, type }) => {
  return (
    <RouterLink to="/">
      {type === 'text' ? (
        <Box component="img" src={TextLogo} sx={{ height: 40, ...styles }} />
      ) : (
        <Box component="img" src={logo} sx={{ height: 40, ...styles }} />
      )}
    </RouterLink>
  );
};
