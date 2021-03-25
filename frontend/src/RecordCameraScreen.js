import React,  { useState, useEffect } from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Alert, ImageBackground, Image} from 'react-native';
import Constant from 'expo-constants'
import { Input,Button } from 'react-native-elements';
import {useNavigation ,useTheme} from '@react-navigation/native';
import { Camera } from 'expo-camera';
import { Video } from "expo-av";
import axios from 'axios';

let camera:Camera


const RecordCameraScreen = ({route}) => { 
  const {title,category} = route.params
	const navigation = useNavigation();
  const [startCamera, setStartCamera] = React.useState(false)
  const [previewVisible, setPreviewVisible] = React.useState(false)
  const [capturedImage, setCapturedImage] = React.useState(null)
  const [cameraType, setCameraType] = React.useState(Camera.Constants.Type.back)
  const [isVideoRecording, setIsVideoRecording] = useState(false);
  const [videoSource, setVideoSource] = useState(null);
  
  useEffect(() => {
	(
		async () => {
	  	const { status } = await Camera.requestPermissionsAsync();
	  	setStartCamera(true);
	})();
	}, []);

   const __startCamera = async () => {
    const {status} = await Camera.requestPermissionsAsync()
    console.log(status)
    if (status === 'granted') {
      setStartCamera(true)
    } else {
      Alert.alert('Access denied')
    }
  }

  const __recordVideo = async () => {
  	  setVideoSource(null)
	  try {
	    const videoRecordPromise = camera.recordAsync();
	    if (videoRecordPromise) {
	      setIsVideoRecording(true);
	      const data = await videoRecordPromise;
	      const source = data.uri;
	      if (source) {
	        setPreviewVisible(true);
	        console.log("video source", source);
	        setVideoSource(source);
	      }
	    }
	  } catch (error) {
	    console.warn(error);
	  }
    

    // const photo: any = await camera.takePictureAsync()
    // console.log(photo)
    // setPreviewVisible(true)
    // setCapturedImage(photo)
  }

  const __stopVideoRecording = () => {
    
	setPreviewVisible(false);
	setIsVideoRecording(false);
	camera.stopRecording();
    
  };

  const __savePhoto = () => {
    const video_id = 'glxrwC9zsHY';
    const adminLogin = () => {
    const LOGIN = {
      "username": 'sam2',
      "password": 'sam123'
    };
    const ADMINLOGIN = `http://127.0.0.1:8000/users/login/`;

    axios.post(ADMINLOGIN, LOGIN)
      .then(data => {
        console.log(data);
        console.log('logged in');
        fetchData();
      })
      .catch((error) => {
        console.error(error);
      });
    };
    axios.post("http://192.168.1.79:19000/posts/create/", {
          "video": "glxrwC9zsHY",
          "title": "Test title",
          "category": "Y"
        }).then((data) => {
      console.log(data)
      console.log("HERE")
    })
    .catch((error)=>{
      console.error(error);
    });

  	navigation.navigate('home')
  }

  const __retakePicture = () => {
    // setVideoSource(null)
    setPreviewVisible(false)
    __startCamera()
  }
  const __switchCamera = () => {
    if (cameraType === 'back') {
      setCameraType('front')
    } else {
      setCameraType('back')
    }
  }



	if (startCamera === null) {
		return <View />;
	}
	if (startCamera === false) {
		return <Text>No access to camera</Text>;
	}

  return (
    <View style={styles.container}>
      
        <View
          style={{
            flex: 1,
            width: '100%'
          }}
        >
          {previewVisible && videoSource ? (
            <CameraPreview photo={videoSource} savePhoto={__savePhoto} retakePicture={__retakePicture} />
          ) : (
            <Camera
              type={cameraType}
              style={{flex: 1}}
              ref={(r) => {
                camera = r
              }}
            >
              <View
                style={{
                  flex: 1,
                  width: '100%',
                  backgroundColor: 'transparent',
                  flexDirection: 'row'
                }}
              >
                <View
                  style={{
                    position: 'absolute',
                    right: 32,
                    top: 16,
                    flexDirection: 'column',
                    // justifyContent: 'space-between'
                  }}
                >
                  <TouchableOpacity
                    onPress={__switchCamera}
                    style={{
                      marginTop: 20,
                      borderRadius: '50%',
                      height: 25,
                      width: 25
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 20
                      }}
                    >
                      {cameraType === 'front' ? '🤳' : '📷'}
                    </Text>
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    flexDirection: 'row',
                    flex: 1,
                    width: '100%',
                    padding: 20,
                    justifyContent: 'space-between'
                  }}
                >
                  <View
                    style={{
                      alignSelf: 'center',
                      flex: 1,
                      alignItems: 'center'
                    }}
                  >
                    <TouchableOpacity
                      // onPress={__recordVideo}
                      onLongPress={__recordVideo}
        			  onPressOut={__stopVideoRecording}
                      style={{
                        width: 70,
                        height: 70,
                        bottom: 0,
                        borderRadius: 50,
                        backgroundColor: '#fff'
                      }}
                    />
                  </View>
                </View>
              </View>
            </Camera>
          )}
        </View>     
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
})

const CameraPreview = ({photo, retakePicture, savePhoto}: any) => {
  console.log('sdsfds', photo)
  return (
    
      
    	<View
          style={{
            flex: 1,
            flexDirection: 'column',
            padding: 15,
            justifyContent: 'flex-end'
          }}
        >
        <Video
	      source={{ uri: photo }}
	      shouldPlay={true}
	      style={{flex:1}}
   
        
      />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between'
            }}
          >
            <TouchableOpacity
              onPress={retakePicture}
              style={{
                width: 130,
                height: 40,

                alignItems: 'center',
                borderRadius: 4
              }}
            >
              <Text
                style={{
                  color: '#000',
                  fontSize: 20
                }}
              >
                Re-take
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={savePhoto}
              style={{
                width: 130,
                height: 40,

                alignItems: 'center',
                borderRadius: 4
              }}
            >
              <Text
                style={{
                  color: '#000',
                  fontSize: 20
                }}
              >
                Post Exercise
              </Text>
            </TouchableOpacity>
          </View>
        </View>
  )
}

export default RecordCameraScreen