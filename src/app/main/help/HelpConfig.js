import React from 'react';
import i18next from 'i18next';

import en from './i18n/en';
import es from './i18n/es';

import { authRoles } from 'app/auth';

i18next.addResourceBundle('en', 'helpPage', en);
i18next.addResourceBundle('es', 'helpPage', es);

const HelpConfig = {
	settings: {
        layout: {
            config: {
            }
        }
    },
	auth: authRoles.user,
	routes: [
		{
			path: '/help',
			component: React.lazy(() => import('./Help'))
		}
	]
};

export default HelpConfig;