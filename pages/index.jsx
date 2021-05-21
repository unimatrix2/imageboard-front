import { Context } from '../context/Context';
import { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import { Typography, Container, makeStyles, createMuiTheme, ThemeProvider, Paper } from '@material-ui/core';
import { SpeedDialIcon, SpeedDialAction, SpeedDial } from '@material-ui/lab';
import { Edit, PersonAdd } from '@material-ui/icons';
import PersistentDrawer from '../components/PersistentDrawer';
import useDisplay from '../hooks/displayProvider';
import useContainerSize from '../hooks/containerSize';
import { appTheme } from '../utils/theme';
import axios from 'axios';
import { calcAppBarSize } from '../utils/cssUtils';
// This page will be rendered at each request
// But this is an example of getting data through query from express/
// To render the page at build time getStaticProps would be used
/* export const getServerSideProps = (context) => {
	return {
		props: {
			data: context.query.number
		}
	}
} */

export default function Home({data}) {

	// Getting router
	const router = useRouter();

	// Calling custom hook to update context on current window dimensions
	useDisplay();

	// Getting context
	const { state } = useContext(Context);

	// Defining component states
	const [user, setUser] = useState();
	const [open, setOpen] = useState(false);
	const [hidden, setHidden] = useState(false);

	const handleClose = () => setOpen(false);
	const handleOpen = () => setOpen(true);

	useEffect(() => {
    // Will validate the token and store a new one if there is a valid token
        axios.get(process.env.NEXT_PUBLIC_APP_TOKEN, { withCredentials: true })
            .then(data => {
                setUser(data.data.password
					? { nick: data.data.nick, password: data.data.password }
					: { nick: data.data.nick });
            })
            .catch(err => console.log(err));
		}, []);
	// Will remove user password from state after a minute
	useEffect(() => {
		if (user?.password) {
			setTimeout(() => { setUser({ nick: user.nick }) }, 60000)
		}
	}, [user]);

	const customTheme = createMuiTheme(appTheme)

	const useStyles = makeStyles(theme => ({
		fab: {
			position: 'fixed',
			bottom: theme.spacing(3),
			right: theme.spacing(3),
		},
		add: {
			color: customTheme.palette.secondary.main,
		},
		container: {
			backgroundColor: customTheme.palette.primary.light,
			height: `calc(100vh - ${state.deviceWindow.height})`,
			paddingBottom: theme.spacing(2)
		},
		background: {
			backgroundColor: customTheme.palette.primary.light,
			height: `calc(${state.deviceWindow.height}px - ${calcAppBarSize(state)}px)`,
			paddingTop: theme.spacing(5)
		},
		paper: {
			backgroundColor: customTheme.palette.primary.lighter,
		}
	}));

	const classes = useStyles();

	return (
		<ThemeProvider theme={customTheme}>
			{state ? <PersistentDrawer /> : ""}
			{state ? (
				<Container maxWidth="xl" className={classes.background}>
					<Container
						className={classes.container}
						maxWidth={useContainerSize(
							state.deviceWindow.breakpoint
						)}
					>
						<Paper className={classes.paper}>
							<Typography align="center" variant="h4">
								Olha só
							</Typography>
							<Typography align="center" variant="h4">
								{data}
							</Typography>
						</Paper>
						{user ? (
							<Typography>
								{user.nick}
								<br />
								{user.password ? user.password : ""}
							</Typography>
						) : (
							""
						)}
					</Container>
				</Container>
			) : (
				""
			)}
			{state ? (
				<SpeedDial
					ariaLabel="Home Speed Dial"
					classes={{ root: classes.fab, fab: classes.add }}
					hidden={hidden}
					icon={<SpeedDialIcon />}
					onClose={handleClose}
					onOpen={handleOpen}
					open={open}
					direction="up"
				>
					<SpeedDialAction
						key="Create Board"
						icon={<Edit />}
						tooltipTitle="Create New Board"
						onClick={(e) => {
							handleClose();
							e.preventDefault();
							router.push("/boards/create");
						}}
					></SpeedDialAction>
					{user && user.nick !== "Anonymous" ? (
						""
					) : (
						<SpeedDialAction
							key="Register Userser"
							icon={<PersonAdd />}
							tooltipTitle="Register Your User"
							onClick={(e) => {
								handleClose();
								e.preventDefault();
								router.push("/register");
							}}
						></SpeedDialAction>
					)}
				</SpeedDial>
			) : (
				""
			)}
		</ThemeProvider>
	);
}

// state ? <Fab color="secondary" className={classes.fab} size="large"><Add className={classes.add}></Add></Fab> : ''