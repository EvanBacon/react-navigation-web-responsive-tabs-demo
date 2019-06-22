import * as React from 'react';
import { Animated, StyleSheet } from 'react-native';

export default function TabLabel({
  route,
  position,
  navigation,
  activeTintColor = '#fff',
  inactiveTintColor = '#fff',
  upperCaseLabel,
  labelStyle,
  getLabelText,
}) {
  const { routes } = navigation.state;
  const index = routes.indexOf(route);
  const focused = index === navigation.state.index;

  // Prepend '-1', so there are always at least 2 items in inputRange
  const inputRange = [-1, ...routes.map((x, i) => i)];
  const outputRange = inputRange.map(inputIndex =>
    inputIndex === index ? activeTintColor : inactiveTintColor,
  );
  const color = position.interpolate({
    inputRange,
    outputRange: outputRange,
  });

  const tintColor = focused ? activeTintColor : inactiveTintColor;
  const label = getLabelText({ route });

  if (typeof label === 'string') {
    return (
      <Animated.Text
        style={[styles.label, { color }, labelStyle]}
        allowFontScaling
      >
        {upperCaseLabel ? label.toUpperCase() : label}
      </Animated.Text>
    );
  }
  if (typeof label === 'function') {
    return label({ focused, tintColor });
  }

  return label;
}

const styles = StyleSheet.create({
  label: {
    textAlign: 'center',
    fontSize: 20,
    margin: 8,
    backgroundColor: 'transparent',
  },
});
