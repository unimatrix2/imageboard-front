import { Context } from '../context/Context';
import { useContext } from 'react';
import { Typography, Container, makeStyles, createMuiTheme, ThemeProvider, Paper } from '@material-ui/core';
import { lightBlue, amber, blueGrey, grey  } from '@material-ui/core/colors';
import useDisplay from '../hooks/displayProvider';
import useContainerSize from '../hooks/containerSize';
import PersistentDrawer from '../components/PersistentDrawer';
import { appTheme } from '../utils/theme';

export default function Register() {
    
    useDisplay();
    const { state } = useContext(Context);
    const customTheme = createMuiTheme(appTheme);

    const useStyles = makeStyles(theme => ({
		container: {
			backgroundColor: customTheme.palette.primary.light,
			height: '100%',
			paddingBottom: theme.spacing(2)
		}
	}));

	const classes = useStyles();

    return <ThemeProvider theme={customTheme}>
        {state ? <PersistentDrawer width={state.deviceWindow.width} /> : '' }
        {state ? <Container className={classes.container} maxWidth={useContainerSize(state.deviceWindow.breakpoint)}>
            <Typography>Reached Register</Typography>
        </Container> : ''}
    </ThemeProvider>
}