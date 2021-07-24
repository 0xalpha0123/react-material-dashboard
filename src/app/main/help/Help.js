import React from 'react';
import FusePageSimple from '@fuse/core/FusePageSimple';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';

import { useTranslation } from 'react-i18next';

import CustomAlert from 'app/main/components/CustomAlert';

const useStyles = makeStyles(theme => ({
	layoutRoot: {},
	root: {
		display: 'flex',
		flexWrap: 'warp',
		minWidth: 300,
		width: '100%',
		marginTop: '12px'
	},
	image: {
		position: 'relative',
		height: 200,
		[theme.breakpoints.down('xs')]: {
			width: '100% !important',
			height: 100,
		},
		'&:hover, &$focusVisible': {
			zIndedx: 1,
			'& $imageBackdrop': {
				opacity: 0.15,
			},
			'& $imageMarked': {
				opacity: 0,
			},
			'& $imageTitle': {
				border: '4px solid currentColor',
			},
		},
	},
	focusVisible: {},
	imageButton: {
		position: 'absolute',
		left: 0,
		right: 0,
		top: 0,
		bottom: 0,
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		color: theme.palette.common.white,
	},
	imageSrc: {
		position: 'absolute',
		left: 0,
		right: 0,
		top: 0,
		bottom: 0,
		backgroundSize: 'cover',
		backgroundPosition: 'center 40%',
	},
	imageBackdrop: {
		position: 'absolute',
		left: 0,
		right: 0,
		top: 0,
		bottom: 0,
		backgroundColor: theme.palette.common.black,
		opacity: 0.4,
		transition: theme.transitions.create('opacity'),
	},
	imageTitle: {
		position: 'relative',
		padding: `${theme.spacing(2)}px ${theme.spacing(4)}px ${theme.spacing(1) + 6}px`,
	},
	imageMarked: {
		height: 3,
		width: 18,
		backgroundColor: theme.palette.common.white,
		position: 'absolute',
		bottom: -2,
		left: 'calc(50% - 9px)',
		transition: theme.transitions.create('opacity'),
	},
	paper: {
		margin: `${theme.spacing(1)}px auto`,
		padding: theme.spacing(2)
	},
	media: {
		height: 0,
		paddingTop: '56.25%'
	},
	card_root: {
		minWidth: 500
	}
}));

const styles = (theme) => ({
	root: {
		margin: 0,
		padding: theme.spacing(2),
	},
	closeButton: {
		position: 'absolute',
		right: theme.spacing(1),
		top: theme.spacing(1),
		color: theme.palette.grey[500],
	},
});

const image = {
	url: '/app/help.jpg',
	title: 'Help',
	width: '100%'
}

const DialogTitle = withStyles(styles)((props) => {
	const { children, classes, onClose, ...other } = props;
	return (
		<MuiDialogTitle disableTypography className={classes.root} {...other}>
			<Typography variant="h6">{children}</Typography>
			{onClose ? (
			<IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
				<CloseIcon />
			</IconButton>
			) : null}
		</MuiDialogTitle>
	);
});

const DialogContent = withStyles((theme) => ({
	root: {
		padding: theme.spacing(2),
	},
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
	root: {
		margin: 0,
		padding: theme.spacing(1),
	},
}))(MuiDialogActions);

function HelpPage (props) {

	const { t } = useTranslation('helpPage');

	const classes = useStyles(props);

	const [open, setOpen] = React.useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<FusePageSimple
			classes={{
				root: classes.layoutRoot
			}}
			content={
				<div className="p-24 m-50">
					<Grid
						container
						spacing={3}
					>
						<Grid
							item
							md={6}
							lg={6}
							xs={12}
							sm={12}
						>
							<Grid
								container
								direction="column"
								alignItems="center"
								justify="center"
							>
								<CustomAlert
									size="h5"
									content={t('HELP_INFO_TITLE')}
								/>
								<Paper className={classes.paper}>
									<Grid container wrap="nowrap" spacing={2}>
										<Grid item xs>
											<Typography variant="subtitle1">{t('HELP_INFO_CONTENT')}</Typography>
										</Grid>
									</Grid>
								</Paper>
								<CustomAlert
									size="h5"
									content={t('HARD_SPECIFIC')}
								/>
								<div className={classes.root}>
									<ButtonBase
										focusRipple
										className={classes.image}
										focusVisibleClassName={classes.focusVisible}
										style={{
											width: image.width
										}}
										onClick={handleClickOpen}
									>
									<span
										className={classes.imageSrc}
										style={{
										backgroundImage: `url(${image.url})`,
										}}
									/>
									<span className={classes.imageBackdrop} />
									<span className={classes.imageButton}>
										<Typography
										component="span"
										variant="subtitle1"
										color="inherit"
										className={classes.imageTitle}
										>
										{image.title}
										<span className={classes.imageMarked} />
										</Typography>
									</span>
									</ButtonBase>
								</div>
								<div>
									<Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
										<DialogTitle id="customized-dialog-title" onClose={handleClose}>
											{t('MODAL_TITLE')}
										</DialogTitle>
										<DialogContent dividers>
											<Card className={classes.card_root}>
												<CardMedia
													className={classes.media}
													image="app/help.jpg"
													title="Help"
												/>
												<CardContent>
													<Typography variant="body2" color="textSecondary" component="p">
														{t('MODAL_CONTENT')}
													</Typography>
												</CardContent>
											</Card>
										</DialogContent>
										<DialogActions>
											<Button autoFocus onClick={handleClose} color="secondary" variant="outlined">
												{t('OK')}
											</Button>
										</DialogActions>
									</Dialog>
								</div>
							</Grid>
						</Grid>
						<Grid
							item
							md={6}
							lg={6}
							xs={12}
							sm={12}
						>
							<Grid
								container
								direction="column"
								alignItems="center"
								justify="center"
							>
							</Grid>
						</Grid>
					</Grid>
				</div>
			}
		/>
	);
}

export default HelpPage;
