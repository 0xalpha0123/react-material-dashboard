import React from 'react';
import FusePageSimple from '@fuse/core/FusePageSimple';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import SaveIcon from '@material-ui/icons/Save';
import Zoom from '@material-ui/core/Zoom';
import Button from '@material-ui/core/Button';
import { savePayload, postTempConfig } from 'app/store/configSlice';

import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import CustomAlert from 'app/main/components/CustomAlert';
import InputGroup from 'app/main/components/InputGroup';

const useStyles = makeStyles(theme => ({
	layoutRoot: {},
	fab: {
		position: 'absolute',
		top: theme.spacing(2),
		right: theme.spacing(2),
	},
}));

function CloudPage (props) {

	const { t } = useTranslation('networkPage');
	const config = useSelector(({ config }) => config);
	const dispatch = useDispatch();

	const classes = useStyles(props);
	const theme = useTheme();

	const handleChange = (key) => (value) => {
		let payload = [
			"mqtt",
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
									content={t('CLOUD_SETTINGS')}
								/>
								<InputGroup
									labelText={t('MAC_ADDRESS')}
									name="address"
									type="text"
									defaultValue={config.mqtt.address}
									handleChange={handleChange('address')}
								/>
								<InputGroup
									labelText={t('PORT')}
									name="port"
									type="number"
									defaultValue={config.mqtt.port}
									handleChange={handleChange('port')}
								/>
								<InputGroup
									labelText={t('USERNAME')}
									name="username"
									type="text"
									defaultValue={config.mqtt.username}
									handleChange={handleChange('username')}
								/>
								<InputGroup
									labelText={t('KEY')}
									name="password"
									type="password"
									defaultValue={config.mqtt.password}
									handleChange={handleChange('password')}
								/>
								<InputGroup
									labelText={t('CLOUD_ID')}
									name="clid"
									type="text"
									defaultValue={config.mqtt.clid}
									handleChange={handleChange('clid')}
								/>
								<div className="p-12">
									<Button color="secondary" variant="outlined">
										{t('BUTTON_TEXT')}
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
						</Grid>
					</Grid>
				</div>
			}
		/>
	);
}

export default CloudPage;
