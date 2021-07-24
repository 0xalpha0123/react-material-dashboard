import { createSlice } from '@reduxjs/toolkit';
import AxiosService from 'app/services/axiosService';
import { setUserData } from './userSlice';

export const submitLogin = (authInfo) => async dispatch => {
	dispatch(loginStart());
	return AxiosService
		.signInWithNameAndPassword(authInfo)
		.then(user => {
			user.role = 'user';
			dispatch(setUserData(user));

			return dispatch(loginSuccess());
		})
		.catch(error => {
			return dispatch(loginError(error));
		});
};

export const clearLogin = () => async dispatch => {
	dispatch(clearLoginReducer());
}

const initialState = {
	success: null,
	error: {
		username: null,
		password: null
	},
	loading: false
};

const loginSlice = createSlice({
	name: 'auth/login',
	initialState,
	reducers: {
		loginSuccess: (state, action) => {
			state.success = true;
			state.loading = false;
		},
		loginError: (state, action) => {
			state.success = false;
			state.error = action.payload;
			state.loading = false;
		},
		clearLoginReducer: (state, action) => {
			state.success = null;
		},
		loginStart: (state, action) => {
			state.loading = true;
		}
	},
	extraReducers: {}
});

export const { loginSuccess, loginError, loginStart, clearLoginReducer } = loginSlice.actions;

export default loginSlice.reducer;
