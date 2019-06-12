import React from 'react';
import { Platform } from 'react-native';
import {
  createStackNavigator,
  createBottomTabNavigator,
  createMaterialTopTabNavigator,
  createDrawerNavigator,
} from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import { SearchScreen, ResultScreen } from '../screens/LinksScreen';
import SettingsScreen from '../screens/SettingsScreen';

const stackConfig = {
  headerMode: 'none',
};

const HomeStack = createStackNavigator(
  {
    Design: HomeScreen,
  },
  stackConfig,
);
HomeStack.path = '';
HomeStack.navigationOptions = {
  tabBarLabel: 'Design',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
};

const LinksStack = createStackNavigator(
  {
    Search: SearchScreen,
    Result: ResultScreen,
  },
  { ...stackConfig, headerMode: 'screen' },
);
LinksStack.path = '';
LinksStack.navigationOptions = {
  tabBarLabel: 'Develop',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'}
    />
  ),
};

const SettingsStack = createStackNavigator(
  {
    Tools: SettingsScreen,
  },
  stackConfig,
);
SettingsStack.path = '';
SettingsStack.navigationOptions = {
  tabBarLabel: 'Tools',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'}
    />
  ),
};

import TabBar from './TopTabBar';

const TabNav = createMaterialTopTabNavigator(
  {
    HomeStack,
    LinksStack,
    SettingsStack,
  },
  {
    tabBarComponent: TabBar,
    tabBarOptions: {
      upperCaseLabel: false,
    },
  },
);
TabNav.path = '';
export default createDrawerNavigator({
  TabNav,
});
