import FuseSplashScreen from '@fuse/core/FuseSplashScreen';
import AxiosService from 'app/services/axiosService';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from '@reduxjs/toolkit';
import { hideMessage, showMessage } from 'app/store/fuse/messageSlice';

import { setUserData, logoutUser } from './store/userSlice';

class Auth extends Component {
	constructor(props) {
		super(props);
		this.state = {
			waitAuthCheck: true,
		};
	}

	componentDidMount() {
		return Promise.all([
			this.axiosCheck()
		]).then(() => {
			this.setState({ waitAuthCheck: false });
		});
	}

	axiosCheck = () =>
		new Promise(resolve => {
			AxiosService.on('onAutoLogin', () => {

				/**
				 * Sign in and retrieve user data from Api
				 */
				AxiosService
					.signInWithToken()
					.then(user => {
						this.props.setUserData(user);

						resolve();

					})
					.catch(error => {
						resolve();
					});
			});

			AxiosService.on('onNoToken', () => {
				resolve();
			});

			AxiosService.on('onAutoLogout', message => {
				this.props.logout();
				resolve();
			});

			AxiosService.init();

			return Promise.resolve();
		});

	render() {
		return this.state.waitAuthCheck ? <FuseSplashScreen /> : !this.props.configloading ? <>{this.props.children}</> : <FuseSplashScreen />;
	}
}

function mapStateToProps({ config }) {
	return {
		configloading: config.loading
	};
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators(
		{
			setUserData,
			logout: logoutUser,
			showMessage,
			hideMessage
		},
		dispatch
	);
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
