import useDisplay from '../../hooks/displayProvider';
import { Context } from '../../context/Context';
import { useContext, useEffect, useState } from 'react';
import { makeStyles, ThemeProvider, createMuiTheme, Typography, Container } from '@material-ui/core';
import useContainerSize from '../../hooks/containerSize';
import PersistentDrawer from '../../components/PersistentDrawer';
import { appTheme } from '../../utils/theme';
import CreateBoard from '../../components/CreateBoard';
import { calcAppBarSize, handleOverflow } from '../../utils/cssUtils';

export default function Create() {

    useDisplay();
    const { state } = useContext(Context);
    const customTheme = createMuiTheme(appTheme);
    const [onClient, setOnClient] = useState(false);
    useEffect(() => {
        if (document) {
            setOnClient(true);
            console.log('DONE!')
            return;
        }
    }, []);
    const useStyles = makeStyles(theme => ({
		container: {
			backgroundColor: customTheme.palette.primary.light,
			height: `calc(${state.deviceWindow.height}px - ${calcAppBarSize(state)}px)`,
			paddingBottom: theme.spacing(2),
            overflow: onClient ? handleOverflow('rootContainer') : 'scroll'
		},
        formField: {
            marginTop: theme.spacing(3)
        },
        formTitle: {
            paddingTop: theme.spacing(2)
        },
        formContainer: {
            display: 'flex',
            flexDirection: 'column'
        },
        fab: {
            top: theme.spacing(2),
            marginBottom: theme.spacing(5)
        }
	}));

	const classes = useStyles();

    return <ThemeProvider theme={customTheme}>
        {state?.deviceWindow ? <PersistentDrawer /> : '' }
        {state?.deviceWindow ? <Container className={classes.container} maxWidth="xl" id="rootContainer">
            <CreateBoard classes={classes} ucs={useContainerSize} />
        </Container> : ''}
    </ThemeProvider>
}