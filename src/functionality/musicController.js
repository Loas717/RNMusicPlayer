/* import  {
    TrackPlayer,
    AppKilledPlaybackBehavior,
    Capability,
    RepeatMode,
} from 'react-native-track-player';
  
export async function setupPlayer() {
  let isSetup = false;
  console.log('setup')
  try {
    await TrackPlayer.getCurrentTrack();
    isSetup = true;
    console.log('try')
  }
  catch {
    await TrackPlayer.setupPlayer();
    await TrackPlayer.updateOptions({
      android: {
        appKilledPlaybackBehavior:
          AppKilledPlaybackBehavior.StopPlaybackAndRemoveNotification,
      },
      capabilities: [
        Capability.Play,
        Capability.Pause,
      ],
      compactCapabilities: [
        Capability.Play,
        Capability.Pause,
      ],
      progressUpdateEventInterval: 2,
    });
    console.log('catch')
    isSetup = true;
  }
  finally {
    console.log('finally')
    return isSetup;
  }
}

export async function addTrack() {
  await TrackPlayer.add([
    {
      id: '1',
      url: 'https://sample-music.netlify.app/death%20bed.mp3',
      //artwork: require('./assets/image.jpg'),
      title: 'Make a cup of coffe',
      artist: 'Powfu',
      duration: 40,
    },
  ]);
}
 */