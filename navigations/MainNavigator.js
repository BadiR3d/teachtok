import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import ActivityScreen from '../screens/ActivityScreen';
import BookmarksScreen from '../screens/BookmarksScreen';
import DiscoverScreen from '../screens/DiscoverScreen';
import ProfileScreen from '../screens/ProfileScreen';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createBottomTabNavigator();

function MyBottomTabs({navigation, route}) {
  const screenOptions = () => ({
    headerShown: false,
    tabBarStyle: {
      backgroundColor: 'black',
      position: 'absolute',
    },
  });

  return (
    <NavigationContainer>
      <Tab.Navigator
        activeColor="white"
        inactiveColor="grey"
        initialRouteName="Home"
        screenOptions={({route}) => ({
          headerShown: false,
          tabBarStyle: {
            backgroundColor: 'black',
            position: 'absolute',
          },
        })}>
        <Tab.Screen
          name="Home"
          title="Home"
          component={HomeScreen}
          options={({route}) => ({
            tabBarIcon: ({focused, color, size}) => {
              return (
                <MaterialCommunityIcons
                  name={'home'}
                  size={25}
                  color={'grey'}
                />
              );
            },
          })}
        />
        <Tab.Screen
          name="Discover"
          component={DiscoverScreen}
          options={{
            ...screenOptions,
            tabBarIcon: ({focused}) => {
              return (
                <FontAwesome5
                  size={25}
                  name={'compass'}
                  color={'grey'}
                  backgroundColor={'transparent'}
                />
              );
            },
          }}
        />
        <Tab.Screen
          name="Activity"
          component={ActivityScreen}
          options={{
            ...screenOptions,
            tabBarIcon: ({focused}) => {
              return (
                <MaterialCommunityIcons
                  size={25}
                  name={'timer'}
                  color={'grey'}
                  backgroundColor={'transparent'}
                />
              );
            },
          }}
        />
        <Tab.Screen
          name="Bookmarks"
          component={BookmarksScreen}
          options={{
            ...screenOptions,
            tabBarIcon: ({focused}) => {
              return (
                <FontAwesome
                  size={25}
                  name={'bookmark'}
                  color={'grey'}
                  backgroundColor={'transparent'}
                />
              );
            },
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            ...screenOptions,
            tabBarIcon: ({focused}) => {
              return (
                <FontAwesome
                  size={25}
                  name={'user-circle'}
                  color={'grey'}
                  backgroundColor={'transparent'}
                />
              );
            },
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default MyBottomTabs;
