import React from 'react';
import {View, StyleSheet} from 'react-native';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6'; // Adjust import as per the icon library you're using
import Ionicons from 'react-native-vector-icons/Ionicons';

const IconOverlay: React.FC = () => {
  return (
    <View style={styles.container}>
      {/* Larger Icon */}
      <View style={styles.largeIconContainer}>
        <FontAwesome6
          name="scroll"
          size={25}
          color={'#ffbf00'}
          style={styles.largeIcon}
        />
      </View>

      {/* Smaller Icon */}
      <Ionicons
        name="add-circle-sharp"
        size={25}
        color={'#00e4b1'}
        style={styles.smallIcon}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  largeIconContainer: {
    borderColor: 'white', // Border color
    borderWidth: 2, // Border width
    borderRadius: 50, // Border radius to make it circular
    padding: 5, // Padding to ensure the border doesn't overlap with the icon
    backgroundColor: '#a67c00',
  },
  largeIcon: {
    // No need to define size in this style since it's defined in the Icon component itself
  },
  smallIcon: {
    position: 'absolute',
    top: '75%',
    marginTop: -10, // Adjust as needed
    alignSelf: 'center', // Adjust as needed
  },
});

export default IconOverlay;
