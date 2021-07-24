import React from 'react';
import i18next from 'i18next';

import en from './i18n/en';
import es from './i18n/es';

i18next.addResourceBundle('en', 'authPage', en);
i18next.addResourceBundle('es', 'authPage', es);

const AuthConfig = {
    settings: {
        layout: {
            style : 'layout1',
            config: {
                scroll : 'content',
                navbar : {
                    display : false
                },
                toolbar: {
                    display : false
                },
                footer : {
                    display : false
                },
                mode   : 'fullwidth'
            }
        },
        customScrollbars: true,
        theme           : {
            main   : 'default',
            navbar : 'mainThemeDark',
            toolbar: 'mainThemeLight',
            footer : 'mainThemeDark'
        }
    },
    routes  : [
        {
            path     : '/',
            component: React.lazy(() => import('./LoginPage'))
        },
    ]
};

export default AuthConfig;