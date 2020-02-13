import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Divider from '@material-ui/core/Divider';
import Link from '@material-ui/core/Link';
import SendIcon from '@material-ui/icons/Send';
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Badge from '@material-ui/core/Badge';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {
	MuiPickersUtilsProvider,
	KeyboardTimePicker,
	KeyboardDatePicker,
} from '@material-ui/pickers';
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { getRadar, getFiles, launchJob } from '../actions/weathermodel'
import { updateUser } from '../actions/auth'
import store from '../store'

const useStyles = makeStyles(theme => ({
	formControl: {
		margin: theme.spacing(1),
		minWidth: 120,
	},
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
	button: {
		margin: theme.spacing(1),
	},
}));

function ModelExecution(props) {
	const classes = useStyles();
	const [selectedDate, setSelectedDate] = React.useState(new Date());
	const [radar, setRadar] = React.useState([])
	const [radarName, setRadarName] = React.useState('')
	const [file, setFile] = React.useState([])
	const [fileName, setFileName] = React.useState('')

	const handleDateChange = date => {
		console.log(date.toISOString().slice(0, 10).split('-').join('/'))
		props.getRadar({ date: date.toISOString().slice(0, 10).split('-').join('/') })
		setSelectedDate(date);
		//   setRadar(props.nexrad)
		//   setRadar(props.nexrad)

	};
	useEffect(() => {
		console.log(props.nexrad)
		// setRadar(props.radar)
	}, [props.nexrad])

	const handleChange = event => {
		setRadarName(event.target.value)
		props.getFiles({ date: selectedDate.toISOString().slice(0, 10).split('-').join('/'), radar: event.target.value })
	}
	const handleChangeFile = event => {
		setFileName(event.target.value)
	}
	const lanuch = () => {
		let key = selectedDate.toISOString().slice(0, 10).split('-').join('/') + '/' + radarName + '/' + fileName
		props.launchJob({
			key: key,
			bucket: "noaa-nexrad-level2"
		})
		// .then((data)=>{
			
		// })
	}
	useEffect(() => {
		if(props.jobmodel.jobID!=null){
		props.updateUser({email:props.auth.user,jobId:props.jobmodel.jobID})
		}
	}, [props.jobmodel.jobID])

	return (
		<React.Fragment>
			<CssBaseline />
			<Container component='main'>
				<br />
				<div className='row'>
					<div className='col-4'>
						<Card style={{ backgroundColor: "#fbfaff" }} className={classes.card}>
							<CardHeader title="Select Date">
								{/* <Typography gutterBottom variant="h5" color="primary" component="h2">
                    Select Date
                </Typography> */}
							</CardHeader>
							<CardActionArea>
								<CardContent>

									<MuiPickersUtilsProvider utils={DateFnsUtils}>
										<KeyboardDatePicker
											disableToolbar
											variant="inline"
											format="MM/dd/yyyy"
											margin="normal"
											id="date-picker-inline"
											label="Date"
											value={selectedDate}
											onChange={handleDateChange}
											KeyboardButtonProps={{
												'aria-label': 'change date',
											}}
										/>
									</MuiPickersUtilsProvider>
								</CardContent>
							</CardActionArea>
							<CardActions>
							</CardActions>
						</Card>
					</div>
					<div className='col-4'>
						<Card style={{ backgroundColor: "#fbfaff" }} className={classes.card}>
							<CardHeader title="Select Radar">
							</CardHeader>
							<CardActionArea>
								<CardContent>
									<FormControl className={classes.formControl}>
										<InputLabel id="demo-simple-select-label">Radar</InputLabel>
										<Select
											labelId="demo-simple-select-label"
											id="demo-simple-select"
											value={radarName}
											onChange={handleChange}
										>
											{props.nexrad.map((rad, i) =>
												<MenuItem value={rad}>{rad}</MenuItem>)}
										</Select>
									</FormControl>
								</CardContent>
							</CardActionArea>
							<CardActions>
							</CardActions>
						</Card>
					</div>
					<div className='col-4'>
						<Card style={{ backgroundColor: "#fbfaff" }} className={classes.card}>
							<CardHeader title="Select File">
								{/* <Typography gutterBottom variant="h5" color="primary" component="h2">
                    Select Date
                </Typography> */}
							</CardHeader>
							<CardActionArea>
								<CardContent>
									<FormControl className={classes.formControl}>
										<InputLabel id="demo-simple-select-label">File</InputLabel>
										<Select
											labelId="demo-simple-select-label"
											id="demo-simple-select"
											value={fileName}
											onChange={handleChangeFile}
										>
											{props.nexradfile.map((file, i) =>
												<MenuItem value={file}>{file}</MenuItem>)}
										</Select>
									</FormControl>
								</CardContent>
							</CardActionArea>
							<CardActions>
								<Button
									variant="contained"
									color="secondary"
									className={classes.button}
									endIcon={<SendIcon />}
									onClick={lanuch}
								>
									Launch
                </Button>
							</CardActions>
						</Card>
					</div>
				</div >
				<div className='row'>

				</div>
			</Container>
		</React.Fragment>
	)
}
const mapStateToProps = state => ({
	nexrad: state.nexrad,
	nexradfile: state.nexradfile,
	jobmodel: state.jobmodel,
	auth: state.auth
});
ModelExecution.propTypes = {
	getRadar: PropTypes.func.isRequired,
	updateUser: PropTypes.func.isRequired,
	nexrad: PropTypes.array.isRequired,
	getFiles: PropTypes.func.isRequired,
	nexradfile: PropTypes.array.isRequired,
	lanuchJob: PropTypes.func.isRequired,
	jobmodel: PropTypes.object.isRequired
}
export default connect(mapStateToProps, { getRadar, getFiles, launchJob, updateUser })(ModelExecution)