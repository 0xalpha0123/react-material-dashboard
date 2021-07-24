import React, { useEffect } from 'react';
import FusePageSimple from '@fuse/core/FusePageSimple';
import { makeStyles, useTheme  } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import SaveIcon from '@material-ui/icons/Save';
import Zoom from '@material-ui/core/Zoom';
import CircularProgress from '@material-ui/core/CircularProgress';
import Backdrop from '@material-ui/core/Backdrop';
import { green } from '@material-ui/core/colors';
import { savePayload, postTempConfig, setBlink, clearBlink, postFreset, postUpgrade, postRestart, uploadFirmware, uploadRestore } from 'app/store/configSlice';
import { logoutUser } from 'app/auth/store/userSlice';
import { showMessage } from 'app/store/fuse/messageSlice';

import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import CustomAlert from 'app/main/components/CustomAlert';
import InputGroup from 'app/main/components/InputGroup';

const useStyles = makeStyles(theme => ({
	layoutRoot: {},
	input: {
		// display: 'none'
	},
	extendedIcon: {
	  marginRight: theme.spacing(1),
	},
	fab: {
		position: 'absolute',
		top: 6,
		right: 6,
	},
	fabProgress: {
		color: '#dca00b',
		position: 'absolute',
		top: 3,
		right: 3,
		zIndex: 1
	},
	backdrop: {
	  zIndex: theme.zIndex.drawer + 1,
	  color: '#fff',
	},
	buttonProgress: {
		color: green[500],
		position: 'absolute',
		top: '50%',
		left: '50%',
		marginTop: -12,
		marginLeft: -12,
	},
}));

