import { Map, GoogleApiWrapper,Marker } from 'google-maps-react';
import React,{useEffect,useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import axios from 'axios';
import Fab from '@material-ui/core/Fab';
import { getweather } from '../actions/weathermodel'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import store from '../store'
import WeatherData from './ViewCurrentWeather';

const useStyles = makeStyles(theme => ({
    map:{
        position:'fixed !important'
    },

    fab: {
        margin: theme.spacing(1),
        position: 'absolute',
        bottom: theme.spacing(2),
        right: theme.spacing(2),
      },
    root: {
        '& > *': {
          margin: theme.spacing(1),
        },
      },
      extendedIcon: {
        marginRight: theme.spacing(1),
      },
}));



function GoogleMap(props){
    const classes = useStyles();
    const [loc,setLoc]=useState({lat:0,lng:0})
    // const [location,setLocation]=React.useState();


    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(displayLocationInfo)
          }
          function displayLocationInfo(position) {
            const lon = position.coords.longitude
            const lat = position.coords.latitude
            setLoc({lat:lat,lng:lon})
            console.log(`longitude: ${lon} | latitude: ${lat}`)
      
            props.getweather({lat:lat,lon:lon})
            console.log(store.getState())
          }
    },[])

    return (
        <React.Fragment>
        <CssBaseline />
        {/* <Container component='main'> */}
        {/* <div className='row'>
            <div className='col-8'>  */}
         {loc.lat!=0?
         <Map
            google={props.google}
            zoom={8}
            className={classes.map}
            initialCenter={loc}
            >
          <Marker position={loc} />
        </Map>
         :        
        <Typography color="textSecondary" variant='h6'>
         Waiting to fetch location data...       
        </Typography>}
        <WeatherData/>
        {/* </div> */}
        {/* </Container> */}
        </React.Fragment>
    )
}


const mapStateToProps = state => ({
	weather: state.weather
});
GoogleMap.propTypes = {
	getweather: PropTypes.func.isRequired,
	weather: PropTypes.object.isRequired
}

export default connect(mapStateToProps, { getweather })(GoogleApiWrapper({
    apiKey: 'AIzaSyBtrJEyvt9SQ5cXTxKzoqTYWUZdldwnQOU'
})(GoogleMap))
