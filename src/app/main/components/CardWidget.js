import Divider from '@material-ui/core/Divider';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import React from 'react';

function CardWidget(props) {
	return (
		<Paper className="w-full rounded-8 shadow-9 p-12 text-white" style={{backgroundColor:"#1C2335"}}>
			<div className="flex items-center justify-between">
				<div className="flex items-center">
					<Typography className="mx-8 text-24">
						{props.detail.title}
					</Typography>
				</div>
				<IconButton aria-label="more">
					<Icon>more_vert</Icon>
				</IconButton>
			</div>
			{props.detail.unit && <div className="w-full p-2">
				<Typography className="mx-4" align="right">
					{props.detail.unit}
				</Typography>
			</div>}
			{props.detail.data && props.detail.data.map( (row, i) => (
				<div key={i} className="w-full">
					<Divider className="bg-grey"/>
					<div className="flex w-full justify-between items-center p-4">
						<div className={row.result ? "bg-grey w-1/2 p-2 text-white" : " text-white bg-blue w-1/2 p-2 rounded-3"} style={{borderRadius:".3rem"}}>
							<Typography className="mx-4" align="center">
								{row.label}
							</Typography>
						</div>
						<div className="flex items-center">
							<Typography className="mx-4">
								{row.value}
							</Typography>
						</div>
						{row.unit && <div className="flex items-center">
							<Typography className="mx-4">
								{row.unit}
							</Typography>
						</div>}
					</div>
				</div>
				))}
			<Divider className="bg-grey" />
		</Paper>
	);
}

export default React.memo(CardWidget);
