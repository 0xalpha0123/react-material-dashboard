import React, { useEffect } from 'react';
import FusePageSimple from '@fuse/core/FusePageSimple';
import { makeStyles } from '@material-ui/core/styles';
import MUIDataTable from 'mui-datatables';
import { useDeepCompareEffect } from '@fuse/hooks';
import { getLogs } from 'app/store/configSlice';

import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import CustomAlert from 'app/main/components/CustomAlert';

const useStyles = makeStyles(theme => ({
	layoutRoot: {},
}));

function LogsPage(props) {

	const { t } = useTranslation('systemPage');
	const config = useSelector(({ config }) => config);
	const dispatch = useDispatch();

	const classes = useStyles(props);

	let columns = [
		{
			name: 'date',
			label: t('DATE')
		},
		{
			name: 'verb',
			label: t('VERBOSE')
		},
		{
			name: 'tag',
			label: t('TAG')
		},
		{
			name: 'msg',
			label: t('MSG')
		}
	];
	const data = [
		{
			date: '09/10/2020 12:33',
			verbose: 'INFO',
			tag: 'SYS',
			msg: 'starting'
		},
		{
			date: '09/10/2020 12:34',
			verbose: 'INFO',
			tag: 'NET',
			msg: 'network ok'
		},
		{
			date: '09/10/2020 12:35',
			verbose: 'INFO',
			tag: 'SYS',
			msg: 'backup ok'
		},
		{
			date: '09/10/2020 12:36',
			verbose: 'INFO',
			tag: 'SYS',
			msg: 'loading info'
		},
	];
	const options = {
		filter: false,
		selectableRows: 'none'
	}

	useEffect(() => {
        dispatch(getLogs());
        const interval = setInterval(() => dispatch(getLogs()), 10000)
        return () => {
          clearInterval(interval);
        }
    }, [])
	
	useDeepCompareEffect(() => {
		dispatch(getLogs());
	}, [dispatch,]);

	return (
		<FusePageSimple
			classes={{
				root: classes.layoutRoot
			}}
			content={
				<div className="p-24">
					<CustomAlert
						size="h5"
						content={t('SYSTEM_LOG')}
					/>
					<MUIDataTable
						data={config.end_getLogs}
						columns={columns}
						options={options}
					/>
				</div>
			}
		/>
	);
}

export default LogsPage;
