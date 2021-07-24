import React from 'react';
import i18next from 'i18next';

import en from './i18n/en';
import es from './i18n/es';

import { authRoles } from 'app/auth';

i18next.addResourceBundle('en', 'networkPage', en);
i18next.addResourceBundle('es', 'networkPage', es);

const NetworkConfig = {
    settings: {
        layout: {
            config: {
            }
        }
    },
	auth: authRoles.user,
    routes  : [
        {
            path     : '/network/wifi',
            component: React.lazy(() => import('./Wifi'))
        },
        {
            path     : '/network/ethernet',
            component: React.lazy(() => import('./Ethernet'))
        },
        {
            path     : '/network/gateway_ntp',
            component: React.lazy(() => import('./Gateway'))
        },
        {
            path     : '/network/cloud',
            component: React.lazy(() => import('./Cloud'))
        }
    ]
};

export default NetworkConfig;