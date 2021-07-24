import { combineReducers } from '@reduxjs/toolkit';
import auth from 'app/auth/store';
import fuse from './fuse';
import i18n from './i18nSlice';
import config from './configSlice';

const createReducer = asyncReducers =>
	combineReducers({
		auth,
		fuse,
		i18n,
		config,
		...asyncReducers
	});

export default createReducer;
