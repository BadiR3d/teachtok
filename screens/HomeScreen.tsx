import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, ImageBackground} from 'react-native';
import MCQComponent from '../components/MCQComponent';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const HomeScreen: React.FC = () => {
  const [backgroundImage, setBackgroundImage] = useState('');
  const [timeElapsed, setTimeElapsed] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeElapsed(prevTimeElapsed => prevTimeElapsed + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes < 10 ? '0' : ''}${minutes}:${
      remainingSeconds < 10 ? '0' : ''
    }${remainingSeconds}`;
  };

  function handleDataFromChild(imageUrl: string) {
    setBackgroundImage(imageUrl);
  }

  return (
    <ImageBackground
      source={{
        uri: backgroundImage || '../assets/images/education_background.jpeg',
      }}
      style={styles.background}>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.timerContainer}>
            <MaterialCommunityIcons name="timer" color="white" size={20} />
            <Text style={styles.timer}>{formatTime(timeElapsed)}</Text>
          </View>
          <Text style={styles.title}>For You</Text>
          <AntDesign name="search1" color="white" size={20} />
        </View>
        <View style={styles.questionContainer}>
          <MCQComponent sendImageUrl={handleDataFromChild} />
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
  },
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 20,
    color: 'white',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  questionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  timer: {
    color: 'white',
  },
});

export default HomeScreen;
