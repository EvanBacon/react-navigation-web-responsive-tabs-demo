import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import * as React from 'react';
import { Animated, StyleSheet, TouchableOpacity, View } from 'react-native';

import Colors from '../../constants/Colors';

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(
  TouchableOpacity,
);
const size = 72;

export default function CustomHeader(
  { navigation, onHeightChanged, children, isMobileWidth, position },
  ref,
) {
  return (
    <View
      style={styles.container}
      onLayout={({ nativeEvent }) => onHeightChanged(nativeEvent.layout.height)}
    >
      <View style={styles.header}>
        <View pointerEvents="auto" style={styles.leftHeader}>
          <MenuButton
            style={getAnimatedMenuButtonStyle(position)}
            navigation={navigation}
          />

          <StarButton
            navigation={navigation}
            style={getAnimatedIconStyle(position)}
          />
        </View>

        {!isMobileWidth && children}
        <SearchButton navigation={navigation} />
      </View>
      {isMobileWidth && children}
    </View>
  );
}

// Animated styles
function getAnimatedMenuButtonStyle(position) {
  const scale = position.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0.001],
    extrapolate: 'clamp',
  });
  const opacity = position.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });
  return {
    opacity,
    transform: [{ scale }],
  };
}

function getAnimatedIconStyle(position) {
  const translateX = position.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -36],
    extrapolate: 'clamp',
  });

  return {
    transform: [
      { translateX },
      {
        translateX: position.interpolate({
          inputRange: [0, 1],
          outputRange: ['0%', '-50%'],
          extrapolate: 'clamp',
        }),
      },
    ],
  };
}

// Buttons
const StarButton = ({ navigation, style }) => (
  <AnimatedTouchableOpacity
    style={[styles.row, style]}
    onPress={() => navigation.navigate('Design')}
  >
    <Icon name="star" />
  </AnimatedTouchableOpacity>
);

const MenuButton = ({ navigation, style }) => (
  <AnimatedTouchableOpacity
    style={[
      styles.buttonTouchable,
      {
        padding: 24,
      },
      style,
    ]}
    onPress={() => {
      if (navigation.openDrawer) navigation.openDrawer();
    }}
  >
    <Icon name="menu" size={24} />
  </AnimatedTouchableOpacity>
);

const SearchButton = ({ navigation }) => (
  <TouchableOpacity
    style={[styles.buttonTouchable, { marginLeft: 24 }]}
    onPress={() => navigation.navigate('Search')}
  >
    <Icon name="search" />
  </TouchableOpacity>
);

// Icon alias
const Icon = ({ name, size = 32 }) => (
  <MaterialIcons color="white" name={name} size={size} />
);

const styles = StyleSheet.create({
  leftHeader: {
    flexDirection: 'row',
    flex: 1,
    minHeight: size,
  },
  container: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    backgroundColor: Colors.header,
    alignItems: 'center',
  },
  buttonTouchable: {
    padding: 20,
    minWidth: size,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
});
