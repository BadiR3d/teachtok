import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import IconOverlay from './IconOverlay';

const InteractionsComponent: React.FC = () => {
  return (
    <View style={styles.container}>
      <IconOverlay />
      <Ionicons name="heart" color="white" size={25} />
      <Text style={styles.iconCounterText}>{'87'}</Text>
      <FontAwesome name="commenting" color="white" size={25} />
      <Text style={styles.iconCounterText}>{'2'}</Text>
      <FontAwesome name="bookmark" color="white" size={25} />
      <Text style={styles.iconCounterText}>{'203'}</Text>
      <FontAwesome name="share" color="white" size={25} />
      <Text style={styles.iconCounterText}>{'17'}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  icon: {
    paddingBottom: 15,
  },
  iconCounterText: {
    color: 'white',
    fontSize: 12,
    paddingBottom: 10,
    textAlign: 'center'
  },
})

export default InteractionsComponent;
