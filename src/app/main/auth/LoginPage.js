import FuseAnimate from '@fuse/core/FuseAnimate';
import { useForm } from '@fuse/hooks';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import LinearProgress from '@material-ui/core/LinearProgress';
import { green } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { submitLogin, clearLogin } from 'app/auth/store/loginSlice';
import { useTranslation } from 'react-i18next';
import { showMessage } from 'app/store/fuse/messageSlice';
import { CircularProgress } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
	root: {
		background: '#1e345d',
		color: theme.palette.primary.contrastText
	},
	wrapper: {
		position: 'relative',
		fullWidth: true
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

function LoginPage() {
	
	const dispatch = useDispatch();
	const login = useSelector(({ auth }) => auth.login);

	const classes = useStyles();
	const { t } = useTranslation('authPage');



	const { form, handleChange, resetForm } = useForm({
		user: 'test',
		passwd: 'test',
		remember: true
	});

	useEffect(() => {
		dispatch(clearLogin());
	});

	useEffect(() => {
		if (login.success === false)
			dispatch(showMessage({ message: t('LOGIN_FAILED_MESSAGE') }))
	}, [login.success]);

	function isFormValid() {
		return form.user.length > 0 && form.passwd.length > 0;
	}

	function handleSubmit(ev) {
		ev.preventDefault();
		dispatch(submitLogin({
			user: form.user,
			passwd: form.passwd
		}));
		resetForm();
	}

	return (
		<div className={clsx(classes.root, 'flex flex-col flex-auto flex-shrink-0 items-center justify-center p-32')}>
			<div className="flex flex-col items-center justify-center w-full">
				<FuseAnimate animation="transition.expandIn">
					<Card className="w-full max-w-384 rounded-8">
					

						{ login.loading && <LinearProgress color="secondary" disabled={!login.loading}/>}
						<CardContent className="flex flex-col items-center justify-center p-32">
							<img className="w-128 m-32" src="app/dakton-logo.jpg" alt="logo" />

							<Typography variant="h6" className="mt-16 mb-32">
								LOGIN
							</Typography>

							<form
								name="loginForm"
								noValidate
								className="flex flex-col justify-center w-full"
								onSubmit={handleSubmit}
							>
								<TextField
									className="mb-16"
									label="Username"
									autoFocus
									type="text"
									name="user"
									value={form.user}
									onChange={handleChange}
									variant="outlined"
									required
									fullWidth
								/>

								<TextField
									className="mb-16"
									label="Password"
									type="password"
									name="passwd"
									value={form.passwd}
									onChange={handleChange}
									variant="outlined"
									required
									fullWidth
								/>
								<Button
									variant="contained"
									color="primary"
									className="w-224 mx-auto mt-16"
									aria-label="LOG IN"
									disabled={!isFormValid() || login.loading}
									type="submit"
								>
									LOGIN
									{login.loading && <CircularProgress size={24} className={classes.buttonProgress} />}
								</Button>
							</form>
						</CardContent>
					</Card>
				</FuseAnimate>
			</div>
		</div>
	);
}

export default LoginPage;
