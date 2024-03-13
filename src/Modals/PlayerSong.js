import React, {useState} from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    TouchableOpacity
} from 'react-native';
import  Modal  from 'react-native-modal';
import Slider from '@react-native-community/slider';
import { getQueue } from 'react-native-track-player/lib/trackPlayer';
import TrackPlayer from 'react-native-track-player';

let ScreenHeight = Dimensions.get('window').height;
let ScreenWidth = Dimensions.get('window').width;

export default function PlayerSong(props){
    const {isVisible, setVisible, tracks}= props;
    const [isPlaying, setIsPlaying] = useState(false);
    const fecharModal = function () {
        setVisible(false);
        };

    const handlePlay = async ()=>{
        if(isPlaying==false){
            await TrackPlayer.play()
            setIsPlaying(true)
        }
        if(isPlaying==true){
            await TrackPlayer.pause()
            setIsPlaying(false)
        }
    }

    const handleQueue = async () => {
        const te = await getQueue();
        console.log(te)
    }

return(
    <Modal
        propagateSwipe={false}
        animationIn="fadeInUp"
        animationOut="fadeInDown"
        backdropOpacity={0.5}
        style={styles.modal}
        isVisible={isVisible}
        onBackButtonPress={() => fecharModal()}
        onBackdropPress={() => fecharModal()}>
            <View style={styles.modalContent}>
                <View style={styles.buttonContainer}>
                    <View style={styles.sliderContainer}>
                    <Slider
                        style={styles.styleSlider}
                        minimumValue={0}
                        maximumValue={1}
                        minimumTrackTintColor="#FFFFFF"
                        maximumTrackTintColor="#FFFFFF"
                    />
                    </View>
                <TouchableOpacity style={styles.btnBox}
                onPress={() => handlePlay()}>
                    {isPlaying ? <Text>Pause</Text> : <Text>Play</Text>}
                </TouchableOpacity>
                </View>
                
            </View>
    </Modal>
)
}

const styles = StyleSheet.create({
    modal: {
        margin: 0,
    },
    modalContent: {
        //margin: 0,
        flex: 1,  
        backgroundColor: '#000000',
    },
    buttonContainer:{
        flex:1,
        justifyContent: 'flex-end'
    },
    btnBox: {
        backgroundColor: '#fff',
        width: '20%',
        height:'10%',
        marginLeft:'40%',
        marginBottom:'16%',
        borderRadius: 50,
        aspectRatio: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    sliderContainer:{
        flex:1,
        justifyContent:'flex-end',
        marginBottom:'-120%',
        marginLeft:'10%',
    },
    styleSlider:{
        flex:1,
        width: '90%', 
        height: "20%",
    }
    
})