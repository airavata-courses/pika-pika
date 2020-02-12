import React , {useState,useEffect}  from "react";
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
// import { useCookies } from 'react-cookie';

const useStyles = makeStyles(theme => ({
    card: {
      minWidth:180,
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

export function JobData (props){
    const classes = useStyles();
    const [bills,setBills]=useState([])

    useEffect(() => {
        // getBills()
    },[])

    // const getBills=()=>{
    //     axios.post('/getBills',{
    //         'id':cookies['userData']['data']['id'],
    //         'role':cookies['userData']['data']['role']
    //         }).then((res)=>{
    //             setBills(res['data'])
    //     }).catch((err)=>{
    //            console.error(err)
    //        })
    // }

return( 
    <React.Fragment>
    <CssBaseline />
    <Container component='main'>
    <p></p>
    { bills.length==0? 
        <Typography color="textSecondary" variant='h5'>
              No bills currently processed or pending!
          </Typography>
      : <>
        <div>
        <Typography color="textSecondary" variant='h6'>
            Doctor Bills
        </Typography>
        <br/>
        <div className='row'>
        {bills.map((bill, i) => <>
            {bill['doctor']?
              <div key={bill['_id']+'_'+bill['status']} className='col-3'>
                {/* <BillTile role={cookies['userData']['data']['role']}  
                data={bill} getBills={getBills} /> */}
                <br/>
            </div>:""}</>
            )}
        </div>
        </div>
        <Divider/>
        <div>
        <Typography color="textSecondary" variant='h6'>
            Insurance Bills
        </Typography>
        <br/>
        <div className='row'>
        {bills.map((bill, i) => <>
            {!bill['doctor']?
              <div key={bill['_id']+'_'+bill['status']} className='col-3'>
                {/* <BillTile role={cookies['userData']['data']['role']}  
                data={bill} getBills={getBills} /> */}
                <br/>
            </div>:""}</>
            )}
        </div>
        </div>
        </>
    }
    </Container>
    </React.Fragment>
   )
}

export function BillTile(props){
    const classes = useStyles();
    const [billData,setAppointmentData]=useState(props.data)
    // const [cookies, setCookie] = useCookies(['userName','userData','userProfile']);
    const handlePay=()=>{
        axios.post('/payBill',{"id":billData._id})
        .then(res => {
            console.log(res['data'])
            props.getBills()
        }).catch((error)=>{
        console.log(error)
        })
    }
    return (
        <Badge color="secondary" invisible={billData.status!="due"} 
        badgeContent={'P'} className={classes.margin}>
        <Card style={{backgroundColor:"#fbfaff"}} className={classes.card}>
          <CardActionArea onClick={()=>{console.log("Hi")}}>
            {/* <CardMedia
              className={classes.media}
              image="/static/images/cards/contemplative-reptile.jpg"
              title="Contemplative Reptile"
            /> */}
            <CardContent>
              <Typography gutterBottom variant="h5" color="primary" component="h2">
                {billData._id}
              </Typography>
            {
              billData.appointmentId?<>
              <Typography className={classes.pos} >
                Appointment - {billData.appointmentId}
              </Typography>
              {/* <Typography className={classes.pos} color="textPrimary">
                
              </Typography> */}
              <Typography className={classes.pos} color="secondary">
                Total - {"$ "+parseFloat(billData.price).toFixed(2)}
             </Typography>
              {/* <Typography variant="h6" color="secondary">
              
              </Typography> */}
              {/* {props.role=="patient"?<>
              <Typography className={classes.pos} color="">
                Deductible
             </Typography>
              <Typography variant="h6" color="secondary">
              {"$ "+parseFloat(cookies["userProfile"]["deductibleClaim"]).toFixed(2)}
              </Typography></>:""} */}
              </>
              :<>
              {/* <Typography className={classes.pos} color="primary">
                Insurance Bill
              </Typography> */}
              <Typography className={classes.pos} color="">
                Amount Due
              </Typography>
              <Typography variant="h6" color="secondary">
              {"$ "+parseFloat(billData.price).toFixed(2)}
              </Typography>
              </>
            }
            </CardContent>
          </CardActionArea>
          {billData['status']=='due' && props.role=="patient"? 
          <CardActions>
            <Button size="small" onClick={handlePay} color="primary">
              Pay
            </Button>
          </CardActions>
          : ""}
        </Card>
        </Badge>
      );
}