import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import HorizontalSplitIcon from '@material-ui/icons/HorizontalSplit';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import LayersIcon from '@material-ui/icons/Layers';
import AssignmentIcon from '@material-ui/icons/Assignment';
import PieChartIcon from '@material-ui/icons/PieChart';
import { Link } from 'react-router-dom'

export const mainListItems = (
	<div>
		<ListItem component={Link} to="/dashboard" button>
			<ListItemIcon>
				<DashboardIcon />
			</ListItemIcon>
			<ListItemText primary="Dashboard" />
		</ListItem>
		<ListItem component={Link} to="/dashboard/modal" button>
			<ListItemIcon>
				<PieChartIcon />
			</ListItemIcon>
			<ListItemText primary="Weather Model" />
		</ListItem>
		<ListItem component={Link} to="/dashboard/results" button>
			<ListItemIcon>
				<HorizontalSplitIcon />
			</ListItemIcon>
			<ListItemText primary="Results" />
		</ListItem>
	</div>
);

export const secondaryListItems = (
	<div>
		<ListSubheader inset>Result History</ListSubheader>
		<ListItem button>
			<ListItemIcon>
				<AssignmentIcon />
			</ListItemIcon>
			<ListItemText primary="Current month" />
		</ListItem>
		<ListItem button>
			<ListItemIcon>
				<AssignmentIcon />
			</ListItemIcon>
			<ListItemText primary="Last quarter" />
		</ListItem>
	</div>
);