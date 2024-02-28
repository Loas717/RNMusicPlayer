import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, FlatList } from "react-native";
import TrackPlayer from 'react-native-track-player';

const songs = [
    { id: '1', title: 'Song 1' },
    { id: '2', title: 'Song 2' },
];

export default function MainScreen() {
    const [SongList, setSongList] = useState(songs);

    const renderSongItem = ({ item }) => (
    <View style={styles.songItem}>
        <Text>{item.title}</Text>
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
        marginTop:10,
        marginLeft: 10,
    },
    btnBox: {
        backgroundColor: '#5fc3ce',
        width: '90%',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        height: '20%',
        },
});
