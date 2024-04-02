import React from 'react';
import {SafeAreaView, StatusBar} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import MyBottomTabs from './navigations/MainNavigator';

const AppStack = createStackNavigator();

const App: React.FC = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <MyBottomTabs />
        {/* <AppStack.Navigator> */}
          {/* <AppStack.Screen
            name="BottomTab"
            component={MyBottomTabs}
            options={{headerShown: false}}
          /> */}
        {/* </AppStack.Navigator> */}
        {/* <SafeAreaView style={{flex: 1}}>
         <StatusBar barStyle="dark-content" />
         <HomeScreen />
       </SafeAreaView> */}
    </SafeAreaView>
  );
};

export default App;
