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
import TrackPlayer, {useProgress} from 'react-native-track-player';

let ScreenHeight = Dimensions.get('window').height;
let ScreenWidth = Dimensions.get('window').width;

export default function PlayerSong(props){
    const {isVisible, setVisible, tracks, isPlaying, setIsPlaying}= props;
    const progress = useProgress();
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

    return (
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
                <View style={styles.sliderContainer}>
                <Slider
                style={styles.styleSlider}
                value={progress.position}
                minimumValue={0}
                maximumValue={progress.duration}
                minimumTrackTintColor="#FFFFFF"
                maximumTrackTintColor="#FFFFFF"
                onSlidingComplete={async value => {
                    await TrackPlayer.seekTo(value);
                }}
                />
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.btnBox} onPress={() => handlePlay()}>
                    {isPlaying ? <Text>Pause</Text> : <Text>Play</Text>}
                </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modal: {
        margin: 0,
    },
    modalContent: {
        flex: 1,
        backgroundColor: '#000',
        justifyContent: 'flex-end',
    },
    sliderContainer: {
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    styleSlider: {
        height: 40,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: '10%',
    },
    btnBox: {
        backgroundColor: '#5fc3ce',
        width: '20%',
        aspectRatio: 1,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
});