import { createSlice } from '@reduxjs/toolkit';
import AxiosService from 'app/services/axiosService';
import { showMessage } from 'app/store/fuse/messageSlice';

export const getConfig = () => async dispatch => {
	return AxiosService
		.getConfig()
		.then(data => {
            let payload = data;
            payload.loading = false;
            payload.saveInfo = false;
            payload = {
                ...payload,
                temp: {
                    ...payload
                }
            }
            // payload.temp = { payload };
			dispatch(getConfigSuccess(payload));
		})
		.catch(error => {
            dispatch(getConfigFailed());
            dispatch(showMessage({ message: "Get configuration failed." }))
		});
};

export const getConfigStart = () => async dispatch => {
    dispatch(getStart())
}

export const savePayload = (payload) => async dispatch => {
    dispatch(saveTemp(payload));
}

export const postTempConfig = () => async (dispatch, getState) => {
    let stat = getState();
    let temp = stat.config.temp;
    dispatch(savingTempConfig());
    return AxiosService
            .saveConfig(temp)
            .then(data => {  
                console.log('success')              
                temp.saving = false;
                temp.saveInfo = false;
                dispatch(savedTempConfig(temp));
            })
            .catch(error => {
                console.log('error')
                dispatch(savedTempConfig());
            });
}

export  const post_ping = () => async (dispatch, getState) => {
    dispatch(start_ping());
    return AxiosService
            .post_ping()
            .then(data => {
                dispatch(end_ping(data));
                dispatch(showMessage({ message: data }))
            })
            .catch(error => {
                dispatch(end_ping());
            });
}

export const getLogs = () => async (dispatch, getState) => {
    dispatch(start_getLogs_reducer());
    return AxiosService
            .getLogs()
            .then(data => {
                console.log(data)
                dispatch(end_getLogs_reducer(data));
            })
            .catch(error => {
                dispatch(end_getLogs_reducer());
            });
}

export const setBlink = () => async (dispatch, getState) => {
    dispatch(start_blink());
    return AxiosService
            .setBlink()
            .then(data => {
                dispatch(end_blink());
                // dispatch(showMessage({ message: "Your device is blinking now!" }))
            })
            .catch(error => {
                dispatch(end_blink());
            })
}

export const clearBlink = () => async (dispatch, getState) => {
    dispatch(clearBlinkReducer());
}

export const postFreset = () => async (dispatch, getState) => {
    dispatch(start_freset());
    return AxiosService
            .postFreset()
            .then(data => {
                dispatch(end_freset());
            })
            .catch(error => {
                dispatch(end_freset());
            })
}

export const postUpgrade = () => async (dispatch, getState) => {
    dispatch(start_upgrade());
    return AxiosService
            .postUpgrade()
            .then(data => {
                dispatch(end_upgrade());
            })
            .catch(error => {
                dispatch(end_upgrade());
            })
}

export const postRestart = () => async (dispatch, getState) => {
    dispatch(start_restart());
    return AxiosService
            .postRestart()
            .then(data => {
                dispatch(end_restart());
            })
            .catch(error => {
                dispatch(end_restart());
            })
}

export const uploadFirmware = (file) => async (dispatch, getState) => {
    dispatch(start_uplaodFirmware());
    return AxiosService
            .uploadFirmware(file)
            .then(data => {
                dispatch(end_uploadFirmware(true));
            })
            .catch(error => {
                dispatch(end_uploadFirmware(false));
            })
}

export const uploadRestore = (file) => async (dispatch, getState) => {
    dispatch(start_uploadRestore());
    return AxiosService
            .uploadRestore(file)
            .then(data => {
                dispatch(end_uploadRestore(true));
            })
            .catch(error => {
                dispatch(end_uploadRestore(false));
            })
}

