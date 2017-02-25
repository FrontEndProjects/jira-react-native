import { AsyncStorage } from 'react-native';
import Storage from 'react-native-storage';

export default function () {
  return storage = new Storage({
    storageBackend: AsyncStorage,
    defaultExpires: null,
    enableCache: false
  });
}