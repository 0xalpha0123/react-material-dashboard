import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import RefreshIcon from '@material-ui/icons/Refresh';
import { useTranslation } from 'react-i18next';
import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import { useDispatch } from 'react-redux';
import CardWidget from 'app/main/components/CardWidget';

import data from './data';
const {detail, statistic, info} = data;
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
		role="tabpanel"
		hidden={value !== index}
		id={`simple-tabpanel-${index}`}
		aria-labelledby={`simple-tab-${index}`}
		{...other}
    >
		{value === index && (
			<Box p={3}>
			<Typography>{children}</Typography>
			</Box>
		)}
    </div>
  );
}

TabPanel.propTypes = {
	children: PropTypes.node,
	index: PropTypes.any.isRequired,
	value: PropTypes.any.isRequired,
};

function a11yProps(index) {
	return {
		id: `simple-tab-${index}`,
		'aria-controls': `simple-tabpanel-${index}`,
	};
}

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		backgroundColor: theme.palette.background.paper,
	},
}));

export default function DashboardPage() {

	const classes = useStyles();
	const [value, setValue] = React.useState(0);
	const { t } = useTranslation('dashboardPage');

	const dispatch = useDispatch();

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};
	
	return (
		<div className={classes.root}>
			<AppBar position="static">
				<Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
					<Tab label={t('MAIN')} {...a11yProps(0)} />
					<Tab label={t('STATISTICS')} {...a11yProps(1)} />
					<Tab label={t('INFO')} {...a11yProps(2)} />
				</Tabs>
				<IconButton className="text-green" style={{position:"absolute", right:5}} onClick={() => console.log("refresh icon clicked")}>
					<RefreshIcon />
				</IconButton>
			</AppBar>
			{value == 0 &&
				<div className="flex flex-wrap">
					{detail.length && detail.map((item, i) => (
						<FuseAnimateGroup
							key={i}
							className="widget flex w-full sm:w-1/2 md:w-1/3 p-6"
							enter={{
								animation: 'transition.slideUpBigIn'
							}}
						>
							<div className="widget w-full p-6">
								<CardWidget detail={item} type="main"/>
							</div>
						</FuseAnimateGroup>
					))}
					
				</div>
			}
			{value == 1 &&
			<div className="flex flex-wrap">
					{statistic.length && statistic.map((item, i) => (
						<FuseAnimateGroup
							key={i}
							className="widget flex w-full sm:w-1/2 md:w-1/3 p-6"
							enter={{
								animation: 'transition.slideUpBigIn'
							}}
						>
							<div className="widget w-full p-6">
								<CardWidget detail={item} />
							</div>
						</FuseAnimateGroup>
					))}
					
				</div>
			}
			{value == 2 &&
			<div className="flex flex-wrap">
					{info.length && info.map((item, i) => (
						<FuseAnimateGroup
							key={i}
							className="widget flex w-full sm:w-1/2 md:w-1/3 p-6"
							enter={{
								animation: 'transition.slideUpBigIn'
							}}
						>
							<div className="widget w-full p-6">
								<CardWidget detail={item} />
							</div>
						</FuseAnimateGroup>
					))}
					
				</div>
			}
		</div>
	);
}