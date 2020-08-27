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

const useStyles = makeStyles(theme => ({
    map:{
        position:'fixed !important'
    },

    fab: {
        margin: theme.spacing(1),
        position: 'absolute',
        bottom: theme.spacing(2),
        right: theme.spacing(2),
        height:'10em'
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

function WeatherData(props){
    
    const classes = useStyles()
    const [data,setData]=useState()
    useEffect(() => {
        console.log(props.weather)
    },[props.weather])


    return (
      <div className={classes.root}>
        <Fab color='primary' variant="extended" className={classes.fab}>
            {"Temperature : "+Math.round(props.weather['temp']-273)+'°C'}
            <br/> 
            {"Feels Like : "+Math.round(props.weather['feels_like']-273)+'°C'}
            <br/> 
            {"Minimum Temperature : "+Math.round(props.weather['temp_min']-273)+'°C'}
            <br/> 
            {"Maximum Temperature : "+Math.round(props.weather['temp_max']-273)+'°C'}
            <br/> 
            {"Humidity : "+props.weather['humidity']+'%'}
            <br/> 
        </Fab>
      </div>
    );
}
const mapStateToProps = state => ({
	weather: state.weather
});

WeatherData.propTypes = {
    weather: PropTypes.object.isRequired
}

export default connect(mapStateToProps)(WeatherData)
