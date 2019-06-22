import React from 'react';
import {
  createDrawerNavigator,
  createMaterialTopTabNavigator,
  createStackNavigator,
  createSwitchNavigator,
} from 'react-navigation';

import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import SearchScreen from '../screens/SearchScreen';
import SettingsScreen from '../screens/SettingsScreen';
import CustomTabBar from '../components/CustomTabBar/CustomTabBar';

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

const TabNav = createMaterialTopTabNavigator(
  {
    HomeStack,
    LinksStack,
    SettingsStack,
  },
  {
    tabBarComponent: CustomTabBar,
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
