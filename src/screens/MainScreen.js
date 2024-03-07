import React, { useState, useEffect, useRef } from "react";
import { View, StyleSheet, Text, FlatList, TouchableOpacity, PermissionsAndroid, AppRegistry } from "react-native";
import TrackPlayer, { TrackType, Capability, AppKilledPlaybackBehavior, Track } from "react-native-track-player";
import getMusicFiles from '../functionality/getMusicFiles.js'
//import  setupPlayer  from "../functionality/service.js";

const songs = [
    { id: '1', title: 'Song 1' },
    { id: '2', title: 'Song 2' },
];

    TrackPlayer.updateOptions({
        stopWithApp: false,
        android: {
            appKilledPlaybackBehavior:
            AppKilledPlaybackBehavior.StopPlaybackAndRemoveNotification,
        },
        capabilities: [Capability.Play,
            Capability.Pause,
            Capability.SkipToNext,
            Capability.SkipToPrevious,
            Capability.Stop,],
            compactCapabilities: [Capability.Play, Capability.Pause],
    })

/* export default */ function MainScreen() {
    //const [SongList, setSongList] = useState(tracks);
    const [play, setPlay] = useState(false);
    const [tracks, setTracks] = useState([]);
    let songs

    useEffect(()=>{
        requestPermission()
        setupTrackPlayer();
        //setupPlayer()
    }, [])

    const setupTrackPlayer = async () => {
        await TrackPlayer.setupPlayer();
        
        const musicFiles = await getMusicFiles();
        
        const newtracks = musicFiles.map((file, index) => ({
            id: index.toString(),
            url: 'file://' + file.path,
            title: file.name,
        }));
        setTracks(newtracks)
        songs = newtracks
        await TrackPlayer.add(newtracks);
    };

    const requestPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log('Read external storage permission granted');
                //setupTrackPlayer();
            } else {
                console.log('Read external storage permission denied');
                // Handle the case where the permission is not granted.
            }
        } catch (error) {
            console.error('Error requesting permission:', error);
        }
    };

    const renderSongItem = ({ item }) => (
    <View style={styles.songItem}>
        <TouchableOpacity
                style={styles.btnBox}
                onPress={() => TrackPlayer.play()}>
                <Text style={styles.btnText}>{item.title}</Text>
        </TouchableOpacity>
    </View>
    );

    const renderTrackItem = ({ item }) => {
    
    return (
        <View style={styles.songItem}>
        <TouchableOpacity
                style={styles.btnBox}
                onPress={() => TrackPlayer.skip(item.id)}>
                <Text >{item.title}</Text>
        </TouchableOpacity>
    </View>
    );
    }

    return (
    <View style={styles.main}>
        <View style={styles.containerHeader}>
        <Text style={styles.TopText}>Music Player</Text>
    </View>

    {/* <View>
    <TouchableOpacity
                style={styles.btnBox}
                onPress={() => TrackPlayer.play()}>
                <Text >PLAY</Text>
        </TouchableOpacity>
    </View> */}

    <View style={styles.FlatListStyle}>
        <FlatList
            data={tracks}
            keyExtractor={(item) => item.id}
            renderItem={renderTrackItem}
        />
    </View>

    <View style={styles.bottomButtonContainer}>
    <TouchableOpacity
                style={styles.btnBox}
                onPress={() => TrackPlayer.play()}>
                <Text >PLAY</Text>
        </TouchableOpacity>
    </View>

    </View>
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
        marginTop:'10%',
        marginLeft: '10%',
    },
    btnBox: {
        backgroundColor: '#5fc3ce',
        width: '90%',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        },
});

export default MainScreen;
