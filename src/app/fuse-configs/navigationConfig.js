import i18next from 'i18next';
import en from './navigation-i18n/en';
import es from './navigation-i18n/es';

i18next.addResourceBundle('en', 'navigation', en);
i18next.addResourceBundle('es', 'navigation', es);

const navigationConfig = [
	{
		id: 'dashboard-component',
		title: 'Dashboard',
		translate: 'DASHBOARD',
		type: 'item',
		icon: 'dashboard',
		url: '/dashboard'
	},
	{
		id: 'events-component',
		title: 'Events & Triggers',
		translate: 'EVENTS',
		type: 'item',
		icon: 'toc',
		url: '/events'
	},
	{
		id: 'network-component',
		title: 'Network',
		translate: 'NETWORK',
		type: 'collapse',
		icon: 'router',
		children: [
			{
				id: 'wifi-component',
				title: 'Wifi',
				translate: 'WIFI',
				type: 'item',
				icon: 'wifi',
				url: '/network/wifi'
			},
			{
				id: 'ethernet-component',
				title: 'Ethernet',
				translate: 'ETHERNET',
				type: 'item',
				icon: 'settings_input_hdmi',
				url: '/network/ethernet'
			},
			{
				id: 'gateway-component',
				title: 'Gateway & NTP',
				translate: 'GATEWAY_NTP',
				type: 'item',
				icon: 'call_merge',
				url: '/network/gateway_ntp'
			},
			{
				id: 'cloud-component',
				title: 'Cloud',
				translate: 'CLOUD',
				type: 'item',
				icon: 'cloud',
				url: '/network/cloud'
			}
		]
	},
	{
		id: 'system-component',
		title: 'System',
		translate: 'SYSTEM',
		type: 'collapse',
		icon: 'blur_circular',
		children: [
			{
				id: 'settings-component',
				title: 'Settings',
				translate: 'SETTINGS',
				type: 'item',
				icon: 'settings',
				url: '/system/settings'
			},
			{
				id: 'logs-component',
				title: 'Logs',
				translate: 'LOGS',
				type: 'item',
				icon: 'library_books',
				url: '/system/logs'
			},
			{
				id: 'users-component',
				title: 'Users',
				translate: 'USERS',
				type: 'item',
				icon: 'person',
				url: '/system/users'
			}
		]
	},
	{
		id: 'tools-component',
		title: 'Tools',
		translate: 'TOOLS',
		type: 'item',
		icon: 'build',
		url: '/tools'
	},
	{
		id: 'help-component',
		title: 'Help',
		translate: 'HELP',
		type: 'item',
		icon: 'help_outline',
		url: '/help'
	}
];

export default navigationConfig;
