import React from 'react';
import i18next from 'i18next';

import en from './i18n/en';
import es from './i18n/es';

import { authRoles } from 'app/auth';

i18next.addResourceBundle('en', 'systemPage', en);
i18next.addResourceBundle('es', 'systemPage', es);

const SystemConfig = {
    settings: {
        layout: {
            config: {
            }
        }
    },
	auth: authRoles.user,
    routes  : [
        {
            path     : '/system/settings',
            component: React.lazy(() => import('./Settings'))
        },
        {
            path     : '/system/logs',
            component: React.lazy(() => import('./Logs'))
        },
        {
            path     : '/system/users',
            component: React.lazy(() => import('./Users'))
        }
    ]
};

export default SystemConfig;