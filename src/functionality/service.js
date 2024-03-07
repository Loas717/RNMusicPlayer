import TrackPlayer, {Event} from "react-native-track-player";

module.exports = async function (){
    TrackPlayer.addEventListener(Event.RemotePlay, () => TrackPlayer.play());

    TrackPlayer.addEventListener(Event.RemotePause, () => TrackPlayer.pause());
}

export default async function setupPlayer(){
    let isSetup=false
    try {
        await TrackPlayer.getActiveTrackIndex()
        isSetup=true
    } catch (e) {
        await TrackPlayer.setupPlayer()
        isSetup=true
    } finally{
        return isSetup
    } 
}