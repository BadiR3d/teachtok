import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  ActivityIndicator,
} from 'react-native';
import MCQComponent from '../components/MCQComponent';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const HomeScreen: React.FC = () => {
  const [backgroundImage, setBackgroundImage] = useState('');
  const [loading, setLoading] = useState(true);

  function handleDataFromChild(imageUrl: string) {
    setBackgroundImage(imageUrl);
    setLoading(false)
  }

  useEffect(() => {
    if (!backgroundImage) setLoading(true)
    else setLoading(false)
  }, [backgroundImage])

  return (
    <>
      {!!backgroundImage ? (
        <ImageBackground
          source={{uri: backgroundImage || ""}}
          style={styles.background}>
          <View style={styles.container}>
            <View style={styles.header}>
              <MaterialCommunityIcons name="timer" color="white" size={20} />
              <Text style={styles.title}>For You</Text>
              <AntDesign name="search1" color="white" size={20} />
            </View>
            <View style={styles.questionContainer}>
              <MCQComponent sendImageUrl={handleDataFromChild} />
            </View>
          </View>
        </ImageBackground>
      ) : (
        <ActivityIndicator />
      )}
    </>
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
});

export default HomeScreen;
