import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Badge from '@material-ui/core/Badge';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { getResults } from '../actions/results'
import { getJobList } from '../actions/auth'


const useStyles = makeStyles(theme => ({
	card: {
		minWidth: 180,
		maxWidth: 300,
	},
	media: {
		height: 150,
	},
	pos: {
		marginBottom: 12,
	},
	margin: {
		margin: theme.spacing(2),
	},
}));

function JobResults(props) {
	const classes = useStyles();
	const [url, setUrl] = useState(props.result.url)
	useEffect(() => {
		// getBills()
		// res()
		// props.getResults(props.auth.jobId);
		props.getJobList({email:props.auth.user})
		if(props.auth.jobId.length!=0){
			// console.log(props)
			props.getResults(props.auth.jobId);
		}
		// else{
		// 	props.getJobList({email:props.auth.user})
		// }
		// setUrl(props.result.url)
	}, [props.auth.jobId.length])
	const res = () => {

		// const config = {
		// 	headers: {
		// 		'Content-Type': 'application/json'
		// 	}
		// }
		// const data = {
		// 	key: "fetch",
		// 	jobID: "29f69330-4be9-11ea-bc00-6b5c8d8055dd"
		// }
		// const dat = JSON.stringify(data)
		// axios.post('http://localhost:4000/api/results/getResult',
		// 	dat, config
		// ).then((res) => {
		// 	console.log(res)
		// 	console.log('inside post')
		// 	setUrl(res['data']['url'])
		// 	console.log(res.data.url)
		// 	console.log(url);

		// }).catch((err) => {
		// 	console.error(err)
		// })
		// console.log('inside res')
		//props.getResults('29f69330-4be9-11ea-bc00-6b5c8d8055dd');
	}
	return (
		<React.Fragment>
			<CssBaseline />
			<Container component='main'>
				<br/>
				{/* <Typography color="textSecondary" variant='h5'>
					<img
						src={url}
						alt="new"
					/>
				</Typography> */}
				<div className='row'>
					{props.result.map((res,i)=>
					<div key={i} className='col-4'>
					<Card className={classes.root}>
					<CardHeader
						avatar={
						<Avatar aria-label="recipe" className={classes.avatar}>
							Job
						</Avatar>
						}
						action={
						<IconButton aria-label="settings">
							<MoreVertIcon />
						</IconButton>
						}
						title={res.jobID}
						subheader={res.status}
					/>
					<CardMedia
						className={classes.media}
						image={res.url}
						alt="Failed"
						// image="/static/images/cards/paella.jpg"
					/>
					<CardContent>
						<Typography variant="body2" color="textSecondary" component="p">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit.
						Integer tincidunt dui sed augue sodales, eu bibendum mauris condimentum. 
						Pellentesque nisi mi, suscipit nec pellentesque eget.
						</Typography>
					</CardContent>
					</Card>
					<br/>
					</div>

					)}
				</div>

			</Container>
		</React.Fragment>
	)
}


const mapStateToProps = state => ({
	result: state.result,
	auth:state.auth
});
JobResults.propTypes = {
	getResults: PropTypes.func.isRequired,
	getJobList:PropTypes.func.isRequired,
	result: PropTypes.object.isRequired

}
export default connect(mapStateToProps, { getResults,getJobList })(JobResults)