import React from 'react';
import FusePageSimple from '@fuse/core/FusePageSimple';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import { useTranslation } from 'react-i18next';

import CustomAlert from 'app/main/components/CustomAlert';
import InputGroup from 'app/main/components/InputGroup';

const useStyles = makeStyles(theme => ({
	layoutRoot: {},
}));

function UsersPage (props) {

	const { t } = useTranslation('systemPage');

	const classes = useStyles(props);

	const [values, setValues] = React.useState({
		new_password: '',
		confirm_password: ''
	});

	const handleChange = (prop) => (value) => {
		setValues({
			...values, [prop]: value
		});
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
									content={t('PASSWORD_CHANGE_TITLE')}
								/>
								<InputGroup
									labelText={t('NEW_PASSWORD')}
									name="new_password"
									type="password"
									handleChange={handleChange('new_password')}
								/>
								<InputGroup
									labelText={t('CONFIRM_PASSWORD')}
									name="confirm_password"
									type="password"
									handleChange={handleChange('confirm_password')}
								/>
								<div className="p-12">
									<Button color="secondary" variant="outlined" disabled={!(values.new_password === values.confirm_password && values.new_password && values.confirm_password)}>
										{t('SAVE_PASSWORD')}
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

export default UsersPage;
