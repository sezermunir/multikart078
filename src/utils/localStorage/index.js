import { MMKV } from 'react-native-mmkv';

// MMKV instance oluştur
const storage = new MMKV();

const setValue = (key, value) => {
  try {
    storage.set(key, value);
  } catch (e) {
    console.error('Set error:', e);
  }
};

const getValue = (key) => {
  try {
    return storage.getString(key) || null;
  } catch (e) {
    console.error('Get error:', e);
    return null;
  }
};

const clearValue = () => {
  try {
    storage.clearAll();
  } catch (e) {
    console.error('Clear error:', e);
  }
};

const removeValue = (key) => {
  try {
    storage.delete(key);
  } catch (e) {
    console.error('Remove error:', e);
  }
};

export { setValue, getValue, clearValue, removeValue };
