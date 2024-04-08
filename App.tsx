import React, {  } from 'react';
import {SafeAreaView} from 'react-native';
import MyBottomTabs from './navigations/MainNavigator';

const App: React.FC = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <MyBottomTabs />
    </SafeAreaView>
  );
};

export default App;
