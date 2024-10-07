import React, { useState, useEffect, useRef } from "react";
import { View, StyleSheet, Text, FlatList, TouchableOpacity, PermissionsAndroid, SafeAreaView, Animated } from "react-native";
import TrackPlayer from "react-native-track-player";
import { TrackType, Capability, AppKilledPlaybackBehavior } from "react-native-track-player";
import { getQueue } from "react-native-track-player/lib/trackPlayer.js";
import getMusicFiles from '../functionality/getMusicFiles.js'
import PlayerSong from "../Modals/PlayerSong.js";
import { Button } from 'react-native-paper';

//const {width, height} = Dimensions.get('window');

    function MainScreen() {
    const [player, setPlayer] = useState(false);
    const [tracks, setTracks] = useState([]);
    const [songIndex, setsongIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [playerVisible, setplayerVisible] = useState(false)

    useEffect(()=>{
        console.log(playerVisible)
        requestPermission()
        setupPlayer();
    }, [])

    const setupPlayer = async () => {
        try {
            const musicFiles = await getMusicFiles();
            console.log(musicFiles)
            if(player==false){
                await TrackPlayer.setupPlayer();
                setPlayer(true);
            }
            await TrackPlayer.updateOptions({
            stopWithApp: false,
            android: {
            appKilledPlaybackBehavior:
            AppKilledPlaybackBehavior.StopPlaybackAndRemoveNotification,
            },
            capabilities: [
                Capability.Play,
                Capability.Pause,
                Capability.SkipToNext,
                Capability.SkipToPrevious,
                Capability.Stop,
                Capability.Skip,
            ],
            compactCapabilities: [Capability.Play, Capability.Pause],
            });
            const newtracks = musicFiles.map((file, index) => ({
            id: index.toString(),
            url: 'file://' + file.path,
            title: file.name,
        }));
        setTracks(newtracks)
            await TrackPlayer.add(newtracks);
        } catch (error) {
            console.log(error);
        }
    };

    const requestPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log('Read external storage permission granted');
            } else {
                console.log('Read external storage permission denied');
            }
        } catch (error) {
            console.error('Error requesting permission:', error);
        }
    };

    const handleSkip =  async (item) => {
        const currentTrack = await TrackPlayer.getActiveTrackIndex();
        const trackId = parseInt(item.id, 10);
        console.log(currentTrack)
        await TrackPlayer.skip(trackId);
        setplayerVisible(true)
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

    const renderTrackItem = ({ item }) => {
    return (
    <View style={styles.songItem}>
        <Button mode="contained" onPress={() => handleSkip(item)} style={styles.button}>
            {item.title}
        </Button>
        {/* <TouchableOpacity
                style={styles.btnBox}
                onPress={() => handleSkip(item)}>
                <Text >{item.title}</Text>
        </TouchableOpacity> */}
    </View>
    );
    }

    return (
        <SafeAreaView style={styles.main}>
    <View style={styles.main}>
        <View style={styles.containerHeader}>
        <Text style={styles.TopText}>Music Player</Text>
    </View>
    <PlayerSong
        isVisible={playerVisible}
        setVisible={setplayerVisible}
        tracks={tracks}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
    />

    <View style={styles.FlatListStyle}>
        <FlatList
            data={tracks}
            keyExtractor={(item) => item.id}
            renderItem={renderTrackItem}
        />
    </View>

    {/* <View style={styles.bottomButtonContainer}>
    <TouchableOpacity
                style={styles.btnBox}
                onPress={() => handlePlay()}>
                <Text >PLAY</Text>
        </TouchableOpacity>
    </View> */}

    </View>
    </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: '#FFF',
    },
    containerHeader: {
        backgroundColor: '#fff',
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    bottomButtonContainer: {
        backgroundColor: '#fff',
        padding: 10,
        alignItems: 'center',
        justifyContent: 'bottom',
    },
    TopText: {
        fontSize: 24,
    },
        FlatListStyle: {
        flex: 1,
        marginLeft: 10,
        marginRight: 10,
    },
    songItem: {
        flex:1,
        marginTop: '10%',
        justifyContent: 'center', // Center vertically
        alignItems: 'center', // Center horizontally
    },
    btnBox: {
        backgroundColor: '#5fc3ce',
        width: '90%',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        },
        button: {
            width: '80%', // Adjust width as needed
            borderRadius: 20,
            justifyContent: 'center',
        },
});

export default MainScreen;
