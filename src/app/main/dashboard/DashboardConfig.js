import React from 'react';
import i18next from 'i18next';

import en from './i18n/en';
import es from './i18n/es';

import { authRoles } from 'app/auth';

i18next.addResourceBundle('en', 'dashboardPage', en);
i18next.addResourceBundle('es', 'dashboardPage', es);

const DashboardConfig = {
	settings: {
        layout: {
            config: {
            }
        }
	},
	auth: authRoles.user,
	routes: [
		{
			path: '/dashboard',
			component: React.lazy(() => import('./Dashboard'))
		}
	]
};

export default DashboardConfig;