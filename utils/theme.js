import { lightBlue, amber, blueGrey, grey  } from '@material-ui/core/colors';

export const appTheme = {
    typography: {
        allVariants: {
            color: grey[900],
        }
    },
    palette: {
        primary: {
            light: amber[100],
            lighter: amber[50],
            main: amber[500],
            dark: amber[700],
            contrastText: grey[900],
            accent: blueGrey[500],
            secondaryText: grey[600],
            dividerColor: grey[400]
            
        },
        secondary: {
            light: lightBlue[100],
            main: lightBlue[500],
            dark: lightBlue[700],
            contrastText: grey[900],
            accent: amber[500],
            secondaryText: grey[600],
            dividerColor: grey[400]
        }
    }
};