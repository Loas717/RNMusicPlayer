/* import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Button,
  ActivityIndicator,
} from 'react-native';
import TrackPlayer from 'react-native-track-player';
import { setupPlayer, addTrack } from '../functionality/musicController';

function PlayMusicTest() {

  const [play, setPlay] = useState(false);

  useEffect(() => {
    async function setup() {
      let isSetup = await setupPlayer();
      await addTrack();
      setPlay(isSetup);
    }
    setup();
  }, []);

  if(!play) {
    return (
        <ActivityIndicator/>
    );
  }

  return (
    <View style={styles.container}>
      <Button 
        title="Play" 
        onPress={() => TrackPlayer.play()}  
      />
      <Button 
        title="pause" 
        color='#000'
        onPress={() => TrackPlayer.pause()} 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f8f8f8'
  }
});

export default PlayMusicTest; */