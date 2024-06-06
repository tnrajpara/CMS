import { PaletteMode } from '@mui/material';
import {grey,blueGrey} from '@mui/material/colors';

export const getDesignTokens = (mode: PaletteMode) => ({
  palette: {
    mode,
    ...(mode === 'light'
      ? {
          // palette values for light mode
          primary: grey[100],
          divider: blueGrey[200],
          text: {
            primary: grey[100],
            secondary: grey[200],
          },
        }
      : {
          // palette values for dark mode
   
          background: {
            default: blueGrey[900],
            paper: blueGrey[900],
          },
          primary: blueGrey,
          divider: blueGrey[200],
          text: {
            primary: grey[100],
            secondary: grey[200],
          },
        }),
  },
});


