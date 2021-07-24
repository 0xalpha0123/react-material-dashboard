import React from 'react';
import i18next from 'i18next';

import en from './i18n/en';
import es from './i18n/es';

import { authRoles } from 'app/auth';

i18next.addResourceBundle('en', 'eventsPage', en);
i18next.addResourceBundle('es', 'eventsPage', es);

const EventsConfig = {
	settings: {
        layout: {
            config: {
            }
        }
    },
	auth: authRoles.user,
	routes: [
		{
			path: '/events',
			component: React.lazy(() => import('./Events'))
		}
	]
};

export default EventsConfig;