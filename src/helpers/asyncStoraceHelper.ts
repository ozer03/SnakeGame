import AsyncStorage from "@react-native-async-storage/async-storage";

const HIGH_SCORE_KEY = 'highScore';

export const saveHighScore = async (score: number) => {
  try {
    await AsyncStorage.setItem(HIGH_SCORE_KEY, JSON.stringify(score));
  } catch (error) {
    console.error('Error saving high score to AsyncStorage:', error);
  }
};

export const getHighScore = async () => {
  try {
    const value = await AsyncStorage.getItem(HIGH_SCORE_KEY);
    return value != null ? JSON.parse(value) : 0;
  } catch (error) {
    console.error('Error retrieving high score from AsyncStorage:', error);
    return 0;
  }
};