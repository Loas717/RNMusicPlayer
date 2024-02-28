import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Button,
  ActivityIndicator,
  TouchableOpacity
} from 'react-native';
import TrackPlayer from 'react-native-track-player';
import { setupPlayer } from '../../trackPlayerServices';
import { addTracks } from '../../trackPlayerServices';

function PlayMusicTest() {

  const [isPlayerReady, setIsPlayerReady] = useState(false);

  useEffect(() => {
    async function setup() {
      let isSetup = await setupPlayer();

      const queue = await TrackPlayer.getQueue();
      if(isSetup && queue.length <= 0) {
        await addTracks();
      }

      setIsPlayerReady(isSetup);
    }

    setup();
  }, []);

  if(!isPlayerReady) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#bbb"/>
      </SafeAreaView>
    );
  }
    const start = function(){
        console.log('press')
        TrackPlayer.play()
    }

  return (
    <View style={styles.container}>
      <Button title="Play" color="#777" onPress={start()}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#112'
  },
});

export default PlayMusicTest;