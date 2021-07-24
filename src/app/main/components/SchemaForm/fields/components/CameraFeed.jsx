import React, { Component, useState, useRef, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Measure from 'react-measure';

import {
  Card,
  CardContent,
  Typography,
  Button,
  Modal,
  Backdrop,
  Fade,
  IconButton
} from '@material-ui/core';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';
import SyncAltIcon from '@material-ui/icons/SyncAlt';
import ClearIcon from '@material-ui/icons/Clear';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';

import Dropzone from 'react-dropzone';

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
  dropSection: {
    backgroundColor: '#d0d0d0',
    borderRadius: '5px',
    overflowX: 'auto'
  },
  buttongroup: {
    display: 'flex',
    justifyContent: 'space-around',
    marginTop: '10px'
  }
}));

const ImageItem = props => (
  <div className="image-item-wrapper">
    <img src={props.data.url} alt="" onClick={props.onClick}/>
    <IconButton onClick={() => props.onDelete(props.data)} color="primary" aria-label="add" className="close-icon"><ClearIcon /></IconButton>
  </div>
);

export default ({ path, label, value, type, onChange, onFile, ...rest }) => {
    const classes = useStyles();
    const [openCamera, setOpenCamera] = useState(false);
    const [images, setImages] = useState([]);
    const dropzoneRef = useRef(null);

    useEffect(() => {
      console.log(value, 'changed images');
      if(value) setImages([...value]);
    }, [value]);

    const handleOpenCamera = () => {
      setOpenCamera(true);
    };
    
    const handleCloseCarmera = () => {
      setOpenCamera(false);
    };

    const handleOpenFileBrowser = () => {
      if(dropzoneRef) dropzoneRef.current.click();
    }

    const handleAddImage = (e) => {
      const { files } = e.target;
      if(!files || !files.length) return;
      
      let fileList = [];      
      if(Array.isArray(files)) fileList = files;
      else {
        for(let i = 0; i < files.length; i++){
          fileList.push(files[i]);
        }
      }

      onFile && onFile({method: 'save', files: fileList});
    }

    const handleRemoveImage = (image) => {
      if(!image) return;
      
      onFile && onFile({method: 'delete', files: [image]});
    }

    const captureImage = (file) => {
      onFile && onFile({method: 'save', files: [file]});
    }

    const handleShowGallary = () => {
      onFile && onFile({method: 'gallery'});
    }

    console.log('images', value);
    return (
      <>
        <Card className={classes.root} {...rest}>
            <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>{label}</Typography>
                <input ref={dropzoneRef} type="file" multiple hidden onChange={handleAddImage}/>

                <Dropzone onDrop={acceptedFiles => handleAddImage({target: {files: acceptedFiles}})}>
                  {({getRootProps}) => (
                    <section className={classes.dropSection}>
                      <div {...getRootProps({className: 'embed-image-dropzone'})}>
                        {images && images.length ? 
                          images.map((image, index) => <ImageItem data={image} key={index} onClick={handleShowGallary} onDelete={handleRemoveImage}/>)
                          : <p className='empty-text'>Drop Images in Here</p>
                        }
                      </div>
                    </section>
                  )}
                </Dropzone>

                <div className={classes.buttongroup}>
                  <Button variant="outlined" color="secondary" size="small" onClick={handleOpenCamera}>
                    <AddAPhotoIcon />
                  </Button>
                  <Button variant="outlined" color="secondary" size="small" onClick={handleOpenFileBrowser}>
                    <AddPhotoAlternateIcon />
                  </Button>
                </div>
            </CardContent>
        </Card>
        <p>&nbsp;</p>
        
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={openCamera}
          onClose={handleCloseCarmera}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={openCamera}>
            <div className={classes.paper}>
              <h2 id="transition-modal-title"></h2>
              <p id="transition-modal-description" ></p>
              <CameraCapture sendFile={captureImage} />
            </div>
          </Fade>
        </Modal>
      </>
    )
};

