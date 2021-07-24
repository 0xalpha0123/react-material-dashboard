import React from 'react';
import FusePageSimple from '@fuse/core/FusePageSimple';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { post_ping } from 'app/store/configSlice';

import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import CustomAlert from 'app/main/components/CustomAlert';
import InputGroup from 'app/main/components/InputGroup';

const useStyles = makeStyles(theme => ({
	layoutRoot: {},
}));

function Toolspage (props) {

	const { t } = useTranslation('toolsPage');
	const config = useSelector(({ config }) => config);
	const dispatch = useDispatch();

	const classes = useStyles(props);

	const [values, setValues] = React.useState({
		destination: ''
	});

	const handleChange = (prop) => (value) => {
		setValues({
			...values, [prop]: value
		});
	};

	const handleClick = () => {
		dispatch(post_ping())
	}

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
									content={t('PING')}
								/>
								<InputGroup
									labelText={t('DESTINATION')}
									name="destination"
									type="text"
									handleChange={handleChange('destination')}
								/>
								<div className="p-12">
									<Button disabled={config.ping_start} color="secondary" variant="outlined" onClick={handleClick}>
										{t('PING')}
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

export default Toolspage;
