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
import LinksScreen from '../screens/LinksScreen';
import SettingsScreen from '../screens/SettingsScreen';

const stackConfig = {
  headerMode: 'none',
};

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
  },
  stackConfig,
);

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
    Links: LinksScreen,
  },
  stackConfig,
);

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
    Settings: SettingsScreen,
  },
  stackConfig,
);

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

export default createDrawerNavigator({
  Tabs: createMaterialTopTabNavigator(
    {
      HomeDrawer: HomeStack,
      LinksStack,
      SettingsStack,
    },
    {
      tabBarComponent: TabBar,
      tabBarOptions: {
        upperCaseLabel: false,
      },
    },
  ),
});