const initialState = {
    uploadRestore_loading: false,
    uploadRestore_success: null,
    uploadFirmware_loading: false,
    uploadFirmware_null: null,
    restart_loading: false,
    upgrade_loading: false,
    freset_loading: false,
    blink_loading: false,
    blink_success: false,
    start_getLogs: false,
    end_getLogs: [],
    ping_response: '',
    ping_start: false,
    loading: false,
    saving: false,
    temp: {},
	success: false,
    devname: '',
    session_int: null,
    push_int: null,
    sensors_int: null,
    eth: {
        mode: 'static',
        address: '',
        netmask: '',
        gateway: '',
        dns: ''
    },
    wlan: {
        radio: '',
        mode: '',
        client_ssid: '',
        client_pw: '',
        ap_ssid: '',
        ap_pw: '',
        address: '',
        netmask: '',
        gateway: '',
        dns: '',
    },
    lan_address: '',
    lan_mask: '',
    main_gateway: '',
    rgb: {
        idle: null,
        idle_an: '',
        error: null
    },
    ntp: '',
    mqtt: {
        address: '',
        port: null,
        username: '',
        pwd: '',
        clid: '',
    },
    watchdog_server: '',
    watchdog_int: null,
    fw: '',
    serial: '',
    uptime: '',
    devtime: '',
    modbus_baud: '',
    users: {
        id: null,
        name: '',
    },
    adc: {
        gain: null,
        ch0comp: null,
        ch1comp: null,
        ch2comp: null,
        ch3comp: null
    },
    zones: {
        conf: null,
    },
    events: []
};

const configSlice = createSlice({
	name: 'config',
	initialState,
	reducers: {
        getConfigSuccess: (state, action) => action.payload,
        getConfigFailed: (state, action) => {
            state.success = false;
            state.loading = false;
        },
        saveTemp: (state, action) => {
            let temp = state.temp;
            if (action.payload.length === 2) {
                let prop = action.payload[0];
                let oldValue = temp.hasOwnProperty(prop) ? temp[prop] : {};
                let newProp = {
                    [prop]: {
                        ...oldValue,
                        ...action.payload[1]
                    }
                };
                state.temp = {
                    ...state.temp,
                    ...newProp
                };
                state.saveInfo = true;
            } else if (action.payload.length === 1) {
                let temp = state.temp;
                temp = {
                    ...temp,
                    ...action.payload[0]
                };
                state.temp = temp;
                state.saveInfo = true;
            }
        },
        savingTempConfig: (state, action) => {
            state.saving = true;
        },
        savedTempConfig: (state, action) => action.payload,
        getStart: (state, action) => {
            state.loading = true;
        },
        start_ping: (state, action) => {
            state.ping_start = true;
        },
        end_ping: (state, action) => {
            state.ping_start = false;
            state.ping_response = action.payload;
        },
        start_getLogs_reducer: (state, action) => {
            state.start_getLogs = true;
        },
        end_getLogs_reducer: (state, action) => {
            state.start_getLogs = false;
            state.end_getLogs = action.payload;
        },
        start_blink: (state, action) => {
            state.blink_loading = true;
            state.blink_success = false;
        },
        clearBlinkReducer: (state, action) => {
            state.blink_success = false;
        },
        end_blink: (state, action) => {
            state.blink_loading = false;
            state.blink_success = true;
        },
        start_freset: (state, action) => {
            state.freset_loading = true;
        },
        end_freset: (state, action) => {
            state.freset_loading = false;
        },
        start_upgrade: (state, action) => {
            state.upgrade_loading = true;
        },
        end_upgrade: (state, action) => {
            state.upgrade_loading = false;
        },
        start_restart: (state, action) => {
            state.restart_loading = true;
        },
        end_restart: (state, action) => {
            state.restart_loading = false;
        },
        start_uplaodFirmware: (state, action) => {
            state.uploadFirmware_loading = true;
        },
        end_uploadFirmware: (state, action) => {
            state.uploadFirmware_success = action.payload;
            state.uploadFirmware_loading = false;
        },
        start_uploadRestore: (state, action) => {
            state.uploadRestore_loading = true;
        },
        end_uploadRestore: (state, action) => {
            state.uploadRestore_loading = false;
            state.uploadRestore_success = action.payload;
        }
	},
	extraReducers: {}
});

export const {
    getConfigSuccess,
    saveTemp,
    getStart,
    savingTempConfig,
    savedTempConfig,
    getConfigFailed,
    start_ping,
    end_ping,
    start_getLogs_reducer,
    end_getLogs_reducer,
    start_blink,
    clearBlinkReducer,
    end_blink,
    start_freset,
    end_freset,
    start_upgrade,
    end_upgrade,
    start_restart,
    end_restart,
    start_uplaodFirmware,
    end_uploadFirmware,
    start_uploadRestore,
    end_uploadRestore,
} = configSlice.actions;

export default configSlice.reducer;
