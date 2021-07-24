import React from 'react';
import { Redirect } from 'react-router-dom';
import FuseUtils from '@fuse/utils';
import ExampleConfig from 'app/main/example/ExampleConfig';
import AuthConfig from 'app/main/auth/AuthConfig';
import DashboardConfig from 'app/main/dashboard/DashboardConfig';
import EventsConfig from 'app/main/events/EventsConfig';
import NetworkConfig from 'app/main/network/NetworkConfig';
import SystemConfig from 'app/main/system/SystemConfig';
import ToolsConfig from 'app/main/tools/ToolsConfig';
import HelpConfig from 'app/main/help/HelpConfig';

import { authRoles } from 'app/auth';

const routeConfigs = [
	ExampleConfig,
	DashboardConfig,
	EventsConfig,
	NetworkConfig,
	SystemConfig,
	ToolsConfig,
	HelpConfig,
	AuthConfig,
];

const routes = [
	...FuseUtils.generateRoutesFromConfigs(routeConfigs),
	{
		auth: authRoles.user,
		component: () => <Redirect to="/dashboard" />
	},
	{
		path: '/',
		component: () => <Redirect to="/" />
	},
];

export default routes;
