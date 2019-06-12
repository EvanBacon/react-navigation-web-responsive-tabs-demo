import React from 'react';
import { Platform } from 'react-native';
import {
  createStackNavigator,
  createBottomTabNavigator,
  createMaterialTopTabNavigator,
  createDrawerNavigator,
  createSwitchNavigator,
} from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import SearchScreen from '../screens/SearchScreen';
import LinksScreen from '../screens/LinksScreen';
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
};

const LinksStack = createStackNavigator(
  {
    Develop: LinksScreen,
  },
  stackConfig,
);
LinksStack.path = '';
LinksStack.navigationOptions = {
  tabBarLabel: 'Develop',
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

const DrawerNav = createDrawerNavigator({
  TabNav,
});
DrawerNav.path = '';

export default createSwitchNavigator(
  {
    DrawerNav,
    Search: SearchScreen,
  },
  { headerMode: 'none' },
);
