import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, FlatList, TouchableOpacity, PermissionsAndroid } from "react-native";
import TrackPlayer, { TrackType, Capability, AppKilledPlaybackBehavior, Track } from "react-native-track-player";
import { addTracks } from '../../trackPlayerServices';
import { setupPlayer } from '../functionality/musicController';
import { check, request, Permission } from "react-native-permissions";

const songs = [
    { id: '1', title: 'Song 1' },
    { id: '2', title: 'Song 2' },
];

const tracks = [
    {
        id:1,
        url:require('../assets/ytmp3free.cc_foo-fighters-my-hero-youtubemp3free.org.mp3'),
        title: 'Foo fighters - My Hero'
    },
    {
        id:2,
        url:require('../assets/ifICouldFly.mp3'), 
        title:'Joe Satriani - If I could fly'
    }
]

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
    const [SongList, setSongList] = useState(tracks);
    const [play, setPlay] = useState(false);

    const setUpTPlayer = async () => {
        try {
            //await TrackPlayer.setupPlayer()
            await TrackPlayer.add(tracks)
        } catch (e) {
            console.log(e)
        }
    }

     const requestPermission = async () =>{
        const granted = await PermissionsAndroid.requestMultiple([
            PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
            PermissionsAndroid.PERMISSIONS.READ_MEDIA_AUDIO,
        ])
        console.log('granted',granted)
    } 

    useEffect(()=>{
        requestPermission()

        //return ()=> TrackPlayer.destroy()
    }, [])
    
    const renderSongItem = ({ item }) => (
    <View style={styles.songItem}>
        <TouchableOpacity
                style={styles.btnBox}
                onPress={() => TrackPlayer.play()}>
                <Text style={styles.btnText}>{item.title}</Text>
        </TouchableOpacity>
    </View>
    );

    return (
    <View style={styles.main}>
        <View style={styles.containerHeader}>
        <Text style={styles.TopText}>Music Player</Text>
    </View>

    <View style={styles.FlatListStyle}>
        <FlatList
            data={SongList}
            keyExtractor={(item) => item.id}
            renderItem={renderSongItem}
        />
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
