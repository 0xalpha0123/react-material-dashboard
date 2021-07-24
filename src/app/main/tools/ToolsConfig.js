import React from 'react';
import i18next from 'i18next';

import en from './i18n/en';
import es from './i18n/es';

import { authRoles } from 'app/auth';

i18next.addResourceBundle('en', 'toolsPage', en);
i18next.addResourceBundle('es', 'toolsPage', es);

const ToolsConfig = {
	settings: {
        layout: {
            config: {
            }
        }
    },
	auth: authRoles.user,
	routes: [
		{
			path: '/tools',
			component: React.lazy(() => import('./Tools'))
		}
	]
};

export default ToolsConfig;