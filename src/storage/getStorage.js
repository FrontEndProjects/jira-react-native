import { AsyncStorage } from 'react-native';
import Storage from 'react-native-storage';

export default function () {
  let storage = new Storage({
    storageBackend: AsyncStorage,
    defaultExpires: null,
    enableCache: false
  });
  return storage;
}
