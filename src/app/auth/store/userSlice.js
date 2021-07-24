import { createSlice } from '@reduxjs/toolkit';
import history from '@history';
import { setInitialSettings } from 'app/store/fuse/settingsSlice';
import axiosService from 'app/services/axiosService';
import { getConfig, getConfigStart } from 'app/store/configSlice';

export const setUserData = user => async (dispatch, getState) => {

	dispatch(getConfigStart());
	dispatch(getConfig());
	dispatch(setUser(user));

	if (history.location.pathname === '/') {
		history.push('/dashboard')
	}
};

export const updateUserSettings = settings => async (dispatch, getState) => {
};

export const updateUserShortcuts = shortcuts => async (dispatch, getState) => {
};

export const logoutUser = () => async (dispatch, getState) => {
	const { user } = getState().auth;

	if (!user.role || user.role.length === 0) {
		// is guest
		return null;
	}

	axiosService.logout();

	history.push({
		pathname: '/'
	});

	dispatch(setInitialSettings());

	dispatch(userLoggedOut());
};

const initialState = {
	role: null, // guest
	config: {}
	// data: {
	// 	user: 'John Doe',
	// 	photoURL: 'assets/images/avatars/Velazquez.jpg',
	// 	email: 'johndoe@withinpixels.com',
	// 	// shortcuts: ['calendar', 'mail', 'contacts', 'todo']
	// }
};

const userSlice = createSlice({
	name: 'auth/user',
	initialState,
	reducers: {
		setUser: (state, action) => action.payload,
		userLoggedOut: (state, action) => initialState
	},
	extraReducers: {}
});

export const { setUser, userLoggedOut } = userSlice.actions;

export default userSlice.reducer;
