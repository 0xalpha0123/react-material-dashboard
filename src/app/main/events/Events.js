import React from 'react';
import FusePageSimple from '@fuse/core/FusePageSimple';
import { makeStyles } from '@material-ui/core/styles';
import MUIDataTable from 'mui-datatables';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';

import { useTranslation } from 'react-i18next';

import CustomAlert from 'app/main/components/CustomAlert';

const useStyles = makeStyles(theme => ({
	layoutRoot: {},
	root: {
		'& > *': {
			margin: theme.spacing(1),
			width: '25ch'
		}
	},
}));

function EventsPage(props) {

	const { t } = useTranslation('eventsPage');

	const classes = useStyles(props);

	let columns = [
		{
			name: 'name',
			label: t('NAME')
		},
		{
			name: 'device',
			label: t('DEVICE')
		},
		{
			name: 'feed_path',
			label: t('FEED_PATH'),
			options: {
				customBodyRender: (dataIndex) => {
					return (
						<div style={{margin: '-8px'}}>
							<TextField
								label="My Feed"
								variant="outlined"
								color="secondary"
								margin="none"
								size="small"
							/>
						</div>
					)
				}
			}
		},
		{
			name: 'enabled',
			label: t('ENABLED'),
			options: {
				customBodyRender: (dataIndex) => {
					return (
						<div style={{margin: '-8px'}}>
							<Checkbox
								color="secondary"
								inputProps={{ 'aria-label': 'secondary checkbox' }}
								size="small"
							/>
						</div>
					)
				}
			}
		}
	];
	const data = [
		{
			name: 'Zone 4',
			device: 'onboard'
		},
		{
			name: 'Zone 1',
			device: 'onboard'
		},
		{
			name: 'Zone 2',
			device: 'onboard'
		},
		{
			name: 'Zone 3',
			device: 'onboard'
		},
		{
			name: 'Channel A1',
			device: 'onboard'
		},
		{
			name: 'Channel A2',
			device: 'onboard'
		},
		{
			name: 'Channel B1',
			device: 'onboard'
		},
		{
			name: 'Channel B2',
			device: 'onboard'
		},
		{
			name: 'Temp&Hum',
			device: 'onboard'
		},
		{
			name: 'diesel_tank_sensor',
			device: 'DKT604V2'
		},
		{
			name: 'dkts',
			device: 'dkts'
		}
	];
	const options = {
		filter: false,
		viewColumns: false,
		selectableRows: 'none',
		download: false,
		print: false,
		search: false
	}

	return (
		<FusePageSimple
			classes={{
				root: classes.layoutRoot
			}}
			content={
				<div className="p-24">
					<CustomAlert
						size="h5"
						content={t('EVENT_TRIGGERS')}
					/>
					<MUIDataTable
						data={data}
						columns={columns}
						options={options}
					/>
				</div>
			}
		/>
	);
}

export default EventsPage;
