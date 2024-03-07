import RNFS from 'react-native-fs'

const getMusicFiles = async () => {
    try {
        const externalStorage = RNFS.ExternalStorageDirectoryPath;
        const downloadFolder = 'Download';
        //const musicDirectory = RNFS.DocumentDirectoryPath + '/Download';
        const musicDirectory = `${externalStorage}/${downloadFolder}`;
        const files = await RNFS.readDir(musicDirectory);
        console.log
        return files.filter(file => file.isFile() && (file.name.endsWith('.mp3') || file.name.endsWith('.mp4')));
    } catch (error) {
        console.error('Error reading music files:', error);
        return [];
    }
    };

    export default getMusicFiles;