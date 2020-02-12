import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Divider from '@material-ui/core/Divider';
// import InfoTile from "./infotile.component";
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Badge from '@material-ui/core/Badge';
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { getResults } from '../actions/results'
// import { useCookies } from 'react-cookie';

const useStyles = makeStyles(theme => ({
	card: {
		minWidth: 180,
		maxWidth: 300,
	},
	media: {
		height: 50,
	},
	pos: {
		marginBottom: 12,
	},
	margin: {
		margin: theme.spacing(2),
	},
}));

export function JobResults(props) {
	const classes = useStyles();
	const [url, setUrl] = useState([])
	const [bills, setBills] = useState([])

	useEffect(() => {
		// getBills()
		res()

	}, [])
	const res = () => {
		//	props.getResults();
		console.log('inside res')
		const config = {
			headers: {
				'Content-Type': 'application/json'
			}
		}
		const data = {
			key: "fetch",
			jobID: "29f69330-4be9-11ea-bc00-6b5c8d8055dd"
		}
		const dat = JSON.stringify(data)
		axios.post('http://localhost:4000/api/results/getResult',
			dat, config
		).then((res) => {
			console.log(res)
			console.log('inside post')
			setUrl(res['data']['url'])
			console.log(res.data.url)
			console.log(url);

		}).catch((err) => {
			console.error(err)
		})
		console.log('inside res')
		//props.getResults('29f69330-4be9-11ea-bc00-6b5c8d8055dd');
	}	// const getBills=()=>{
	//     axios.post('/getBills',{
	//         'id':cookies['userData']['data']['id'],
	//         'role':cookies['userData']['data']['role']
	//         }).then((res)=>{
	//             setBills(res['data'])
	//     }).catch((err)=>{
	//            console.error(err)
	//        })
	// }

	return (
		<React.Fragment>
			<CssBaseline />
			<Container component='main'>
				<p></p>
				{/* {bills.length == 0 ? */}
				<Typography color="textSecondary" variant='h5'>
					<img
						src={url}
						alt="new"
					/>
				</Typography>

			</Container>
		</React.Fragment>
	)
}


const mapStateToProps = state => ({
	result: state.result
});
JobResults.propTypes = {
	getResults: PropTypes.func.isRequired,
	result: PropTypes.object.isRequired

}
export default connect(mapStateToProps, { getResults })(JobResults)