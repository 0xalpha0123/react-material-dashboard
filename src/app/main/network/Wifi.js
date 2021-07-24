import React from 'react';
import FusePageSimple from '@fuse/core/FusePageSimple';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import SaveIcon from '@material-ui/icons/Save';
import Zoom from '@material-ui/core/Zoom';
import CircularProgress from '@material-ui/core/CircularProgress';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import { savePayload, postTempConfig } from 'app/store/configSlice';

import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import CustomAlert from 'app/main/components/CustomAlert';
import InputGroup from 'app/main/components/InputGroup';

const useStyles = makeStyles(theme => ({
	layoutRoot: {},
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
}));

function WifiPage(props) {

	const { t } = useTranslation('networkPage');
	const config = useSelector(({ config }) => config);
	const dispatch = useDispatch();

	const classes = useStyles(props);
	const theme = useTheme();

	const [values, setValues] = React.useState({
		mode: 'dhcp',
		radiomode: 'ap'
	});

	const handleRadioMode = (event, radioMode) => {
		if (radioMode) {
			setValues({
				...values,
				radiomode: radioMode
			})
			

			let payload = [
				"wlan",
				{
					radiomode: radioMode
				}
			]
	
			dispatch(savePayload(payload));
		}
	};

	const handleClientMode = (event, mode) => {
		if (mode) {
			setValues({
				...values,
				mode: mode
			});

			let payload = [
				"wlan",
				{
					mode: mode
				}
			]
	
			dispatch(savePayload(payload));

		}
	}

	const handleChange = (key) => (value) => {
		let payload = [
			"wlan",
			{
				[key]: value
			}
		]

		dispatch(savePayload(payload));
	}

	const handleFabClick = () => {
		dispatch(postTempConfig());
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
									content={t('WIFI_CONFIGURATION_MODES')}
								/>
								<ToggleButtonGroup
									exclusive
									name="readiomode"
									onChange={handleRadioMode}
									value={values.radiomode}
									defaultValue={config.wlan.radiomode}
								>
									<ToggleButton value="ap"> {t("ACESS_POINT")} </ToggleButton>
									<ToggleButton value="off"> {t("OFF")} </ToggleButton>
									<ToggleButton value="client"> {t("CLINET")} </ToggleButton>
								</ToggleButtonGroup>
								{ values.radiomode !== 'off' &&
									<>
									{ values.radiomode === 'ap' &&
										<>
											<CustomAlert
												size="h5"
												content={t('WIFI_AP_CONFIGURATION')}
											/>
											<InputGroup
												labelText={t('MAC_ADDRESS')}
												name="mac"
												type="text"
												defaultValue={config.wlan.mac}
												handleChange={handleChange("mac")}
											/>
											<InputGroup
												labelText={t('SSID')}
												name="ap_ssid"
												type="text"
												defaultValue={config.wlan.ap_ssid}
												handleChange={handleChange("ap_ssid")}
											/>
											<InputGroup
												labelText={t('PASSWORD')}
												name="ap_pw"
												type="password"
												defaultValue={config.wlan.ap_pw}
												handleChange={handleChange("ap_pw")}
											/>
											<InputGroup
												labelText={t('LAN_ADDRESS')}
												name="ap_address"
												type="text"
												defaultValue={config.wlan.ap_address}
												handleChange={handleChange("ap_address")}
											/>
											<InputGroup
												labelText={t('NETMASK')}
												name="ap_mask"
												type="text"
												defaultValue={config.wlan.ap_mask}
												handleChange={handleChange("ap_mask")}
											/>
										</>
									}
									{ values.radiomode === 'client' && 
										<>
											<CustomAlert
												size="h5"
												content={t('WIFI_CLIENT_CONFIGURATION')}
											/>
											<ToggleButtonGroup
												exclusive												name="mode"
												defaultValue={config.wlan.mode}
												value={values.mode}
												onChange={handleClientMode}
											>
												<ToggleButton value="dhcp"> {t("DHCP")} </ToggleButton>
												<ToggleButton value="static"> {t("STATIC")} </ToggleButton>
											</ToggleButtonGroup>
											<InputGroup
												labelText={t('MAC_ADDRESS')}
												name="mac"
												type="text"
												defaultValue={config.wlan.mac}
												handleChange={handleChange("mac")}
											/>
											<InputGroup
												labelText={t('SSID')}
												name="client_ssid"
												type="text"
												defaultValue={config.wlan.client_ssid}
												handleChange={handleChange("client_ssid")}
											/>
											<InputGroup
												labelText={t('PASSWORD')}
												name="client_pw"
												type="password"
												defaultValue={config.wlan.client_pw}
												handleChange={handleChange("client_pw")}
											/>
											{ values.mode === 'static' &&
												<>
													<InputGroup
														labelText={t('IP_ADDRESS')}
														name="address"
														type="text"
														disabled
														defaultValue={config.wlan.address}
														handleChange={handleChange("address")}
													/>
													<InputGroup
														labelText={t('NETMASK')}
														name="mask"
														type="text"
														disabled
														defaultValue={config.wlan.mask}
														handleChange={handleChange("mask")}
													/>
													<InputGroup
														labelText={t('GATEWAY')}
														name="gateway"
														type="text"
														disabled
														defaultValue={config.wlan.gateway}
														handleChange={handleChange("gateway")}
													/>
													<InputGroup
														labelText={t('DNS')}
														name="dns"
														type="text"
														disabled
														defaultValue={config.wlan.dns}
														handleChange={handleChange("dns")}
													/>
												</>
											}
										</>
									}
									</>
								}
							</Grid>
						</Grid>
						<Grid
							item
							md={6}
							lg={6}
							xs={12}
							sm={12}
						>
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
						</Grid>
					</Grid>
				</div>
			}
		/>
	);
}

export default WifiPage;
