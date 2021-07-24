import React, { Component } from 'react';
import { KeyboardDatePicker } from '@material-ui/pickers';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Fab, Button } from '@material-ui/core';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

export default ({ path, label, value, type, onChange, uploadImage, ...rest }) => {
    const useStyles = makeStyles((theme) => ({
        modal: {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        },
        paper: {
          backgroundColor: theme.palette.background.paper,
          border: '2px solid #000',
          boxShadow: theme.shadows[5],
          padding: theme.spacing(2, 4, 3),
        },
      }));
    
    const classes = useStyles();
    const bull = <span className={classes.bullet}>•</span>;
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };

    return (
        // <KeyboardDatePicker
        //     value={value} // === '' ? new Date() : value}
        //     label={label}
        //     onChange={onChange}
        //     KeyboardButtonProps={{
        //         'aria-label': 'change date',
        //     }}
        //     {...rest}
        //     InputAdornmentProps={{
        //         position: "start"
        //     }}
        // />
        <>
        <Card className={classes.root} {...rest}>
            <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                    {label}
                </Typography>
                <Typography variant="h5" component="h2">
                    take{bull}a{bull}photo
                </Typography>
                <Button
                  variant="outlined"
                  color="secondary"
                  size="small"
                  onClick={handleOpen}
                >
                  <AddAPhotoIcon />
                </Button>
                {/* <Fab size="small" color="secondary" aria-label="add" onClick={handleOpen} >
                    <AddAPhotoIcon />
                </Fab> */}
            </CardContent>
        </Card>
        <p>&nbsp;</p>
        <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <h2 id="transition-modal-title"></h2>
            <p id="transition-modal-description" ></p>
            <CameraFeed sendFile={uploadImage} />
          </div>
        </Fade>
      </Modal>
      </>
    )
};



class CameraFeed extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error : null
        };
    }
    /**
     * Processes available devices and identifies one by the label
     * @memberof CameraFeed
     * @instance
     */
    processDevices(devices) {
        devices.forEach(device => {
            console.log(device.label);
            this.setDevice(device);
        });
    }

    /**
     * Sets the active device and starts playing the feed
     * @memberof CameraFeed
     * @instance
     */
    async setDevice(device) {
        const { deviceId } = device;
        const stream = await navigator.mediaDevices.getUserMedia({ audio: false, video: { deviceId } });
        this.videoPlayer.srcObject = stream;
        this.videoPlayer.play();
    }

    /**
     * On mount, grab the users connected devices and process them
     * @memberof CameraFeed
     * @instance
     * @override
     */
    async componentDidMount() {
        if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
            this.setState({error: "enumerateDevices() not supported."});
            console.log("enumerateDevices() not supported.");
            return;
          }
        const cameras = await navigator.mediaDevices.enumerateDevices();
        this.processDevices(cameras);
    }

    /**
     * Handles taking a still image from the video feed on the camera
     * @memberof CameraFeed
     * @instance
     */
    takePhoto = () => {
        this.setState({error: null});
        if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
            this.setState({error: "enumerateDevices() not supported."});
            console.log("enumerateDevices() not supported.");
            return;
          }
        const { sendFile } = this.props;
        const context = this.canvas.getContext('2d');
        context.drawImage(this.videoPlayer, 0, 0, 680, 360);
        this.canvas.toBlob(sendFile);
    };

    render() {
        return (
            <div className="c-camera-feed" style={{align: "center"}}>
                <div className="c-camera-feed__viewer">
                    <video ref={ref => (this.videoPlayer = ref)} width="680" heigh="360" />
                </div>
                <Button
                  variant="outlined"
                  color="secondary"
                  size="small"
                  onClick={this.takePhoto}
                >
                  <PhotoCameraIcon />
                </Button>
                {/* <Fab align="center" size="small" color="secondary" aria-label="add" onClick={this.takePhoto} >
                    <PhotoCameraIcon />
                </Fab> */}
                <div color="danger">
                {this.state.error}
                </div>
                {/* <div className="c-camera-feed__stage">
                    <canvas width="680" height="360" ref={ref => (this.canvas = ref)} />
                </div> */}
            </div>
        );
    }
}