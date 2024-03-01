/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import TrackPlayer from 'react-native-track-player';
import { playbackService } from './trackPlayerServices';

TrackPlayer.registerPlaybackService(() => require('./src/functionality/service.js'));

AppRegistry.registerComponent(appName, () => App);
