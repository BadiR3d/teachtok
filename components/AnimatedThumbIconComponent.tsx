import React, { useState, useEffect } from 'react';
import { View, Animated, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const MovingThumbsIcon: React.FC = ({thumbDirection}) => {
  const [position] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(position, {
          toValue: 100,
          duration: 1000,
          useNativeDriver: false, // Set to true for better performance
        }),
        Animated.timing(position, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: false, // Set to true for better performance
        }),
      ]),
    ).start();
  }, [position]);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.iconContainer, { transform: [{ translateY: position }] }]}>
        <Icon name={`thumbs-${thumbDirection}`} size={20} color="white" />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    alignItems: 'center',
  },
});

export default MovingThumbsIcon;