function SettingsPage (props) {

	const { t } = useTranslation('systemPage');
	const config = useSelector(({ config }) => config);
	const dispatch = useDispatch();

	const classes = useStyles(props);
	const theme = useTheme();

	const [values, setValues] = React.useState({
		open: false,
		firmware: null,
		resotre: null,
	});

	useEffect(() => {
		dispatch(clearBlink());
	});

	useEffect(() => {
		if (config.blink_success)
			dispatch(showMessage({ message: t('BLINK_MESSAGE') }))
	}, [config.blink_success]);

	const handleChange = (key) => (value) => {
		let payload = [
			{
				[key]: value
			}
		]

		dispatch(savePayload(payload));
	}

	const handleBlink = () => {
		dispatch(setBlink());
	}

	const handleFabClick = () => {
		dispatch(postTempConfig());
	}

	const handleFreset = () => {
		dispatch(postFreset());
		setValues({
			open: true
		})
		setTimeout(() => {  
			dispatch(logoutUser()); // ***
            setValues({
				open: false
			});  // *** If you want to clear the error message as well
        }, 60000);
	}

	const handleUpgrade = () => {
		dispatch(postUpgrade());
		setValues({
			open: true
		})
		setTimeout(() => {  
			dispatch(logoutUser()); // ***
            setValues({
				open: false
			});  // *** If you want to clear the error message as well
        }, 180000);
	}

	const handleRestart = () => {
		dispatch(postRestart());
		setValues({
			open: true
		})
		setTimeout(() => {  
			dispatch(logoutUser()); // ***
            setValues({
				open: false
			});  // *** If you want to clear the error message as well
        }, 60000);
	}

	const handleFirmware = (e) => {
		setValues({
			firmware: e.target.files[0]
		})
	}

	const handleUploadFirmware = () => {
		dispatch(uploadFirmware(values.firmware));
	}

	const handleRestore = (e) => {
		setValues({
			resotre: e.target.files[0]
		})
	}

	const handleUploadRestore = () => {
		dispatch(uploadRestore(values.resotre));
	}

	const transitionDuration = {
		enter: theme.transitions.duration.enteringScreen,
		exit: theme.transitions.duration.leavingScreen,
	};

	const fab = {
		color: 'secondary',
		className: classes.fab,
		icon: <SaveIcon style={{ color: '#ec126c' }}/>,
		label: 'Save',
		size: 'medium',
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
									content={t('SYSTEM_GENERAL_SETTINGS')}
								/>
								<InputGroup
									labelText={t('DEVICE_NAME')}
									name="devname"
									type="text"
									defaultValue={config.devname}
									handleChange={handleChange('devname')}
								/>
								<InputGroup
									labelText={t('READ_INT')}
									name="sensors_int"
									type="number"
									defaultValue={config.sensors_int}
									min={0}
									max={10}
									handleChange={handleChange('sensors_int')}
								/>
								<InputGroup
									labelText={t('PUSH_INT')}
									name="push_int"
									type="number"
									defaultValue={config.push_int}
									min={0}
									max={10}
									handleChange={handleChange('push_int')}
								/>
								<InputGroup
									labelText={t('SESSION_INT')}
									name="session_int"
									type="number"
									defaultValue={config.session_int}
									min={0}
									max={10}
									handleChange={handleChange('session_int')}
								/>
								<CustomAlert
									size="h5"
									content={t('WATCHDOG')}
								/>								
								<InputGroup
									labelText={t('WATCHDOG_SERVER')}
									name="watchdog_server"
									type="text"
									defaultValue={config.watchdog_server}
									handleChange={handleChange('watchdog_server')}
								/>								
								<InputGroup
									labelText={t('WATCHDOG_INT')}
									name="watchdog_int"
									type="number"
									defaultValue={config.watchdog_int}
									min={0}
									max={10}
									handleChange={handleChange('watchdog_int')}
								/>
								<CustomAlert
									size="h5"
									content={t('ONLINE_UPGRADE')}
								/>
								<div className="p-12">
									<Button color="secondary" variant="outlined" onClick={handleUpgrade}>
										{t('ONLINE_UPGRADE_BUTTON')}
									</Button>
								</div>
								<CustomAlert
									size="h5"
									content={t('RESET_FACTORY_SETTINGS')}
								/>
								<div className="p-12">
									<Button color="secondary" variant="outlined" onClick={handleFreset}>
										{t('RESET_FACTORY_SETTINGS_BUTTON')}
									</Button>
								</div>
								<CustomAlert
									size="h5"
									content={t('CONFIGURATION_BACKUP')}
								/>
								<div className="p-12">
									<Button color="secondary" variant="outlined">
										{t('DOWNLOAD_BUTTON')}
									</Button>
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
							<Backdrop className={classes.backdrop} open={(config.freset_loading || config.restart_loading || config.upgrade_loading) || values.open}>
								<CircularProgress color="inherit" />
							</Backdrop>
							<Zoom
								key={fab.color}
								in={config.saveInfo}
								timeout={transitionDuration}
								style={{
									transitionDelay: `${config.saveInfo ? transitionDuration.exit : 0}ms`,
								}}
								unmountOnExit
							>
								<Fab aria-label={fab.label} className={fab.className} color={fab.color} size={fab.size} onClick={handleFabClick}>
									{fab.icon}
								</Fab>
							</Zoom>
							{config.saving && <CircularProgress size={55} className={classes.fabProgress} />}
							<Grid
								container
								direction="column"
								alignItems="center"
								justify="center"
							>
								<CustomAlert
									size="h5"
									content={t('RESTART')}
								/>
								<div className="p-12">
									<Button color="secondary" variant="outlined" onClick={handleRestart}>
										{t('RESTART_BUTTON')}
									</Button>
								</div>
								<CustomAlert
									size="h5"
									content={t('UPGRADE_FIRMWARE')}
								/>								
								<input accept="*" className={classes.input} id="upgrade-firmware" type="file" onChange={handleFirmware} />
								<label htmlFor="upgrade-firmware">
									<div className="p-12">
										<Button color="secondary" variant="outlined" onClick={handleUploadFirmware}>
											{t('UPGRADE_FIRMWARE_BUTTON')}
										</Button>
									</div>
								</label>
								<CustomAlert
									size="h5"
									content={t('BLINK')}
								/>
								<div className="p-12">
									<Button color="secondary" variant="outlined" onClick={handleBlink} disabled={config.blink_loading}>
										{t('BLINK_BUTTON')}
										{config.blink_loading && <CircularProgress size={24} className={classes.buttonProgress} />}
									</Button>
								</div>
								<CustomAlert
									size="h5"
									content={t('RESTORE')}
								/>
								<input accept="*" className={classes.input} id="restore-configuration" type="file" onChange={handleRestore}/>
								<label htmlFor="restore-configuration">
									<div className="p-12">
										<Button color="secondary" variant="outlined" onClick={handleUploadRestore}>
											{t('RESTORE_BUTTON')}
										</Button>
									</div>
								</label>	
							</Grid>
						</Grid>
					</Grid>
				</div>
			}
		/>
	);
}

export default SettingsPage;
