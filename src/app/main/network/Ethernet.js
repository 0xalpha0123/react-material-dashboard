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
	toggle: {
		background: '#fec10d'
	}
}));

function EthernetPage (props) {

	const { t } = useTranslation('networkPage');
	const config = useSelector(({ config }) => config);
	const dispatch = useDispatch();

	const classes = useStyles(props);
	const theme = useTheme();

	const [values, setValues] = React.useState({
		mode: 'static',
	});

	const handleRadioMode = (event, radioMode) => {
		if (radioMode) {
			setValues({
				...values,
				mode: radioMode
			})
			

			let payload = [
				"eth",
				{
					mode: radioMode
				}
			]
	
			dispatch(savePayload(payload));
		}
	};

	const handleChange = (key) => (value) => {
		let payload = [
			"eth",
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
									content={t('ETHERNET_CONFIGURATION')}
								/>
								<ToggleButtonGroup
									exclusive
									onChange={handleRadioMode}
									value={values.mode}
									defaultValue={config.eth.mode}
								>
									<ToggleButton value="static"> {t("STATIC")} </ToggleButton>
									<ToggleButton value="off"> {t("OFF")} </ToggleButton>
									<ToggleButton value="dhcp"> {t("DHCP")} </ToggleButton>
								</ToggleButtonGroup>
								{ values.mode !== 'off' &&
									<>
									<InputGroup
										labelText={t('MAC_ADDRESS')}
										name="mac"
										type="text"
										defaultValue={config.eth.mac}
										disabled={values.mode === 'dhcp'}
										handleChange={handleChange('mac')}
									/>
									<InputGroup
										labelText={t('IP_ADDRESS')}
										name="address"
										type="text"
										defaultValue={config.eth.address}
										disabled={values.mode === 'dhcp'}
										handleChange={handleChange('address')}
									/>
									<InputGroup
										labelText={t('NETMASK')}
										name="mask"
										type="text"
										defaultValue={config.eth.mask}
										disabled={values.mode === 'dhcp'}
										handleChange={handleChange('mask')}
									/>
									<InputGroup
										labelText={t('GATEWAY')}
										name="gateway"
										type="text"
										defaultValue={config.eth.gateway}
										disabled={values.mode === 'dhcp'}
										handleChange={handleChange('gateway')}
									/>
									<InputGroup
										labelText={t('DNS')}
										name="dns"
										type="text"
										defaultValue={config.eth.dns}
										disabled={values.mode === 'dhcp'}
										handleChange={handleChange('dns')}
									/>
									</>
								}
							</Grid>
						</Grid>
						<Grid
							item
							xs={6}
						>
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
					</Grid>
				</div>
			}
		/>
	);
}

export default EthernetPage;
