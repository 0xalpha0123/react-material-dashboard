import FuseUtils from '@fuse/utils/FuseUtils';
import axios from "axios";
import history from '@history';
/* eslint-disable camelcase */

const UseAxios = axios.create({
    baseURL: "https://acmeter.drinna.net",
    headers: {
        "Content-Type": "application/json"
    },
});

class AxiosService extends FuseUtils.EventEmitter {

    init() {
        this.setInterceptors();
        this.handleAuthentication();
    };

    setInterceptors = () => {
        UseAxios.interceptors.request.use(
            (config) => {
                config.headers.Token = `${window["localStorage"].getItem(
                    "token"
                )}`;
                return config;
            },
            (error) => {
                return Promise.reject(error.response);
            }
        );
        UseAxios.interceptors.response.use(
            (response) => {
                return response;
            },
            (error) => {
                if (error.response && error.response.status === 422) {
                    window["localStorage"].clear();
                    window["location"] = "/";
                } else {
                    return Promise.reject(error.response);
                }
            }
        );
    };

    handleAuthentication = () => {
        const token = this.getToken();

        if (!token) {
            this.emit('onNoToken');
            history.push('/')

            return ;
        }
        
        this.setSession(token);
        this.emit('onAutoLogin', true);
    };
    
    signInWithNameAndPassword = (userInfo) => {
        return new Promise((resolve, reject) => {
            UseAxios.post('/login', userInfo)
            .then(response => {
                let data = response.data;
                if (data.success) {
                    this.setSession(data.token);
                    let user = {
                        token: data.token,
                        config: data.config
                    };
                    resolve(user);
                } else {
                    reject(data);
                }
            }).catch(error => {
                reject(error)
            })
        });
    };

    signInWithToken = () => {
		return new Promise((resolve, reject) => {
			UseAxios
				.post('/token_auth', {
				})
				.then(response => {
					if (response.data.success) {
                        let user = {
                            token: this.getToken(),
                            role: 'user',
                            success: true,
                            config: {}
                        };
						resolve(user);
					} else {
						this.logout();
						reject(new Error('Failed to login with token.'));
					}
				})
				.catch(error => {
					this.logout();
					reject(new Error('Failed to login with token.'));
				});
		});
    };
    
    post_ping = () => {
        return new Promise((resolve, reject) => {
            UseAxios
                .post('/ping')
                .then(response => {
                    if (response.data.payload) {
                        resolve(response.data.payload);
                    } else {
                        reject(response);
                    }
                })
                .catch(error => {
                    reject(error);
                });
        })
    };

    getLogs =() => {
        return new Promise((resolve, reject) => {
            UseAxios
                .post('/get_logs')
                .then(response => {
                    if (response.data) {
                        resolve(response.data);
                    } else {
                        reject(response);
                    }
                })
                .catch(error => {
                    reject(error);
                });
        })
    };

    setBlink = () => {
        return new Promise((resolve, reject) => {
            UseAxios
                .post('/blink')
                .then(response => {
                    if (response.data.success) {
                        resolve(response.data.success);
                    } else {
                        reject(response);
                    }
                })
                .catch(error => {
                    reject(error);
                })
        })
    }

    postFreset = () => {
        return new Promise((resolve, reject) => {
            UseAxios
                .post('/freset')
                .then(response => {
                    if (response.data.success) {
                        resolve(response.data.success);
                    } else {
                        reject(response);
                    }
                })
                .catch(error => {
                    reject(error)
                })
        })
    }

    postUgrade = () => {
        return new Promise((resolve, reject) => {
            UseAxios
                .post('/upgrade')
                .then(response => {
                    if (response.data.success) {
                        resolve(response.data.success);
                    } else {
                        reject(response);
                    }
                })
                .catch(error => {
                    reject(error)
                })
        })
    }

    postRestart = () => {
        return new Promise((resolve, reject) => {
            UseAxios
                .post('/reboot')
                .then(response => {
                    if (response.data.success) {
                        resolve(response.data.success);
                    } else {
                        reject(response);
                    }
                })
                .catch(error => {
                    reject(error)
                })
        })
    }

    setSession = token => {
        if (token) {
            localStorage.setItem('token', token);
            UseAxios.defaults.headers.common.Token = `${token}`;
        } else {
            localStorage.removeItem('token');
            delete UseAxios.defaults.headers.common.Token;
        }
    };

    logout = () => {
		this.setSession(null);
	};

    getToken = () => {
        return window.localStorage.getItem('token');
    };

    getConfig = () => {
        return new Promise((resolve, reject) => {
            UseAxios.post('/getconfig')
            .then(response => {
                let data = response.data;
                if (data.success) {
                    resolve(data);
                } else {
                    reject(data);
                }
            }).catch(error => {
                reject(error);
            });
        });
    };

    saveConfig = (config) => {
        return new Promise((resolve, reject) => {
            UseAxios.post('/saveconfig')
            .then(response => {
                let data = response.data;
                if (data.success) {
                    resolve(data);
                } else {
                    reject(data);
                }
            }).catch(error => {
                reject(error);
            });
        })
    }

    uploadFirmware = (file) => {
        return new Promise((resolve, reject) => {
            UseAxios.post('/')
        })
    }

    uploadRestore = (file) => {
        const formData = new FormData();
        formData.append('file', file);
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        return new Promise((resolve, reject) => {
            UseAxios.post('/restore', formData, config)
            .then(response => {
                let data = response.data;
                if (data.success) {
                    resolve(data);
                } else {
                    reject(data);
                }
            }).catch(error => {
                reject(error);
            });
        })
    }
}

let instance = new AxiosService();

export default instance;