class CameraCapture extends Component {
  constructor(props) {
      super(props);
      this.state = {
          error : null,
          container: {w:0, h:0},
          aspectRatio: 1.2,
          deviceId: 0,
          image: null,
          counter: 0
      };
      this.devices = [];
      this.canvasRef = React.createRef();
  }
  
  UNSAFE_componentWillMount(){
    const { aspectRatio } = this.state;
    let _width = window.innerWidth;
    _width = _width > 640 ? 640 : _width - 64;
    console.log('xxxxx', _width);
    this.setState({container: {width: _width, height: Math.round(_width/aspectRatio)}});
  }

  async componentDidMount() {
    if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
        this.setState({error: "enumerateDevices() not supported."});
        console.log("enumerateDevices() not supported.");
        return;
      }
    this.devices = await navigator.mediaDevices.enumerateDevices();
    this.processDevices(1);
  }

  handleCanPlay = () => {
    this.videoPlayer.play();
  }

  handleResize = (contentRect) => {
    this.setState({container: {height: contentRect.bounds.height, width: contentRect.bounds.width}});
  }

  processDevices(id) {
    if(!this.devices.length) return;
    id = this.devices.length < id ? id = 1 : id;
    this.setState({deviceId: id});
    let num = id - 1;
    this.setDevice(this.devices[num]);
      // devices.forEach(device => {
      //     console.log(device.label);
      //     this.setDevice(device);
      // });
  }

  async setDevice(device) {
      const { deviceId } = device;
      const stream = await navigator.mediaDevices.getUserMedia({ audio: false, video: { deviceId } });
      this.videoPlayer.srcObject = stream;
  }

  takePhoto = () => {
      this.setState({error: null});
      if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
        this.setState({error: "enumerateDevices() not supported."});
        console.log("enumerateDevices() not supported.");
        return;
      }
      
      const { container } = this.state;
      const context = this.canvasRef.current.getContext('2d');
      context.drawImage(this.videoPlayer, 0, 0, container.width, container.height);
      this.canvasRef.current.toBlob(this.addCapturedImage);
  };

  addCapturedImage = (blob) => {
    if(!blob) return;

    let _imgURL = URL.createObjectURL(blob);
    this.setState(prev => {
      return {image: _imgURL, counter: prev.counter + 1}
    });

    const { sendFile } = this.props;
    // let _file = {
    //   file: blob,
    //   url: _imgURL,
    //   name: 'capture_' + Date.now()
    // }
    sendFile(blob);
  }

  switchCamera = () => {
    const { deviceId } = this.state;
    this.processDevices(deviceId + 1);
  }

  render() {
    const { container, image, counter } = this.state;
    
    return (
      <Measure bounds onResize={this.handleResize}>
        {({ measureRef }) => (
        <div className="c-camera-feed" style={{align: "center"}}>
          <div ref={measureRef} className="c-camera-feed__viewer" style={{width: `${container.width}px`, display: 'flex'}}>
              <video
                ref={ref => (this.videoPlayer = ref)}
                onCanPlay={this.handleCanPlay}/>
          </div>

          <div className="c-camera-feed__controls">
            <div className="feed-preview">
              {image && (
                <>
                  <img src={image} alt=""/>
                  <div className="feed-counter">{counter}</div>
                </>
              )}
            </div>

            <div className="control_btn" onClick={this.takePhoto} style={{height: '80px', width: '80px'}}>
              <PhotoCameraIcon />
            </div>

            <div className="control_btn" onClick={this.switchCamera} style={{height: '64px', width: '64px'}}>
              <SyncAltIcon />
            </div>
          </div>

          <div color="danger">{this.state.error}</div>

          <div style={{display: 'none'}}>
              <canvas width={container.width} height={container.height} ref={this.canvasRef} />
          </div>
        </div>
        )}
      </Measure>
    );
  }
}
